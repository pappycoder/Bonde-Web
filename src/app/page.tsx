import { LandingPage } from "@/components/marketing/landing-page";
import { WaitlistPage } from "@/components/waitlist/waitlist-page";
import { getSiteMode } from "@/config/site-mode";

/**
 * The home route renders differently depending on `NEXT_PUBLIC_SITE_MODE`:
 * the pre-launch waitlist (default) or the full marketing landing page.
 */
export default function HomePage() {
  return getSiteMode() === "landing" ? <LandingPage /> : <WaitlistPage />;
}
