import { useCallback, useState, type ReactNode } from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { ToastContext, type ToastType } from "./context";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let nextId = 1;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = nextId++;
    setToasts((list) => [...list, { id, message, type }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="fixed bottom-4 left-4 right-4 md:right-auto z-[70] flex flex-col gap-2 md:w-96" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm shadow-2xl">
            {t.type === "success" ? (
              <FiCheckCircle className="shrink-0 text-lg text-emerald-400" />
            ) : (
              <FiAlertCircle className="shrink-0 text-lg text-primary" />
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
