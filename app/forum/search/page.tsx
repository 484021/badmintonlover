'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MessageSquare, TrendingUp, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const supabase = createClient()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    try {
      const { data } = await supabase
        .from('threads')
        .select(`
          *,
          categories (name, slug, icon, color),
          profiles!threads_author_id_fkey (username, avatar_url)
        `)
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .order('last_activity_at', { ascending: false })
        .limit(50)

      setResults(data || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="container max-w-7xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Forum</h1>
        <p className="text-muted-foreground">
          Find discussions, questions, and badminton wisdom (Demo with mock data)
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search threads by keyword... (Demo mode)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSearched && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Found {results.length} {results.length === 1 ? 'thread' : 'threads'} matching "{query}"
          </p>
        </div>
      )}

      {hasSearched && results.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try different keywords or browse categories
            </p>
            <Button asChild variant="outline">
              <Link href="/forum">Back to Forum</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {!hasSearched && (
        <Card>
          <CardContent className="py-16 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Start Your Search</h3>
            <p className="text-muted-foreground">
              Enter keywords to find threads and discussions
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {results.map((thread) => (
          <Card key={thread.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage 
                    src={thread.profiles?.avatar_url} 
                    alt={thread.profiles?.username} 
                  />
                  <AvatarFallback>
                    {thread.profiles?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      className={`${thread.categories?.color} text-white flex-shrink-0`}
                    >
                      {thread.categories?.icon} {thread.categories?.name}
                    </Badge>
                    {thread.is_pinned && (
                      <Badge variant="outline" className="flex-shrink-0">
                        📌 Pinned
                      </Badge>
                    )}
                  </div>

                  <Link 
                    href={`/forum/t/${thread.slug}`}
                    className="block group"
                  >
                    <h3 className="font-semibold text-lg group-hover:text-primary mb-2">
                      {thread.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {thread.content.substring(0, 200)}
                    {thread.content.length > 200 && '...'}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>by {thread.profiles?.username}</span>
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
          </Card>
        ))}
      </div>
    </div>
  )
}
