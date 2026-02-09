# MD3 Token Studio

A complete React + Vite playground for MD3-inspired token systems with real page templates.

This project is built to be both:
- A **design token source of truth** (light, dark, theme base, accent)
- A **working showcase app** with production-ready starter layouts

## What you get

- Centralized token registry (`color`, `typography`, `spacing`, `radius`, `elevation`)
- Runtime CSS variable injection (`data-mode`, `data-theme`, `data-accent`)
- Shadcn-style picker UX for mode/theme/accent switching
- Full preview pages:
  - Hero website section template
  - Dashboard template
  - Style guide with token references
- Token export script that generates CSS and theme matrix artifacts
- Vitest + React Testing Library coverage including a higher-level flow test

## Quick start

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - typecheck + production build
- `npm run preview` - preview built app
- `npm run test` - run tests in watch mode
- `npm run test:run` - run tests once
- `npm run test:coverage` - run tests with coverage
- `npm run typecheck` - run TypeScript checks
- `npm run build:tokens` - generate token artifacts in `dist/`

## Token architecture

Single source of truth:
- `/src/tokens/registry.ts`

Runtime application:
- `/src/tokens/cssVariables.ts`

Export artifacts:
- `/dist/theme.css`
- `/dist/theme-matrix.json`

## Theme controls

- **Mode**: `light` or `dark`
- **Theme Base**: `slate`, `sand`, `moss`
- **Accent**: `indigo`, `emerald`, `coral`, `amber`

All combinations are generated via `listThemeCombos()`.

## Testing

Current tests cover:
- Token generation correctness
- CSS variable flattening
- End-to-end UI flow (page switching + theme picker + root attributes)

## CI

GitHub Actions workflow runs install, typecheck, tests, build, and token artifact generation.

## License

MIT
