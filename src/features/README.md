# Features

Feature-based modules live here. **Nothing is scaffolded yet** — per the current
phase, no pages or features are built. This folder documents the convention so
the next engineer knows exactly where feature code goes.

## Convention

Each feature is a self-contained folder that colocates everything it owns:

```
features/
└── invitations/
    ├── components/     # UI specific to this feature
    ├── hooks/          # feature-scoped hooks (TanStack Query, local state)
    ├── services/       # API calls for this feature (use @/lib/api/client)
    ├── types/          # feature-scoped types + Zod schemas
    └── index.ts        # public surface — import features via this barrel only
```

### Rules

- **Shared vs. feature.** Truly cross-cutting primitives stay in `@/components`
  (`ui`, `shared`, `layout`). Anything specific to one feature lives under that
  feature.
- **Import boundaries.** Import a feature only through its `index.ts`. Features
  should not reach into each other's internals.
- **Data.** Server state goes through TanStack Query hooks that call the
  feature's service; local UI state stays in React state.
- **Forms.** React Hook Form + Zod, fully typed (schema in the feature's
  `types/`).
