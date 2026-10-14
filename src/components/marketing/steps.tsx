import { Stagger, StaggerItem } from "@/components/motion";

export type Step = {
  title: string;
  description: string;
};

export const STEPS: Step[] = [
  {
    title: "Create your account",
    description:
      "Sign up with your email in under a minute. No paperwork, no branch visits, no waiting.",
  },
  {
    title: "Verify your identity",
    description:
      "A quick, secure check unlocks your account, wallet and virtual card — all provisioned instantly.",
  },
  {
    title: "Add money",
    description:
      "Fund your wallet from your bank or a card. Your balance and deposit details stay in one place.",
  },
  {
    title: "Spend and track with AI",
    description:
      "Pay, send and save as usual while Bonde explains your money and keeps you on budget.",
  },
];

type StepsProps = {
  steps?: Step[];
};

export function Steps({ steps = STEPS }: StepsProps) {
  return (
    <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <StaggerItem key={step.title} className="relative">
          <div className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
            {index + 1}
          </div>
          <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">{step.description}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
