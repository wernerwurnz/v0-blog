import { createServerClient as createSupaServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createServerClient() {
  const cookieStore = cookies()

  return createSupaServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}
