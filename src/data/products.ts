export interface Product {
  id: number;
  name: string;
  category: string;
  badge: string;
  badgeType: "available" | "presale";
  cashPrice: string;
  installment: string;
  installmentMonths: number;
  engine: string;
  power: string;
  topSpeed: string;
  img: string;
  alt: string;
  new: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "هوندا CBR 600RR",
    category: "اسپرت",
    badge: "موجود",
    badgeType: "available",
    cashPrice: "۱,۸۵۰,۰۰۰,۰۰۰",
    installment: "۱۲۰,۰۰۰,۰۰۰",
    installmentMonths: 18,
    engine: "۵۹۹cc",
    power: "۱۲۱ اسب",
    topSpeed: "۲۵۵ کیلومتر",
    img: "https://images.unsplash.com/photo-1785615170406-fba3182ee783?w=600&h=400&fit=crop&auto=format",
    alt: "Red sport motorcycle in showroom",
    new: true,
  },
  {
    id: 2,
    name: "داکاتی پانیگاله V2",
    category: "سوپراسپرت",
    badge: "موجود",
    badgeType: "available",
    cashPrice: "۴,۲۰۰,۰۰۰,۰۰۰",
    installment: "۲۸۰,۰۰۰,۰۰۰",
    installmentMonths: 18,
    engine: "۹۵۵cc",
    power: "۱۵۵ اسب",
    topSpeed: "۲۷۰ کیلومتر",
    img: "https://images.unsplash.com/photo-1785615167818-e2cb3817ec5c?w=600&h=400&fit=crop&auto=format",
    alt: "Red Ducati Panigale motorcycle",
    new: true,
  },
  {
    id: 3,
    name: "تریومف تایگر ۹۰۰",
    category: "آدونچر",
    badge: "موجود",
    badgeType: "available",
    cashPrice: "۳,۱۰۰,۰۰۰,۰۰۰",
    installment: "۲۱۰,۰۰۰,۰۰۰",
    installmentMonths: 18,
    engine: "۸۸۸cc",
    power: "۹۴ اسب",
    topSpeed: "۲۲۰ کیلومتر",
    img: "https://images.unsplash.com/photo-1783449494695-afbde8611fdf?w=600&h=400&fit=crop&auto=format",
    alt: "Triumph motorcycle parked outdoors",
    new: false,
  },
  {
    id: 4,
    name: "هوندا CBR 1000RR",
    category: "سوپرباک",
    badge: "پیش‌فروش",
    badgeType: "presale",
    cashPrice: "۵,۶۰۰,۰۰۰,۰۰۰",
    installment: "۳۷۰,۰۰۰,۰۰۰",
    installmentMonths: 18,
    engine: "۹۹۹cc",
    power: "۲۱۴ اسب",
    topSpeed: "۲۹۹ کیلومتر",
    img: "https://images.unsplash.com/photo-1773940792913-94baf5fa0130?w=600&h=400&fit=crop&auto=format",
    alt: "Red sport motorcycle on display mat",
    new: true,
  },
  {
    id: 5,
    name: "کاوازاکی Z900",
    category: "نیکد",
    badge: "موجود",
    badgeType: "available",
    cashPrice: "۲,۴۵۰,۰۰۰,۰۰۰",
    installment: "۱۶۵,۰۰۰,۰۰۰",
    installmentMonths: 18,
    engine: "۹۴۸cc",
    power: "۱۲۵ اسب",
    topSpeed: "۲۵۰ کیلومتر",
    img: "https://images.unsplash.com/photo-1769539228472-2fc9eea190e8?w=600&h=400&fit=crop&auto=format",
    alt: "Close-up of sport motorcycle front",
    new: false,
  },
  {
    id: 6,
    name: "بی‌ام‌و R1250GS",
    category: "آدونچر",
    badge: "موجود",
    badgeType: "available",
    cashPrice: "۶,۸۰۰,۰۰۰,۰۰۰",
    installment: "۴۵۰,۰۰۰,۰۰۰",
    installmentMonths: 18,
    engine: "۱,۲۵۴cc",
    power: "۱۳۶ اسب",
    topSpeed: "۲۲۰ کیلومتر",
    img: "https://images.unsplash.com/photo-1770923898142-cffac04c2691?w=600&h=400&fit=crop&auto=format",
    alt: "White adventure motorcycle in showroom",
    new: false,
  },
];

export const CATEGORIES = ["همه", "اسپرت", "سوپراسپرت", "سوپرباک", "نیکد", "آدونچر"];
