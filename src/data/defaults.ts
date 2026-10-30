import heroImg from "../assets/hero.jpg";
import image1 from "../assets/image_1.jpg";
import image2 from "../assets/image_2.jpg";
import image3 from "../assets/image_3.jpg";
import image4 from "../assets/image_4.jpg";
import image5 from "../assets/image_5.jpg";
import image6 from "../assets/image_6.jpg";
import image7 from "../assets/image_7.jpg";
import logo from "../assets/logo.jpg";
import seed from "./seed.json";
import type { Category, Product, ProductStatus, SiteContent } from "./types";

// seed.json is also read by scripts/seed.mjs, so it refers to images by file name.
const IMAGES: Record<string, string> = {
  "hero.jpg": heroImg,
  "image_1.jpg": image1,
  "image_2.jpg": image2,
  "image_3.jpg": image3,
  "image_4.jpg": image4,
  "image_5.jpg": image5,
  "image_6.jpg": image6,
  "image_7.jpg": image7,
  "logo.jpg": logo,
};

export const DEFAULT_CATEGORIES: Category[] = seed.categories.map((name, i) => ({
  id: `default-category-${i}`,
  name,
  sortOrder: i,
}));

export const DEFAULT_PRODUCTS: Product[] = seed.products.map((p, i) => ({
  ...p,
  id: `default-product-${i}`,
  categoryId: `default-category-${seed.categories.indexOf(p.category)}`,
  status: p.status as ProductStatus,
  img: IMAGES[p.img],
  isPublished: true,
  sortOrder: i,
}));

export const DEFAULT_CONTENT: SiteContent = {
  ...seed.content,
  brand: { ...seed.content.brand, logo: IMAGES[seed.content.brand.logo] },
  hero: { ...seed.content.hero, image: IMAGES[seed.content.hero.image] },
  about: { ...seed.content.about, image: IMAGES[seed.content.about.image] },
};
