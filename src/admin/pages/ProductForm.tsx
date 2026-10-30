import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { STATUS_LABELS, type Category, type ProductStatus } from "../../data/types";
import { createProduct, fetchCategories, fetchProduct, fetchProducts, removeImageIfUnused, updateProduct, type ProductInput } from "../../lib/api";
import { parseNumber, toPersianDigits } from "../../lib/format";
import ImageUploader from "../components/ImageUploader";
import { buttonClass } from "../components/buttonClass";
import { Button, Card, EmptyState, ErrorState, Field, Input, PageHeader, PriceInput, Select, Skeleton, Toggle } from "../components/ui";
import { useToast } from "../context";
import { errorMessage } from "../errors";
import { useUnsavedWarning } from "../useUnsavedWarning";

const EMPTY: ProductInput = {
  name: "",
  categoryId: "",
  status: "available",
  cashPrice: 0,
  installmentAmount: 0,
  installmentMonths: 18,
  engine: "",
  power: "",
  topSpeed: "",
  img: "",
  alt: "",
  isNew: false,
  isPublished: true,
  sortOrder: 0,
};

type Errors = Partial<Record<"name" | "categoryId" | "cashPrice" | "installmentMonths" | "img", string>>;

function validate(form: ProductInput): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "نام محصول را وارد کنید.";
  if (!form.categoryId) errors.categoryId = "یک دسته انتخاب کنید.";
  if (form.cashPrice <= 0) errors.cashPrice = "قیمت نقد را وارد کنید.";
  if (form.installmentMonths < 1) errors.installmentMonths = "تعداد اقساط باید حداقل یک ماه باشد.";
  if (!form.img) errors.img = "عکس محصول را انتخاب کنید.";
  return errors;
}

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState<ProductInput | null>(null);
  const [original, setOriginal] = useState<ProductInput>(EMPTY);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchCategories(), id ? fetchProduct(id) : Promise.resolve(EMPTY)]).then(
      ([cats, product]) => {
        if (cancelled) return;
        setCategories(cats);
        setOriginal(product);
        setForm(product);
        setLoadError(null);
      },
      (err) => {
        if (!cancelled) setLoadError(errorMessage(err));
      },
    );
    return () => {
      cancelled = true;
    };
  }, [id, attempt]);

  useUnsavedWarning(form !== null && JSON.stringify(form) !== JSON.stringify(original));

  if (loadError) return <ErrorState message={loadError} onRetry={() => setAttempt((a) => a + 1)} />;
  if (!form) return <Skeleton className="h-[32rem]" />;

  const backLink = <Link to="/admin/products" className={buttonClass()}><FiArrowRight /> بازگشت</Link>;

  if (categories.length === 0) {
    return (
      <EmptyState
        title="اول باید یک دسته‌بندی بسازید"
        description="هر محصول باید داخل یک دسته قرار بگیرد."
        action={<Link to="/admin/categories" className={buttonClass("primary")}>رفتن به دسته‌بندی‌ها</Link>}
      />
    );
  }

  const set = (changes: Partial<ProductInput>) => setForm({ ...form, ...changes });

  const changeImage = (img: string) => {
    // An image picked earlier in this session and then replaced is no longer needed.
    if (form.img && form.img !== original.img) void removeImageIfUnused(form.img);
    set({ img });
  };

  const cancel = () => {
    if (form.img && form.img !== original.img) void removeImageIfUnused(form.img);
    navigate("/admin/products");
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast("لطفاً خطاهای فرم را برطرف کنید.", "error");
      return;
    }
    setSaving(true);
    try {
      const data = { ...form, name: form.name.trim() };
      if (id) {
        await updateProduct(id, data);
        if (original.img !== form.img) await removeImageIfUnused(original.img);
      } else {
        const existing = await fetchProducts();
        await createProduct({ ...data, sortOrder: Math.max(-1, ...existing.map((p) => p.sortOrder)) + 1 });
      }
      setOriginal(form);
      toast(id ? "تغییرات ذخیره شد." : "محصول اضافه شد.");
      navigate("/admin/products");
    } catch (err) {
      toast(errorMessage(err), "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <PageHeader title={id ? "ویرایش محصول" : "افزودن محصول"} actions={backLink} />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card title="مشخصات اصلی">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="نام محصول" error={errors.name}>
                  <Input value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="مثلاً هوندا CBR 600RR" />
                </Field>
              </div>
              <Field label="دسته" error={errors.categoryId}>
                <Select value={form.categoryId} onChange={(e) => set({ categoryId: e.target.value })}>
                  <option value="">انتخاب کنید</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </Select>
              </Field>
              <Field label="وضعیت موجودی">
                <Select value={form.status} onChange={(e) => set({ status: e.target.value as ProductStatus })}>
                  {(Object.keys(STATUS_LABELS) as ProductStatus[]).map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </Select>
              </Field>
            </div>
          </Card>

          <Card title="قیمت" description="قیمت‌ها به تومان هستند. قسط از روی قیمت نقد محاسبه نمی‌شود و باید خودتان وارد کنید.">
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="قیمت نقد" error={errors.cashPrice}>
                <PriceInput value={form.cashPrice} onChange={(cashPrice) => set({ cashPrice })} />
              </Field>
              <Field label="مبلغ هر قسط">
                <PriceInput value={form.installmentAmount} onChange={(installmentAmount) => set({ installmentAmount })} />
              </Field>
              <Field label="تعداد اقساط (ماه)" error={errors.installmentMonths}>
                <Input
                  inputMode="numeric"
                  dir="ltr"
                  value={form.installmentMonths ? toPersianDigits(form.installmentMonths) : ""}
                  onChange={(e) => set({ installmentMonths: parseNumber(e.target.value) })}
                />
              </Field>
            </div>
          </Card>

          <Card title="مشخصات فنی">
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="موتور"><Input value={form.engine} onChange={(e) => set({ engine: e.target.value })} placeholder="۵۹۹cc" /></Field>
              <Field label="قدرت"><Input value={form.power} onChange={(e) => set({ power: e.target.value })} placeholder="۱۲۱ اسب" /></Field>
              <Field label="حداکثر سرعت"><Input value={form.topSpeed} onChange={(e) => set({ topSpeed: e.target.value })} placeholder="۲۵۵ کیلومتر" /></Field>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="عکس محصول">
            <ImageUploader value={form.img} onChange={changeImage} error={errors.img} />
            <div className="mt-4">
              <Field label="توضیح عکس" hint="برای گوگل و افراد کم‌بینا. اگر خالی بماند از نام محصول استفاده می‌شود.">
                <Input value={form.alt} onChange={(e) => set({ alt: e.target.value })} />
              </Field>
            </div>
          </Card>

          <Card title="نمایش در سایت">
            <div className="space-y-4">
              <Toggle checked={form.isPublished} onChange={(isPublished) => set({ isPublished })} label="منتشر شود" hint="اگر خاموش باشد محصول در سایت دیده نمی‌شود." />
              <Toggle checked={form.isNew} onChange={(isNew) => set({ isNew })} label="برچسب «جدید»" />
            </div>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" variant="primary" loading={saving}>{id ? "ذخیره تغییرات" : "افزودن محصول"}</Button>
            <Button onClick={cancel}>انصراف</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
