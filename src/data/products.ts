import image1 from "../assets/image_1.jpg";
import image2 from "../assets/image_2.jpg";
import image3 from "../assets/image_3.jpg";
import image4 from "../assets/image_4.jpg";
import image5 from "../assets/image_5.jpg";
import image6 from "../assets/image_6.jpg";

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
    img: image1,
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
    img: image2,
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
    img: image3,
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
    img: image4,
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
    img: image5,
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
    img: image6,
    alt: "White adventure motorcycle in showroom",
    new: false,
  },
];

export const CATEGORIES = ["همه", "اسپرت", "سوپراسپرت", "سوپرباک", "نیکد", "آدونچر"];
