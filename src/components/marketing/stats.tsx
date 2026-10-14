import { Stagger, StaggerItem } from "@/components/motion";

const STATS = [
  { value: "Seconds", label: "to send money to any bank" },
  { value: "₦0", label: "hidden fees — every charge is shown up front" },
  { value: "24/7", label: "AI that answers your money questions" },
  { value: "100%", label: "of transactions confirmed in real time" },
];

export function Stats() {
  return (
    <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <StaggerItem key={stat.label} className="text-center">
          <p className="bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
            {stat.value}
          </p>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">{stat.label}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
