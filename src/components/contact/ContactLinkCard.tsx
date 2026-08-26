import type { IconType } from "react-icons";

interface ContactLinkCardProps {
  icon: IconType;
  label: string;
  value: string;
  href: string;
}

export default function ContactLinkCard({ icon: Icon, label, value, href }: ContactLinkCardProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="flex items-center gap-4 p-4 transition-colors duration-200"
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "4px" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <span
        className="w-11 h-11 flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: "rgba(230,50,0,0.15)", color: "var(--primary)", borderRadius: "4px" }}
      >
        <Icon />
      </span>
      <div>
        <div className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>{label}</div>
        <div className="text-sm font-bold" dir="ltr" style={{ textAlign: "right" }}>{value}</div>
      </div>
    </a>
  );
}
