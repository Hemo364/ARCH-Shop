import { FiCreditCard, FiShield, FiTool, FiTruck } from "react-icons/fi";
import type { IconType } from "react-icons";

export interface Feature {
  icon: IconType;
  title: string;
  desc: string;
}

export const FEATURES: Feature[] = [
  { icon: FiCreditCard, title: "فروش اقساطی", desc: "با پیش‌پرداخت ۳۰٪ و اقساط ۱۸ ماهه موتور رویایی‌ات را بخر" },
  { icon: FiShield, title: "گارانتی اصالت", desc: "تمام محصولات دارای مدارک کامل و کارشناسی معتبر هستند" },
  { icon: FiTool, title: "سرویس پس از فروش", desc: "خدمات نگهداری و تعمیر توسط تکنسین‌های مجرب" },
  { icon: FiTruck, title: "ارسال به سراسر ایران", desc: "ارسال با بیمه کامل به تمام شهرهای کشور" },
];
