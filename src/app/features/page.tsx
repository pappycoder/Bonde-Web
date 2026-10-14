import type { Metadata } from "next";
import { BrainCircuit, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { FadeIn } from "@/components/motion";
import { CtaBand } from "@/components/marketing/cta";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";

export const metadata: Metadata = {
  title: "Features",
  description:
    "AI money insights, virtual cards, instant transfers, smart budgets and bank-grade security — everything Bonde puts in your pocket.",
};

const HIGHLIGHTS = [
  {
    icon: BrainCircuit,
    title: "An AI that explains your money",
    body: "Ask questions in plain language — “where did my money go last month?” — and get answers you can act on. Bonde turns raw transactions into clear, personalised guidance.",
  },
  {
    icon: Zap,
    title: "Money that moves at your speed",
    body: "Instant transfers to any bank, virtual cards you can freeze in a tap, and balances that update in real time. No waiting, no ambiguity.",
  },
  {
    icon: ShieldCheck,
    title: "Security you never have to think about",
    body: "Biometric login, device approvals and end-to-end encryption run quietly in the background, so protecting your money is the default, not a chore.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="A smarter way to spend, save and send"
        description="Bonde combines the everyday tools you need with intelligence that helps you make better decisions — all in one beautifully simple app."
      />

      <Section>
        <FeatureGrid />
      </Section>

      <Section className="border-t border-border/60 bg-muted/20">
        <div className="space-y-16">
          {HIGHLIGHTS.map((highlight, index) => (
            <FadeIn key={highlight.title}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <highlight.icon className="size-6" />
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-balance">
                    {highlight.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground text-pretty">{highlight.body}</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-8">
                  <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Sparkles className="size-4" />
                    Bonde AI
                  </p>
                  <p className="mt-3 text-lg font-medium text-balance">
                    {index === 0
                      ? "“You spent ₦42,300 on transport this month — 22% more than last. Switch two trips to walkable routes to save ₦9,000.”"
                      : index === 1
                        ? "“Transfer to Ada — ₦12,000. Arrives in seconds. No fees.”"
                        : "“New device? Approve it from your phone to keep your account safe.”"}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
