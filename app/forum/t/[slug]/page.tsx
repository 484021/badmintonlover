import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MessageSquare, Clock, Eye, Pin, Lock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { formatDistanceToNow } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ReplyForm } from '@/components/forum/reply-form'

export const revalidate = 0 // Always get fresh data

async function getThread(slug: string) {
  const supabase = await createClient()
  
  const { data: thread } = await supabase
    .from('threads')
    .select(`
      *,
      categories (name, slug, icon, color),
      profiles!threads_author_id_fkey (username, avatar_url, bio, post_count, thread_count)
    `)
    .eq('slug', slug)
    .single()

  if (!thread) return null

  // Increment view count
  await supabase
    .from('threads')
    .update({ view_count: thread.view_count + 1 })
    .eq('id', thread.id)

  return thread
}

async function getPosts(threadId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!posts_author_id_fkey (username, avatar_url, bio, post_count, thread_count, created_at)
    `)
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true })
  return data || []
}

async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const thread = await getThread(slug)
  
  if (!thread) {
    notFound()
  }

  const [posts, user] = await Promise.all([
    getPosts(thread.id),
    getCurrentUser(),
  ])

  const isLocked = thread.is_locked

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/forum" className="hover:text-foreground">
              Forum
            </Link>
            <span>/</span>
            <Link href={`/forum/c/${thread.categories.slug}`} className="hover:text-foreground">
              {thread.categories.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{thread.title}</span>
          </div>

          {/* Thread Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`rounded-lg ${thread.categories.color} p-3 text-3xl flex-shrink-0`}>
                  {thread.categories.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {thread.is_pinned && <Pin className="h-5 w-5 text-primary" />}
                    {thread.is_locked && <Lock className="h-5 w-5 text-muted-foreground" />}
                    <h1 className="text-3xl font-bold tracking-tight">{thread.title}</h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="outline">{thread.categories.name}</Badge>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {thread.reply_count} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {thread.view_count} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Original Post */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Author Sidebar */}
                <div className="w-48 flex-shrink-0">
                  <div className="sticky top-6">
                    <Link href={`/forum/user/${thread.profiles.username}`} className="block">
                      <Avatar className="h-24 w-24 mx-auto mb-3">
                        <AvatarImage src={thread.profiles.avatar_url} />
                        <AvatarFallback className="text-2xl">
                          {thread.profiles.username?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="text-center">
                      <Link
                        href={`/forum/user/${thread.profiles.username}`}
                        className="font-semibold hover:text-primary"
                      >
                        {thread.profiles.username || 'Anonymous'}
                      </Link>
                      <div className="mt-2 text-xs text-muted-foreground space-y-1">
                        <div>{thread.profiles.post_count} posts</div>
                        <div>{thread.profiles.thread_count} threads</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {thread.content}
                    </ReactMarkdown>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Posted {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies */}
          {posts.length > 0 && (
            <div className="mb-6 space-y-4">
              <h2 className="text-2xl font-bold">Replies</h2>
              {posts.map((post, index) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Author Sidebar */}
                      <div className="w-48 flex-shrink-0">
                        <div className="sticky top-6">
                          <Link href={`/forum/user/${post.profiles.username}`} className="block">
                            <Avatar className="h-16 w-16 mx-auto mb-2">
                              <AvatarImage src={post.profiles.avatar_url} />
                              <AvatarFallback>
                                {post.profiles.username?.[0]?.toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="text-center">
                            <Link
                              href={`/forum/user/${post.profiles.username}`}
                              className="text-sm font-semibold hover:text-primary"
                            >
                              {post.profiles.username || 'Anonymous'}
                            </Link>
                            <div className="mt-1 text-xs text-muted-foreground space-y-1">
                              <div>{post.profiles.post_count} posts</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reply Content */}
                      <div className="flex-1 min-w-0">
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                          </ReactMarkdown>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            #{index + 1} • Posted {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Reply Form */}
          {!isLocked ? (
            user ? (
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Post a Reply</h3>
                  <ReplyForm threadId={thread.id} threadSlug={thread.slug} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="mb-4 text-muted-foreground">Sign in to reply to this thread</p>
                  <Button asChild>
                    <Link href="/forum">Sign In</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Lock className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">This thread is locked</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
