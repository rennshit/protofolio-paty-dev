# Respaty Dev — Portfolio Website

Portfolio profesional untuk **Respaty Dev**, student developer team dari **SMK Respati 1**.
React + Vite + Tailwind CSS + Framer Motion, siap deploy ke Vercel.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env
npm run dev
```

Buka `http://localhost:5173`.

Tanpa mengisi variabel Supabase, situs berjalan dalam **demo mode**: data Team/Projects/Proof
memakai sample data dan tersimpan di `localStorage`, dan admin panel bisa login dengan email +
password apa saja. Ini supaya UI tetap bisa dieksplorasi sebelum backend nyata disiapkan.

## Mengaktifkan backend nyata (Supabase)

1. Buat project gratis di [supabase.com](https://supabase.com).
2. Buka **SQL Editor** dan jalankan:

```sql
create table team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  skills text[],
  avatar text,
  created_at timestamptz default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text,
  status text,
  technology text[],
  thumbnail text,
  "demoUrl" text,
  "sourceUrl" text,
  "isSample" boolean default false,
  created_at timestamptz default now()
);

create table proofs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image text,
  source text,
  date date,
  created_at timestamptz default now()
);

create table settings (
  id text primary key,
  school_instagram text, school_tiktok text, school_youtube text, school_website text,
  team_instagram text, team_tiktok text, team_github text, team_discord text,
  owner_whatsapp text, owner_email text, owner_instagram text
);

alter table team_members enable row level security;
alter table projects enable row level security;
alter table proofs enable row level security;
alter table settings enable row level security;

-- Public can read everything (it's a portfolio site)
create policy "public read" on team_members for select using (true);
create policy "public read" on projects for select using (true);
create policy "public read" on proofs for select using (true);
create policy "public read" on settings for select using (true);

-- Only authenticated users (the admin) can write
create policy "auth write" on team_members for all using (auth.role() = 'authenticated');
create policy "auth write" on projects for all using (auth.role() = 'authenticated');
create policy "auth write" on proofs for all using (auth.role() = 'authenticated');
create policy "auth write" on settings for all using (auth.role() = 'authenticated');
```

3. Go to **Authentication → Users** and add your admin account (email + password). This is the
   only place the admin password ever lives — never in frontend code or env vars.
4. Copy your **Project URL** and **anon public key** from Settings → API into `.env`:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxx
```

5. Restart `npm run dev`. The site now reads/writes real data and `/login` uses real Supabase Auth.

## Struktur project

```
src/
├── components/       # Reusable UI: Navbar, Footer, Button, Logo, cards, admin/CrudPanel...
├── sections/         # One file per homepage section (Hero, About, Services, Team, ...)
├── pages/            # Home, Login, Admin
├── config/           # siteConfig.js (brand/social/contact — all env-driven), env.js
├── lib/              # supabase.js client, small utils
├── hooks/            # useCollection (CRUD), useAdminAuth, useToast
└── data/             # sampleData.js — demo-mode fallback, clearly marked as sample
```

Semua data yang bisa berubah (social links, contact, project, proof, team) lewat satu layer:
`useCollection` — jadi mengganti backend nanti cukup edit satu file (`src/lib/supabase.js` /
`src/hooks/useCollection.js`), bukan menyentuh setiap komponen.

## Mengganti logo & warna

- Logo sekolah/tim diatur lewat `VITE_SCHOOL_LOGO` / `VITE_TEAM_LOGO` di `.env`.
- Warna brand (`--primary`, `--secondary`, `--glow`, dst) ada di `src/index.css` sebagai CSS
  variables — sesuaikan dengan warna asli logo Respaty Dev untuk hasil terbaik.

## Deploy ke Vercel

1. Push project ini ke GitHub.
2. Import repo di [vercel.com/new](https://vercel.com/new).
3. Tambahkan semua env var dari `.env.example` di Vercel → Settings → Environment Variables.
4. Deploy. `vercel.json` sudah mengatur SPA rewrite supaya `/admin` dan `/login` tidak 404 saat
   di-refresh.

## Catatan

- `/admin` dan `/login` route sudah ada tapi bukan halaman yang dipromosikan ke publik — tidak
  ditautkan dari navbar.
- Project dan proof yang berlabel **Sample** adalah placeholder struktur UI, bukan client atau
  hasil kerja sungguhan — hapus dari admin panel begitu ada data nyata.
