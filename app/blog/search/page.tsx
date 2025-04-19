"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BlogLayout } from "@/components/layout/blog-layout"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// This would normally be fetched from a database
const allPosts = [
  {
    id: "1",
    title: "10 Tips for Planning a Virtual Wedding",
    excerpt: "Learn how to create a memorable virtual wedding experience for you and your guests...",
    image: "/wedding-planning-session.png",
    date: "April 15, 2024",
    category: "Weddings",
  },
  {
    id: "2",
    title: "Budget-Friendly Birthday Party Ideas",
    excerpt: "Discover creative ways to celebrate birthdays without breaking the bank...",
    image: "/festive-birthday-gathering.png",
    date: "April 10, 2024",
    category: "Birthday Parties",
  },
  {
    id: "3",
    title: "Corporate Event Planning Checklist",
    excerpt: "A comprehensive guide to planning successful corporate events...",
    image: "/networking-reception.png",
    date: "April 5, 2024",
    category: "Corporate Events",
  },
  {
    id: "4",
    title: "How to Host a Virtual Baby Shower",
    excerpt: "Learn how to create a memorable virtual baby shower experience...",
    image: "/whimsical-baby-shower.png",
    date: "March 28, 2024",
    category: "Baby Showers",
  },
  {
    id: "5",
    title: "Dinner Party Hosting Guide",
    excerpt: "Everything you need to know about hosting a successful dinner party...",
    image: "/elegant-gathering.png",
    date: "March 22, 2024",
    category: "Dinner Parties",
  },
  {
    id: "6",
    title: "Holiday Party Planning Tips",
    excerpt: "Make your holiday celebrations memorable with these planning tips...",
    image: "/celebratory-gathering.png",
    date: "March 15, 2024",
    category: "Holiday Celebrations",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState<typeof allPosts>([])

  // Simulate search functionality
  useEffect(() => {
    if (!query) {
      setSearchResults([])
      return
    }

    const lowerCaseQuery = query.toLowerCase()
    const results = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        post.category.toLowerCase().includes(lowerCaseQuery),
    )
    setSearchResults(results)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the URL with the search query
    window.history.pushState({}, "", `/blog/search?q=${encodeURIComponent(searchQuery)}`)
    // For this demo, we'll just simulate the search
    const lowerCaseQuery = searchQuery.toLowerCase()
    const results = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        post.category.toLowerCase().includes(lowerCaseQuery),
    )
    setSearchResults(results)
  }

  return (
    <BlogLayout sidebar={<BlogSidebar />}>
      <Section size="sm" className="px-0">
        <SectionHeader
          title="Search Results"
          description={query ? `Showing results for "${query}"` : "Enter a search term to find blog posts"}
          align="left"
        />
      </Section>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search blog posts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>

      {query ? (
        searchResults.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold mb-2">No results found</h2>
            <p className="text-muted-foreground">
              We couldn't find any posts matching "{query}". Please try a different search term.
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-bold mb-2">Enter a search term</h2>
          <p className="text-muted-foreground">Use the search box above to find blog posts.</p>
        </div>
      )}
    </BlogLayout>
  )
}
