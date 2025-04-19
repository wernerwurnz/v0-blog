import { SiteLayout } from "@/components/layout/site-layout"

export default function BlogPage() {
  return (
    <SiteLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="text-muted-foreground">
          Welcome to our blog. Here you'll find articles, tips, and resources for event planning.
        </p>
      </div>
    </SiteLayout>
  )
}
