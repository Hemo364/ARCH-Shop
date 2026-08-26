import type { Product } from "../../data/products";

interface ProductCardProps {
  product: Product;
  activeTab: "cash" | "install";
}

export default function ProductCard({ product: p, activeTab }: ProductCardProps) {
  return (
    <div
      className="group overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "6px" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(230,50,0,0.4)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div className="relative overflow-hidden aspect-video bg-zinc-900">
        <img
          src={p.img}
          alt={p.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {p.new && (
            <span className="px-2.5 py-1 text-xs font-bold" style={{ background: "var(--primary)", color: "#fff", borderRadius: "3px" }}>جدید</span>
          )}
          <span
            className="px-2.5 py-1 text-xs font-bold"
            style={{
              background: p.badgeType === "available" ? "rgba(0,200,100,0.15)" : "rgba(255,200,0,0.15)",
              color: p.badgeType === "available" ? "#00c864" : "#ffc800",
              border: `1px solid ${p.badgeType === "available" ? "rgba(0,200,100,0.3)" : "rgba(255,200,0,0.3)"}`,
              borderRadius: "3px",
            }}
          >
            {p.badge}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 text-xs font-medium" style={{ background: "rgba(10,10,15,0.8)", color: "var(--muted-foreground)", borderRadius: "3px" }}>{p.category}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-4 leading-snug">{p.name}</h3>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: "موتور", value: p.engine },
            { label: "قدرت", value: p.power },
            { label: "سرعت", value: p.topSpeed },
          ].map((spec) => (
            <div key={spec.label} className="text-center p-2" style={{ background: "var(--secondary)", borderRadius: "4px" }}>
              <div className="text-xs font-bold mb-1">{spec.value}</div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{spec.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-5 p-4" style={{ background: "var(--secondary)", borderRadius: "4px" }}>
          {activeTab === "cash" ? (
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>قیمت نقد</div>
              <div className="text-lg font-black" style={{ color: "var(--primary)" }}>{p.cashPrice} <span className="text-sm font-normal">تومان</span></div>
            </div>
          ) : (
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>اقساط ماهیانه ({p.installmentMonths} ماهه)</div>
              <div className="text-lg font-black" style={{ color: "var(--primary)" }}>{p.installment} <span className="text-sm font-normal">تومان/ماه</span></div>
              <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>پیش‌پرداخت: ۳۰٪ · بدون بهره</div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <a
            href="#contact"
            className="flex-1 py-3 text-center text-sm font-bold transition-opacity duration-200 hover:opacity-85"
            style={{ background: "var(--primary)", color: "#fff", borderRadius: "4px" }}
          >
            خرید / استعلام
          </a>
          <a
            href="#contact"
            className="px-4 py-3 text-sm font-bold transition-colors duration-200"
            style={{ border: "1px solid var(--border)", color: "var(--foreground)", borderRadius: "4px" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            مشاوره
          </a>
        </div>
      </div>
    </div>
  );
}
