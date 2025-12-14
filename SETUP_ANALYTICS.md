# Google Analytics & Search Console Setup Guide

## 🔍 Step 1: Google Analytics Setup

### Create Google Analytics Account
1. Go to https://analytics.google.com/
2. Click "Start measuring"
3. Enter Account name: "BadmintonLover"
4. Check all data sharing settings
5. Click "Next"

### Set Up Property
1. Property name: "BadmintonLover Website"
2. Reporting time zone: Your timezone
3. Currency: USD
4. Click "Next"

### Business Information
1. Industry: Sports
2. Business size: Small
3. Intended use: "Publish content"
4. Click "Create"
5. Accept Terms of Service

### Get Measurement ID
1. Choose platform: "Web"
2. Enter website URL: badmintonlover.com
3. Stream name: "BadmintonLover Main"
4. Copy your **Measurement ID** (format: G-XXXXXXXXXX)
5. Click "Create stream"

### Add to Your Website
1. Create file `.env.local` in project root
2. Add: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. Replace with your actual ID
4. Restart dev server

**✅ Done!** Analytics will start collecting data within 24 hours.

---

## 🔎 Step 2: Google Search Console Setup

### Verify Your Website
1. Go to https://search.google.com/search-console/
2. Click "Add Property"
3. Choose "URL prefix"
4. Enter: https://badmintonlover.com
5. Click "Continue"

### Verification Methods (Choose One)

**Method 1: HTML File Upload** (Easiest)
1. Download verification file
2. Place in `public/` folder
3. Deploy to production
4. Click "Verify"

**Method 2: HTML Tag** (Already added)
1. Copy verification meta tag
2. Replace in `app/layout.tsx` line with `YOUR_VERIFICATION_CODE`
3. Deploy to production
4. Click "Verify"

**Method 3: Google Analytics** (If already set up)
1. Select "Google Analytics"
2. Use same account
3. Click "Verify"

### Submit Sitemap
1. After verification, go to "Sitemaps" in left menu
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Enter: `sitemap-0.xml`
5. Click "Submit"

**✅ Done!** Search Console will start showing data in 2-3 days.

---

## 📊 Step 3: Verify Everything Works

### Test Google Analytics
1. Visit your website
2. Open Google Analytics
3. Go to Reports > Realtime
4. You should see yourself as an active user
5. Navigate a few pages
6. Confirm events are firing

### Test Search Console
1. Go to URL Inspection
2. Enter your homepage URL
3. Click "Request Indexing"
4. Do this for your top 5 articles
5. Google will crawl within days

### Test Sitemap
1. Visit: https://yourdomain.com/sitemap.xml
2. Should show list of URLs
3. Check all pages are included
4. Verify last modified dates are correct

---

## 🎯 Step 4: Set Up Goals & Conversions

### Google Analytics Goals
1. Go to Admin > Events
2. Mark as conversions:
   - `newsletter_signup`
   - `affiliate_click`
   - `share_article`
   - `download_resource`

### Custom Events (Add Later)
```javascript
// When user signs up for newsletter
gtag('event', 'newsletter_signup', {
  'location': 'footer'
});

// When user clicks affiliate link
gtag('event', 'affiliate_click', {
  'product': 'racket_name'
});
```

---

## 📈 Step 5: What to Track Weekly

### Google Analytics Metrics
- **Users**: How many unique visitors
- **Sessions**: Total visits
- **Bounce Rate**: Should be < 50%
- **Average Session Duration**: Goal 2+ minutes
- **Pages per Session**: Goal 2.5+
- **Top Pages**: Your best performers
- **Traffic Sources**: Where visitors come from
- **Conversions**: Email signups, clicks

### Google Search Console Metrics
- **Total Clicks**: From Google search
- **Total Impressions**: How often you appear
- **Average CTR**: Should be > 3%
- **Average Position**: Goal: < 10 for top keywords
- **Top Queries**: What people search to find you
- **Top Pages**: Which pages rank best
- **Coverage Issues**: Fix any errors

---

## 🔧 Troubleshooting

### Analytics Not Working?
- Check `.env.local` file exists
- Verify Measurement ID is correct
- Restart dev server: `npm run dev`
- Clear browser cache
- Wait 24 hours for data to appear

### Search Console Not Showing Data?
- Verification can take 24-48 hours
- Sitemap indexing takes 3-7 days
- Make sure site is live (not localhost)
- Check robots.txt allows crawling

### No Impressions in Search Console?
- Content needs time to rank (2-4 weeks minimum)
- Check you're targeting actual search keywords
- Verify pages are indexed (use URL Inspection)
- Make sure content is high quality (2000+ words)

---

## 📱 Recommended: Install Mobile Apps

### Google Analytics App
- Real-time monitoring
- Weekly reports
- Get iOS/Android app

### Search Console App
- Get alerts for issues
- Monitor rankings on-the-go
- Get iOS/Android app

---

## 🎓 Resources

### Learn Google Analytics
- https://analytics.google.com/analytics/academy/
- Free courses from Google
- Certificate available

### Learn Search Console
- https://developers.google.com/search/docs
- Official documentation
- Best practices guide

---

## ✅ Checklist

- [ ] Google Analytics account created
- [ ] Measurement ID added to `.env.local`
- [ ] Google Analytics working (check Realtime)
- [ ] Search Console verified
- [ ] Sitemap submitted
- [ ] URL inspection for top pages
- [ ] Goals/conversions set up
- [ ] Weekly tracking schedule created
- [ ] Mobile apps installed

**Next:** Start tracking your first week of data!
