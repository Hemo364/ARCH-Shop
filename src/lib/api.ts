import { DEFAULT_CONTENT } from "../data/defaults";
import type { Category, ContentKey, Product, SiteContent } from "../data/types";
import { db } from "./supabase";

const BUCKET = "media";

interface ProductRow {
  id: string;
  name: string;
  category_id: string;
  status: Product["status"];
  cash_price: number;
  installment_amount: number;
  installment_months: number;
  engine: string;
  power: string;
  top_speed: string;
  img: string;
  alt: string;
  is_new: boolean;
  is_published: boolean;
  sort_order: number;
  updated_at: string;
}

export type ProductInput = Omit<Product, "id" | "updatedAt">;

function fromRow(r: ProductRow): Product {
  return {
    id: r.id,
    name: r.name,
    categoryId: r.category_id,
    status: r.status,
    cashPrice: r.cash_price,
    installmentAmount: r.installment_amount,
    installmentMonths: r.installment_months,
    engine: r.engine,
    power: r.power,
    topSpeed: r.top_speed,
    img: r.img,
    alt: r.alt,
    isNew: r.is_new,
    isPublished: r.is_published,
    sortOrder: r.sort_order,
    updatedAt: r.updated_at,
  };
}

function toRow(p: Partial<ProductInput>) {
  const row: Record<string, unknown> = {};
  if (p.name !== undefined) row.name = p.name;
  if (p.categoryId !== undefined) row.category_id = p.categoryId;
  if (p.status !== undefined) row.status = p.status;
  if (p.cashPrice !== undefined) row.cash_price = p.cashPrice;
  if (p.installmentAmount !== undefined) row.installment_amount = p.installmentAmount;
  if (p.installmentMonths !== undefined) row.installment_months = p.installmentMonths;
  if (p.engine !== undefined) row.engine = p.engine;
  if (p.power !== undefined) row.power = p.power;
  if (p.topSpeed !== undefined) row.top_speed = p.topSpeed;
  if (p.img !== undefined) row.img = p.img;
  if (p.alt !== undefined) row.alt = p.alt;
  if (p.isNew !== undefined) row.is_new = p.isNew;
  if (p.isPublished !== undefined) row.is_published = p.isPublished;
  if (p.sortOrder !== undefined) row.sort_order = p.sortOrder;
  return row;
}

export async function fetchProducts({ publishedOnly = false } = {}): Promise<Product[]> {
  let query = db().from("products").select("*");
  // An admin browsing the storefront would otherwise see drafts through RLS.
  if (publishedOnly) query = query.eq("is_published", true);
  const { data, error } = await query.order("sort_order").order("created_at");
  if (error) throw error;
  return (data as ProductRow[]).map(fromRow);
}

export async function fetchProduct(id: string): Promise<Product> {
  const { data, error } = await db().from("products").select("*").eq("id", id).single();
  if (error) throw error;
  return fromRow(data as ProductRow);
}

export async function createProduct(input: ProductInput): Promise<void> {
  const { error } = await db().from("products").insert(toRow(input));
  if (error) throw error;
}

export async function updateProduct(id: string, patch: Partial<ProductInput>): Promise<void> {
  const { error } = await db().from("products").update(toRow(patch)).eq("id", id);
  if (error) throw error;
}

export async function deleteProduct(product: Product): Promise<void> {
  const { error } = await db().from("products").delete().eq("id", product.id);
  if (error) throw error;
  await removeImageIfUnused(product.img);
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await db().from("categories").select("id, name, sort_order").order("sort_order");
  if (error) throw error;
  return data.map((c) => ({ id: c.id, name: c.name, sortOrder: c.sort_order }));
}

export async function createCategory(name: string, sortOrder: number): Promise<void> {
  const { error } = await db().from("categories").insert({ name, sort_order: sortOrder });
  if (error) throw error;
}

export async function updateCategory(id: string, patch: { name?: string; sortOrder?: number }): Promise<void> {
  const row: Record<string, unknown> = {};
  if (patch.name !== undefined) row.name = patch.name;
  if (patch.sortOrder !== undefined) row.sort_order = patch.sortOrder;
  const { error } = await db().from("categories").update(row).eq("id", id);
  if (error) throw error;
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await db().from("categories").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchContent(): Promise<SiteContent> {
  const { data, error } = await db().from("site_content").select("key, value");
  if (error) throw error;
  const content = { ...DEFAULT_CONTENT } as Record<string, unknown>;
  for (const row of data) {
    const fallback = content[row.key];
    content[row.key] = fallback ? { ...fallback, ...row.value } : row.value;
  }
  return content as unknown as SiteContent;
}

export async function saveContent<K extends ContentKey>(key: K, value: SiteContent[K]): Promise<void> {
  const { error } = await db().from("site_content").upsert({ key, value });
  if (error) throw error;
}

export async function uploadImage(file: Blob): Promise<string> {
  const path = `uploads/${crypto.randomUUID()}.webp`;
  const storage = db().storage.from(BUCKET);
  const { error } = await storage.upload(path, file, { contentType: file.type, cacheControl: "31536000" });
  if (error) throw error;
  return storage.getPublicUrl(path).data.publicUrl;
}

function storagePath(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length));
}

// Duplicated products share one image file, so it is only deleted once nothing uses it.
// Failing to clean up must never fail the save that triggered it.
export async function removeImageIfUnused(url: string): Promise<void> {
  const path = storagePath(url);
  if (!path) return;
  try {
    const { count, error } = await db().from("products").select("id", { count: "exact", head: true }).eq("img", url);
    if (error || count !== 0) return;
    await db().storage.from(BUCKET).remove([path]);
  } catch (err) {
    console.warn("Could not remove image", err);
  }
}
