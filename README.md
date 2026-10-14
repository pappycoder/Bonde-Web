# Bonde Web

The public marketing website for **Bonde** — an AI-powered fintech app. Built with the same modern stack as `Bonde-Admin`, so the two Next.js apps in the monorepo stay aligned.

## Tech Stack

| Layer      | Tech                                                                        |
| ---------- | --------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router, React 19, Turbopack)          |
| Language   | [TypeScript](https://www.typescriptlang.org) (strict)                       |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config, OKLCH tokens) |
| Components | [shadcn/ui](https://ui.shadcn.com) (`new-york` style, Radix primitives)     |
| Animation  | [Motion](https://motion.dev) (via `motion/react`)                           |
| Toasts     | [Sonner](https://sonner.emilkowal.ski)                                      |
| Theming    | [next-themes](https://github.com/pacocoursey/next-themes) (dark-first)      |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional — sensible defaults are built in)
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3002](http://localhost:3002).

The site proxies `/api/*` to the backend defined by `API_URL` (default
`http://localhost:3001`), so start `Bonde-Backend` to exercise the waitlist and
contact forms.

## Scripts

```bash
npm run dev       # Development server on port 3002
npm run build     # Production build
npm run start     # Serve the production build (respects PORT)
npm run lint      # Lint with ESLint
```

Prefer a menu? `./bonde.sh` wraps the same commands (dev on :3002, production
serve, both site-mode builds, lint) and also runs non-interactively:

```bash
./bonde.sh dev            # dev server
./bonde.sh start          # serve the production build
./bonde.sh build          # build (waitlist mode)
./bonde.sh build:landing  # build (landing mode)
./bonde.sh lint           # lint
```

## Site modes

`NEXT_PUBLIC_SITE_MODE` decides what the home route (`/`) renders:

| Value                | Home page                                            |
| -------------------- | ---------------------------------------------------- |
| `waitlist` (default) | Pre-launch waitlist capture (`components/waitlist/`) |
| `landing`            | Full marketing landing page (`components/marketing/`) |

Because it is a `NEXT_PUBLIC_*` variable it is inlined at build time — switching
modes on a deployed environment requires a rebuild.

All other pages (`/features`, `/how-it-works`, `/about`, `/contact`, `/privacy`,
`/terms`) are always available.

## Project Structure

```
src/
├── app/                     # routes (home switches on site mode)
│   ├── features/            # feature deep-dive
│   ├── how-it-works/        # onboarding steps
│   ├── about/               # mission + values
│   ├── contact/             # contact form + details
│   ├── privacy/ terms/      # legal
│   ├── sitemap.ts robots.ts # SEO
│   └── globals.css          # Tailwind v4 + brand tokens
├── components/
│   ├── ui/                  # shadcn/ui primitives (CLI-managed)
│   ├── layout/              # Chrome (shell switch), SiteHeader, SiteFooter
│   ├── marketing/           # landing sections (hero, features, steps, …)
│   ├── waitlist/            # waitlist page + form
│   ├── contact/             # contact form
│   ├── motion/              # reveal primitives (reduced-motion aware)
│   └── theme/               # ThemeProvider + ThemeToggle
├── config/                  # site.ts (brand/links), nav.ts, site-mode.ts
└── lib/                     # utils (cn), api.ts, validation.ts
```

## Backend integration

The only integration is the waitlist and contact forms. Both POST same-origin
through the `/api/*` rewrite, so no CORS allowance is required:

- `POST /api/waitlist` — `{ email, name?, source? }`
- `POST /api/contact` — `{ name, email, subject?, message }`

Both return `201`. Errors use the uniform `{ statusCode, message }` shape; see
`src/lib/api.ts`.

## Theming

Brand tokens live in `src/app/globals.css` (Bonde orange primary, dark-first with
a light/system toggle). Branding and outbound links are centralized in
`src/config/site.ts`.

## Deployment

Deploy anywhere Node.js runs (Vercel, Railway, Fly.io, your own server):

- Set `API_URL` to the deployed backend URL.
- Set `NEXT_PUBLIC_SITE_MODE` to `waitlist` or `landing`.
- Optionally set the `NEXT_PUBLIC_*` URLs in `.env.example`.

## CI

`.github/workflows/ci.yml` runs on pushes/PRs to `main`: **lint**, plus a
**build matrix** for both site modes (`waitlist` and `landing`) on Node 22, with
a `check` gate summarising them for branch protection. No secrets are needed —
`next build` type-checks and prerenders, and the `/api` rewrite falls back to the
default `API_URL`. Deployments are handled by the host's GitHub integration
rather than this workflow.

## License

MIT
