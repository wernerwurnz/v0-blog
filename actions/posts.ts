"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Post, PostWithRelations } from "@/types/database"
import { withCache, deleteCache, clearCache } from "@/lib/cache"
import { incrementPostView, getPostViews } from "@/lib/analytics"

export async function getPosts({
  limit = 10,
  page = 1,
  categorySlug,
  tagSlug,
  featured,
  searchQuery,
}: {
  limit?: number
  page?: number
  categorySlug?: string
  tagSlug?: string
  featured?: boolean
  searchQuery?: string
} = {}) {
  // Create cache key based on parameters
  const cacheKey = `posts:${limit}:${page}:${categorySlug || ""}:${tagSlug || ""}:${featured !== undefined ? featured : ""}:${searchQuery || ""}`

  // Use cache wrapper
  return withCache(
    cacheKey,
    async () => {
      const supabase = createServerClient()
      const offset = (page - 1) * limit

      // Fix the relationship query by using explicit joins
      let query = supabase
        .from("posts")
        .select(`
          *,
          category:categories(*),
          author:profiles(*)
        `)
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (featured !== undefined) {
        query = query.eq("featured", featured)
      }

      if (categorySlug) {
        query = query.eq("categories.slug", categorySlug)
      }

      if (tagSlug) {
        query = query.in(
          "id",
          supabase
            .from("post_tags")
            .select("post_id")
            .eq("tags.slug", tagSlug)
            .in("tag_id", supabase.from("tags").select("id").eq("slug", tagSlug)),
        )
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%, excerpt.ilike.%${searchQuery}%, content.ilike.%${searchQuery}%`)
      }

      const { data, error, count } = await query.range(offset, offset + limit - 1).returns<PostWithRelations[]>()

      if (error) {
        console.error("Error fetching posts:", error)
        return { posts: [], count: 0 }
      }

      // Add view counts to posts
      const postsWithViews = await Promise.all(
        data.map(async (post) => {
          const views = await getPostViews(post.slug)
          return { ...post, views }
        }),
      )

      return { posts: postsWithViews, count }
    },
    // Cache for 5 minutes
    60 * 5,
  )
}

export async function getPostBySlug(slug: string, userId?: string) {
  // Create cache key
  const cacheKey = `post:${slug}`

  // Use cache wrapper
  const post = await withCache(
    cacheKey,
    async () => {
      const supabase = createServerClient()

      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          category:categories(*),
          author:profiles(*),
          tags:post_tags(tags(*))
        `)
        .eq("slug", slug)
        .eq("published", true)
        .single()

      if (error) {
        console.error("Error fetching post:", error)
        return null
      }

      // Format the tags array
      const formattedPost = {
        ...data,
        tags: data.tags.map((tag: any) => tag.tags),
      }

      return formattedPost as PostWithRelations
    },
    // Cache for 10 minutes
    60 * 10,
  )

  if (post) {
    // Increment view count (don't await to avoid blocking)
    incrementPostView(slug, userId).catch(console.error)
  }

  return post
}

export async function getRelatedPosts(postId: string, categoryId: string | null, limit = 3) {
  // Create cache key
  const cacheKey = `related:${postId}:${categoryId}:${limit}`

  // Use cache wrapper
  return withCache(
    cacheKey,
    async () => {
      const supabase = createServerClient()

      let query = supabase
        .from("posts")
        .select(`
          *,
          category:categories(*),
          author:profiles(*)
        `)
        .eq("published", true)
        .neq("id", postId)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (categoryId) {
        query = query.eq("category_id", categoryId)
      }

      const { data, error } = await query.returns<PostWithRelations[]>()

      if (error) {
        console.error("Error fetching related posts:", error)
        return []
      }

      // Add view counts to posts
      const postsWithViews = await Promise.all(
        data.map(async (post) => {
          const views = await getPostViews(post.slug)
          return { ...post, views }
        }),
      )

      return postsWithViews
    },
    // Cache for 30 minutes
    60 * 30,
  )
}

export async function createPost(postData: Partial<Post>) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("posts").insert(postData).select().single()

  if (error) {
    console.error("Error creating post:", error)
    return { error }
  }

  // Clear relevant caches
  await clearCache()

  revalidatePath("/blog")
  return { post: data }
}

export async function updatePost(id: string, postData: Partial<Post>) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("posts").update(postData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating post:", error)
    return { error }
  }

  // Clear specific caches
  await deleteCache(`post:${data.slug}`)
  await clearCache()

  revalidatePath(`/blog/${data.slug}`)
  revalidatePath("/blog")
  return { post: data }
}

export async function deletePost(id: string) {
  const supabase = createServerClient()

  // Get post slug before deleting
  const { data: post } = await supabase.from("posts").select("slug").eq("id", id).single()

  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting post:", error)
    return { error }
  }

  // Clear specific caches
  if (post?.slug) {
    await deleteCache(`post:${post.slug}`)
  }
  await clearCache()

  revalidatePath("/blog")
  return { success: true }
}
