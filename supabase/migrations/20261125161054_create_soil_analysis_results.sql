/*
# Create soil_analysis_results table

1. New Tables
- `soil_analysis_results`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `nitrogen` (numeric, not null) — soil nitrogen value in kg/ha
  - `phosphorus` (numeric, not null) — soil phosphorus value in kg/ha
  - `potassium` (numeric, not null) — soil potassium value in kg/ha
  - `ph_level` (numeric, not null) — soil pH (0-14)
  - `organic_carbon` (numeric, not null) — organic carbon percent
  - `electrical_conductivity` (numeric, not null) — EC in dS/m
  - `moisture` (numeric, not null) — moisture percent
  - `temperature` (numeric, not null) — temperature in Celsius
  - `soil_type` (text, not null) — one of Alluvial, Black, Red, Sandy, Clay, Loamy
  - `quality_rating` (text, not null) — Poor / Average / Good / Excellent
  - `recommended_crops` (text, not null) — comma-separated crop names returned by the tool
  - `language` (text, not null, default 'en') — language used when the analysis ran
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `soil_analysis_results`.
- Grant SELECT and INSERT to `anon` + `authenticated` (no sign-in in this app).
- Allow anon + authenticated read and insert because analyses are intentionally shared/anonymous.
- No UPDATE or DELETE: analyses are write-once records and cannot be tampered with.
*/

CREATE TABLE IF NOT EXISTS soil_analysis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nitrogen numeric NOT NULL,
  phosphorus numeric NOT NULL,
  potassium numeric NOT NULL,
  ph_level numeric NOT NULL,
  organic_carbon numeric NOT NULL,
  electrical_conductivity numeric NOT NULL,
  moisture numeric NOT NULL,
  temperature numeric NOT NULL,
  soil_type text NOT NULL,
  quality_rating text NOT NULL,
  recommended_crops text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE soil_analysis_results ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON soil_analysis_results TO anon, authenticated;

DROP POLICY IF EXISTS "Anyone can view soil analyses" ON soil_analysis_results;
CREATE POLICY "Anyone can view soil analyses" ON soil_analysis_results
FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Anyone can submit soil analyses" ON soil_analysis_results;
CREATE POLICY "Anyone can submit soil analyses" ON soil_analysis_results
FOR INSERT TO anon, authenticated WITH CHECK (true);
