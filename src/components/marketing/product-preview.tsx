import { ArrowDownLeft, ArrowUpRight, Sparkles } from "lucide-react";

const TRANSACTIONS = [
  { label: "Transfer to Ada", amount: "−₦12,000.00", direction: "out" as const, tag: "Sent" },
  { label: "Netflix", amount: "−₦4,400.00", direction: "out" as const, tag: "Virtual card" },
  { label: "Salary", amount: "+₦310,000.00", direction: "in" as const, tag: "Received" },
];

/**
 * Static, dependency-free product preview used beside the landing hero. It is
 * decorative (aria-hidden) — real balances live in the app, never here.
 */
export function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      <div className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-2xl" />
      <div className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Available balance</p>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Wallet
          </span>
        </div>
        <p className="mt-2 text-3xl font-semibold tracking-tight">₦248,500.00</p>

        <ul className="mt-6 space-y-4">
          {TRANSACTIONS.map((transaction) => (
            <li key={transaction.label} className="flex items-center gap-3">
              <span
                className={
                  transaction.direction === "in"
                    ? "flex size-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
                    : "flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground"
                }
              >
                {transaction.direction === "in" ? (
                  <ArrowDownLeft className="size-4" />
                ) : (
                  <ArrowUpRight className="size-4" />
                )}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium">{transaction.label}</span>
                <span className="block text-xs text-muted-foreground">{transaction.tag}</span>
              </span>
              <span className="text-sm font-medium tabular-nums">{transaction.amount}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            Bonde AI
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            You spent 18% less on food this week. Want me to move the difference to savings?
          </p>
        </div>
      </div>
    </div>
  );
}
