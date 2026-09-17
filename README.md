# PixelVault

A curated digital-asset discovery and organization platform built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL + Auth + Row Level Security)
- **Payments**: Paystack (via serverless API functions)
- **Hosting**: Vercel (recommended)
- **Icons**: Lucide React
- **Routing**: React Router v6

## Features

### ✅ Implemented

| Feature | Status | Definition of Done |
|---------|--------|-------------------|
| Landing Page (Home) | ✅ Done | Hero, features, stats, CTA sections render correctly |
| Explore Page | ✅ Done | Fetches from `content_items` table via Supabase query |
| Content Detail | ✅ Done | Shows full item data, related items, back navigation |
| Search & Filters | ✅ Done | Client-side filtering on Supabase-fetched data |
| Authentication | ✅ Done | Real Supabase Auth (email/password signup & login) |
| Protected Routes | ✅ Done | Dashboard/Favorites/Collections/Tasks redirect to login |
| Favorites | ✅ Done | Inserts/deletes rows in `favorites` table |
| Collections | ✅ Done | CRUD operations on `collections` table |
| Tasks | ✅ Done | CRUD operations on `tasks` table |
| Activity Feed | ✅ Done | Logs actions to `activities` table |
| Dashboard | ✅ Done | Shows real counts from Supabase queries |
| Pricing Page | ✅ Done | Three plans displayed, links to signup |
| Features Page | ✅ Done | Six feature cards with details |
| About Page | ✅ Done | Mission, audience, values sections |
| Contact Page | ✅ Done | Form with validation, calls `/api/contact` |
| FAQ Page | ✅ Done | Accordion-style FAQ |
| 404 Page | ✅ Done | Custom not-found page with return home |
| Responsive Design | ✅ Done | Mobile-first, works at all breakpoints |
| Code Splitting | ✅ Done | Lazy-loaded routes via dynamic `import()` |
| Dark Theme | ✅ Done | Consistent dark UI throughout |
| Empty States | ✅ Done | Every list has a designed empty state |
| Error States | ✅ Done | Network errors show actionable messages |

### ⚠️ Requires Configuration

| Feature | Status | Notes |
|---------|--------|-------|
| Paystack Payments | ⚠️ Needs keys | Requires `VITE_PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` |
| Contact Email | ⚠️ Needs config | Requires `RESEND_API_KEY` to actually send emails |
| Database Content | ⚠️ Needs seed | Run `seed.sql` in Supabase SQL Editor |

### ❌ Not Implemented

| Feature | Notes |
|---------|-------|
| User content upload | By design — PixelVault is curated, not user-upload |
| Admin panel | Content managed via Supabase Table Editor or seed.sql |
| Email verification flow | Supabase handles this; UI shows auth state |
| Password reset UI | Link exists but reset flow needs Supabase email config |

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (free tier works)
- (Optional) Paystack account for payments

### Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase:**
   - Create a project at [supabase.com](https://supabase.com)
   - Run the SQL from the schema section below in the Supabase SQL Editor
   - Run `seed.sql` to populate the catalog

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase URL and anon key.

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Database Schema

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content catalog (admin-writable only)
CREATE TABLE content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  creator TEXT,
  date TEXT,
  tags TEXT[],
  thumbnail TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites
CREATE TABLE favorites (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, content_item_id)
);

-- Collections
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE collection_items (
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
  PRIMARY KEY (collection_id, content_item_id)
);

-- Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  due_date TEXT,
  category TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'NGN',
  plan TEXT NOT NULL,
  paystack_reference TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS Policies

```sql
-- Content items: public read, admin-only write
CREATE POLICY "Public read access" ON content_items FOR SELECT USING (true);

-- Favorites: user can only manage their own
CREATE POLICY "Users manage own favorites" ON favorites FOR ALL USING (user_id = auth.uid());

-- Collections: user can only manage their own
CREATE POLICY "Users manage own collections" ON collections FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users manage own collection items" ON collection_items FOR ALL USING (
  collection_id IN (SELECT id FROM collections WHERE user_id = auth.uid())
);

-- Tasks: user can only manage their own
CREATE POLICY "Users manage own tasks" ON tasks FOR ALL USING (user_id = auth.uid());

-- Payments: user can only read their own
CREATE POLICY "Users read own payments" ON payments FOR ALL USING (user_id = auth.uid());

-- Activities: user can only manage their own
CREATE POLICY "Users manage own activities" ON activities FOR ALL USING (user_id = auth.uid());

-- Profiles: readable by all, updatable by owner
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (id = auth.uid());
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Your Supabase anon/public key |
| `VITE_PAYSTACK_PUBLIC_KEY` | For payments | Paystack public key |
| `PAYSTACK_SECRET_KEY` | For payments | Paystack secret key (server-side only) |
| `VITE_APP_URL` | Recommended | Your app's public URL |
| `RESEND_API_KEY` | Optional | For contact form emails |
| `CONTACT_EMAIL` | Optional | Where contact emails are sent |

## Security Notes

- `PAYSTACK_SECRET_KEY` must **never** be exposed in frontend code. It's only used in `/api` serverless functions.
- Row Level Security (RLS) is enabled on all tables.
- No hardcoded personal emails or keys in committed code.
- Security claims are honest — we describe "access-controlled storage" not "military-grade encryption."

## Performance

- Routes are lazy-loaded with dynamic `import()` for code splitting
- Images use `loading="lazy"` attribute
- Minimal dependencies
- Mobile-first responsive design optimized for constrained connections

## License

Proprietary. All rights reserved.
