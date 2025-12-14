import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { MessageSquare, Users, TrendingUp, Clock, Pin, Lock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

export const revalidate = 60 // Revalidate every 60 seconds

async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('display_order')
  return data || []
}

async function getRecentThreads() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('threads')
    .select(`
      *,
      categories (name, slug),
      profiles!threads_author_id_fkey (username, avatar_url)
    `)
    .order('last_activity_at', { ascending: false })
    .limit(10)
  return data || []
}

async function getForumStats() {
  const supabase = await createClient()
  
  const [threadsResult, postsResult, usersResult] = await Promise.all([
    supabase.from('threads').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
  ])

  return {
    threads: threadsResult.count || 0,
    posts: postsResult.count || 0,
    users: usersResult.count || 0,
  }
}

export default async function ForumPage() {
  const [categories, recentThreads, stats] = await Promise.all([
    getCategories(),
    getRecentThreads(),
    getForumStats(),
  ])


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-background to-primary/10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-4 text-5xl font-bold tracking-tight">
              BadmintonLover Community Forum
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Join the world's fastest-growing badminton community. Share tips, discuss strategy, and connect with players globally.
            </p>
            <div className="flex gap-6 justify-center text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{stats.threads.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Discussions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{stats.posts.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{stats.users.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Forum Categories */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold">Forum Categories</h2>
                <Button asChild>
                  <Link href="/forum/new">New Thread</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {categories.map((category) => (
                  <Card key={category.id} className="transition-all hover:shadow-lg">
                    <Link href={`/forum/c/${category.slug}`}>
                      <CardHeader className="flex flex-row items-center gap-4 p-6">
                        <div className={`rounded-lg ${category.color} p-4 text-4xl`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="mb-2 text-xl hover:text-primary transition-colors">
                            {category.name}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {category.description}
                          </CardDescription>
                          <div className="mt-3 flex gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {category.thread_count} threads
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {category.post_count} posts
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="mb-6 text-3xl font-bold">Recent Activity</h2>
              <div className="space-y-3">
                {recentThreads.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-semibold">No threads yet</h3>
                      <p className="mb-4 text-muted-foreground">Be the first to start a discussion!</p>
                      <Button asChild>
                        <Link href="/forum/new">Create First Thread</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  recentThreads.map((thread) => (
                    <Card key={thread.id} className="transition-all hover:shadow-md">
                      <Link href={`/forum/t/${thread.slug}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="mt-1">
                              <AvatarImage src={thread.profiles?.avatar_url} />
                              <AvatarFallback>
                                {thread.profiles?.username?.[0]?.toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {thread.is_pinned && <Pin className="h-4 w-4 text-primary" />}
                                {thread.is_locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                                <h3 className="font-semibold hover:text-primary transition-colors truncate">
                                  {thread.title}
                                </h3>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <Badge variant="outline">{thread.categories?.name}</Badge>
                                <span>by {thread.profiles?.username || 'Anonymous'}</span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  {thread.reply_count} replies
                                </span>
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" />
                                  {thread.view_count} views
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDistanceToNow(new Date(thread.last_activity_at), { addSuffix: true })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="mb-2 text-lg font-bold">Welcome! 👋</h3>
                <p className="mb-4 text-sm opacity-90">
                  Join our global badminton community. Share knowledge, ask questions, and improve your game.
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/forum/new">Start a Discussion</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Forum Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Forum Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✅ Be respectful and constructive</p>
                <p>✅ Search before posting</p>
                <p>✅ Use descriptive titles</p>
                <p>✅ Stay on topic</p>
                <p>❌ No spam or self-promotion</p>
                <p>❌ No offensive content</p>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Link href="/articles" className="block hover:text-primary transition-colors">
                  📚 Articles & Guides
                </Link>
                <Link href="/tools" className="block hover:text-primary transition-colors">
                  🛠️ Badminton Tools
                </Link>
                <Link href="/forum/search" className="block hover:text-primary transition-colors">
                  🔍 Search Forum
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
