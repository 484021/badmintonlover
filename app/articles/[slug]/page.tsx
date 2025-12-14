import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { SkillBadge } from "@/components/skill-badge"
import { ShareButtons } from "@/components/share-buttons"
import { GiscusComments } from "@/components/giscus-comments"
import { getArticleBySlug, getAllArticles } from "@/lib/content"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, User } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: `${article.metadata.title} | BadmintonLover`,
    description: article.metadata.description,
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description,
      type: "article",
      publishedTime: article.metadata.date,
      tags: article.metadata.tags,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const categoryName = article.metadata.category.charAt(0).toUpperCase() + article.metadata.category.slice(1)
  const relatedArticles = (await getAllArticles())
    .filter(a => a.metadata.category === article.metadata.category && a.slug !== article.slug)
    .slice(0, 3)

  // JSON-LD Schema for Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.metadata.title,
    description: article.metadata.description,
    image: article.metadata.image || 'https://badmintonlover.com/og-image.jpg',
    datePublished: article.metadata.date,
    dateModified: article.metadata.date,
    author: {
      '@type': 'Person',
      name: article.metadata.author || 'BadmintonLover Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BadmintonLover',
      logo: {
        '@type': 'ImageObject',
        url: 'https://badmintonlover.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://badmintonlover.com/articles/${slug}`,
    },
    keywords: article.metadata.tags?.join(', '),
    articleSection: article.metadata.category,
    wordCount: article.content?.toString().split(/\s+/).length || 0,
  }

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl py-12">
          <article>
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link 
                href={`/category/${article.metadata.category}`}
                className="hover:text-foreground transition-colors"
              >
                {categoryName}
              </Link>
              <span>/</span>
              <span className="text-foreground">{article.metadata.title}</span>
            </div>

            {/* Article Header */}
            <header className="mb-8 border-b border-border pb-8">
              <Badge className="mb-4 bg-primary text-primary-foreground">
                {categoryName.toUpperCase()}
              </Badge>
              <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {article.metadata.title}
              </h1>
              <p className="mb-6 text-xl leading-relaxed text-muted-foreground">
                {article.metadata.description}
              </p>
              
              {/* Author & Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium text-foreground">
                    {article.metadata.author || 'BadmintonLover Team'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.metadata.date}>
                    {new Date(article.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="mt-6">
                <ShareButtons title={article.metadata.title} url={`/articles/${article.slug}`} />
              </div>
            </header>

            {/* Article Body - MDX Content */}
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mb-12">
              {article.content}
            </div>

            {/* Tags */}
            {article.metadata.tags && article.metadata.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {article.metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share Again */}
            <div className="border-y border-border py-6">
              <ShareButtons title={article.metadata.title} url={`/articles/${article.slug}`} />
            </div>

            {/* Newsletter CTA */}
            <div className="my-12 rounded-lg border border-border bg-muted/30 p-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                Enjoyed this article?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Get weekly badminton insights and training tips delivered to your inbox.
              </p>
              <form className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="mb-8 text-2xl font-bold uppercase tracking-tight text-foreground">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/articles/${related.slug}`}
                    className="group rounded-lg border border-border p-4 transition-all hover:border-foreground/50 hover:shadow-lg"
                  >
                    <Badge variant="outline" className="mb-2 text-xs">
                      {related.metadata.category.toUpperCase()}
                    </Badge>
                    <h3 className="mb-2 font-bold text-foreground group-hover:text-foreground/80">
                      {related.metadata.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.metadata.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {related.readTime}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Comments Section */}
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-tight text-foreground">
              Join the Discussion
            </h2>
            <GiscusComments />
          </section>
        </div>
      </div>
      </div>
    </>
  )
}
