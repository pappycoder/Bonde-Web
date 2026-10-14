import {
  BellRing,
  BrainCircuit,
  CreditCard,
  ShieldCheck,
  Send,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const FEATURES: Feature[] = [
  {
    title: "AI money insights",
    description:
      "Ask anything about your spending and get clear, plain-language answers — no spreadsheets, no guesswork.",
    icon: BrainCircuit,
  },
  {
    title: "Virtual cards",
    description:
      "Spin up secure virtual cards for subscriptions and one-off payments, then freeze them in a tap.",
    icon: CreditCard,
  },
  {
    title: "Instant transfers",
    description:
      "Send and receive money in seconds, to any bank account, with fees shown up front.",
    icon: Send,
  },
  {
    title: "Smart budgets",
    description:
      "Budgets that adapt to how you actually spend and nudge you before you overshoot, not after.",
    icon: Wallet,
  },
  {
    title: "Bank-grade security",
    description:
      "Biometric login, device approvals and end-to-end encryption keep your money and data locked down.",
    icon: ShieldCheck,
  },
  {
    title: "Real-time alerts",
    description:
      "Know the moment money moves. Every transaction is confirmed instantly and explained in context.",
    icon: BellRing,
  },
];

type FeatureGridProps = {
  features?: Feature[];
};

export function FeatureGrid({ features = FEATURES }: FeatureGridProps) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <StaggerItem key={feature.title}>
          <Card className="h-full transition-colors hover:border-primary/40">
            <CardHeader>
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </span>
              <CardTitle className="mt-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
