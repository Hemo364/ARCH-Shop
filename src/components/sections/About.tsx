const ABOUT_STATS = [
  { v: "+۵۰۰", l: "فروش موفق" },
  { v: "۷ روز", l: "خدمات هفتگی" },
  { v: "۱۰۰٪", l: "رضایت مشتری" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden bg-zinc-900" style={{ borderRadius: "6px" }}>
            <img
              src="https://images.unsplash.com/photo-1676018367595-92ce3e0e3972?w=800&h=1000&fit=crop&auto=format"
              alt="تکنسین مجرب در حال کار روی موتورسیکلت"
              className="w-full h-full object-cover opacity-75"
            />
          </div>
          <div
            className="absolute -top-4 -right-4 px-6 py-4"
            style={{ background: "var(--primary)", color: "#fff", borderRadius: "4px" }}
          >
            <div className="text-3xl font-black leading-none">+۸</div>
            <div className="text-xs mt-1 font-medium">سال تجربه</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium mb-4 uppercase tracking-widest" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.3em" }}>فروشگاه RCH</div>
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            متخصص فروش<br />
            <span style={{ color: "var(--primary)" }}>موتورسیکلت</span><br />
            در کرج
          </h2>
          <div className="space-y-4 text-sm leading-loose font-light" style={{ color: "var(--muted-foreground)" }}>
            <p>فروشگاه موتورسیکلت RCH با بیش از ۸ سال سابقه فعالیت در کرج، یکی از معتبرترین مراکز فروش موتورسیکلت‌های اسپرت و آدونچر در استان البرز است.</p>
            <p>ما با ارائه محصولات اصل، قیمت‌گذاری شفاف و خدمات پس از فروش حرفه‌ای، اعتماد بیش از ۵۰۰ مشتری را کسب کرده‌ایم. هر موتوری که از ما می‌خرید با ضمانت اصالت و کارشناسی معتبر همراه است.</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {ABOUT_STATS.map((s) => (
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
