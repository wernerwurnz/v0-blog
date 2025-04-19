import type { ReactNode } from "react"
import { SiteLayout } from "@/components/layout/site-layout"

interface BlogLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  showSidebar?: boolean
}

export function BlogLayout({ children, sidebar, showSidebar = true }: BlogLayoutProps) {
  return (
    <SiteLayout>
      <div className="container py-12">
        {showSidebar && sidebar ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 w-full">{children}</div>
            <div className="w-full lg:w-[320px] lg:flex-shrink-0">{sidebar}</div>
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </SiteLayout>
  )
}
