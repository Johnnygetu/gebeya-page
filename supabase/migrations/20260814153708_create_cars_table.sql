/*
# Create cars table for car marketplace

1. New Tables
- `cars`
  - `id` (uuid, primary key)
  - `make` (text, not null) — e.g. Toyota, Suzuki, BMW
  - `model` (text, not null) — e.g. Corolla, Swift
  - `year` (int, not null) — manufacture year
  - `price` (numeric, not null) — price in ETB (Ethiopian Birr)
  - `mileage` (int) — kilometers driven
  - `condition` (text) — 'New', 'Used', 'Certified Pre-Owned'
  - `transmission` (text) — 'Automatic', 'Manual'
  - `fuel_type` (text) — 'Petrol', 'Diesel', 'Electric', 'Hybrid'
  - `body_type` (text) — 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Pickup', 'Minivan'
  - `color` (text)
  - `engine_size` (text) — e.g. '1.6L', '2.0L'
  - `seller_type` (text) — 'Dealer', 'Broker', 'Private'
  - `seller_name` (text)
  - `location` (text) — city in Ethiopia
  - `description` (text)
  - `image_url` (text) — main image URL
  - `featured` (boolean, default false)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `cars`.
- Allow anon + authenticated to read all listings (public marketplace, no sign-in).
- Allow anon + authenticated to insert/update/delete (admin-style for demo).

3. Indexes
- Index on `make`, `model`, `condition`, `seller_type`, `fuel_type`, `transmission`, `body_type`, `year`, `price`, `featured`, `created_at`.
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year int NOT NULL,
  price numeric NOT NULL,
  mileage int DEFAULT 0,
  condition text NOT NULL DEFAULT 'Used',
  transmission text NOT NULL DEFAULT 'Automatic',
  fuel_type text NOT NULL DEFAULT 'Petrol',
  body_type text DEFAULT 'Sedan',
  color text,
  engine_size text,
  seller_type text NOT NULL DEFAULT 'Dealer',
  seller_name text,
  location text,
  description text,
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_cars" ON cars;
CREATE POLICY "anon_select_cars" ON cars FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_cars" ON cars;
CREATE POLICY "anon_insert_cars" ON cars FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_cars" ON cars;
CREATE POLICY "anon_update_cars" ON cars FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_cars" ON cars;
CREATE POLICY "anon_delete_cars" ON cars FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_cars_make ON cars(make);
CREATE INDEX IF NOT EXISTS idx_cars_model ON cars(model);
CREATE INDEX IF NOT EXISTS idx_cars_condition ON cars(condition);
CREATE INDEX IF NOT EXISTS idx_cars_seller_type ON cars(seller_type);
CREATE INDEX IF NOT EXISTS idx_cars_fuel_type ON cars(fuel_type);
CREATE INDEX IF NOT EXISTS idx_cars_transmission ON cars(transmission);
CREATE INDEX IF NOT EXISTS idx_cars_body_type ON cars(body_type);
CREATE INDEX IF NOT EXISTS idx_cars_year ON cars(year);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
CREATE INDEX IF NOT EXISTS idx_cars_featured ON cars(featured);
CREATE INDEX IF NOT EXISTS idx_cars_created_at ON cars(created_at DESC);
