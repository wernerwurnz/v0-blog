"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    // Find all h2 and h3 elements in the article
    const article = document.querySelector("article")
    if (!article) return

    const elements = Array.from(article.querySelectorAll("h2, h3"))

    const items = elements.map((element) => {
      // Add IDs to headings if they don't have them
      if (!element.id) {
        element.id = element.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      }

      return {
        id: element.id,
        text: element.textContent || "",
        level: element.tagName === "H2" ? 2 : 3,
      }
    })

    setHeadings(items)

    // Set up intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <nav>
          <ul className="space-y-1 text-sm">
            {headings.map((heading) => (
              <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
                <a
                  href={`#${heading.id}`}
                  className={cn(
                    "inline-block py-1 transition-colors hover:text-primary",
                    activeId === heading.id ? "text-primary font-medium" : "text-muted-foreground",
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  )
}
