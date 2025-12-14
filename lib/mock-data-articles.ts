// Enhanced mock data with article-based threads
import { mockCategories, mockUser, mockProfile } from './mock-data'

// AI Bot user that creates threads from articles
export const botUser = {
  id: 'bot-user',
  username: 'BadmintonBot',
  avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=BadmintonBot',
  bio: '🤖 Community discussion starter | Sharing insights from articles',
  post_count: 42,
  thread_count: 15,
  created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
}

// Additional engaged community members
export const mockUsers = [
  {
    id: 'user1',
    username: 'SmashKing',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SmashKing',
    bio: 'Badminton enthusiast, always learning!',
    post_count: 89,
    thread_count: 12,
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user2',
    username: 'TechPlayer23',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechPlayer23',
    bio: 'Gear enthusiast and weekend warrior',
    post_count: 156,
    thread_count: 23,
    created_at: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user3',
    username: 'BadmintonFan',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BadmintonFan',
    bio: 'Professional badminton watcher 📺',
    post_count: 445,
    thread_count: 67,
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user4',
    username: 'CoachMike',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CoachMike',
    bio: 'Certified coach | Helping players improve 🎯',
    post_count: 234,
    thread_count: 12,
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'user5',
    username: 'VideoAnalyst',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VideoAnalyst',
    bio: 'Analyzing technique through video 🎥',
    post_count: 89,
    thread_count: 5,
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// AI-generated threads that feel natural and engaging
export const aiGeneratedThreads = [
  {
    id: 'ai-1',
    category_id: '1',
    author_id: 'bot-user',
    title: "What's your experience with improving footwork speed?",
    slug: 'whats-your-experience-improving-footwork-speed',
    content: `I recently came across an interesting article about **mastering badminton footwork** and wanted to get the community's thoughts on it.

Proper footwork is the foundation of excellent badminton play. Learn the essential movement patterns, training drills, and techniques that will help you cover the court more efficiently.

**What's your take on this?**
- Have you tried these techniques?
- What has worked well for you?
- Any additional tips to share?

Would love to hear everyone's experiences! 🏸

---
*Read the full article: [Mastering Badminton Footwork](/articles/footwork-mastery)*`,
    is_pinned: false,
    is_locked: false,
    view_count: 234,
    reply_count: 8,
    last_activity_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    categories: mockCategories[0],
    profiles: botUser,
  },
  {
    id: 'ai-2',
    category_id: '2',
    author_id: 'bot-user',
    title: "Let's discuss: racket string tension and control",
    slug: 'lets-discuss-racket-string-tension-control',
    content: `I recently came across an interesting article about **choosing the right string tension** and wanted to get the community's thoughts on it.

String tension dramatically affects your play style - higher tension gives more control and accuracy, while lower tension provides more power and comfort. Find what works for your game.

**What's your take on this?**
- Have you tried these techniques?
- What has worked well for you?
- Any additional tips to share?

Would love to hear everyone's experiences! 🏸

---
*Read the full article: [String Tension Guide](/articles/string-tension-guide)*`,
    is_pinned: false,
    is_locked: false,
    view_count: 567,
    reply_count: 15,
    last_activity_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    categories: mockCategories[1],
    profiles: botUser,
  },
  {
    id: 'ai-3',
    category_id: '3',
    author_id: 'bot-user',
    title: "Share your tips on building endurance for badminton",
    slug: 'share-tips-building-endurance-badminton',
    content: `I recently came across an interesting article about **conditioning for competitive badminton** and wanted to get the community's thoughts on it.

Elite badminton requires exceptional cardiovascular endurance and explosive power. Learn the training methods used by professionals to build the stamina needed for long matches.

**What's your take on this?**
- Have you tried these techniques?
- What has worked well for you?
- Any additional tips to share?

Would love to hear everyone's experiences! 🏸

---
*Read the full article: [Endurance Training Guide](/articles/endurance-training)*`,
    is_pinned: false,
    is_locked: false,
    view_count: 389,
    reply_count: 12,
    last_activity_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    categories: mockCategories[2],
    profiles: botUser,
  },
]

// AI-generated replies that feel authentic
export const aiGeneratedReplies = [
  {
    id: 'reply-ai-1',
    thread_id: 'ai-1',
    author_id: 'user4',
    content: `Great question! I've been practicing footwork drills for a while now.

As someone who coaches regularly, I see players struggle with this all the time. The main issue is usually trying to run before they can walk.

My advice: master each component individually before putting it together. Slow, deliberate practice beats rushed repetition every time.

Happy to answer any questions about implementing this! 🎯`,
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    threads: {
      title: "What's your experience with improving footwork speed?",
      slug: 'whats-your-experience-improving-footwork-speed',
    },
    profiles: mockUsers[3],
  },
  {
    id: 'reply-ai-2',
    thread_id: 'ai-1',
    author_id: 'user1',
    content: `This is really interesting. From my experience,

I'm still learning but this approach makes a lot of sense. Going to try it at my next practice session and report back!

Anyone else at beginner level found this helpful? Would love to connect with others working on the same skills. 💪`,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    threads: {
      title: "What's your experience with improving footwork speed?",
      slug: 'whats-your-experience-improving-footwork-speed',
    },
    profiles: mockUsers[0],
  },
  {
    id: 'reply-ai-3',
    thread_id: 'ai-2',
    author_id: 'user2',
    content: `Great question! I've been experimenting with string tension for a while now.

From a technical standpoint, I think the key is consistency. I've noticed that when I focus on the fundamentals mentioned here, my game improves significantly.

One thing I'd add: practice with a partner who can give real-time feedback. Made a huge difference for me.

What's everyone's practice routine look like?`,
    created_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    threads: {
      title: "Let's discuss: racket string tension and control",
      slug: 'lets-discuss-racket-string-tension-control',
    },
    profiles: mockUsers[1],
  },
]

// Combine with existing mock data
export const enhancedMockThreads = [
  ...aiGeneratedThreads,
  // Original threads remain available
]

export const enhancedMockPosts = [
  ...aiGeneratedReplies,
  // Original posts remain available
]
