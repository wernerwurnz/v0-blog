"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Event } from "@/types/database"

export async function getEvents({ limit = 10, page = 1 }: { limit?: number; page?: number } = {}) {
  const supabase = createServerClient()
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from("events")
    .select("*", { count: "exact" })
    .order("date", { ascending: true })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching events:", error)
    return { events: [], count: 0 }
  }

  return { events: data as Event[], count }
}

export async function getUpcomingEvents(limit = 2) {
  const supabase = createServerClient()
  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("date", now)
    .order("date", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Error fetching upcoming events:", error)
    return []
  }

  return data as Event[]
}

export async function getEventById(id: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("events").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching event:", error)
    return null
  }

  return data as Event
}

export async function createEvent(eventData: Partial<Event>) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("events").insert(eventData).select().single()

  if (error) {
    console.error("Error creating event:", error)
    return { error }
  }

  revalidatePath("/")
  return { event: data }
}

export async function updateEvent(id: string, eventData: Partial<Event>) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("events").update(eventData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating event:", error)
    return { error }
  }

  revalidatePath("/")
  return { event: data }
}

export async function deleteEvent(id: string) {
  const supabase = createServerClient()

  const { error } = await supabase.from("events").delete().eq("id", id)

  if (error) {
    console.error("Error deleting event:", error)
    return { error }
  }

  revalidatePath("/")
  return { success: true }
}
