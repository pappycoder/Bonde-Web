export type NavItem = {
  title: string;
  href: string;
};

/** Primary marketing navigation, shared by the header and footer. */
export const navItems: NavItem[] = [
  { title: "Features", href: "/features" },
  { title: "How it works", href: "/how-it-works" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export type LegalItem = NavItem;

export const legalItems: LegalItem[] = [
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
];
