# Supercool Software — Website

Frontend for **Supercool Software Pty Ltd** — Vite, React, TypeScript, Tailwind. Funky 70s vibe, production-ready branch strategy.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Vercel (frontend)
- GCP project `supercool-software` (backend — coming later)

## Branches & environments

| Branch | Environment | Vercel |
|--------|-------------|--------|
| `dev` | development | Preview / dev URL |
| `staging` | staging | Staging URL |
| `main` | production | Production |

Set `VITE_APP_ENV` in Vercel per branch:

- **Production** (`main`): `production`
- **Staging** (`staging`): `staging`
- **Development** (`dev`): `development`

Non-production environments show a badge in the header.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. GitHub repo: `Programproductions/Supercool`
2. Push this project (see below)
3. Import the repo in [Vercel](https://vercel.com)
4. Framework preset: **Vite**
5. Configure branch → environment variables as above

## Push to GitHub

The repo is **private** — the Cursor Cloud Agent needs explicit access before it can push.

### Grant Cursor access (private repo)

1. GitHub → **Settings** → **Applications** → **Installed GitHub Apps**
2. Open **Cursor** → **Configure**
3. Under **Repository access**, choose **Only select repositories**
4. Add **Programproductions/Supercool**
5. Tell the agent to push again

### Push branches

```bash
git remote add origin https://github.com/Programproductions/Supercool.git
git push -u origin main dev staging
```

## Logo

Brand wordmark lives at `public/logo.svg` (mustard + orange gradient, 70s sticker style). Drop a PNG at `public/logo.png` if you prefer the raster original — update components to use it.

## GCP (future)

Backend infra for project `supercool-software` will be added when you're ready — Cloud Run, Secret Manager, and Terraform per environment.
