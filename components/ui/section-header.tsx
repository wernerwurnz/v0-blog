import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  align?: "left" | "center" | "right"
  className?: string
}

export function SectionHeader({ title, subtitle, description, align = "center", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[800px] space-y-4",
        align === "center" && "text-center",
        align === "left" && "text-left mr-auto",
        align === "right" && "text-right ml-auto",
        className,
      )}
    >
      {subtitle && <p className="text-primary font-medium">{subtitle}</p>}
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
      {description && <p className="text-muted-foreground max-w-[600px] mx-auto">{description}</p>}
    </div>
  )
}

export default SectionHeader
