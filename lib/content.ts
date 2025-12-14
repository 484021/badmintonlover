import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import readingTime from "reading-time"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

const contentDirectory = path.join(process.cwd(), "content/articles")

export type ArticleMetadata = {
  title: string
  description: string
  date: string
  category: "drills" | "strategy" | "organizing" | "equipment" | "fitness" | "technique"
  skillLevel: "beginner" | "intermediate" | "advanced" | "all-levels"
  author?: string
  tags?: string[]
  featured?: boolean
  image?: string
}

export type Article = {
  slug: string
  metadata: ArticleMetadata
  content: string
  readTime: string
}

export type ArticleWithContent = Article & {
  content: any
}

export async function getAllArticles(): Promise<Article[]> {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const files = fs.readdirSync(contentDirectory)
  
  const articles = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const filePath = path.join(contentDirectory, file)
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContent)
      const readTime = readingTime(content).text

      return {
        slug,
        metadata: data as ArticleMetadata,
        content,
        readTime,
      }
    })
    .sort((a, b) => {
      return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    })

  return articles
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithContent | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content: rawContent } = matter(fileContent)
    const readTime = readingTime(rawContent).text

    const { content } = await compileMDX({
      source: rawContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: "github-dark",
                keepBackground: false,
              },
            ],
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  className: ["anchor"],
                },
              },
            ],
          ],
        },
      },
    })

    return {
      slug,
      metadata: data as ArticleMetadata,
      content,
      readTime,
    }
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error)
    return null
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter((article) => article.metadata.category === category)
}

export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  const allArticles = await getAllArticles()
  const featured = allArticles.filter((article) => article.metadata.featured)
  
  if (featured.length >= limit) {
    return featured.slice(0, limit)
  }
  
  return allArticles.slice(0, limit)
}

export function getCategoryInfo(category: string) {
  const categories: Record<string, { name: string; description: string }> = {
    drills: {
      name: "Drills",
      description: "Practice exercises and training routines to improve your badminton skills.",
    },
    strategy: {
      name: "Strategy",
      description: "Tactical insights and game plans for competitive play.",
    },
    organizing: {
      name: "Organizing Games",
      description: "Practical guides for running badminton sessions and tournaments.",
    },
    equipment: {
      name: "Equipment",
      description: "Reviews, recommendations, and guides for badminton gear.",
    },
    fitness: {
      name: "Fitness",
      description: "Physical conditioning and training specific to badminton.",
    },
    technique: {
      name: "Technique",
      description: "Detailed breakdowns of shots, movements, and form.",
    },
  }

  return categories[category] || { name: category, description: "" }
}
