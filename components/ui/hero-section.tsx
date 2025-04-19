import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSectionProps {
  title: string
  description?: string
  align?: "left" | "center" | "right"
  className?: string
  primaryAction?: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export function HeroSection({
  title,
  description,
  align = "center",
  className,
  primaryAction,
  secondaryAction,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full py-20 md:py-32",
        align === "center" && "text-center",
        align === "left" && "text-left",
        align === "right" && "text-right",
        className,
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/50 z-0" />}
      <div className="container relative z-10">
        <div className={cn("max-w-[800px] space-y-4", align === "center" && "mx-auto", align === "right" && "ml-auto")}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
          {description && <p className="text-xl text-muted-foreground">{description}</p>}

          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                "flex gap-4 pt-4",
                align === "center" && "justify-center",
                align === "right" && "justify-end",
              )}
            >
              {primaryAction && (
                <Link href={primaryAction.href}>
                  <Button size="lg">{primaryAction.text}</Button>
                </Link>
              )}
              {secondaryAction && (
                <Link href={secondaryAction.href}>
                  <Button variant="outline" size="lg">
                    {secondaryAction.text}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
