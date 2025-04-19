"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { NewsletterSubscriber } from "@/types/database"

export async function subscribeToNewsletter(email: string, name?: string) {
  const supabase = createServerClient()

  // Check if email already exists
  const { data: existingSubscriber, error: checkError } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .eq("email", email)
    .maybeSingle()

  if (checkError) {
    console.error("Error checking subscriber:", checkError)
    return { error: checkError }
  }

  if (existingSubscriber) {
    // If already subscribed but marked as unsubscribed, update to subscribed
    if (!existingSubscriber.subscribed) {
      const { error: updateError } = await supabase
        .from("newsletter_subscribers")
        .update({ subscribed: true, name: name || existingSubscriber.name })
        .eq("id", existingSubscriber.id)

      if (updateError) {
        console.error("Error updating subscriber:", updateError)
        return { error: updateError }
      }

      return { success: true, message: "You have been resubscribed to our newsletter." }
    }

    return { success: false, message: "This email is already subscribed to our newsletter." }
  }

  // Create new subscriber
  const { error: insertError } = await supabase.from("newsletter_subscribers").insert({ email, name, subscribed: true })

  if (insertError) {
    console.error("Error subscribing to newsletter:", insertError)
    return { error: insertError }
  }

  return { success: true, message: "Thank you for subscribing to our newsletter!" }
}

export async function unsubscribeFromNewsletter(email: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({ subscribed: false })
    .eq("email", email)
    .select()
    .single()

  if (error) {
    console.error("Error unsubscribing from newsletter:", error)
    return { error }
  }

  return { success: true, message: "You have been unsubscribed from our newsletter." }
}

export async function getNewsletterSubscribers({ limit = 100, page = 1 }: { limit?: number; page?: number } = {}) {
  const supabase = createServerClient()
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from("newsletter_subscribers")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching newsletter subscribers:", error)
    return { subscribers: [], count: 0 }
  }

  return { subscribers: data as NewsletterSubscriber[], count }
}
