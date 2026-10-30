-- RCH shop schema. Run once in the Supabase SQL editor, then run `npm run seed`.

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (length(trim(name)) > 0),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  category_id uuid not null references public.categories (id) on delete restrict,
  status text not null default 'available' check (status in ('available', 'presale')),
  cash_price bigint not null check (cash_price >= 0),
  installment_amount bigint not null default 0 check (installment_amount >= 0),
  installment_months integer not null default 18 check (installment_months > 0),
  engine text not null default '',
  power text not null default '',
  top_speed text not null default '',
  img text not null,
  alt text not null default '',
  is_new boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_category_id_idx on public.products (category_id);
create index products_img_idx on public.products (img);

create table public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

create function public.touch_updated_at() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();
create trigger site_content_touch before update on public.site_content
  for each row execute function public.touch_updated_at();

create function public.is_admin() returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.site_content enable row level security;
alter table public.admins enable row level security;

create policy "categories are public" on public.categories
  for select using (true);
create policy "admins manage categories" on public.categories
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "published products are public" on public.products
  for select using (is_published or public.is_admin());
create policy "admins manage products" on public.products
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "content is public" on public.site_content
  for select using (true);
create policy "admins manage content" on public.site_content
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Deliberately no write policy: admins are only added with the service role key.
create policy "users can see their own admin row" on public.admins
  for select to authenticated using (user_id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880, array['image/webp', 'image/jpeg', 'image/png']);

create policy "admins upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "admins update media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "admins delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
