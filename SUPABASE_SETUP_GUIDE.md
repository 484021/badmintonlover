# 🚀 Supabase Setup Guide - Step by Step

Follow these steps exactly to get your forum database connected.

---

## Step 1: Create Supabase Account (2 minutes)

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign in with GitHub (recommended) or email
4. You'll land on your dashboard

---

## Step 2: Create New Project (2 minutes)

1. Click **"New Project"**
2. Fill in:
   - **Name:** `badmintonlover` (or whatever you want)
   - **Database Password:** Create a strong password (SAVE THIS!)
   - **Region:** Choose closest to your users (e.g., `us-east-1` for US)
   - **Pricing Plan:** Free tier is perfect to start
3. Click **"Create new project"**
4. Wait 2 minutes while project spins up ☕

---

## Step 3: Get Your API Keys (1 minute)

1. Once project is ready, go to **Settings** (gear icon on left sidebar)
2. Click **API** in the settings menu
3. You'll see two keys:
   - **Project URL** - Looks like: `https://xxxxx.supabase.co`
   - **anon/public key** - Long string starting with `eyJ...`

4. **Copy both** - you'll need them next!

---

## Step 4: Add Environment Variables (2 minutes)

### For Local Development:

Create or update `.env.local` in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### For Vercel (Production):

1. Go to your Vercel dashboard
2. Select your badmintonlover project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:
   - Name: `NEXT_PUBLIC_SUPABASE_URL` Value: `https://xxxxx.supabase.co`
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` Value: `eyJ...`
5. Click **Save**
6. **Redeploy** your site (Vercel → Deployments → click "..." → Redeploy)

---

## Step 5: Run Database Schema (3 minutes)

This creates all the tables for your forum.

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the ENTIRE contents of `supabase/schema.sql` (I'll show you in a moment)
4. Paste into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see ✅ Success message

**The schema creates:**
- `profiles` - User information
- `categories` - Forum categories (6 pre-seeded)
- `threads` - Forum discussions
- `posts` - Replies to threads
- All security policies and indexes

---

## Step 6: Enable GitHub Authentication (5 minutes)

This allows users to sign in with GitHub.

### A. Get GitHub OAuth Credentials

1. Go to **https://github.com/settings/developers**
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in:
   - **Application name:** `BadmintonLover Forum`
   - **Homepage URL:** `https://your-domain.com`
   - **Authorization callback URL:** `https://your-project-ref.supabase.co/auth/v1/callback`
4. Click **"Register application"**
5. **Copy the Client ID**
6. Click **"Generate a new client secret"** → **Copy the secret**

### B. Add to Supabase

1. In Supabase dashboard, go to **Authentication** (left sidebar)
2. Click **Providers** tab
3. Find **GitHub** in the list
4. Toggle it **ON**
5. Paste:
   - **Client ID** from GitHub
   - **Client Secret** from GitHub
6. Click **"Save"**

---

## Step 7: Test Connection Locally (2 minutes)

```bash
# Make sure .env.local has your keys
# Then restart your dev server

npm run dev
```

Visit **http://localhost:3000/forum** and try:
1. Click **"Demo Login"** button
2. It should redirect to GitHub
3. Authorize the app
4. You should be logged in!

---

## Step 8: Seed Forum with AI Content (2 minutes)

Now that database is connected, let's populate it with discussion threads:

### Option A: Run the Seeder (When Code is Updated)
```bash
npm run seed:supabase
```

### Option B: Manual Test Post
1. Go to http://localhost:3000/forum/new
2. Sign in with GitHub
3. Create a test thread
4. Post a reply

If both work, **YOU'RE DONE!** 🎉

---

## Step 9: Verify Production (1 minute)

1. Make sure environment variables are in Vercel
2. Redeploy your site
3. Visit your live domain
4. Test forum login and posting

---

## 🎯 Quick Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Copied API keys
- [ ] Added to .env.local (local)
- [ ] Added to Vercel environment variables (production)
- [ ] Ran schema.sql in SQL Editor
- [ ] Enabled GitHub OAuth
- [ ] Tested login locally
- [ ] Redeployed to Vercel
- [ ] Tested on live site

---

## 🐛 Troubleshooting

### "Failed to fetch" error
- Check environment variables are correct
- Make sure URL starts with `https://`
- Verify anon key is the PUBLIC key, not service role key

### GitHub login doesn't work
- Verify callback URL matches exactly: `https://xxxxx.supabase.co/auth/v1/callback`
- Check both Client ID and Secret are correct
- Make sure GitHub OAuth app is not suspended

### Tables not found
- Did you run the schema.sql?
- Check SQL Editor for any error messages
- Try running schema again (it's safe, has IF NOT EXISTS)

### Can't post to forum
- Check RLS policies ran (they're in schema.sql)
- Verify user is logged in
- Check browser console for errors

---

## 📞 Need Help?

Stuck on any step? Let me know which one and I'll help you through it!

---

## ✅ What Happens After Setup

Once Supabase is connected:

1. **Forum Login** - Real GitHub OAuth (no more demo mode)
2. **Create Threads** - Users can post discussions
3. **Post Replies** - Real-time community interaction
4. **User Profiles** - Automatic profile creation
5. **Search** - Find threads across all content
6. **AI Seeding** - Populate with article-based discussions

Your forum will be **fully functional** and ready for your badminton community! 🏸

---

## 🚀 Next Steps After Supabase

1. **Seed AI content** - Run `npm run seed:supabase`
2. **Test everything** - Create threads, post replies
3. **Invite beta users** - Get feedback from friends
4. **Monitor analytics** - Watch Sign-ups and activity
5. **Grow community** - Share in badminton groups

You're launching a real platform! 🎉
