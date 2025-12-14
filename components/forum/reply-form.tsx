'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'

export function ReplyForm({ threadId, threadSlug }: { threadId: string; threadSlug: string }) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) {
      setError('Please enter a reply')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('You must be signed in to reply')
        return
      }

      // Check if profile exists, create if not
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

      if (!profile) {
        const username = user.user_metadata?.user_name || 
                        user.user_metadata?.full_name || 
                        user.email?.split('@')[0] || 
                        'user'
        
        await supabase.from('profiles').insert({
          id: user.id,
          username,
          avatar_url: user.user_metadata?.avatar_url,
        })
      }

      // Create post
      const { error: postError } = await supabase.from('posts').insert({
        thread_id: threadId,
        author_id: user.id,
        content: content.trim(),
      })

      if (postError) throw postError

      setContent('')
      router.refresh()
    } catch (err) {
      console.error('Error posting reply:', err)
      setError('Failed to post reply. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your reply... (Markdown supported)"
        rows={6}
        className="resize-none"
        disabled={isSubmitting}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Markdown supported: **bold**, *italic*, [links](url), etc.
        </p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Post Reply
        </Button>
      </div>
    </form>
  )
}
