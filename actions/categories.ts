"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Category } from "@/types/database"

export async function getCategories() {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data as Category[]
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching category:", error)
    return null
  }

  return data as Category
}

export async function createCategory(categoryData: Partial<Category>) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("categories").insert(categoryData).select().single()

  if (error) {
    console.error("Error creating category:", error)
    return { error }
  }

  revalidatePath("/blog/categories")
  return { category: data }
}

export async function updateCategory(id: string, categoryData: Partial<Category>) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("categories").update(categoryData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating category:", error)
    return { error }
  }

  revalidatePath("/blog/categories")
  revalidatePath(`/blog/category/${data.slug}`)
  return { category: data }
}

export async function deleteCategory(id: string) {
  const supabase = createServerClient()

  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    console.error("Error deleting category:", error)
    return { error }
  }

  revalidatePath("/blog/categories")
  return { success: true }
}
