# Setting Up Giscus Comments

## 📋 Setup Steps (5 minutes)

### 1. Enable GitHub Discussions on Your Repository

1. Go to: https://github.com/484021/badmintonlover/settings
2. Scroll down to "Features" section
3. Check the box: ☑️ **Discussions**
4. Click "Set up discussions"
5. GitHub will create a welcome discussion post

### 2. Get Your Giscus Configuration

1. Go to: https://giscus.app/
2. Under "Repository" section:
   - Enter: `484021/badmintonlover`
   - The page will verify your repo is public and has Discussions enabled
   
3. Under "Page ↔️ Discussions Mapping":
   - Select: **Discussion title contains page `pathname`** ✅ (already set)
   
4. Under "Discussion Category":
   - Choose: **Announcements** or create a new category "Comments"
   - Copy the `data-category-id` value shown
   
5. Under "Features":
   - ✅ Enable reactions
   - ✅ Place comment box above comments
   
6. The page will show you the configuration values:
   - Copy `data-repo-id` 
   - Copy `data-category-id`

### 3. Update the Component

Open `components/giscus-comments.tsx` and replace:
- Line 13: `script.setAttribute("data-repo-id", "YOUR_REPO_ID")`
  - Replace `YOUR_REPO_ID` with the actual repo ID from giscus.app
  
- Line 15: `script.setAttribute("data-category-id", "YOUR_CATEGORY_ID")`
  - Replace `YOUR_CATEGORY_ID` with the actual category ID from giscus.app

### 4. Test It Out

```bash
npm run dev
```

Visit any article page and scroll to the bottom. You should see the Giscus comment box!

## ✨ What You Get

- **Threaded discussions** on every article
- **GitHub authentication** (reduces spam)
- **Markdown support** in comments
- **Reactions** (👍 ❤️ 🎉 etc.)
- **Email notifications** for authors
- **SEO benefits** (GitHub indexes discussions)
- **No moderation needed** (GitHub handles it)

## 🎨 Customization Options

### Change Theme
The component automatically switches between light/dark based on your site theme.

### Change Position
To put comments before related articles, move the `<GiscusComments />` section up in the file.

### Change Category
Create specific categories in GitHub Discussions:
- "Article Comments"
- "Q&A"
- "Feature Requests"

## 🔒 Moderation

All comments go through GitHub, so you can:
1. Edit/delete comments from GitHub Discussions
2. Block users who spam
3. Lock discussions if needed
4. Get email notifications for new comments

## 📊 Benefits for SEO

- Each discussion creates backlinks to your article
- GitHub indexes all discussions (improves discoverability)
- User-generated content = more keywords
- Shows engagement signals to Google

## 🚀 Next Steps

After setup:
1. Add a comment on each existing article to start discussions
2. Respond to comments within 24 hours
3. Pin helpful comments
4. Create discussion templates in GitHub

---

**Questions?** Comment below (once set up! 😄) or check: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md
