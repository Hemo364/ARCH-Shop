import { createContext, useContext } from "react";
import { DEFAULT_CATEGORIES, DEFAULT_CONTENT, DEFAULT_PRODUCTS } from "../data/defaults";
import type { Category, Product, SiteContent } from "../data/types";

export interface SiteData {
  products: Product[];
  categories: Category[];
  content: SiteContent;
  loadingProducts: boolean;
}

export const SiteDataContext = createContext<SiteData>({
  products: DEFAULT_PRODUCTS,
  categories: DEFAULT_CATEGORIES,
  content: DEFAULT_CONTENT,
  loadingProducts: false,
});

export function useSiteData() {
  return useContext(SiteDataContext);
}
