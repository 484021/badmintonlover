-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for sign-ups)
CREATE POLICY "Allow public inserts" ON subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reads (for admin panel, optional)
CREATE POLICY "Allow public reads" ON subscribers
  FOR SELECT
  TO public
  USING (true);
