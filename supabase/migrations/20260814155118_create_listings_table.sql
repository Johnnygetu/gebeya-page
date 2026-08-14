/*
# Create listings table for multi-category marketplace

Replaces the cars-only table with a flexible listings table that supports
multiple categories (cars, real estate, electronics, furniture, jobs, services, etc.)
using a JSONB attributes column for category-specific fields.

1. New Tables
- `listings`
  - `id` (uuid, primary key)
  - `category` (text, not null) — e.g. 'cars', 'real-estate', 'electronics', 'furniture', 'jobs', 'services'
  - `title` (text, not null) — listing title
  - `description` (text) — full description
  - `price` (numeric, not null) — price in ETB (0 for free/contact-for-price)
  - `currency` (text, default 'ETB')
  - `negotiable` (boolean, default false)
  - `location` (text) — city/area
  - `image_url` (text) — main image
  - `seller_type` (text) — 'Dealer', 'Broker', 'Private', 'Agent', 'Company'
  - `seller_name` (text)
  - `seller_phone` (text)
  - `condition` (text) — 'New', 'Used', 'Refurbished', 'Like New'
  - `attributes` (jsonb) — category-specific fields (e.g. make, model, year, mileage, bedrooms, area_sqm, brand, etc.)
  - `featured` (boolean, default false)
  - `status` (text, default 'active') — 'active', 'sold', 'rented', 'closed'
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `listings`.
- Allow anon + authenticated to read all active listings (public marketplace, no sign-in).
- Allow anon + authenticated to insert/update/delete.

3. Indexes
- Index on `category`, `condition`, `seller_type`, `status`, `featured`, `price`, `created_at`.
- GIN index on `attributes` for JSONB queries.
*/

CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  title text NOT NULL,
  description text,
  price numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'ETB',
  negotiable boolean NOT NULL DEFAULT false,
  location text,
  image_url text,
  seller_type text NOT NULL DEFAULT 'Private',
  seller_name text,
  seller_phone text,
  condition text NOT NULL DEFAULT 'Used',
  attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_listings" ON listings;
CREATE POLICY "anon_select_listings" ON listings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_listings" ON listings;
CREATE POLICY "anon_insert_listings" ON listings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_listings" ON listings;
CREATE POLICY "anon_update_listings" ON listings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_listings" ON listings;
CREATE POLICY "anon_delete_listings" ON listings FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_condition ON listings(condition);
CREATE INDEX IF NOT EXISTS idx_listings_seller_type ON listings(seller_type);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON listings(featured);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_attributes ON listings USING GIN (attributes);
