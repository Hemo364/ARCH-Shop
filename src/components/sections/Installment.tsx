import { FiCheck } from "react-icons/fi";

const STEPS = [
  { step: "۱", title: "انتخاب موتور", desc: "از بین موجودی نمایشگاه موتور مورد نظر خود را انتخاب کنید و با کارشناسان ما مشورت بگیرید." },
  { step: "۲", title: "پیش‌پرداخت ۳۰٪", desc: "۳۰٪ مبلغ را به عنوان پیش‌پرداخت پرداخت کرده و مدارک هویتی خود را ارائه دهید." },
  { step: "۳", title: "تحویل و اقساط", desc: "موتور را تحویل بگیرید. اقساط ماهانه بدون بهره به مدت ۱۸ ماه پرداخت می‌شود." },
];

const REQUIRED_DOCS = [
  "کارت ملی و شناسنامه اصل",
  "گواهینامه معتبر موتورسیکلت",
  "سند مالکیت ملک یا اجاره‌نامه",
  "ضمانتنامه معتبر (اختیاری)",
  "عکس پرسنلی ۳x۴",
  "فرم تکمیل‌شده درخواست",
];

export default function Installment() {
  return (
    <section id="installment" className="py-24 px-6 md:px-12" style={{ background: "var(--secondary)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs font-medium mb-3 uppercase tracking-widest" style={{ color: "var(--primary)", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.3em" }}>بدون بهره · بدون ضامن</div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">شرایط فروش اقساطی</h2>
          <p className="text-base font-light max-w-xl mx-auto" style={{ color: "var(--muted-foreground)", lineHeight: 2 }}>
            با ۳۰٪ پیش‌پرداخت، موتور دلخواه خود را تحویل بگیرید و الباقی را در ۱۸ قسط ماهانه بدون بهره پرداخت کنید.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {STEPS.map((s) => (
            <div key={s.step} className="relative p-8" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "6px" }}>
              <div className="text-6xl font-black mb-4 leading-none" style={{ color: "var(--border)", fontFamily: "Barlow Condensed, sans-serif" }}>{s.step}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 md:p-10" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "6px" }}>
          <h3 className="text-2xl font-bold mb-6">شرایط و مدارک لازم</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {REQUIRED_DOCS.map((item) => (
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
              درخواست مشاوره اقساط
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
