export type NavItem = {
  title: string;
  href: string;
};

export type LegalItem = NavItem;

export const legalItems: LegalItem[] = [
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
];
