export type NavItem = {
  title: string;
  href: string;
};

/** Primary marketing navigation, shared by the header and footer. */
export const navItems: NavItem[] = [
  { title: "Contact", href: "/contact" },
];

export type LegalItem = NavItem;

export const legalItems: LegalItem[] = [
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
];
