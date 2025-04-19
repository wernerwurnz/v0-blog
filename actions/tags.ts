"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Tag } from "@/types/database"

export async function getTags() {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("tags").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching tags:", error)
    return []
  }

  return data as Tag[]
}

export async function getTagBySlug(slug: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("tags").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching tag:", error)
    return null
  }

  return data as Tag
}

export async function getPostsByTagSlug(slug: string) {
  const supabase = createServerClient()

  const { data: tag, error: tagError } = await supabase.from("tags").select("id").eq("slug", slug).single()

  if (tagError || !tag) {
    console.error("Error fetching tag:", tagError)
    return []
  }

  const { data: postIds, error: postIdsError } = await supabase.from("post_tags").select("post_id").eq("tag_id", tag.id)

  if (postIdsError || !postIds.length) {
    console.error("Error fetching post IDs:", postIdsError)
    return []
  }

  const postIdArray = postIds.map((item) => item.post_id)

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select(`
      *,
      category:categories(*),
      author:user_profiles(*)
    `)
    .in("id", postIdArray)
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (postsError) {
    console.error("Error fetching posts by tag:", postsError)
    return []
  }

  return posts
}

export async function createTag(tagData: Partial<Tag>) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("tags").insert(tagData).select().single()

  if (error) {
    console.error("Error creating tag:", error)
    return { error }
  }

  revalidatePath("/blog/tags")
  return { tag: data }
}

export async function updateTag(id: string, tagData: Partial<Tag>) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("tags").update(tagData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating tag:", error)
    return { error }
  }

  revalidatePath("/blog/tags")
  revalidatePath(`/blog/tag/${data.slug}`)
  return { tag: data }
}

export async function deleteTag(id: string) {
  const supabase = createServerClient()

  const { error } = await supabase.from("tags").delete().eq("id", id)

  if (error) {
    console.error("Error deleting tag:", error)
    return { error }
  }

  revalidatePath("/blog/tags")
  return { success: true }
}
