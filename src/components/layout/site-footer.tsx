import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { InstagramIcon, LinkedInIcon, XIcon } from "@/components/marketing/social-icons";
import { legalItems, navItems } from "@/config/nav";
import { siteConfig } from "@/config/site";

const socials = [
  { title: "X (Twitter)", href: siteConfig.links.twitter, icon: XIcon },
  { title: "Instagram", href: siteConfig.links.instagram, icon: InstagramIcon },
  { title: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedInIcon },
].filter((social) => social.href);

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={200}
            height={63}
            className="h-7 w-auto"
          />
          <p className="max-w-xs text-sm text-muted-foreground text-pretty">
            {siteConfig.description}
          </p>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.title}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold">Company</h2>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="text-sm font-semibold">Legal</h2>
          <ul className="mt-4 space-y-2">
            {legalItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
                {siteConfig.supportEmail}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>Built in Lagos, for everyone.</p>
        </div>
      </div>
    </footer>
  );
}
