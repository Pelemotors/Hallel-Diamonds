-- Jewelry Catalog Database Schema
-- Created for Next.js + Supabase project

-- 1) Brands (כי יש "מספר מותגים")
create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  instagram_handle text,
  whatsapp_phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2) Categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  name text not null,
  slug text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique(brand_id, slug)
);

-- 3) Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text not null,
  short_desc text,
  long_desc text,
  price_numeric numeric(12,2),
  price_display text, -- למשל "₪4,900" או "החל מ- ₪2,900"
  metal text,         -- optional
  stone text,         -- optional
  carat text,         -- optional
  is_featured boolean not null default false,
  status text not null default 'draft', -- draft/published
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(brand_id, slug)
);

-- 4) Product media
create table if not exists product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  kind text not null, -- image/video
  url text not null,  -- Supabase Storage public URL or /public path for demo
  alt text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 5) Leads (Contact)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  source text not null default 'contact', -- contact/custom-design/product
  name text,
  phone text,
  email text,
  message text,
  page_path text,
  status text not null default 'new', -- new/contacted/closed
  created_at timestamptz not null default now()
);

-- 6) Custom Design Quiz submissions
create table if not exists custom_design_submissions (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  answers jsonb not null, -- כל הבחירות
  name text,
  phone text,
  email text,
  page_path text default '/custom-design',
  created_at timestamptz not null default now()
);

-- 7) Content blocks (Home/About/Custom etc)
create table if not exists content_blocks (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,
  page text not null,      -- 'home'/'about'/'custom'...
  block_key text not null, -- 'hero_title','hero_subtitle'...
  value jsonb not null,    -- טקסט/רשימות/CTA
  updated_at timestamptz not null default now(),
  unique(brand_id, page, block_key)
);

-- 8) Admin users (internal auth)
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  role text not null default 'admin',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 9) Admin sessions
create table if not exists admin_sessions (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references admin_users(id) on delete cascade,
  session_token text unique not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

-- 10) Pageviews (basic analytics)
create table if not exists pageviews (
  id bigserial primary key,
  brand_id uuid references brands(id) on delete cascade,
  path text not null,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_products_brand_id on products(brand_id);
create index if not exists idx_products_category_id on products(category_id);
create index if not exists idx_products_status on products(status);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_product_media_product_id on product_media(product_id);
create index if not exists idx_leads_brand_id on leads(brand_id);
create index if not exists idx_leads_status on leads(status);
create index if not exists idx_categories_brand_id on categories(brand_id);
create index if not exists idx_content_blocks_brand_page on content_blocks(brand_id, page);
create index if not exists idx_admin_sessions_token on admin_sessions(session_token);
create index if not exists idx_admin_sessions_expires on admin_sessions(expires_at);
create index if not exists idx_pageviews_brand_id on pageviews(brand_id);
create index if not exists idx_pageviews_created_at on pageviews(created_at);

-- RLS Policies
-- Enable RLS on all tables
alter table brands enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_media enable row level security;
alter table leads enable row level security;
alter table custom_design_submissions enable row level security;
alter table content_blocks enable row level security;
alter table admin_users enable row level security;
alter table admin_sessions enable row level security;
alter table pageviews enable row level security;

-- Public policies for brands (active brands only)
create policy "Public can view active brands"
  on brands for select
  using (is_active = true);

-- Public policies for categories (only for active brands)
create policy "Public can view categories of active brands"
  on categories for select
  using (
    exists (
      select 1 from brands
      where brands.id = categories.brand_id
      and brands.is_active = true
    )
  );

-- Public policies for products (published only)
create policy "Public can view published products"
  on products for select
  using (
    status = 'published'
    and exists (
      select 1 from brands
      where brands.id = products.brand_id
      and brands.is_active = true
    )
  );

-- Public policies for product_media (only for published products)
create policy "Public can view media of published products"
  on product_media for select
  using (
    exists (
      select 1 from products
      where products.id = product_media.product_id
      and products.status = 'published'
    )
  );

-- Public policies for content_blocks (only for active brands)
create policy "Public can view content blocks of active brands"
  on content_blocks for select
  using (
    exists (
      select 1 from brands
      where brands.id = content_blocks.brand_id
      and brands.is_active = true
    )
  );

-- Public can insert leads
create policy "Public can insert leads"
  on leads for insert
  with check (true);

-- Public can insert custom design submissions
create policy "Public can insert custom design submissions"
  on custom_design_submissions for insert
  with check (true);

-- Public can insert pageviews
create policy "Public can insert pageviews"
  on pageviews for insert
  with check (true);

-- Admin policies (will be handled via service role in API routes)
-- All admin operations should use service role key, not anon key

