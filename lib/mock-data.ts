// Mock data for local development
export const mockCategories = [
  {
    id: '1',
    name: 'Technique & Skills',
    slug: 'technique',
    description: 'Discuss shots, footwork, grips, and improve your game',
    icon: '🏸',
    color: 'bg-blue-500',
    display_order: 1,
    thread_count: 156,
    post_count: 2341,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Equipment Reviews',
    slug: 'equipment',
    description: 'Rackets, shoes, strings, and gear recommendations',
    icon: '🎾',
    color: 'bg-green-500',
    display_order: 2,
    thread_count: 203,
    post_count: 3892,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Training & Fitness',
    slug: 'training',
    description: 'Workout routines, drills, and conditioning tips',
    icon: '💪',
    color: 'bg-orange-500',
    display_order: 3,
    thread_count: 134,
    post_count: 1876,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Tournaments & Events',
    slug: 'tournaments',
    description: 'Find players, organize games, tournament discussion',
    icon: '🏆',
    color: 'bg-purple-500',
    display_order: 4,
    thread_count: 89,
    post_count: 1234,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Professional Circuit',
    slug: 'pro-circuit',
    description: 'BWF tournaments, player news, match discussions',
    icon: '⭐',
    color: 'bg-red-500',
    display_order: 5,
    thread_count: 267,
    post_count: 4521,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Beginners Corner',
    slug: 'beginners',
    description: 'New to badminton? Start here with basic questions',
    icon: '🌱',
    color: 'bg-cyan-500',
    display_order: 6,
    thread_count: 312,
    post_count: 2987,
    created_at: new Date().toISOString(),
  },
]

// AI Bot user for article-based discussions
export const botUser = {
  id: 'bot-user',
  username: 'BadmintonBot',
  avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=BadmintonBot',
  bio: '🤖 Community discussion starter | Sharing insights from articles',
  post_count: 42,
  thread_count: 15,
  created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
}

export const mockThreads = [
  // AI-generated thread from article
  {
    id: 'ai-1',
    category_id: '1',
    author_id: 'bot-user',
    title: "What's your experience with improving footwork speed?",
    slug: 'whats-your-experience-improving-footwork-speed',
    content: `I recently came across an interesting article about **mastering badminton footwork** and wanted to get the community's thoughts on it.

Proper footwork is the foundation of excellent badminton play. It's not just about speed—it's about efficiency, positioning, and maintaining balance throughout your movements.

**What's your take on this?**
- Have you tried specific footwork drills?
- What techniques have improved your court coverage?
- Any tips for beginners struggling with movement?

Would love to hear everyone's experiences! 🏸

---
*This discussion inspired by: [Footwork Mastery Guide](/articles/footwork)*`,
    is_pinned: false,
    is_locked: false,
    view_count: 324,
    reply_count: 12,
    last_activity_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    categories: mockCategories[0],
    profiles: botUser,
  },
  {
    id: '1',
    category_id: '1',
    author_id: 'user1',
    title: 'How to improve jump smash power?',
    slug: 'how-to-improve-jump-smash-power',
    content: `I've been working on my jump smash for months now, but I feel like I've hit a plateau. My smash is decent but not powerful enough to win points consistently.

**Current situation:**
- Can jump reasonably high
- Technique seems okay (coach says so)
- But the shuttle doesn't go down as fast as I'd like

**What I've tried:**
- Wrist strengthening exercises
- Jump rope training
- Practicing the motion repeatedly

Any tips on breaking through this plateau? What helped you improve your jump smash power?`,
    is_pinned: false,
    is_locked: false,
    view_count: 456,
    reply_count: 18,
    last_activity_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    categories: mockCategories[0],
    profiles: {
      username: 'SmashKing',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SmashKing',
      bio: 'Badminton enthusiast, always learning!',
      post_count: 89,
      thread_count: 12,
    },
  },
  {
    id: '2',
    category_id: '2',
    author_id: 'user2',
    title: 'Best racket for intermediate players under $150?',
    slug: 'best-racket-intermediate-under-150',
    content: `Looking to upgrade from my beginner racket. Budget is around $150.

**My playing style:**
- Defensive player
- Prefer control over power
- Play doubles mostly

**Currently considering:**
1. Yonex Nanoflare 700
2. Victor Thruster K 9900
3. Li-Ning Turbo Charging 75

Any recommendations? Personal experiences welcome!`,
    is_pinned: true,
    is_locked: false,
    view_count: 892,
    reply_count: 34,
    last_activity_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    categories: mockCategories[1],
    profiles: {
      username: 'TechPlayer23',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechPlayer23',
      bio: 'Gear enthusiast and weekend warrior',
      post_count: 156,
      thread_count: 23,
    },
  },
  {
    id: '3',
    category_id: '5',
    author_id: 'user3',
    title: 'China Open 2025 - Men\'s Final Discussion',
    slug: 'china-open-2025-mens-final',
    content: `What an incredible match! The final between Viktor Axelsen and Kunlavut Vitidsarn was absolutely insane.

**Match Highlights:**
- 3 games, 90+ minutes
- Multiple 30-shot rallies
- Axelsen's cross-court smashes were unreal
- Kunlavut's defense was next level

Who else watched it live? What did you think of the key moments?`,
    is_pinned: false,
    is_locked: false,
    view_count: 3421,
    reply_count: 127,
    last_activity_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    categories: mockCategories[4],
    profiles: {
      username: 'BadmintonFan',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BadmintonFan',
      bio: 'Professional badminton watcher 📺',
      post_count: 445,
      thread_count: 67,
    },
  },
]

export const mockPosts = [
  {
    id: 'post1',
    thread_id: '1',
    author_id: 'user4',
    content: `Great question! I improved my jump smash power significantly by focusing on three things:

1. **Core strength** - Your power comes from rotation, not just arms
2. **Timing** - Hit the shuttle at the highest point
3. **Forearm rotation** - Snap your wrist at contact

Try doing planks and Russian twists for core. Game changer for me!`,
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    threads: {
      title: 'How to improve jump smash power?',
      slug: 'how-to-improve-jump-smash-power',
    },
    profiles: {
      username: 'CoachMike',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CoachMike',
      post_count: 234,
      thread_count: 12,
      created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: 'post2',
    thread_id: '1',
    author_id: 'user5',
    content: `Adding to what @CoachMike said - film yourself! I recorded my jump smash and realized I was hitting the shuttle way too late in my jump.

Once I fixed the timing and hit at the peak, my power increased by like 30%. Phone camera is all you need!`,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    threads: {
      title: 'How to improve jump smash power?',
      slug: 'how-to-improve-jump-smash-power',
    },
    profiles: {
      username: 'VideoAnalyst',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VideoAnalyst',
      post_count: 89,
      thread_count: 5,
      created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
]

export const mockUser = {
  id: 'demo-user',
  email: 'demo@badmintonlover.com',
  user_metadata: {
    full_name: 'Demo User',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser',
    user_name: 'DemoUser',
  },
}

export const mockProfile = {
  id: 'demo-user',
  username: 'DemoUser',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser',
  bio: 'Badminton lover testing the forum!',
  post_count: 0,
  thread_count: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
