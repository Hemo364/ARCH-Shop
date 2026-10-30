import { FiCheck } from "react-icons/fi";
import { useSiteData } from "../../context/siteData";
import { toPersianDigits } from "../../lib/format";

export default function Installment() {
  const { installment } = useSiteData().content;

  return (
    <section id="installment" className="py-24 px-6 md:px-12" style={{ background: "var(--secondary)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs font-medium mb-3 uppercase tracking-widest" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.3em" }}>{installment.eyebrow}</div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">{installment.title}</h2>
          <p className="text-base font-light max-w-xl mx-auto" style={{ color: "var(--muted-foreground)", lineHeight: 2 }}>
            {installment.intro}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {installment.steps.map((s, i) => (
            <div key={i} className="relative p-8" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "6px" }}>
              <div className="text-6xl font-black mb-4 leading-none" style={{ color: "var(--border)", fontFamily: "Barlow Condensed, sans-serif" }}>{toPersianDigits(i + 1)}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 md:p-10" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "6px" }}>
          <h3 className="text-2xl font-bold mb-6">{installment.docsTitle}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {installment.docs.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs" style={{ background: "rgba(230,50,0,0.15)", color: "var(--primary)" }}>
                  <FiCheck />
                </span>
                <span style={{ color: "var(--muted-foreground)", fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold transition-opacity duration-200 hover:opacity-85"
              style={{ background: "var(--primary)", color: "#fff", borderRadius: "4px" }}
            >
              {installment.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
