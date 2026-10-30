import { useState } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import type { IconType } from "react-icons";
import { FiExternalLink, FiFileText, FiGrid, FiHome, FiLogOut, FiMenu, FiPackage, FiPhone, FiSettings, FiX } from "react-icons/fi";
import { useAuth } from "../context";
import { Button, EmptyState } from "./ui";

const NAV: { to: string; label: string; icon: IconType; end?: boolean }[] = [
  { to: "/admin", label: "داشبورد", icon: FiHome, end: true },
  { to: "/admin/products", label: "محصولات", icon: FiPackage },
  { to: "/admin/categories", label: "دسته‌بندی‌ها", icon: FiGrid },
  { to: "/admin/content", label: "محتوای سایت", icon: FiFileText },
  { to: "/admin/contact", label: "تماس و فوتر", icon: FiPhone },
  { to: "/admin/brand", label: "برند و سئو", icon: FiSettings },
];

export default function AdminLayout() {
  const { status, email, signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (status === "loading") return <div className="min-h-screen bg-background" />;
  if (status === "anonymous") return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;

  if (status !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <EmptyState
            title={status === "forbidden" ? "این حساب دسترسی مدیریت ندارد" : "بررسی دسترسی انجام نشد"}
            description={status === "forbidden" ? "با حساب مدیر وارد شوید." : "اتصال اینترنت را بررسی کنید و صفحه را دوباره باز کنید."}
            action={<Button onClick={() => void signOut()}>خروج از حساب</Button>}
          />
        </div>
      </div>
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-5 py-5">
        <div>
          <div className="font-black">پنل مدیریت</div>
          <div className="mt-0.5 text-xs text-primary">فروشگاه RCH</div>
        </div>
        <button className="p-1 md:hidden cursor-pointer" aria-label="بستن منو" onClick={() => setOpen(false)}>
          <FiX className="text-xl" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`
            }
          >
            <Icon className="text-base" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-1 border-t border-border p-3">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground">
          <FiExternalLink /> مشاهده سایت
        </a>
        <button onClick={() => void signOut()} className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition cursor-pointer hover:bg-secondary hover:text-foreground">
          <FiLogOut /> خروج
        </button>
        {email && <div className="truncate px-3 pt-1 text-xs text-muted-foreground" dir="ltr">{email.replace("@rchshop.local", "")}</div>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-64 border-l border-border bg-card md:block">{sidebar}</aside>

      <div className={`fixed inset-0 z-40 bg-black/60 transition-opacity md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} />
      <aside className={`fixed inset-y-0 right-0 z-50 w-72 max-w-[85%] border-l border-border bg-card transition-all md:hidden ${open ? "translate-x-0" : "invisible translate-x-full"}`}>{sidebar}</aside>

      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card px-4 py-3 md:hidden">
        <button className="p-1 cursor-pointer" aria-label="منو" onClick={() => setOpen(true)}>
          <FiMenu className="text-2xl" />
        </button>
        <span className="font-bold">پنل مدیریت</span>
      </header>

      <main className="md:mr-64">
        <div className="mx-auto max-w-6xl p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
