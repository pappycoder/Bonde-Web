import type { ReactNode } from "react";

import { PageHero } from "./page-hero";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

/**
 * Shared shell for legal documents. Applies a readable, prose-like rhythm to
 * the raw markup each page provides (headings, paragraphs, lists, links).
 */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={`Last updated ${updated}`} />
      <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6 [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:mt-1 [&_li]:text-muted-foreground [&_p]:text-muted-foreground [&_p]:text-pretty [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </article>
    </>
  );
}
