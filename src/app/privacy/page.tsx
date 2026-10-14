import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/marketing/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Bonde collects, uses and protects your personal information across our website, waitlist and app.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="14 October 2026">
      <p>
        This policy explains what information {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
        collects, why we collect it, and the choices you have. It covers this website, our
        waitlist and the Bonde app.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us.</strong> When you join the waitlist or contact us, we
          collect the details you provide — such as your name, email address, message and, when
          you create an account, the information needed to verify your identity.
        </li>
        <li>
          <strong>Information we collect automatically.</strong> Like most websites, we collect
          basic technical data (such as your IP address and browser type) to keep the service
          secure and reliable.
        </li>
        <li>
          <strong>Information from your use of the app.</strong> Once you use Bonde, we process
          transaction and account data to provide the service and power features such as AI
          insights.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To operate, maintain and improve the Bonde website and app.</li>
        <li>To contact you about your waitlist spot, launch news or your enquiries.</li>
        <li>To keep your account and our services secure and to prevent fraud.</li>
        <li>To comply with legal and regulatory obligations that apply to financial services.</li>
      </ul>

      <h2>Sharing your information</h2>
      <p>
        We do not sell your personal information. We share it only with service providers who help
        us run Bonde (such as hosting, email and identity-verification partners) under contracts
        that require them to protect it, and where we are legally required to do so.
      </p>

      <h2>How we protect it</h2>
      <p>
        We use encryption in transit and at rest, access controls, and monitoring to protect your
        information. No method of transmission or storage is completely secure, but we work to
        keep your data safe and to notify you of any incident as required by law.
      </p>

      <h2>Retention</h2>
      <p>
        We keep your personal information only for as long as we need it for the purposes above,
        or as long as the law requires. Waitlist details are kept until you ask us to remove them
        or until they are no longer needed.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information, and
        you can unsubscribe from our emails at any time. To make a request, email{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
      </p>

      <h2>Cookies</h2>
      <p>
        We use a small number of cookies and similar technologies that are necessary for the site
        to function. Where required, we will ask for your consent before using non-essential
        cookies.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise the date at the top
        of this page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> or use our{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </LegalPage>
  );
}
