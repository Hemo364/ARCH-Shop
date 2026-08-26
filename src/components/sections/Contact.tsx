import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import ContactLinkCard from "../contact/ContactLinkCard";
import { ADDRESS, INSTAGRAM, PHONES, WORKING_HOURS } from "../../data/contact";

const INFO_ITEMS = [
  { icon: FiMapPin, label: "آدرس", value: ADDRESS },
  { icon: FiClock, label: "ساعت کاری", value: WORKING_HOURS },
  { icon: FaInstagram, label: "اینستاگرام", value: INSTAGRAM.handle },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12" style={{ background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <div className="text-xs font-medium mb-4 uppercase tracking-widest" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.3em" }}>ارتباط با ما</div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
            مشاوره رایگان<br />
            <span style={{ color: "var(--primary)" }}>بگیر</span>
          </h2>
          <p className="text-sm leading-loose font-light mb-10" style={{ color: "var(--muted-foreground)" }}>
            با کارشناسان فروش ما تماس بگیرید. راهنمایی رایگان درباره انتخاب موتور، قیمت‌ها و شرایط اقساط دریافت کنید.
          </p>
          <div className="space-y-5">
            {INFO_ITEMS.map((c) => (
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
          <h3 className="text-2xl font-bold mb-6">راه‌های ارتباطی سریع</h3>
          <div className="space-y-4">
            {PHONES.map((phone) => (
              <ContactLinkCard
                key={phone.value}
                icon={FiPhone}
                label="تماس با ما"
                value={phone.display}
                href={`tel:${phone.value}`}
              />
            ))}
            <ContactLinkCard
              icon={FaInstagram}
              label="پیج اینستاگرام"
              value={INSTAGRAM.handle}
              href={INSTAGRAM.url}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
