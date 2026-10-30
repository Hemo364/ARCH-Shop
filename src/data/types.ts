export type ProductStatus = "available" | "presale";

export const STATUS_LABELS: Record<ProductStatus, string> = {
  available: "موجود",
  presale: "پیش‌فروش",
};

export interface Category {
  id: string;
  name: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  status: ProductStatus;
  cashPrice: number;
  installmentAmount: number;
  installmentMonths: number;
  engine: string;
  power: string;
  topSpeed: string;
  img: string;
  alt: string;
  isNew: boolean;
  isPublished: boolean;
  sortOrder: number;
  updatedAt?: string;
}

export interface Stat {
  v: string;
  l: string;
}

export interface SiteContent {
  brand: {
    storeName: string;
    fullName: string;
    tagline: string;
    location: string;
    logo: string;
    logoAlt: string;
    ctaLabel: string;
  };
  hero: {
    pill: string;
    titleMain: string;
    titleAccent: string;
    subtitle: string;
    description: string;
    image: string;
    imageAlt: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Stat[];
  };
  features: {
    items: { icon: string; title: string; desc: string }[];
  };
  catalog: {
    eyebrow: string;
    title: string;
    newLabel: string;
    depositNote: string;
    buyLabel: string;
    consultLabel: string;
  };
  installment: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { title: string; desc: string }[];
    docsTitle: string;
    docs: string[];
    cta: string;
  };
  about: {
    image: string;
    imageAlt: string;
    badgeValue: string;
    badgeLabel: string;
    eyebrow: string;
    titleLine1: string;
    titleAccent: string;
    titleLine3: string;
    paragraphs: string[];
    stats: Stat[];
  };
  contact: {
    eyebrow: string;
    titleMain: string;
    titleAccent: string;
    intro: string;
    quickTitle: string;
    phones: string[];
    instagram: string;
    address: string;
    workingHours: string;
  };
  footer: {
    blurb: string;
    linksTitle: string;
    contactTitle: string;
    copyright: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export type ContentKey = keyof SiteContent;
