import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import ContactLinkCard from "../contact/ContactLinkCard";
import { useSiteData } from "../../context/siteData";
import { toPersianDigits } from "../../lib/format";

export default function Contact() {
  const { contact } = useSiteData().content;

  const infoItems = [
    { icon: FiMapPin, label: "آدرس", value: contact.address },
    { icon: FiClock, label: "ساعت کاری", value: contact.workingHours },
    { icon: FaInstagram, label: "اینستاگرام", value: contact.instagram },
  ];

  return (
    <section id="contact" className="py-24 px-6 md:px-12" style={{ background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <div className="text-xs font-medium mb-4 uppercase tracking-widest" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.3em" }}>{contact.eyebrow}</div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
            {contact.titleMain}<br />
            <span style={{ color: "var(--primary)" }}>{contact.titleAccent}</span>
          </h2>
          <p className="text-sm leading-loose font-light mb-10" style={{ color: "var(--muted-foreground)" }}>
            {contact.intro}
          </p>
          <div className="space-y-5">
            {infoItems.map((c) => (
              <div key={c.label} className="flex gap-4 text-sm">
                <span className="text-lg" style={{ color: "var(--primary)" }}>
                  <c.icon />
                </span>
                <div>
                  <div className="font-semibold mb-0.5">{c.label}</div>
                  <div className="font-light" style={{ color: "var(--muted-foreground)" }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8" style={{ background: "var(--secondary)", border: "1px solid var(--border)", borderRadius: "6px" }}>
          <h3 className="text-2xl font-bold mb-6">{contact.quickTitle}</h3>
          <div className="space-y-4">
            {contact.phones.map((phone) => (
              <ContactLinkCard
                key={phone}
                icon={FiPhone}
                label="تماس با ما"
                value={toPersianDigits(phone)}
                href={`tel:${phone}`}
              />
            ))}
            <ContactLinkCard
              icon={FaInstagram}
              label="پیج اینستاگرام"
              value={contact.instagram}
              href={`https://instagram.com/${contact.instagram}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
