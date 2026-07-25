# INVITERA

Premium SaaS platform for creating and managing digital invitations (weddings,
engagements, birthdays, graduations, events). Arabic-first (RTL) with full
English (LTR) support, built to feel minimal, elegant, and professional.

> **Status: foundation only.** This repository currently contains the
> production-ready frontend _foundation_ — configuration, architecture, shared
> primitives, and cross-cutting infrastructure. Pages and features are **not**
> built yet; a single placeholder home page exists to prove the stack end to end.

---

## Tech stack

| Concern       | Choice                                               |
| ------------- | ---------------------------------------------------- |
| Framework     | Next.js 16 (App Router) + React 19                   |
| Language      | TypeScript (strict)                                  |
| Styling       | Tailwind CSS v4 (CSS-first) + shadcn/ui (Radix)      |
| Server state  | TanStack Query                                       |
| Forms         | React Hook Form + Zod                                |
| i18n          | next-intl (Arabic default/RTL, English/LTR)          |
| HTTP          | Axios (shared instance + interceptors)               |
| Icons         | Lucide                                               |
| Motion        | Framer Motion (used sparingly)                       |
| Notifications | Sonner                                               |
| Theming       | CSS variables + next-themes (dark-mode ready)        |
| Tooling       | ESLint + Prettier, Husky + commitlint (Conventional) |

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000 (redirects to /ar)
```

### Scripts

| Script                 | Purpose                             |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start the dev server                |
| `npm run build`        | Production build (also type-checks) |
| `npm start`            | Serve the production build          |
| `npm run lint`         | ESLint                              |
| `npm run typecheck`    | `tsc --noEmit`                      |
| `npm run format`       | Prettier write                      |
| `npm run format:check` | Prettier check                      |

### Environment variables

| Variable               | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`  | Base URL of the backend API (no backend yet — placeholder) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata/SEO                           |

## Folder structure

```
messages/               # translation catalogs: ar.json (default), en.json
src/
├── app/
│   ├── [locale]/        # locale-scoped routes (layout, page, loading, error, not-found)
│   └── global-error.tsx # catastrophic root boundary (own <html>)
├── components/
│   ├── ui/              # shadcn/ui primitives (generated; button is brand-tuned)
│   ├── shared/          # cross-cutting: error/empty states, skeleton, language switcher, fade-in
│   └── layout/          # site header/footer shells
├── providers/           # composition root (app-providers) + query/theme/auth providers
├── store/               # React Context state (auth-context) — no Redux
├── services/            # domain API services (user.service)
├── lib/
│   ├── api/             # axios client + interceptors + endpoint constants
│   ├── auth/            # token storage placeholder
│   ├── fonts.ts         # Tajawal (next/font)
│   └── utils.ts         # cn()
├── hooks/               # custom hooks (use-auth, use-current-user, use-media-query, use-mounted)
├── i18n/                # next-intl routing, navigation, request config
├── constants/           # routes, site, query-keys
├── types/               # shared types (api, auth)
├── styles/              # globals.css (Tailwind entry + brand @theme tokens)
├── features/            # feature modules (documented convention; none built yet)
└── proxy.ts             # next-intl locale negotiation (Next 16 renamed middleware → proxy)
```

## Architecture decisions

- **Tailwind v4, CSS-first theming.** No `tailwind.config.js`; the design system
  lives in `src/styles/globals.css` as CSS variables under `@theme`. Runtime-
  swappable variables are what make dark mode work. Brand colors are stored as
  raw hex for exact fidelity.
- **Context over Redux.** `src/store` holds React Context + `useReducer` state
  (auth). No global state library is introduced.
- **`api/` under `lib/`.** HTTP mechanics (axios instance, interceptors) are a
  library concern; `services/` holds domain calls that consume it.
- **Normalized API errors.** The response interceptor converts every failure to
  an `ApiError` (`status`/`code`/`details`), so callers never touch raw axios errors.
- **`localePrefix: "always"`.** Both `/ar/...` and `/en/...` are explicit; `/`
  redirects to the default locale. Clean, unambiguous hreflang/SEO.
- **Next.js 16 specifics.** `middleware` → `proxy`; `params`/`searchParams` are
  async; error boundaries use `unstable_retry`. See `AGENTS.md` — always read the
  bundled docs in `node_modules/next/dist/docs/` before writing Next.js code.

## Styling & brand tokens

- Primary `#9E0E3D`, primary text `#111827`, secondary text `#5D5B67`, white bg.
- Radius base `14px`: buttons/inputs `rounded-lg` (14px), cards `rounded-xl` (≈20px).
- Shadows: `shadow-soft` / `shadow-soft-lg` only — never heavy.
- **RTL rule (important):** use **logical** Tailwind properties only — `ms/me`,
  `ps/pe`, `start/end`, `text-start/end`. Never `ml/mr`, `pl/pr`, `left/right`,
  `text-left/right`. shadcn was initialized with RTL support so generated
  components already follow this. `Direction.Provider` propagates direction to
  Radix primitives for correct keyboard nav.

## i18n & RTL

- Locales are declared once in `src/i18n/routing.ts`; add a locale there and a
  matching `messages/<locale>.json`.
- Navigate with the helpers from `@/i18n/navigation` (`Link`, `useRouter`, …) so
  the locale segment is preserved. The `LanguageSwitcher` swaps locales instantly
  via `router.replace(pathname, { locale })`.

## Component guidelines

- **Primitives** live in `components/ui` (shadcn). **Cross-cutting** presentational
  components live in `components/shared`; **feature** components live under their
  feature folder.
- Variants use `class-variance-authority`; expose state via `data-*` attributes
  (`data-slot`, `data-variant`) rather than boolean class props.
- Reach for Framer Motion sparingly — prefer the shared `FadeIn` so timing/easing
  stay consistent (motion as quality, not spectacle).
- Every component: small, typed, self-contained, accessible (semantic HTML,
  visible `focus-visible` ring, accessible names).

## State & data

- **Server state:** TanStack Query. Keys come from the `queryKeys` factory in
  `src/constants/query-keys.ts`. Query hooks call domain services.
- **Local UI state:** plain React state / Context.

## API layer

Add a service under `src/services/<name>.service.ts`, add its paths to
`src/lib/api/endpoints.ts`, call `apiClient`, and unwrap the `ApiResponse<T>`
envelope. Errors arrive as `ApiError`.

## Authentication

Scaffolding only — no backend auth yet. The auth state machine (`store/auth-context`),
`useAuth` hook, `AuthProvider`, and token-storage placeholder are in place and
ready for JWT/session integration. `login`/`logout` are safe no-op placeholders;
`token-storage` uses `localStorage` and must be swapped for httpOnly cookies in
production.

## Commit convention

[Conventional Commits](https://www.conventionalcommits.org), enforced by
commitlint via the Husky `commit-msg` hook. `pre-commit` runs lint-staged
(ESLint + Prettier on staged files). Examples:

```
feat(invitations): add RSVP form
fix(api): normalize 422 validation errors
chore: bump dependencies
```

## Out of scope (this phase)

Pages and feature UIs, real authentication/backend integration, a finished dark
palette, and tests — all deliberately deferred. The foundation is built so these
drop in without rework.
