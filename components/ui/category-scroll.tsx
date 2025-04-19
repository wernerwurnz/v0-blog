"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "@/lib/motion"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  title: string
  image: string
  slug: string
  count?: number
}

interface CategoryScrollProps {
  categories: Category[]
  title?: string
  subtitle?: string
}

export function CategoryScroll({ categories, title, subtitle }: CategoryScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollability = () => {
    const el = scrollRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScrollability()
    el.addEventListener("scroll", checkScrollability)
    window.addEventListener("resize", checkScrollability)

    return () => {
      el.removeEventListener("scroll", checkScrollability)
      window.removeEventListener("resize", checkScrollability)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return

    const scrollAmount = el.clientWidth * 0.8
    const newScrollLeft = direction === "left" ? el.scrollLeft - scrollAmount : el.scrollLeft + scrollAmount

    el.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative py-12 bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      <div className="container mb-8">
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-evenizer-purple font-medium mb-2"
          >
            {subtitle}
          </motion.p>
        )}
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold"
          >
            {title}
          </motion.h2>
        )}
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 px-4 md:px-8 gap-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="snap-start shrink-0 w-[280px] md:w-[320px]"
            >
              <Link href={`/category/${category.slug}`}>
                <div className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                    {category.count && (
                      <span className="inline-block bg-evenizer-purple/90 text-white text-sm px-3 py-1 rounded-full">
                        {category.count} Events
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white z-10 transition-opacity duration-300",
            !canScrollLeft && "opacity-0 pointer-events-none",
          )}
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Scroll left</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 border-white/20 text-white hover:bg-black/70 hover:text-white z-10 transition-opacity duration-300",
            !canScrollRight && "opacity-0 pointer-events-none",
          )}
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}
