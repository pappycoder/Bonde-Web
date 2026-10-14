import { CtaBand } from "@/components/marketing/cta";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Hero } from "@/components/marketing/hero";
import { Section } from "@/components/marketing/section";
import { Stats } from "@/components/marketing/stats";
import { Steps } from "@/components/marketing/steps";

/** The full marketing landing page rendered at `/` when the site is launched. */
export function LandingPage() {
  return (
    <>
      <Hero />

      <Section
        id="features"
        eyebrow="Features"
        title="Everything your money needs, in one app"
        description="From everyday spending to savings goals, Bonde gives you the tools — and the intelligence — to stay ahead."
      >
        <FeatureGrid />
      </Section>

      <Section
        id="how-it-works"
        className="border-y border-border/60 bg-muted/20"
        eyebrow="How it works"
        title="Up and running in four simple steps"
        description="No queues, no paperwork. Open your account and start moving money in minutes."
      >
        <Steps />
      </Section>

      <Section id="why-bonde">
        <Stats />
      </Section>

      <CtaBand />
    </>
  );
}
