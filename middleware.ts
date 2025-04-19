import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { trackVisitor } from "@/lib/analytics/visitor-tracking"

export async function middleware(request: NextRequest) {
  try {
    // Skip tracking for API routes, static files, etc.
    const { pathname } = request.nextUrl
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".") ||
      pathname.startsWith("/favicon.ico")
    ) {
      return NextResponse.next()
    }

    // Track the visitor
    await trackVisitor(pathname)
  } catch (error) {
    console.error("Error in visitor tracking middleware:", error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
