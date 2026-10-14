import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/marketing/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Bonde website, waitlist and app.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="14 October 2026">
      <p>
        These terms govern your use of the {siteConfig.name} website, waitlist and app (the
        &ldquo;Services&rdquo;). By using the Services, you agree to these terms. If you do not
        agree, please do not use the Services.
      </p>

      <h2>Using the Services</h2>
      <p>
        You must be at least 18 years old, or the age of majority where you live, to open a Bonde
        account. You agree to use the Services lawfully and to provide accurate information when
        you join the waitlist or create an account.
      </p>

      <h2>Your account</h2>
      <p>
        You are responsible for keeping your login credentials and devices secure, and for all
        activity that happens under your account. Tell us immediately if you believe your account
        has been compromised.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not use the Services for unlawful, fraudulent or harmful purposes.</li>
        <li>Do not attempt to disrupt, reverse-engineer or gain unauthorised access to the Services.</li>
        <li>Do not misuse the waitlist or contact forms, including by submitting false information.</li>
      </ul>

      <h2>Availability and changes</h2>
      <p>
        The Services are provided on a best-effort basis and may change, be suspended or
        discontinued. Features described on this website, including the waitlist, are indicative
        and may change before or after launch.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Services, including our name, logo, content and software, are owned by us or our
        licensors and are protected by applicable laws. You may not use them except as permitted by
        these terms.
      </p>

      <h2>Disclaimers</h2>
      <p>
        The Services are provided &ldquo;as is&rdquo;. AI-generated insights are for information
        only and do not constitute financial advice. You remain responsible for your financial
        decisions.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for indirect, incidental or
        consequential losses arising from your use of the Services.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Federal Republic of Nigeria, and any disputes
        will be subject to the exclusive jurisdiction of its courts.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. When we do, we will revise the date at the top
        of this page. Continued use of the Services means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> or use our{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </LegalPage>
  );
}
