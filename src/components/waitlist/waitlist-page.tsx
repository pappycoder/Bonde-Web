import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/marketing/social-icons";
import { FadeIn } from "@/components/motion";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { siteConfig } from "@/config/site";

const socials = [
  { title: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedInIcon },
  { title: "X (Twitter)", href: siteConfig.links.twitter, icon: XIcon },
  { title: "Instagram", href: siteConfig.links.instagram, icon: InstagramIcon },
];

/**
 * The pre-launch home page. A single focused conversion: join the waitlist.
 * Rendered at `/` when `NEXT_PUBLIC_SITE_MODE` is `waitlist` (the default).
 * Deliberately its own full-screen shell (the `Chrome` wrapper hides the site
 * header/footer on `/` in this mode), and always dark regardless of the theme.
 */
export function WaitlistPage() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center overflow-hidden bg-waitlist-bg px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Backdrop: supplied art, anchored to the top of the page. */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={siteConfig.waitlistBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Header / logo */}
      <header className="relative z-10 flex w-full max-w-7xl justify-center pt-2 pb-6">
        <Link href="/" aria-label={`${siteConfig.name} home`}>
          <Image
            src={siteConfig.logoWhite}
            alt={siteConfig.name}
            width={258}
            height={80}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex w-full max-w-4xl flex-1 flex-col items-center justify-center py-12 text-center">
        <FadeIn className="flex flex-col items-center">
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-waitlist-border-strong bg-waitlist-surface-2 px-4 py-1.5 text-xs font-medium text-waitlist-accent shadow-inner shadow-waitlist-accent/10 backdrop-blur-md sm:text-sm">
            <span>Coming soon</span>
            <ArrowRight className="size-3.5" aria-hidden />
          </span>

          <h1 className="max-w-9xl text-2xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Be the First to Experience the Future of AI-Powered Payments
          </h1>

          <p className="mt-6 mb-10 max-w-2xl text-sm leading-relaxed text-waitlist-muted text-pretty sm:text-base md:text-lg">
            BONDE lets you use AI to shop, pay, and handle financial tasks on
            your behalf while you stay in control. Join the waitlist to get
            early access and be among the first to experience BONDE.
          </p>

          <WaitlistForm source="waitlist-page" />
        </FadeIn>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-6 pt-10 pb-4">
        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const href = social.href || "#";
            const external = href.startsWith("http");
            return (
              <a
                key={social.title}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                aria-label={social.title}
                className="flex size-10 items-center justify-center rounded-full bg-waitlist-accent text-white shadow-md shadow-waitlist-accent/20 transition hover:scale-105 hover:bg-waitlist-accent-hover"
              >
                <social.icon className="size-4" />
              </a>
            );
          })}
        </div>

        <p className="text-center text-[11px] tracking-wide text-waitlist-muted sm:text-xs">
          &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights
          reserved.
        </p>

        <div className="flex items-center gap-5 text-xs text-waitlist-muted">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="transition-colors hover:text-white"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
