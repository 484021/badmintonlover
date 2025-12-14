# Copy this into Supabase SQL Editor

# This creates your entire forum database
# Run this in one go - just copy, paste, and click "Run"

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  post_count INTEGER DEFAULT 0,
  thread_count INTEGER DEFAULT 0
);

-- Forum categories
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  display_order INTEGER DEFAULT 0,
  thread_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Forum threads
CREATE TABLE threads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(category_id, slug)
);

-- Forum posts (replies)
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  thread_id UUID REFERENCES threads(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_threads_category ON threads(category_id);
CREATE INDEX idx_threads_author ON threads(author_id);
CREATE INDEX idx_threads_last_activity ON threads(last_activity_at DESC);
CREATE INDEX idx_posts_thread ON posts(thread_id);
CREATE INDEX idx_posts_author ON posts(author_id);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT USING (true);

-- Threads policies
CREATE POLICY "Threads are viewable by everyone"
  ON threads FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create threads"
  ON threads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own threads"
  ON threads FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own threads"
  ON threads FOR DELETE USING (auth.uid() = author_id);

-- Posts policies
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE USING (auth.uid() = author_id);

-- Functions to update counts
CREATE OR REPLACE FUNCTION update_thread_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE categories SET thread_count = thread_count + 1 WHERE id = NEW.category_id;
    UPDATE profiles SET thread_count = thread_count + 1 WHERE id = NEW.author_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE categories SET thread_count = thread_count - 1 WHERE id = OLD.category_id;
    UPDATE profiles SET thread_count = thread_count - 1 WHERE id = OLD.author_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_post_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE threads SET reply_count = reply_count + 1, last_activity_at = NEW.created_at WHERE id = NEW.thread_id;
    UPDATE categories SET post_count = post_count + 1 WHERE id = (SELECT category_id FROM threads WHERE id = NEW.thread_id);
    UPDATE profiles SET post_count = post_count + 1 WHERE id = NEW.author_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE threads SET reply_count = reply_count - 1 WHERE id = OLD.thread_id;
    UPDATE categories SET post_count = post_count - 1 WHERE id = (SELECT category_id FROM threads WHERE id = OLD.thread_id);
    UPDATE profiles SET post_count = post_count - 1 WHERE id = OLD.author_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER on_thread_created AFTER INSERT OR DELETE ON threads FOR EACH ROW EXECUTE FUNCTION update_thread_counts();
CREATE TRIGGER on_post_created AFTER INSERT OR DELETE ON posts FOR EACH ROW EXECUTE FUNCTION update_post_counts();

-- Insert default categories (6 badminton categories)
INSERT INTO categories (name, slug, description, icon, color, display_order) VALUES
  ('Technique & Skills', 'technique', 'Discuss shots, footwork, grips, and improve your game', '🏸', 'bg-blue-500', 1),
  ('Equipment Reviews', 'equipment', 'Rackets, shoes, strings, and gear recommendations', '🎾', 'bg-green-500', 2),
  ('Training & Fitness', 'training', 'Workout routines, drills, and conditioning tips', '💪', 'bg-orange-500', 3),
  ('Tournaments & Events', 'tournaments', 'Find players, organize games, tournament discussion', '🏆', 'bg-purple-500', 4),
  ('Professional Circuit', 'pro-circuit', 'BWF tournaments, player news, match discussions', '⭐', 'bg-red-500', 5),
  ('Beginners Corner', 'beginners', 'New to badminton? Start here with basic questions', '🌱', 'bg-cyan-500', 6);
