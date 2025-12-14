#!/usr/bin/env tsx
/**
 * Seed Forum with AI-Generated Threads from Articles
 * 
 * Usage (when Supabase is connected):
 *   npx tsx scripts/seed-forum-from-articles.ts
 * 
 * This script:
 * 1. Reads all articles from content directory
 * 2. Generates engaging forum threads for each
 * 3. Creates realistic follow-up replies
 * 4. Seeds everything to Supabase
 */

import { generateAllThreads, generateThreadReplies } from '../lib/ai-forum-seeder'
import { getAllArticles } from '../lib/content'

// For local development, we'll generate and display the threads
async function seedForumLocal() {
  console.log('🤖 AI Forum Seeder - Generating Threads from Articles...\n')
  
  try {
    const articles = await getAllArticles()
    console.log(`📚 Found ${articles.length} articles\n`)
    
    const threads = await generateAllThreads()
    
    console.log('🎯 Generated Forum Threads:\n')
    console.log('=' .repeat(80))
    
    threads.forEach((thread, index) => {
      const article = articles[index]
      console.log(`\n📝 Thread ${index + 1}:`)
      console.log(`Category: ${thread.categoryId}`)
      console.log(`Title: ${thread.title}`)
      console.log(`Slug: ${thread.slug}`)
      console.log(`\nContent Preview:`)
      console.log(thread.content.substring(0, 200) + '...')
      
      // Generate sample replies
      const replies = generateThreadReplies(article, 2)
      console.log(`\n💬 Sample Replies (${replies.length}):`)
      replies.forEach((reply, i) => {
        console.log(`\n  Reply ${i + 1}:`)
        console.log(`  ${reply.substring(0, 100)}...`)
      })
      
      console.log('\n' + '-'.repeat(80))
    })
    
    console.log('\n✅ Preview complete!')
    console.log('\n💡 To seed to database:')
    console.log('   1. Connect Supabase (add .env.local)')
    console.log('   2. Run: npx tsx scripts/seed-forum-to-supabase.ts')
    
  } catch (error) {
    console.error('❌ Error generating threads:', error)
    process.exit(1)
  }
}

// For Supabase (when connected)
async function seedForumToSupabase() {
  console.log('🚀 Seeding forum to Supabase...\n')
  
  // Import Supabase client (commented out for local dev)
  // const { createClient } = require('@supabase/supabase-js')
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY! // Need service role for bot user
  // )
  
  try {
    const articles = await getAllArticles()
    const threads = await generateAllThreads()
    
    // TODO: When Supabase is connected:
    // 1. Create a bot user account
    // 2. Insert threads with bot as author
    // 3. Generate and insert AI replies
    // 4. Update thread counts
    
    console.log('⚠️  Supabase not connected yet')
    console.log('Run seed-forum-from-articles.ts for local preview')
    
  } catch (error) {
    console.error('❌ Error seeding forum:', error)
    process.exit(1)
  }
}

// Run the appropriate script
if (process.argv.includes('--supabase')) {
  seedForumToSupabase()
} else {
  seedForumLocal()
}
