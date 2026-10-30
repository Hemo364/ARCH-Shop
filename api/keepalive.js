// Called daily by Vercel Cron. A free Supabase project is paused after a period without
// activity, which would take the storefront's live data offline.
export default async function handler(_req, res) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return res.status(500).json({ ok: false, error: "Supabase env vars are missing" });

  const response = await fetch(`${url}/rest/v1/categories?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  return res.status(response.ok ? 200 : 502).json({ ok: response.ok });
}
