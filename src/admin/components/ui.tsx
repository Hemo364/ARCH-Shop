import { useEffect, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { FiArrowDown, FiArrowUp, FiLoader, FiPlus, FiTrash2 } from "react-icons/fi";
import { formatPrice, parseNumber } from "../../lib/format";
import { buttonClass, type ButtonVariant } from "./buttonClass";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

export function Button({ variant = "secondary", loading, disabled, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} disabled={disabled || loading} className={buttonClass(variant)} {...rest}>
      {loading && <FiLoader className="animate-spin" />}
      {children}
    </button>
  );
}

export function IconButton({ label, className = "", children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition cursor-pointer hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

const INPUT_CLASS =
  "w-full rounded-md border border-border bg-secondary px-3 py-2.5 text-base md:text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={INPUT_CLASS} {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} className={`${INPUT_CLASS} leading-relaxed`} {...props} />;
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={INPUT_CLASS} {...props}>
      {children}
    </select>
  );
}

export function PriceInput({ value, onChange, ...rest }: { value: number; onChange: (value: number) => void } & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <Input
      inputMode="numeric"
      dir="ltr"
      value={value ? formatPrice(value) : ""}
      onChange={(e) => onChange(parseNumber(e.target.value))}
      {...rest}
    />
  );
}

export function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (checked: boolean) => void; label: string; hint?: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="flex items-center gap-3 text-right cursor-pointer">
      <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-primary" : "bg-muted"}`}>
        <span className={`absolute top-1 size-4 rounded-full bg-white transition-all ${checked ? "right-1" : "right-6"}`} />
      </span>
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
      </span>
    </button>
  );
}

export function Card({ title, description, children }: { title?: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 md:p-6">
      {title && <h2 className="font-bold">{title}</h2>}
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      <div className={title || description ? "mt-5" : ""}>{children}</div>
    </section>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Skeleton({ className = "h-24" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-card ${className}`} />;
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-border px-6 py-14 text-center">
      <p className="font-bold">{title}</p>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <EmptyState title="بارگذاری انجام نشد" description={message} action={<Button onClick={onRetry}>تلاش دوباره</Button>} />;
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-md rounded-lg border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-3 text-lg font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({ title, message, confirmLabel = "حذف", loading, onConfirm, onCancel }: { title: string; message: string; confirmLabel?: string; loading?: boolean; onConfirm: () => void; onCancel: () => void }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button onClick={onCancel}>انصراف</Button>
        <Button variant="danger" loading={loading} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

interface ListEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  addLabel: string;
  renderItem: (item: T, update: (item: T) => void) => ReactNode;
}

export function ListEditor<T>({ items, onChange, newItem, addLabel, renderItem }: ListEditorProps<T>) {
  const move = (from: number, to: number) => {
    const next = [...items];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 rounded-md border border-border p-3">
          <div className="min-w-0 flex-1">{renderItem(item, (updated) => onChange(items.map((x, j) => (j === i ? updated : x))))}</div>
          <div className="flex shrink-0 flex-col">
            <IconButton label="انتقال به بالا" disabled={i === 0} onClick={() => move(i, i - 1)}><FiArrowUp /></IconButton>
            <IconButton label="انتقال به پایین" disabled={i === items.length - 1} onClick={() => move(i, i + 1)}><FiArrowDown /></IconButton>
            <IconButton label="حذف" className="hover:text-red-400" onClick={() => onChange(items.filter((_, j) => j !== i))}><FiTrash2 /></IconButton>
          </div>
        </div>
      ))}
      <Button onClick={() => onChange([...items, newItem()])}>
        <FiPlus /> {addLabel}
      </Button>
    </div>
  );
}
