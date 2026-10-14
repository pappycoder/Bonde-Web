import type { ReactNode } from "react";

import { FadeIn } from "@/components/motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
};

/**
 * Standard page section: a bounded container with an optional, centered
 * animated heading. Keeps spacing and headings consistent across the site.
 */
export function Section({ id, className, eyebrow, title, description, children }: SectionProps) {
  const hasHeading = Boolean(eyebrow || title || description);

  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {hasHeading ? (
          <FadeIn className="mx-auto max-w-2xl text-center">
            {eyebrow ? (
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-base text-muted-foreground text-pretty">{description}</p>
            ) : null}
          </FadeIn>
        ) : null}
        {children ? <div className={cn(hasHeading && "mt-14")}>{children}</div> : null}
      </div>
    </section>
  );
}
