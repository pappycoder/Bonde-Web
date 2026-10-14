"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isWaitlistMode } from "@/config/site-mode";

/**
 * Renders the shared site chrome (header + footer) around every route — except
 * the pre-launch home. In waitlist mode `/` is a self-contained page with its
 * own header/footer, so the shell is skipped there and nowhere else. The mode
 * is build-time inlined, and `children` stay server components (they are passed
 * through as a prop).
 */
export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bare = isWaitlistMode() && pathname === "/";

  if (bare) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
