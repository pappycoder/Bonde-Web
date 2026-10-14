<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Bonde-Web

The public marketing website for Bonde. Next.js 16 (App Router, React 19,
Turbopack), TypeScript strict, Tailwind v4, shadcn/ui (`new-york`), Motion,
Sonner. It is the second Next.js app in the monorepo — keep it aligned with
`Bonde-Admin` (same versions, alias, and component conventions).

## Commands

- `npm run dev` — dev server on **http://localhost:3002**
- `npm run build` — production build
- `npm run start` — serve the production build (respects `PORT`)
- `npm run lint` — ESLint
- `./bonde.sh` — interactive build/run helper; also non-interactive
  (`dev|start|build|build:landing|lint`)

## Ports (local)

| App | Port |
| --- | --- |
| Bonde-Admin | 3000 |
| Bonde-Backend | 3001 |
| Bonde-Web | 3002 |

## Site mode

`NEXT_PUBLIC_SITE_MODE` selects what `/` renders:

- `waitlist` (**default**) — pre-launch waitlist capture (`components/waitlist/`).
- `landing` — the full marketing landing page (`components/marketing/`).

In waitlist mode `/` is a **standalone full-screen page**: `Chrome`
(`components/layout/chrome.tsx`) skips the site header/footer there only, so the
page owns its own header (white logo) and footer. Every other route (legal,
marketing) always renders the shared shell in both modes. The page is dark
regardless of the theme toggle.

The value is read in `src/config/site-mode.ts`. Because it is a
`NEXT_PUBLIC_*` variable it is inlined at build time, so switching modes in a
deployed environment requires a rebuild.

## Backend integration (minimal)

- The only integration is the waitlist + contact forms. Both POST same-origin to
  `/api/waitlist` and `/api/contact`; `next.config.ts` rewrites `/api/*` to
  `API_URL` (default `http://localhost:3001`), so no CORS allowance is needed.
- Backend contract: `POST /api/waitlist` `{ email, name?, source? }` and
  `POST /api/contact` `{ name, email, subject?, message }`, both `201`. Errors
  are the uniform `{ statusCode, message }` shape (`message` is a string or an
  array of strings) — see `src/lib/api.ts`.
- The waitlist form sends `source: "waitlist-page"`; the admin console lists
  signups read-only at `/waitlist` and messages at `/contacts`.
- No auth, no tokens, no client-side secrets on this site.

## Structure

```
src/
├── app/            # routes (home switches on site mode; landing + legal pages)
├── components/
│   ├── ui/         # shadcn primitives (CLI-managed)
│   ├── layout/     # Chrome (shell switch), SiteHeader, SiteFooter
│   ├── marketing/  # landing sections
│   ├── waitlist/   # waitlist page + form
│   ├── contact/    # contact form
│   ├── motion/     # Reveal primitives (respect prefers-reduced-motion)
│   └── theme/      # ThemeProvider + ThemeToggle
├── config/         # site.ts (brand/links), nav.ts, site-mode.ts
└── lib/            # utils (cn), api.ts, validation.ts
```

## Conventions

- Brand primary is Bonde orange (`#FF4B00`); tokens live in
  `src/app/globals.css` (dark-first with a light toggle).
- The waitlist page uses its own fixed `--color-waitlist-*` tokens (warm
  near-black + `#ff5722` accent) defined in `globals.css`; use them instead of
  the theme tokens there so the page stays dark. Assets: `siteConfig.logoWhite`
  and `siteConfig.waitlistBackground`.
- Branding and outbound links are centralized in `src/config/site.ts`.
- Reuse `src/components/motion` for entrance animations (they trigger once and
  honour reduced-motion).
- Add shadcn components with `npx shadcn@latest add <name>` (config in
  `components.json`).
