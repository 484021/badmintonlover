// AI Forum Seeder - Automatically creates forum threads from articles
import { getAllArticles } from './content'
import slugify from 'slugify'

// Map article categories to forum categories
const categoryMapping: Record<string, string> = {
  'technique': '1', // Technique & Skills
  'equipment': '2', // Equipment Reviews
  'training': '3', // Training & Fitness
  'tournaments': '4', // Tournaments & Events
  'pro': '5', // Professional Circuit
  'beginners': '6', // Beginners Corner
}

interface ForumThread {
  categoryId: string
  title: string
  slug: string
  content: string
  authorId: string
  tags?: string[]
}

/**
 * Generate an engaging forum thread from an article
 * This creates a discussion prompt that encourages community engagement
 */
export function generateThreadFromArticle(article: any): ForumThread {
  const categoryId = categoryMapping[article.metadata.category] || '1'
  
  // Create an engaging discussion prompt based on article content
  const threadTitle = generateDiscussionTitle(article.metadata.title, article.metadata.category)
  const threadContent = generateDiscussionContent(article)
  
  return {
    categoryId,
    title: threadTitle,
    slug: slugify(threadTitle, { lower: true, strict: true }),
    content: threadContent,
    authorId: 'system', // Will be replaced with actual bot user ID
    tags: article.metadata.tags,
  }
}

/**
 * Transform article title into an engaging discussion question
 */
function generateDiscussionTitle(articleTitle: string, category: string): string {
  // Remove common prefixes
  let title = articleTitle
    .replace(/^(How to|Guide to|The|A|An|Understanding)\s+/i, '')
    .replace(/\s+in Badminton$/i, '')
  
  // Create discussion-style titles based on category
  const templates = [
    `What's your experience with ${title.toLowerCase()}?`,
    `Let's discuss: ${title}`,
    `Share your tips on ${title.toLowerCase()}`,
    `Community thoughts on ${title.toLowerCase()}?`,
    `Anyone else interested in ${title.toLowerCase()}?`,
  ]
  
  // Use article category to pick appropriate template
  const index = Math.abs(hashCode(articleTitle)) % templates.length
  return templates[index]
}

/**
 * Generate engaging discussion content that references the article
 */
function generateDiscussionContent(article: any): string {
  const excerptLength = 300
  const excerpt = article.metadata.description || 
    (article.content?.toString().substring(0, excerptLength) + '...')
  
  return `I recently came across an interesting article about **${article.metadata.title}** and wanted to get the community's thoughts on it.

${excerpt}

**What's your take on this?**
- Have you tried these techniques?
- What has worked well for you?
- Any additional tips to share?

Would love to hear everyone's experiences! 🏸

---
*Read the full article: [${article.metadata.title}](/articles/${article.slug})*`
}

/**
 * Simple hash function for consistent template selection
 */
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}

/**
 * Generate forum threads for all articles
 */
export async function generateAllThreads(): Promise<ForumThread[]> {
  const articles = await getAllArticles()
  return articles.map(article => generateThreadFromArticle(article))
}

/**
 * Get random variation of discussion starters for replies
 */
export function generateFollowUpComment(articleTitle: string, perspective: string): string {
  const starters = [
    `Great question! I've been practicing ${articleTitle.toLowerCase()} for a while now.`,
    `This is really interesting. From my experience,`,
    `I struggled with this at first, but here's what helped me:`,
    `Adding to this discussion -`,
    `I have a slightly different perspective on this.`,
    `This reminds me of something my coach taught me:`,
  ]
  
  const index = Math.abs(hashCode(articleTitle + perspective)) % starters.length
  return starters[index]
}

/**
 * Generate AI-powered follow-up comments for threads
 * This adds depth to discussions
 */
export function generateThreadReplies(article: any, count: number = 2): string[] {
  const perspectives = [
    'beginner_enthusiastic',
    'intermediate_analytical', 
    'advanced_technical',
    'coach_perspective',
  ]
  
  const replies: string[] = []
  
  for (let i = 0; i < Math.min(count, perspectives.length); i++) {
    const perspective = perspectives[i]
    const reply = generateReplyByPerspective(article, perspective)
    replies.push(reply)
  }
  
  return replies
}

/**
 * Generate contextual reply based on player perspective
 */
function generateReplyByPerspective(article: any, perspective: string): string {
  const starter = generateFollowUpComment(article.metadata.title, perspective)
  
  const templates: Record<string, string> = {
    'beginner_enthusiastic': `${starter}

I'm still learning but this approach makes a lot of sense. Going to try it at my next practice session and report back!

Anyone else at beginner level found this helpful? Would love to connect with others working on the same skills. 💪`,

    'intermediate_analytical': `${starter}

From a technical standpoint, I think the key is consistency. I've noticed that when I focus on the fundamentals mentioned here, my game improves significantly.

One thing I'd add: practice with a partner who can give real-time feedback. Made a huge difference for me.

What's everyone's practice routine look like?`,

    'advanced_technical': `${starter}

At competitive level, these fundamentals become second nature. But I still go back to basics regularly - it's surprising how small adjustments can unlock new performance levels.

The article touches on technique but timing is equally crucial. Anyone else find that timing drills helped internalize these concepts?`,

    'coach_perspective': `${starter}

As someone who coaches regularly, I see players struggle with this all the time. The main issue is usually trying to run before they can walk.

My advice: master each component individually before putting it together. Slow, deliberate practice beats rushed repetition every time.

Happy to answer any questions about implementing this! 🎯`,
  }
  
  return templates[perspective] || templates['intermediate_analytical']
}

// Export for use in API routes or scripts
export default {
  generateThreadFromArticle,
  generateAllThreads,
  generateThreadReplies,
  generateFollowUpComment,
}
