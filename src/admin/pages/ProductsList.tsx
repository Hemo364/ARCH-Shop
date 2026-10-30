import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowDown, FiArrowUp, FiCopy, FiEdit2, FiEye, FiEyeOff, FiPlus, FiTrash2 } from "react-icons/fi";
import { STATUS_LABELS, type Category, type Product } from "../../data/types";
import { createProduct, deleteProduct, fetchCategories, fetchProducts, updateProduct } from "../../lib/api";
import { formatPrice, toLatinDigits, toPersianDigits } from "../../lib/format";
import { buttonClass } from "../components/buttonClass";
import { ConfirmDialog, EmptyState, ErrorState, IconButton, Input, PageHeader, PriceInput, Select, Skeleton } from "../components/ui";
import { useToast } from "../context";
import { errorMessage } from "../errors";

function InlinePrice({ value, onSave }: { value: number; onSave: (price: number) => Promise<void> }) {
  const [draft, setDraft] = useState<number | null>(null);

  if (draft === null) {
    return (
      <button title="ویرایش سریع قیمت" className="text-right text-sm font-bold text-primary cursor-pointer hover:underline" onClick={() => setDraft(value)}>
        {formatPrice(value)} <span className="text-xs font-normal">تومان</span>
      </button>
    );
  }

  const commit = async () => {
    const next = draft;
    setDraft(null);
    if (next !== value && next > 0) await onSave(next);
  };

  return (
    <PriceInput
      autoFocus
      value={draft}
      onChange={setDraft}
      onBlur={() => void commit()}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
        if (e.key === "Escape") setDraft(null);
      }}
    />
  );
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const load = useCallback(async () => {
    try {
      const [p, c] = await Promise.all([fetchProducts(), fetchCategories()]);
      setProducts(p);
      setCategories(c);
      setError(null);
    } catch (err) {
      setError(errorMessage(err));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchProducts(), fetchCategories()]).then(
      ([p, c]) => {
        if (cancelled) return;
        setProducts(p);
        setCategories(c);
      },
      (err) => {
        if (!cancelled) setError(errorMessage(err));
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const run = async (action: () => Promise<void>, success?: string) => {
    setBusy(true);
    try {
      await action();
      if (success) toast(success);
    } catch (err) {
      toast(errorMessage(err), "error");
    } finally {
      await load();
      setBusy(false);
    }
  };

  if (error) return <ErrorState message={error} onRetry={() => void load()} />;

  const term = toLatinDigits(search.trim()).toLowerCase();
  const filtered = (products ?? []).filter((p) => {
    if (term && !toLatinDigits(p.name).toLowerCase().includes(term)) return false;
    if (categoryFilter && p.categoryId !== categoryFilter) return false;
    if (statusFilter === "draft") return !p.isPublished;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });
  const isFiltered = Boolean(term || categoryFilter || statusFilter);

  const move = (index: number, to: number) => {
    if (!products) return;
    const next = [...products];
    next.splice(to, 0, next.splice(index, 1)[0]);
    void run(async () => {
      await Promise.all(
        next.map((p, i) => (p.sortOrder === i ? null : updateProduct(p.id, { sortOrder: i }))),
      );
    });
  };

  const duplicate = (p: Product) =>
    run(async () => {
      const sortOrder = Math.max(0, ...(products ?? []).map((x) => x.sortOrder)) + 1;
      await createProduct({ ...p, name: `${p.name} (کپی)`, isPublished: false, sortOrder });
    }, "کپی محصول به صورت پیش‌نویس ساخته شد.");

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    await run(() => deleteProduct(toDelete), "محصول حذف شد.");
    setDeleting(false);
    setToDelete(null);
  };

  return (
    <>
      <PageHeader
        title="محصولات"
        description={products ? `${toPersianDigits(products.length)} محصول` : undefined}
        actions={<Link to="/admin/products/new" className={buttonClass("primary")}><FiPlus /> افزودن محصول</Link>}
      />

      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_200px_200px]">
        <Input placeholder="جستجوی نام محصول…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select aria-label="فیلتر دسته" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">همه‌ی دسته‌ها</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <Select aria-label="فیلتر وضعیت" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">همه‌ی وضعیت‌ها</option>
          <option value="available">{STATUS_LABELS.available}</option>
          <option value="presale">{STATUS_LABELS.presale}</option>
          <option value="draft">پیش‌نویس</option>
        </Select>
      </div>

      {!products ? (
        <Skeleton className="h-96" />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={isFiltered ? "محصولی با این مشخصات پیدا نشد" : "هنوز محصولی ثبت نشده است"}
          action={!isFiltered && <Link to="/admin/products/new" className={buttonClass("primary")}><FiPlus /> افزودن اولین محصول</Link>}
        />
      ) : (
        <div className="divide-y divide-border rounded-lg border border-border bg-card">
          {filtered.map((p) => {
            const index = products.indexOf(p);
            return (
              <div key={p.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4">
                <img src={p.img} alt="" className={`h-14 w-20 shrink-0 rounded object-cover ${p.isPublished ? "" : "opacity-40"}`} />
                <div className="min-w-0 flex-1 basis-40">
                  <Link to={`/admin/products/${p.id}`} className="block truncate font-bold hover:text-primary">{p.name}</Link>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{categories.find((c) => c.id === p.categoryId)?.name}</span>
                    <span className={p.status === "available" ? "text-emerald-400" : "text-amber-400"}>{STATUS_LABELS[p.status]}</span>
                    {!p.isPublished && <span className="rounded bg-muted px-1.5 py-0.5">پیش‌نویس</span>}
                  </div>
                </div>
                <div className="w-44 shrink-0">
                  <InlinePrice value={p.cashPrice} onSave={(cashPrice) => run(() => updateProduct(p.id, { cashPrice }), "قیمت به‌روز شد.")} />
                </div>
                <div className="flex shrink-0 items-center">
                  {!isFiltered && (
                    <>
                      <IconButton label="انتقال به بالا" disabled={busy || index === 0} onClick={() => move(index, index - 1)}><FiArrowUp /></IconButton>
                      <IconButton label="انتقال به پایین" disabled={busy || index === products.length - 1} onClick={() => move(index, index + 1)}><FiArrowDown /></IconButton>
                    </>
                  )}
                  <IconButton
                    label={p.isPublished ? "تبدیل به پیش‌نویس" : "انتشار"}
                    disabled={busy}
                    onClick={() => void run(() => updateProduct(p.id, { isPublished: !p.isPublished }), p.isPublished ? "محصول از سایت برداشته شد." : "محصول منتشر شد.")}
                  >
                    {p.isPublished ? <FiEye /> : <FiEyeOff />}
                  </IconButton>
                  <IconButton label="کپی" disabled={busy} onClick={() => void duplicate(p)}><FiCopy /></IconButton>
                  <Link to={`/admin/products/${p.id}`} aria-label="ویرایش" title="ویرایش" className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"><FiEdit2 /></Link>
                  <IconButton label="حذف" disabled={busy} className="hover:text-red-400" onClick={() => setToDelete(p)}><FiTrash2 /></IconButton>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {toDelete && (
        <ConfirmDialog
          title="حذف محصول"
          message={`«${toDelete.name}» برای همیشه حذف می‌شود. این کار قابل بازگشت نیست.`}
          loading={deleting}
          onConfirm={() => void confirmDelete()}
          onCancel={() => setToDelete(null)}
        />
      )}
    </>
  );
}
