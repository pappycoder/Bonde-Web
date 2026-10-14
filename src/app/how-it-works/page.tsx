import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/marketing/cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { Steps } from "@/components/marketing/steps";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Open your Bonde account, verify your identity, add money and start spending and tracking with AI — all in four simple steps.",
};

const DETAILS = [
  {
    title: "Everything provisioned for you",
    body: "Verifying your identity instantly creates your account, wallet and virtual card. There is nothing else to set up before you can move money.",
  },
  {
    title: "Your deposit details, in one place",
    body: "Bonde gives you a dedicated deposit account. Fund your wallet from your bank or a card and watch the balance update in real time.",
  },
  {
    title: "Insight with every transaction",
    body: "Each payment is categorised and explained as it happens, so you always know where you stand without doing any maths.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From sign-up to first transfer in minutes"
        description="Bonde is designed to get out of your way. Here is exactly what happens when you join."
      />

      <Section>
        <Steps />
      </Section>

      <Section className="border-t border-border/60 bg-muted/20">
        <div className="grid gap-6 md:grid-cols-3">
          {DETAILS.map((detail) => (
            <div key={detail.title} className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="font-semibold">{detail.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{detail.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/contact">
              Get started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
