import { useState } from "react";
import { FiMenu, FiPhoneCall, FiX } from "react-icons/fi";
import { useSiteData } from "../../context/siteData";
import { NAV_LINKS } from "../../data/navigation";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { brand, contact } = useSiteData().content;
  const ctaHref = contact.phones[0] ? `tel:${contact.phones[0]}` : "#contact";

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b" style={{ borderColor: "var(--border)", background: "rgba(10,10,15,0.95)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-3">
          <img className="size-10 rounded-full" src={brand.logo} alt={brand.logoAlt} />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-base tracking-wide" style={{ letterSpacing: "0.05em" }}>{brand.storeName}</span>
            <span className="text-xs mt-0.5" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.1em" }}>{brand.tagline}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={ctaHref}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-85"
          style={{ background: "var(--primary)", color: "#fff", borderRadius: "var(--radius)" }}
        >
          <FiPhoneCall className="text-base" />
          <span>{brand.ctaLabel}</span>
        </a>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="منو">
          {mobileOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.6)" }}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-4/5 max-w-xs md:hidden flex flex-col gap-2 px-6 py-6 border-r transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* <img className="size-9 rounded-full" src={logo} alt="لوگوی فروشگاه RCH" /> */}
            <span className="font-bold text-sm">{brand.storeName}</span>
          </div>
          <button className="p-2" onClick={() => setMobileOpen(false)} aria-label="بستن منو">
            <FiX className="text-2xl" />
          </button>
        </div>

        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setMobileOpen(false)}
            className="text-base font-semibold py-3 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            {l.label}
          </a>
        ))}

        <a
          href={ctaHref}
          onClick={() => setMobileOpen(false)}
          className="flex items-center justify-center gap-2 px-5 py-3 mt-4 text-sm font-semibold"
          style={{ background: "var(--primary)", color: "#fff", borderRadius: "var(--radius)" }}
        >
          <FiPhoneCall className="text-base" />
          <span>{brand.ctaLabel}</span>
        </a>
      </div>
    </>
  );
}
