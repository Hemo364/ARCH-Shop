import { useSiteData } from "../../context/siteData";
import { featureIcon } from "../../lib/featureIcons";

export default function Features() {
  const { features } = useSiteData().content;

  return (
    <section className="py-16 px-6 md:px-12" style={{ background: "var(--secondary)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.items.map((f) => {
          const Icon = featureIcon(f.icon);
          return (
            <div
              key={f.title}
              className="flex flex-col items-center text-center gap-3 p-6 transition-colors duration-200"
              style={{ borderRadius: "4px" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--card)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Icon className="text-3xl" style={{ color: "var(--primary)" }} />
              <span className="font-bold text-sm">{f.title}</span>
              <span className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{f.desc}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
