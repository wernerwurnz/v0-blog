import { redis } from "@/lib/redis/client"
import { createServerClient } from "@/lib/supabase/server"

// Keys for Redis
const KEYS = {
  VIEWS: (slug: string) => `views:${slug}`,
  POPULAR_POSTS: "popular_posts",
  TOTAL_VIEWS: "total_views",
  UNIQUE_VISITORS: "unique_visitors",
  VISITOR: (id: string) => `visitor:${id}`,
  DAILY_VIEWS: (date: string) => `daily_views:${date}`,
}

// Increment view count for a post
export async function incrementPostView(slug: string, userId?: string | null) {
  try {
    // Increment view in Redis
    await redis.incr(KEYS.VIEWS(slug))

    // Increment total views
    await redis.incr(KEYS.TOTAL_VIEWS)

    // Track unique visitors if userId is provided
    if (userId) {
      await redis.sadd(KEYS.UNIQUE_VISITORS, userId)
    }

    // Track daily views
    const today = new Date().toISOString().split("T")[0]
    await redis.incr(KEYS.DAILY_VIEWS(today))

    // Update popular posts sorted set (score is view count)
    const views = (await redis.get<number>(KEYS.VIEWS(slug))) || 1
    await redis.zadd(KEYS.POPULAR_POSTS, { score: views, member: slug })

    return views
  } catch (error) {
    console.error("Error incrementing post view:", error)
    return null
  }
}

// Get view count for a post
export async function getPostViews(slug: string): Promise<number> {
  try {
    const views = await redis.get<number>(KEYS.VIEWS(slug))
    return views || 0
  } catch (error) {
    console.error("Error getting post views:", error)
    return 0
  }
}

// Get popular posts
export async function getPopularPosts(limit = 5) {
  try {
    // Get top posts by views from Redis
    const popularSlugs = await redis.zrange<string[]>(KEYS.POPULAR_POSTS, -limit, -1, { rev: true })

    if (!popularSlugs || popularSlugs.length === 0) {
      return []
    }

    // Fetch post details from Supabase
    const supabase = createServerClient()
    const { data: posts } = await supabase
      .from("posts")
      .select(`
        id,
        title,
        slug,
        excerpt,
        image_url,
        created_at,
        category:categories(name, slug)
      `)
      .in("slug", popularSlugs)
      .eq("published", true)

    if (!posts) return []

    // Sort posts according to the order in popularSlugs
    const sortedPosts = popularSlugs.map((slug) => posts.find((post) => post.slug === slug)).filter(Boolean)

    // Get view counts for each post
    const postsWithViews = await Promise.all(
      sortedPosts.map(async (post) => {
        const views = await getPostViews(post.slug)
        return { ...post, views }
      }),
    )

    return postsWithViews
  } catch (error) {
    console.error("Error getting popular posts:", error)
    return []
  }
}

// Get analytics data
export async function getAnalyticsData() {
  try {
    // Get total views
    const totalViews = (await redis.get<number>(KEYS.TOTAL_VIEWS)) || 0

    // Get unique visitors count
    const uniqueVisitors = (await redis.scard(KEYS.UNIQUE_VISITORS)) || 0

    // Get daily views for the last 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    const dailyViews = await Promise.all(
      dates.map(async (date) => {
        const views = (await redis.get<number>(KEYS.DAILY_VIEWS(date))) || 0
        return { date, views }
      }),
    )

    return {
      totalViews,
      uniqueVisitors,
      dailyViews,
    }
  } catch (error) {
    console.error("Error getting analytics data:", error)
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      dailyViews: [],
    }
  }
}
