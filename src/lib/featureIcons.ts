import type { IconType } from "react-icons";
import { FiAward, FiCheckCircle, FiClock, FiCreditCard, FiHeadphones, FiShield, FiStar, FiTool, FiTruck } from "react-icons/fi";

export const FEATURE_ICONS: Record<string, { icon: IconType; label: string }> = {
  "credit-card": { icon: FiCreditCard, label: "کارت اعتباری" },
  shield: { icon: FiShield, label: "سپر" },
  tool: { icon: FiTool, label: "آچار" },
  truck: { icon: FiTruck, label: "کامیون" },
  award: { icon: FiAward, label: "مدال" },
  check: { icon: FiCheckCircle, label: "تیک" },
  clock: { icon: FiClock, label: "ساعت" },
  headphones: { icon: FiHeadphones, label: "پشتیبانی" },
  star: { icon: FiStar, label: "ستاره" },
};

export function featureIcon(name: string): IconType {
  return FEATURE_ICONS[name]?.icon ?? FiStar;
}
