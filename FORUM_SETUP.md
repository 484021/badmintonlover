# Custom Forum Setup Guide

## 🎯 Overview

Your forum will have:
- ✅ Custom database (your data, your control)
- ✅ User authentication with GitHub/Google/Email
- ✅ Categories, threads, and replies
- ✅ User profiles with avatars
- ✅ Real-time updates
- ✅ Markdown support
- ✅ Search functionality
- ✅ Moderation tools
- ✅ FREE hosting (Supabase free tier)

## 📋 Setup Steps (15 minutes)

### Step 1: Create Supabase Account

1. Go to https://supabase.com/
2. Click "Start your project"
3. Sign up with GitHub
4. Create a new project:
   - **Name**: badmintonlover-forum
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
   - Wait 2-3 minutes for project to initialize

### Step 2: Set Up Database

1. In Supabase dashboard, click **SQL Editor** in left sidebar
2. Click **New Query**
3. Copy entire contents of `supabase/schema.sql`
4. Paste into SQL Editor
5. Click **Run** (bottom right)
6. You should see: "Success. No rows returned"

This creates:
- Categories table (6 default categories)
- Threads table
- Posts table
- User profiles table
- All indexes and security policies

### Step 3: Enable Authentication

1. Click **Authentication** in left sidebar
2. Click **Providers** tab
3. Enable providers you want:

**GitHub (Recommended):**
- Toggle ON
- Go to https://github.com/settings/developers
- Click "New OAuth App"
- Application name: BadmintonLover Forum
- Homepage URL: http://localhost:3001
- Authorization callback: `[Copy from Supabase]`
- Click "Register application"
- Copy Client ID and Client Secret
- Paste into Supabase
- Save

**Google:**
- Toggle ON
- Follow similar process with Google Cloud Console

**Email/Password:**
- Already enabled by default
- Users can sign up with email

### Step 4: Get Your API Keys

1. Click **Settings** (gear icon) in left sidebar
2. Click **API** in submenu
3. Copy these values:

**Project URL**: `https://xxxxx.supabase.co`
**anon/public key**: `eyJhbGc...` (long string)

### Step 5: Configure Your App

1. Create `.env.local` in project root (copy from `.env.local.example`)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

3. Restart your dev server

### Step 6: Test It

```bash
npm run dev
```

Visit http://localhost:3001/forum

You should see:
- 6 forum categories
- "Sign In" button
- Clean, professional layout

## 🎨 What's Been Built

### Database Schema (Complete)
- **profiles**: User accounts with stats
- **categories**: Forum categories (Technique, Equipment, etc.)
- **threads**: Discussion threads
- **posts**: Replies to threads
- **Row Level Security**: Only owners can edit/delete

### Files Created
- `lib/supabase/client.ts` - Browser client
- `lib/supabase/server.ts` - Server client
- `supabase/schema.sql` - Complete database schema
- `app/forum/page.tsx` - Forum homepage (needs update)

## 🚀 Next: Build the UI

Now I'll create:
1. Forum homepage with real data from database
2. Thread list page for each category
3. Thread detail page with replies
4. Create thread form
5. Reply form
6. User authentication UI
7. User profile pages
8. Moderation panel

**Would you like me to build all the forum UI components now?**

## 💰 Costs

**Supabase Free Tier includes:**
- 500 MB database
- 1 GB file storage
- 50,000 monthly active users
- Unlimited API requests
- Social auth providers

This is more than enough for starting out. You can upgrade later if needed ($25/month for Pro).

## 🔒 Security

All set up with:
- Row Level Security (RLS)
- Only authenticated users can post
- Users can only edit/delete their own content
- SQL injection protection
- Rate limiting built-in

---

**Ready to continue?** Let me know and I'll build the complete forum UI!
