import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Storefront from "./pages/Storefront";

const AdminApp = lazy(() => import("./admin/AdminApp"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div className="min-h-screen" style={{ background: "var(--background)" }} />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
