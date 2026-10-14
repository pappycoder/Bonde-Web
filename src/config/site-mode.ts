/**
 * The site ships in one of two modes, selected by `NEXT_PUBLIC_SITE_MODE`:
 *
 * - `waitlist` (default) — pre-launch: `/` is a focused waitlist capture page.
 * - `landing`            — launched: `/` is the full marketing landing page.
 *
 * `NEXT_PUBLIC_*` values are inlined at build time, so flipping modes on a
 * deployed environment requires a rebuild.
 */
export type SiteMode = "waitlist" | "landing";

export const DEFAULT_SITE_MODE: SiteMode = "waitlist";

export function getSiteMode(): SiteMode {
  return process.env.NEXT_PUBLIC_SITE_MODE === "landing" ? "landing" : DEFAULT_SITE_MODE;
}

export function isWaitlistMode(): boolean {
  return getSiteMode() === "waitlist";
}

export function isLandingMode(): boolean {
  return getSiteMode() === "landing";
}
