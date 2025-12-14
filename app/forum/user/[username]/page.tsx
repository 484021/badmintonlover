import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MessageSquare, FileText, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { formatDistanceToNow } from 'date-fns'

export const revalidate = 60

async function getProfile(username: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()
  return data
}

async function getUserThreads(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('threads')
    .select(`
      *,
      categories (name, slug, icon, color)
    `)
    .eq('author_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)
  return data || []
}

async function getUserPosts(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select(`
      *,
      threads (title, slug)
    `)
    .eq('author_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)
  return data || []
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const profile = await getProfile(username)
  
  if (!profile) {
    notFound()
  }

  const [threads, posts] = await Promise.all([
    getUserThreads(profile.id),
    getUserPosts(profile.id),
  ])

  const joinedDate = new Date(profile.created_at)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link
            href="/forum"
            className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Forum
          </Link>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                      <AvatarImage src={profile.avatar_url} />
                      <AvatarFallback className="text-4xl">
                        {profile.username?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold mb-1">{profile.username}</h1>
                    {profile.bio && (
                      <p className="text-sm text-muted-foreground mb-4">{profile.bio}</p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined {formatDistanceToNow(joinedDate, { addSuffix: true })}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {profile.thread_count}
                      </div>
                      <div className="text-xs text-muted-foreground">Threads</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {profile.post_count}
                      </div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Threads */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recent Threads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {threads.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">
                      No threads created yet
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {threads.map((thread) => (
                        <Link
                          key={thread.id}
                          href={`/forum/t/${thread.slug}`}
                          className="block p-4 rounded-lg border border-border hover:border-foreground/50 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`rounded-md ${thread.categories.color} p-2 text-xl`}>
                              {thread.categories.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                                {thread.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                <Badge variant="outline">{thread.categories.name}</Badge>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  {thread.reply_count} replies
                                </span>
                                <span>
                                  {formatDistanceToNow(new Date(thread.created_at), {
                                    addSuffix: true,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Recent Replies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {posts.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">
                      No replies posted yet
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {posts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/forum/t/${post.threads.slug}`}
                          className="block p-4 rounded-lg border border-border hover:border-foreground/50 hover:shadow-md transition-all"
                        >
                          <h3 className="font-semibold mb-2 text-sm hover:text-primary transition-colors">
                            Re: {post.threads.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {post.content}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
