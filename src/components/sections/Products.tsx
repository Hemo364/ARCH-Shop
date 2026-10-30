import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { useSiteData } from "../../context/siteData";

const ALL = "all";

export default function Products() {
  const { products, categories, content, loadingProducts } = useSiteData();
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [activeTab, setActiveTab] = useState<"cash" | "install">("cash");

  const filtered = activeCategory === ALL
    ? products
    : products.filter((p) => p.categoryId === activeCategory);

  const chips = [{ id: ALL, name: "همه" }, ...categories];

  return (
    <section id="products" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-medium mb-3 tracking-widest uppercase" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.3em" }}>{content.catalog.eyebrow}</div>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">{content.catalog.title}</h2>
        </div>
        <div className="flex items-center gap-1 p-1" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "6px" }}>
          {(["cash", "install"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                borderRadius: "4px",
                background: activeTab === tab ? "var(--primary)" : "transparent",
                color: activeTab === tab ? "#fff" : "var(--muted-foreground)",
              }}
            >
              {tab === "cash" ? "نقد" : "اقساط"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {chips.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className="px-4 py-2 text-sm font-medium transition-all duration-200"
            style={{
              borderRadius: "999px",
              border: "1px solid",
              borderColor: activeCategory === c.id ? "var(--primary)" : "var(--border)",
              background: activeCategory === c.id ? "var(--primary)" : "transparent",
              color: activeCategory === c.id ? "#fff" : "var(--muted-foreground)",
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingProducts
          ? Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="animate-pulse" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "6px", height: "480px" }} />
            ))
          : filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                categoryName={categories.find((c) => c.id === p.categoryId)?.name ?? ""}
                activeTab={activeTab}
              />
            ))}
      </div>

      {!loadingProducts && filtered.length === 0 && (
        <p className="text-center text-sm py-16" style={{ color: "var(--muted-foreground)" }}>محصولی در این دسته موجود نیست.</p>
      )}
    </section>
  );
}
