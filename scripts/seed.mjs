// Fills an empty Supabase project with the site's current content and creates the admin user.
// Usage: npm run seed (reads .env). It refuses to run if products already exist,
// so it can never overwrite what the client has edited in the panel.
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const username = process.env.SEED_ADMIN_USERNAME ?? "admin";
const password = process.env.SEED_ADMIN_PASSWORD ?? "Admin@12345";

if (!url || !serviceKey) {
  console.error("VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
const seed = JSON.parse(await readFile(new URL("../src/data/seed.json", import.meta.url), "utf8"));

function check(error, step) {
  if (error) throw new Error(`${step}: ${error.message}`);
}

async function uploadAsset(fileName) {
  const file = await readFile(new URL(`../src/assets/${fileName}`, import.meta.url));
  const path = `seed/${fileName}`;
  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { contentType: "image/jpeg", cacheControl: "31536000", upsert: true });
  check(error, `upload ${fileName}`);
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

async function ensureAdmin() {
  const email = `${username}@rchshop.local`;
  const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
  let userId = data?.user?.id;
  if (error) {
    const { data: list, error: listError } = await supabase.auth.admin.listUsers();
    check(listError, "list users");
    userId = list.users.find((u) => u.email === email)?.id;
    if (!userId) throw new Error(`create admin: ${error.message}`);
  }
  const { error: adminError } = await supabase.from("admins").upsert({ user_id: userId });
  check(adminError, "register admin");
}

const { count, error: countError } = await supabase.from("products").select("id", { count: "exact", head: true });
check(countError, "check products");
if (count > 0) {
  console.log("Products already exist, skipping content. Only checking the admin user.");
  await ensureAdmin();
  process.exit(0);
}

const { data: categories, error: categoryError } = await supabase
  .from("categories")
  .upsert(seed.categories.map((name, i) => ({ name, sort_order: i })), { onConflict: "name" })
  .select();
check(categoryError, "insert categories");

const rows = [];
for (const [i, p] of seed.products.entries()) {
  rows.push({
    name: p.name,
    category_id: categories.find((c) => c.name === p.category).id,
    status: p.status,
    cash_price: p.cashPrice,
    installment_amount: p.installmentAmount,
    installment_months: p.installmentMonths,
    engine: p.engine,
    power: p.power,
    top_speed: p.topSpeed,
    img: await uploadAsset(p.img),
    alt: p.alt,
    is_new: p.isNew,
    sort_order: i,
  });
}
const { error: productError } = await supabase.from("products").insert(rows);
check(productError, "insert products");

const content = structuredClone(seed.content);
content.brand.logo = await uploadAsset(content.brand.logo);
content.hero.image = await uploadAsset(content.hero.image);
content.about.image = await uploadAsset(content.about.image);
const { error: contentError } = await supabase
  .from("site_content")
  .upsert(Object.entries(content).map(([key, value]) => ({ key, value })));
check(contentError, "insert content");

await ensureAdmin();
console.log(`Done. Log in at /admin with username "${username}".`);
