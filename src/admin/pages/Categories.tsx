import { useCallback, useEffect, useState, type FormEvent } from "react";
import { FiArrowDown, FiArrowUp, FiCheck, FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import type { Category, Product } from "../../data/types";
import { createCategory, deleteCategory, fetchCategories, fetchProducts, updateCategory } from "../../lib/api";
import { toPersianDigits } from "../../lib/format";
import { Button, Card, ConfirmDialog, EmptyState, ErrorState, IconButton, Input, PageHeader, Skeleton } from "../components/ui";
import { useToast } from "../context";
import { errorMessage } from "../errors";

export default function Categories() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<{ id: string; name: string } | null>(null);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();

  const load = useCallback(async () => {
    try {
      const [c, p] = await Promise.all([fetchCategories(), fetchProducts()]);
      setCategories(c);
      setProducts(p);
      setError(null);
    } catch (err) {
      setError(errorMessage(err));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchCategories(), fetchProducts()]).then(
      ([c, p]) => {
        if (cancelled) return;
        setCategories(c);
        setProducts(p);
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
  if (!categories) return <Skeleton className="h-96" />;

  const countOf = (id: string) => products.filter((p) => p.categoryId === id).length;

  const add = (e: FormEvent) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const sortOrder = Math.max(-1, ...categories.map((c) => c.sortOrder)) + 1;
    void run(async () => {
      await createCategory(name, sortOrder);
      setNewName("");
    }, "دسته اضافه شد.");
  };

  const rename = () => {
    if (!editing) return;
    const { id, name } = editing;
    if (!name.trim()) return;
    setEditing(null);
    void run(() => updateCategory(id, { name: name.trim() }), "نام دسته تغییر کرد.");
  };

  const move = (index: number, to: number) => {
    const next = [...categories];
    next.splice(to, 0, next.splice(index, 1)[0]);
    void run(async () => {
      await Promise.all(next.map((c, i) => (c.sortOrder === i ? null : updateCategory(c.id, { sortOrder: i }))));
    });
  };

  const requestDelete = (c: Category) => {
    const count = countOf(c.id);
    if (count > 0) {
      toast(`این دسته ${toPersianDigits(count)} محصول دارد. اول آن‌ها را به دسته‌ی دیگری منتقل کنید.`, "error");
      return;
    }
    setToDelete(c);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    await run(() => deleteCategory(toDelete.id), "دسته حذف شد.");
    setToDelete(null);
  };

  return (
    <>
      <PageHeader title="دسته‌بندی‌ها" description="این دسته‌ها به صورت فیلتر بالای محصولات سایت نمایش داده می‌شوند." />

      <div className="max-w-2xl space-y-6">
        <Card>
          <form onSubmit={add} className="flex gap-3">
            <Input aria-label="نام دسته جدید" placeholder="نام دسته‌ی جدید" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <Button type="submit" variant="primary" disabled={busy || !newName.trim()}><FiPlus /> افزودن</Button>
          </form>
        </Card>

        {categories.length === 0 ? (
          <EmptyState title="هنوز دسته‌ای ساخته نشده است" />
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border bg-card">
            {categories.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 p-3">
                {editing?.id === c.id ? (
                  <>
                    <div className="flex-1">
                      <Input
                        aria-label="نام دسته"
                        autoFocus
                        value={editing.name}
                        onChange={(e) => setEditing({ id: c.id, name: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") rename();
                          if (e.key === "Escape") setEditing(null);
                        }}
                      />
                    </div>
                    <IconButton label="ذخیره" onClick={rename}><FiCheck /></IconButton>
                    <IconButton label="انصراف" onClick={() => setEditing(null)}><FiX /></IconButton>
                  </>
                ) : (
                  <>
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="truncate text-sm font-bold">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{toPersianDigits(countOf(c.id))} محصول</div>
                    </div>
                    <IconButton label="انتقال به بالا" disabled={busy || i === 0} onClick={() => move(i, i - 1)}><FiArrowUp /></IconButton>
                    <IconButton label="انتقال به پایین" disabled={busy || i === categories.length - 1} onClick={() => move(i, i + 1)}><FiArrowDown /></IconButton>
                    <IconButton label="تغییر نام" onClick={() => setEditing({ id: c.id, name: c.name })}><FiEdit2 /></IconButton>
                    <IconButton label="حذف" disabled={busy} className="hover:text-red-400" onClick={() => requestDelete(c)}><FiTrash2 /></IconButton>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {toDelete && (
        <ConfirmDialog
          title="حذف دسته"
          message={`دسته‌ی «${toDelete.name}» حذف می‌شود.`}
          loading={busy}
          onConfirm={() => void confirmDelete()}
          onCancel={() => setToDelete(null)}
        />
      )}
    </>
  );
}
