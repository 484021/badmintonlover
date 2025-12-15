// Quick test to check if Supabase tables exist
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')
  
  // Test 1: Check if categories table exists
  console.log('1️⃣ Testing categories table...')
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .limit(1)
  
  if (catError) {
    console.error('❌ Categories table error:', catError.message)
    console.log('\n⚠️  The database tables do NOT exist!')
    console.log('📝 You need to run the SQL schema in Supabase:')
    console.log('   1. Go to https://supabase.com/dashboard/project/mdvrxrkujpfoajmcfiat/sql/new')
    console.log('   2. Copy the entire COPY_TO_SUPABASE.sql file')
    console.log('   3. Paste it into the SQL Editor')
    console.log('   4. Click "Run"\n')
    return false
  }
  
  console.log(`✅ Categories table exists (${categories?.length || 0} categories found)`)
  
  // Test 2: Check if threads table exists
  console.log('2️⃣ Testing threads table...')
  const { data: threads, error: threadError } = await supabase
    .from('threads')
    .select('*')
    .limit(1)
  
  if (threadError) {
    console.error('❌ Threads table error:', threadError.message)
    return false
  }
  
  console.log(`✅ Threads table exists (${threads?.length || 0} threads found)`)
  
  // Test 3: Check if profiles table exists
  console.log('3️⃣ Testing profiles table...')
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
  
  if (profileError) {
    console.error('❌ Profiles table error:', profileError.message)
    return false
  }
  
  console.log(`✅ Profiles table exists (${profiles?.length || 0} profiles found)`)
  
  // Test 4: Check if posts table exists
  console.log('4️⃣ Testing posts table...')
  const { data: posts, error: postError } = await supabase
    .from('posts')
    .select('*')
    .limit(1)
  
  if (postError) {
    console.error('❌ Posts table error:', postError.message)
    return false
  }
  
  console.log(`✅ Posts table exists (${posts?.length || 0} posts found)`)
  
  console.log('\n✅ All database tables exist! Your forum is ready to use.')
  return true
}

testConnection()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(err => {
    console.error('❌ Error:', err.message)
    process.exit(1)
  })
