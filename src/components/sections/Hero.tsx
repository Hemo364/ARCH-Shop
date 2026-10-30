import { useSiteData } from "../../context/siteData";

export default function Hero() {
  const { hero } = useSiteData().content;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,15,0.95) 40%, rgba(10,10,15,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0a0f 25%, transparent 70%)" }} />
      </div>

      <div className="relative flex flex-col items-center z-10 px-6 md:px-16 pb-16 md:pb-28 max-w-10xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 mt-3 text-xs font-medium" style={{ background: "rgba(230,50,0,0.15)", border: "1px solid rgba(230,50,0,0.4)", color: "var(--primary)", borderRadius: "999px" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--primary)" }} />
          {hero.pill}
        </div>

        <h1 className="text-5xl  md:text-8xl font-black leading-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
          {hero.titleMain}
          <span style={{ color: "var(--primary)" }}>{hero.titleAccent}</span><br />
          <span className="text-3xl md:text-5xl font-light" style={{ color: "var(--muted-foreground)" }}>{hero.subtitle}</span>
        </h1>

        <p className="text-base md:text-lg font-light mb-10 max-w-xl" style={{ color: "var(--muted-foreground)", lineHeight: 2 }}>
          {hero.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#products"
            className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity duration-200 hover:opacity-85"
            style={{ background: "var(--primary)", color: "#fff", borderRadius: "4px" }}
          >
            {hero.primaryCta}
          </a>
          <a
            href="#installment"
            className="px-8 py-4 text-sm font-bold tracking-wide transition-colors duration-200"
            style={{ border: "1px solid var(--border)", color: "var(--foreground)", borderRadius: "4px" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 border-t" style={{ borderColor: "var(--border)" }}>
        {hero.stats.map((s) => (
          <div key={s.l} className="px-6 py-6 text-center" style={{ background: "var(--card)", borderLeft: "1px solid var(--border)" }}>
            <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: "var(--primary)", fontFamily: "Vazirmatn" }}>{s.v}</div>
            <div className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
