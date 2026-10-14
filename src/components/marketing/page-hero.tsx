import type { ReactNode } from "react";

import { FadeIn } from "@/components/motion";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Header band for interior marketing pages (features, about, legal, …). */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="bg-brand-glow border-b border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground text-pretty">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </FadeIn>
      </div>
    </section>
  );
}
