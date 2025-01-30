/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (enum: ADMIN, OWNER, GUEST)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `properties`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `address` (text)
      - `owner_id` (uuid, foreign key to users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `units`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `property_id` (uuid, foreign key to properties)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `unit_id` (uuid, foreign key to units)
      - `guest_id` (uuid, foreign key to users)
      - `check_in` (timestamp)
      - `check_out` (timestamp)
      - `status` (enum: PENDING, CONFIRMED, CANCELLED, COMPLETED)
      - `total_guests` (integer)
      - `special_requests` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enums
CREATE TYPE user_role AS ENUM ('ADMIN', 'OWNER', 'GUEST');
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  role user_role NOT NULL DEFAULT 'GUEST',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text NOT NULL,
  owner_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create units table
CREATE TABLE IF NOT EXISTS units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid REFERENCES units(id) ON DELETE CASCADE,
  guest_id uuid REFERENCES users(id) ON DELETE CASCADE,
  check_in timestamptz NOT NULL,
  check_out timestamptz NOT NULL,
  status booking_status NOT NULL DEFAULT 'PENDING',
  total_guests integer NOT NULL DEFAULT 1,
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for properties
CREATE POLICY "Owners can CRUD own properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Anyone can view properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for units
CREATE POLICY "Anyone can view units"
  ON units
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owners can CRUD own units"
  ON units
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = units.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Create policies for bookings
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (guest_id = auth.uid());

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = guest_id);

CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (guest_id = auth.uid());