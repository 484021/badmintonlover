import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getFeaturedArticles, getAllArticles } from "@/lib/content"
import { ArrowRight, TrendingUp } from "lucide-react"
import Image from "next/image"

export default async function Home() {
  const featuredArticles = await getFeaturedArticles(3)
  const allArticles = await getAllArticles()

  const [heroArticle, ...otherFeatured] = featuredArticles
  const latestArticles = allArticles.slice(0, 6)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        {heroArticle && (
          <section className="border-b border-border py-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <Link href={`/articles/${heroArticle.slug}`} className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <Badge className="mb-3 bg-primary text-primary-foreground">
                    {heroArticle.metadata.category.toUpperCase()}
                  </Badge>
                  <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {heroArticle.metadata.title}
                  </h2>
                </div>
              </Link>
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>Featured Story</span>
                </div>
                <Link href={`/articles/${heroArticle.slug}`} className="group">
                  <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors sm:text-5xl">
                    {heroArticle.metadata.title}
                  </h1>
                </Link>
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  {heroArticle.metadata.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{new Date(heroArticle.metadata.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{heroArticle.readTime}</span>
                </div>
                <Link 
                  href={`/articles/${heroArticle.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground hover:gap-3 transition-all"
                >
                  Read Full Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Latest Stories Grid */}
        <section className="border-b border-border py-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-foreground">
              Latest Stories
            </h2>
            <Link href="/category/all" className="text-sm font-semibold uppercase tracking-wide text-foreground hover:text-foreground/80 transition-colors">
              View All
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <article key={article.slug} className="group">
                <Link href={`/articles/${article.slug}`} className="block">
                  <div className="mb-4 aspect-[16/10] overflow-hidden rounded-lg bg-muted">
                    {/* Placeholder for future images */}
                    <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-semibold uppercase">
                      {article.metadata.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.metadata.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
                    {article.metadata.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {article.metadata.description}
                  </p>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {article.readTime}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="border-b border-border py-12">
          <h2 className="mb-8 text-2xl font-bold uppercase tracking-tight text-foreground">
            Explore Topics
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Technique", href: "/category/technique", color: "from-blue-500/20 to-blue-500/5" },
              { name: "Strategy", href: "/category/strategy", color: "from-green-500/20 to-green-500/5" },
              { name: "Drills", href: "/category/drills", color: "from-orange-500/20 to-orange-500/5" },
              { name: "Equipment", href: "/category/equipment", color: "from-purple-500/20 to-purple-500/5" },
              { name: "Fitness", href: "/category/fitness", color: "from-red-500/20 to-red-500/5" },
              { name: "Organizing", href: "/category/organizing", color: "from-yellow-500/20 to-yellow-500/5" },
            ].map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground/50 hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50 transition-opacity group-hover:opacity-100`} />
                <div className="relative">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Expert guides & insights
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
              Never Miss a Story
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Get the latest badminton insights, training tips, and strategies delivered to your inbox weekly.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              Join 10,000+ badminton enthusiasts. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
