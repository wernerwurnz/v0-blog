import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Edit, MoreHorizontal, Plus, Trash, Eye } from "lucide-react"

export default function PostsPage() {
  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "10 Tips for Planning a Virtual Wedding",
      status: "Published",
      category: "Weddings",
      date: "April 15, 2024",
      views: 245,
    },
    {
      id: 2,
      title: "Budget-Friendly Birthday Party Ideas",
      status: "Published",
      category: "Birthdays",
      date: "April 10, 2024",
      views: 189,
    },
    {
      id: 3,
      title: "Corporate Events: From Home to Zoom",
      status: "Draft",
      category: "Corporate",
      date: "April 5, 2024",
      views: 0,
    },
    {
      id: 4,
      title: "How to Host a Virtual Baby Shower",
      status: "Published",
      category: "Baby Showers",
      date: "March 28, 2024",
      views: 312,
    },
    {
      id: 5,
      title: "Setting Up Your Home Office for Event Planning",
      status: "Published",
      category: "Home Office",
      date: "March 20, 2024",
      views: 178,
    },
    {
      id: 6,
      title: "Virtual Team Building Activities",
      status: "Draft",
      category: "Corporate",
      date: "March 15, 2024",
      views: 0,
    },
    {
      id: 7,
      title: "Holiday Party Planning Guide",
      status: "Published",
      category: "Holidays",
      date: "March 10, 2024",
      views: 203,
    },
    {
      id: 8,
      title: "Eco-Friendly Event Planning Tips",
      status: "Published",
      category: "Sustainability",
      date: "March 5, 2024",
      views: 156,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
        <Link href="/dashboard/posts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Posts</CardTitle>
          <CardDescription>View and manage all your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Search posts..." className="w-[300px]" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">Filter</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
