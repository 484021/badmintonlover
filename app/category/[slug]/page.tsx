import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import { getArticlesByCategory, getCategoryInfo, getAllArticles } from "@/lib/content"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return [
    { slug: 'drills' },
    { slug: 'strategy' },
    { slug: 'organizing' },
    { slug: 'equipment' },
    { slug: 'fitness' },
    { slug: 'technique' },
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const categoryInfo = getCategoryInfo(slug)

  return {
    title: `${categoryInfo.name} | BadmintonLover`,
    description: categoryInfo.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const articles = await getArticlesByCategory(slug)
  const categoryInfo = getCategoryInfo(slug)

  if (articles.length === 0 && slug !== 'equipment' && slug !== 'fitness' && slug !== 'technique') {
    // Only show not found if it's not one of the valid categories
    const validCategories = ['drills', 'strategy', 'organizing', 'equipment', 'fitness', 'technique']
    if (!validCategories.includes(slug)) {
      notFound()
    }
  }

  const category = {
    name: categoryInfo.name,
    description: categoryInfo.description,
    articles: articles,
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
        {/* Category Header */}
        <header className="mb-16">
          <h1 className="mb-4 text-balance text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            {category.name}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{category.description}</p>
        </header>

        {/* Articles List */}
        {category.articles.length > 0 ? (
          <div className="space-y-8">
            {category.articles.map((article) => (
              <article
                key={article.slug}
                className="group rounded-lg border border-border bg-muted/20 p-6 transition-colors hover:border-foreground/50"
              >
                <Link href={`/articles/${article.slug}`} className="block">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={article.metadata.date}>
                      {new Date(article.metadata.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>·</span>
                    <Badge variant="outline" className="bg-background text-xs font-medium">
                      {article.metadata.skillLevel.split('-').map((word: string) => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </Badge>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className="mb-3 text-balance text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-muted-foreground">
                    {article.metadata.title}
                  </h2>
                  <p className="text-pretty text-base leading-relaxed text-muted-foreground">{article.metadata.description}</p>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-muted/20 p-12 text-center">
            <p className="text-muted-foreground">No articles in this category yet. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  )
}
