'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import slugify from 'slugify'

const categories = [
  { id: 'technique', name: 'Technique & Skills', slug: 'technique' },
  { id: 'equipment', name: 'Equipment Reviews', slug: 'equipment' },
  { id: 'training', name: 'Training & Fitness', slug: 'training' },
  { id: 'tournaments', name: 'Tournaments & Events', slug: 'tournaments' },
  { id: 'pro-circuit', name: 'Professional Circuit', slug: 'pro-circuit' },
  { id: 'beginners', name: 'Beginners Corner', slug: 'beginners' },
]

export function NewThreadForm({ preSelectedCategory }: { preSelectedCategory?: string }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categorySlug, setCategorySlug] = useState(preSelectedCategory || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Please enter a title')
      return
    }
    
    if (!content.trim()) {
      setError('Please enter some content')
      return
    }
    
    if (!categorySlug) {
      setError('Please select a category')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('You must be signed in to create a thread')
        router.push('/forum')
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

      // Get category ID
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single()

      if (!category) {
        setError('Invalid category')
        return
      }

      // Generate unique slug
      let slug = slugify(title, { lower: true, strict: true })
      const { data: existing } = await supabase
        .from('threads')
        .select('id')
        .eq('slug', slug)
        .eq('category_id', category.id)
        .single()

      if (existing) {
        slug = `${slug}-${Date.now()}`
      }

      // Create thread
      const { error: threadError } = await supabase.from('threads').insert({
        category_id: category.id,
        author_id: user.id,
        title: title.trim(),
        slug,
        content: content.trim(),
      })

      if (threadError) throw threadError

      router.push(`/forum/t/${slug}`)
      router.refresh()
    } catch (err) {
      console.error('Error creating thread:', err)
      setError('Failed to create thread. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Thread Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your topic?"
          disabled={isSubmitting}
          maxLength={200}
        />
        <p className="text-xs text-muted-foreground">
          Be clear and descriptive ({title.length}/200 characters)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={categorySlug} onValueChange={setCategorySlug} disabled={isSubmitting}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts, questions, or tips... (Markdown supported)"
          rows={12}
          className="resize-none"
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">
          Markdown supported: **bold**, *italic*, [links](url), code blocks, lists, etc.
        </p>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Thread
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
