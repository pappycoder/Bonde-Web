/**
 * Single source of truth for brand copy, URLs and outbound links. Everything
 * user-visible that is not page copy lives here so the marketing site can be
 * re-pointed without touching components.
 */
export const siteConfig = {
  name: "Bonde",
  fullName: "Bonde",
  /** Registered entity name used in copyright lines. */
  legalName: "BONDE TECHNOLOGIES AND INNOVATIONS LIMITED",
  tagline: "Your money, with an AI that actually gets you.",
  description:
    "Bonde is an AI-powered fintech app that helps you spend, save and move money with confidence — smart insights, virtual cards and instant transfers in one place.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002",
  logo: "/bonde-logo.png",
  /** White wordmark for dark surfaces (the waitlist hero). */
  logoWhite: "/bonde-white-logo.png",
  icon: "/bonde-icon.png",
  /** Backdrop for the pre-launch waitlist page. */
  waitlistBackground: "/waitlist-backgroun.png",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "usebonde@gmail.com",
  links: {
    admin: process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3000",
    appStore: process.env.NEXT_PUBLIC_APP_STORE_URL ?? "",
    playStore: process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL ?? "https://x.com/usebonde",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
