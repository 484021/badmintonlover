import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MessageSquare, TrendingUp, Clock, Pin, Lock, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

export const revalidate = 30

async function getCategory(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

async function getThreads(categoryId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('threads')
    .select(`
      *,
      profiles!threads_author_id_fkey (username, avatar_url)
    `)
    .eq('category_id', categoryId)
    .order('is_pinned', { ascending: false })
    .order('last_activity_at', { ascending: false })
  return data || []
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    notFound()
  }

  const threads = await getThreads(category.id)

  return (
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <div className={`border-b border-border ${category.color}/10`}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <div className={`rounded-lg ${category.color} p-4 text-5xl`}>
                {category.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight mb-2">
                  {category.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>{category.thread_count} threads</span>
              <span>{category.post_count} posts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Actions Bar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/forum" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to Forum
              </Link>
            </div>
            <Button asChild>
              <Link href={`/forum/new?category=${slug}`}>
                <Plus className="mr-2 h-4 w-4" />
                New Thread
              </Link>
            </Button>
          </div>

          {/* Threads List */}
          <div className="space-y-3">
            {threads.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">No threads yet</h3>
                  <p className="mb-4 text-muted-foreground">
                    Be the first to start a discussion in this category!
                  </p>
                  <Button asChild>
                    <Link href={`/forum/new?category=${slug}`}>
                      Create First Thread
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              threads.map((thread) => (
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
                            {thread.is_pinned && (
                              <Pin className="h-4 w-4 text-primary flex-shrink-0" />
                            )}
                            {thread.is_locked && (
                              <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            )}
                            <h3 className="font-semibold hover:text-primary transition-colors truncate">
                              {thread.title}
                            </h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
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
                              {formatDistanceToNow(new Date(thread.last_activity_at), {
                                addSuffix: true,
                              })}
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
        </div>
      </div>
    </div>
  )
}
