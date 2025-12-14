"use client"

import { Facebook, Twitter, Linkedin, Link as LinkIcon, Mail } from "lucide-react"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : url
  
  const handleShare = (platform: string) => {
    let shareLink = ''
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`
        break
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`
        break
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
        return
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Share:
      </span>
      <button
        onClick={() => handleShare('facebook')}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleShare('email')}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Share via Email"
      >
        <Mail className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleShare('copy')}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
