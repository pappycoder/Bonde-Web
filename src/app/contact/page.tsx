import type { Metadata } from "next";
import { Mail, MessageSquare, Sparkles } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/motion";
import { InstagramIcon, LinkedInIcon, XIcon } from "@/components/marketing/social-icons";
import { PageHero } from "@/components/marketing/page-hero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions, partnerships or feedback? Get in touch with the Bonde team — we usually reply within one business day.",
};

const socials = [
  { title: "X (Twitter)", href: siteConfig.links.twitter, icon: XIcon },
  { title: "Instagram", href: siteConfig.links.instagram, icon: InstagramIcon },
  { title: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedInIcon },
].filter((social) => social.href);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        description="Whether it's a question, a partnership or feedback, we'd love to hear from you."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <FadeIn>
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.1} className="space-y-8">
          <div>
            <h2 className="flex items-center gap-2 font-semibold">
              <Mail className="size-4 text-primary" />
              Email us
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer email? Reach the team directly at{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {siteConfig.supportEmail}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-semibold">
              <MessageSquare className="size-4 text-primary" />
              What to expect
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>A real person reads every message.</li>
              <li>We usually reply within one business day.</li>
              <li>We never share your details with third parties.</li>
            </ul>
          </div>

          {socials.length > 0 ? (
            <div>
              <h2 className="flex items-center gap-2 font-semibold">
                <Sparkles className="size-4 text-primary" />
                Follow along
              </h2>
              <div className="mt-3 flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.title}
                    className="flex size-10 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <social.icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </FadeIn>
      </section>
    </>
  );
}
