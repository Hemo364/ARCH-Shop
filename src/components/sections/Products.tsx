import { useState } from "react";
import ProductCard from "../products/ProductCard";
import { CATEGORIES, PRODUCTS } from "../../data/products";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [activeTab, setActiveTab] = useState<"cash" | "install">("cash");

  const filtered = activeCategory === "همه"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-medium mb-3 tracking-widest uppercase" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.3em" }}>موجودی نمایشگاه</div>
          <h2 className="text-4xl md:text-6xl font-black leading-tight">محصولات ما</h2>
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
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className="px-4 py-2 text-sm font-medium transition-all duration-200"
            style={{
              borderRadius: "999px",
              border: "1px solid",
              borderColor: activeCategory === c ? "var(--primary)" : "var(--border)",
              background: activeCategory === c ? "var(--primary)" : "transparent",
              color: activeCategory === c ? "#fff" : "var(--muted-foreground)",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} activeTab={activeTab} />
        ))}
      </div>
    </section>
  );
}
