# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static frontend: the **Supercool Software** marketing website (React 19 + TypeScript + Vite 8 + Tailwind CSS v4). There is no backend, database, or test suite.

### Services

| Service | Required | Command | Notes |
|---|---|---|---|
| Vite dev server | Yes (this is the whole product) | `npm run dev` | Serves on http://localhost:5173. Run from repo root. |
| Vite preview (built output) | Optional | `npm run build` then `npm run preview` | Preview serves on http://localhost:4173. |

### Lint / build / run

Standard scripts in `package.json` (run with npm):
- Lint: `npm run lint` (ESLint flat config).
- Build: `npm run build` (runs `tsc -b` type-check, then `vite build` to `dist/`).
- Run (dev): `npm run dev`.
- Tests: none configured. "Testing" means running the dev server and manually verifying the site renders and nav anchors scroll to the right sections.

### Non-obvious notes

- Node 22 works fine (Vite 8 needs Node >= 20). No `.nvmrc` is present; the environment's default Node satisfies this.
- The only app env var is `VITE_APP_ENV` (`development` | `staging` | `production`), read in `src/data/site.ts`. Committed `.env.development` / `.env.staging` / `.env.production` files set it; `npm run dev` uses `development` and shows a "DEV" badge in the header. No secrets are needed to run, lint, or build.
- Content/copy is static in `src/data/site.ts`; sections live in `src/components/*`.
