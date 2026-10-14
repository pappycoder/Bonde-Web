import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/motion";
import { ProductPreview } from "@/components/marketing/product-preview";
import { StoreButtons } from "@/components/marketing/store-buttons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="bg-brand-glow relative overflow-hidden border-b border-border/60">
      <div className="bg-brand-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:px-8">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            AI-powered money, finally
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
            Bonde brings your spending, saving and sending into one calm place — with an AI
            that explains your money and keeps you in control.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Get started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/features">See features</Link>
            </Button>
          </div>
          <div className="mt-6">
            <StoreButtons />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ProductPreview />
        </FadeIn>
      </div>
    </section>
  );
}
