import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiExternalLink, FiPlus } from "react-icons/fi";
import type { Product } from "../../data/types";
import { fetchProducts } from "../../lib/api";
import { formatPrice, toPersianDigits } from "../../lib/format";
import { buttonClass } from "../components/buttonClass";
import { Card, EmptyState, ErrorState, PageHeader, Skeleton } from "../components/ui";
import { errorMessage } from "../errors";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchProducts().then(
      (list) => {
        if (cancelled) return;
        setProducts(list);
        setError(null);
      },
      (err) => {
        if (!cancelled) setError(errorMessage(err));
      },
    );
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const actions = (
    <div className="flex flex-wrap gap-3">
      <a href="/" target="_blank" rel="noreferrer" className={buttonClass()}><FiExternalLink /> مشاهده سایت</a>
      <Link to="/admin/products/new" className={buttonClass("primary")}><FiPlus /> افزودن محصول</Link>
    </div>
  );

  if (error) return <ErrorState message={error} onRetry={() => setAttempt((a) => a + 1)} />;

  const stats = products && [
    { label: "کل محصولات", value: products.length },
    { label: "منتشرشده", value: products.filter((p) => p.isPublished).length },
    { label: "پیش‌نویس", value: products.filter((p) => !p.isPublished).length },
    { label: "پیش‌فروش", value: products.filter((p) => p.status === "presale").length },
  ];

  const recent = products && [...products].sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "")).slice(0, 5);

  return (
    <>
      <PageHeader title="داشبورد" description="خلاصه‌ی وضعیت فروشگاه" actions={actions} />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats
          ? stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-card p-5">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="mt-2 text-3xl font-black">{toPersianDigits(s.value)}</div>
              </div>
            ))
          : Array.from({ length: 4 }, (_, i) => <Skeleton key={i} />)}
      </div>

      <Card title="آخرین ویرایش‌ها">
        {!recent ? (
          <Skeleton className="h-48" />
        ) : recent.length === 0 ? (
          <EmptyState title="هنوز محصولی ثبت نشده است" />
        ) : (
          <div className="divide-y divide-border">
            {recent.map((p) => (
              <Link key={p.id} to={`/admin/products/${p.id}`} className="flex items-center gap-4 py-3 transition hover:opacity-75">
                <img src={p.img} alt="" className="h-12 w-16 shrink-0 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{formatPrice(p.cashPrice)} تومان</div>
                </div>
                {p.updatedAt && <span className="hidden text-xs text-muted-foreground sm:block">{new Date(p.updatedAt).toLocaleDateString("fa-IR")}</span>}
              </Link>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
