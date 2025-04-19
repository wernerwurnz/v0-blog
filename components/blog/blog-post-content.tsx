import { cn } from "@/lib/utils"

interface BlogPostContentProps {
  content: string
  className?: string
}

export function BlogPostContent({ content, className }: BlogPostContentProps) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none dark:prose-invert",
        "prose-headings:font-bold prose-headings:tracking-tight",
        "prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4",
        "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4",
        "prose-p:leading-relaxed",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-blockquote:border-l-primary prose-blockquote:bg-muted prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic",
        "prose-ul:my-6 prose-ol:my-6",
        "prose-li:my-2",
        "prose-img:rounded-lg",
        "prose-hr:my-8",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
