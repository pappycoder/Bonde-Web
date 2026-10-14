import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { isWaitlistMode } from "@/config/site-mode";

/** Closing call-to-action band, mode-aware in its copy and destination. */
export function CtaBand() {
  const waitlist = isWaitlistMode();
  const cta = waitlist
    ? { label: "Join the waitlist", href: "/#waitlist" }
    : { label: "Get started", href: "/contact" };

  return (
    <section className="pb-16 sm:pb-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="bg-brand-glow relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Ready to make your money make sense?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
              {waitlist
                ? "Be first in line when Bonde launches. Join the waitlist and we'll email you the moment it's live."
                : "Create your Bonde account in minutes and let AI take the guesswork out of your money."}
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg">
                <Link href={cta.href}>
                  {cta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
