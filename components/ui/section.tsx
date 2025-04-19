import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  background?: "default" | "muted" | "primary" | "secondary" | "black"
}

export function Section({ children, className, size = "md", background = "default" }: SectionProps) {
  return (
    <section
      className={cn(
        "w-full",
        size === "sm" && "py-8 md:py-12",
        size === "md" && "py-12 md:py-16 lg:py-20",
        size === "lg" && "py-16 md:py-24 lg:py-32",
        background === "default" && "bg-background",
        background === "muted" && "bg-muted",
        background === "primary" && "bg-evenizer-purple text-white",
        background === "secondary" && "bg-secondary text-secondary-foreground",
        background === "black" && "bg-black text-white",
        className,
      )}
    >
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  )
}
