import { useEffect, useState, type ReactNode } from "react";
import { DEFAULT_CATEGORIES, DEFAULT_CONTENT, DEFAULT_PRODUCTS } from "../data/defaults";
import type { Category, Product, SiteContent } from "../data/types";
import { fetchCategories, fetchContent, fetchProducts } from "../lib/api";
import { isSupabaseConfigured } from "../lib/supabase";
import { SiteDataContext, type SiteData } from "./siteData";

const CACHE_KEY = "rch-site-data-v1";
const FETCH_TIMEOUT_MS = 8000;

interface CachedData {
  products: Product[];
  categories: Category[];
  content: SiteContent;
}

function readCache(): CachedData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as CachedData) : null;
  } catch {
    return null;
  }
}

function writeCache(data: CachedData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // The cache is only a fallback, so a full or blocked storage is fine.
  }
}

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timed out")), FETCH_TIMEOUT_MS);
    promise.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}

function setMeta(name: string, value: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = value;
}

export default function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    const cached = isSupabaseConfigured ? readCache() : null;
    return {
      products: cached?.products ?? DEFAULT_PRODUCTS,
      categories: cached?.categories ?? DEFAULT_CATEGORIES,
      content: cached?.content ?? DEFAULT_CONTENT,
      loadingProducts: isSupabaseConfigured,
    };
  });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    withTimeout(Promise.all([fetchProducts({ publishedOnly: true }), fetchCategories(), fetchContent()]))
      .then(([products, categories, content]) => {
        if (cancelled) return;
        writeCache({ products, categories, content });
        setData({ products, categories, content, loadingProducts: false });
      })
      .catch((err) => {
        console.warn("Could not load live site data, showing the last known version", err);
        if (!cancelled) setData((d) => ({ ...d, loadingProducts: false }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const { seo, brand } = data.content;
  useEffect(() => {
    document.title = seo.title;
    setMeta("description", seo.description);
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (icon) icon.href = brand.logo;
  }, [seo.title, seo.description, brand.logo]);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}
