import { useSiteData } from "../../context/siteData";

export default function About() {
  const { about } = useSiteData().content;

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden bg-zinc-900" style={{ borderRadius: "6px" }}>
            <img
              src={about.image}
              alt={about.imageAlt}
              className="w-full h-full object-cover opacity-75"
            />
          </div>
          <div
            className="absolute -top-4 -right-4 px-6 py-4"
            style={{ background: "var(--primary)", color: "#fff", borderRadius: "4px" }}
          >
            <div className="text-3xl font-black leading-none">{about.badgeValue}</div>
            <div className="text-xs mt-1 font-medium">{about.badgeLabel}</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium mb-4 uppercase tracking-widest" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.3em" }}>{about.eyebrow}</div>
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            {about.titleLine1}<br />
            <span style={{ color: "var(--primary)" }}>{about.titleAccent}</span><br />
            {about.titleLine3}
          </h2>
          <div className="space-y-4 text-sm leading-loose font-light" style={{ color: "var(--muted-foreground)" }}>
            {about.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {about.stats.map((s) => (
              <div key={s.l} className="text-center p-4" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "4px" }}>
                <div className="text-2xl font-black mb-1" style={{ color: "var(--primary)" }}>{s.v}</div>
                <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
