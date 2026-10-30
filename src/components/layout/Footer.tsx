import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";
import { FaHeart, FaInstagram } from "react-icons/fa";
import { useSiteData } from "../../context/siteData";
import { NAV_LINKS } from "../../data/navigation";

export default function Footer() {
  const { brand, contact, footer } = useSiteData().content;

  return (
    <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
      <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img className="size-10" src={brand.logo} alt={brand.logoAlt} />
              <div>
                <div className="font-bold text-sm">{brand.fullName}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{brand.location}</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed font-light" style={{ color: "var(--muted-foreground)" }}>
              {footer.blurb}
            </p>
          </div>

          <div>
            <div className="font-bold text-sm mb-4">{footer.linksTitle}</div>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-xs transition-colors duration-200"
                  style={{ color: "var(--muted-foreground)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-bold text-sm mb-4">{footer.contactTitle}</div>
            <div className="space-y-2 text-xs font-light" style={{ color: "var(--muted-foreground)" }}>
              {contact.phones[0] && <div className="flex items-center gap-2"><FiPhone /> {contact.phones[0]}</div>}
              <div className="flex items-center gap-2"><FiMapPin /> {contact.address}</div>
              <div className="flex items-center gap-2"><FiClock /> {contact.workingHours}</div>
              <div className="flex items-center gap-2"><FaInstagram /> {contact.instagram}</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{footer.copyright}</p>
          <a
            href="https://portfolio-six-mu-af96puf9ak.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
          >
            <span>ساخته شده توسط</span>
            <span className="font-semibold" dir="ltr">Hemo364</span>
            <FaHeart style={{ color: "var(--primary)" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
