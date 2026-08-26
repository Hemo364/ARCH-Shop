import { useState } from "react";
import { FiMenu, FiPhoneCall, FiX } from "react-icons/fi";
import logo from "../../assets/logo.jpg";
import { NAV_LINKS } from "../../data/contact";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b" style={{ borderColor: "var(--border)", background: "rgba(10,10,15,0.95)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-3">
          <img className="size-10 rounded-full" src={logo} alt="لوگوی فروشگاه RCH" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-base tracking-wide" style={{ letterSpacing: "0.05em" }}>فروشگاه موتورسیکلت</span>
            <span className="text-xs mt-0.5" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.1em" }}>RCH · کرج</span>
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
          href="tel:02634000000"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-85"
          style={{ background: "var(--primary)", color: "#fff", borderRadius: "var(--radius)" }}
        >
          <FiPhoneCall className="text-base" />
          <span>مشاوره رایگان</span>
        </a>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="منو">
          {mobileOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7" style={{ background: "var(--background)" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="text-3xl font-bold">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
