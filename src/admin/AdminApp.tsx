import { Navigate, Route, Routes } from "react-router-dom";
import { isSupabaseConfigured } from "../lib/supabase";
import AuthProvider from "./AuthProvider";
import ToastProvider from "./ToastProvider";
import AdminLayout from "./components/AdminLayout";
import { EmptyState } from "./components/ui";
import BrandSeo from "./pages/BrandSeo";
import Categories from "./pages/Categories";
import ContactFooter from "./pages/ContactFooter";
import ContentPage from "./pages/ContentPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProductForm from "./pages/ProductForm";
import ProductsList from "./pages/ProductsList";

export default function AdminApp() {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
        <div className="w-full max-w-md">
          <EmptyState title="پنل مدیریت هنوز راه‌اندازی نشده است" description="اتصال به Supabase تنظیم نشده است. راهنمای راه‌اندازی در فایل README پروژه آمده است." />
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductForm />} />
            <Route path="categories" element={<Categories />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="contact" element={<ContactFooter />} />
            <Route path="brand" element={<BrandSeo />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
