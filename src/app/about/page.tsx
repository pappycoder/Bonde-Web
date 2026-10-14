import type { Metadata } from "next";
import { HeartHandshake, Lightbulb, Lock } from "lucide-react";

import { CtaBand } from "@/components/marketing/cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { Stats } from "@/components/marketing/stats";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bonde is on a mission to make money make sense for everyone — combining everyday finance with an AI that explains and protects your money.",
};

const VALUES = [
  {
    icon: Lightbulb,
    title: "Clarity over complexity",
    body: "Finance should not need a glossary. We make every number, fee and decision understandable at a glance.",
  },
  {
    icon: Lock,
    title: "Security by default",
    body: "Your money and data are protected at every layer — encryption, device approvals and real-time monitoring come standard.",
  },
  {
    icon: HeartHandshake,
    title: "Built for everyone",
    body: "From first-time savers to seasoned spenders, Bonde works for the way you live, not the other way around.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We're making money make sense"
        description={siteConfig.description}
      />

      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-lg text-muted-foreground text-pretty">
            Bonde started with a simple frustration: managing money means juggling apps,
            spreadsheets and statements that never quite add up. We believed there had to be a
            calmer way — one place that understands your money and helps you act on it.
          </p>
          <p className="text-lg text-muted-foreground text-pretty">
            So we built an AI-powered fintech app that does the thinking with you. Bonde puts your
            spending, saving and sending in one place, then explains it in language that actually
            helps you make better decisions.
          </p>
        </div>
      </Section>

      <Section className="border-y border-border/60 bg-muted/20" eyebrow="Our values">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-2xl border border-border/60 bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <value.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{value.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why Bonde">
        <Stats />
      </Section>

      <CtaBand />
    </>
  );
}
