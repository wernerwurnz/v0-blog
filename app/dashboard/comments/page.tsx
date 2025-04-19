import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Search, Trash, X } from "lucide-react"

export default function CommentsPage() {
  // Sample comments data
  const comments = [
    {
      id: 1,
      author: "Sarah Johnson",
      email: "sarah.j@example.com",
      content:
        "This was so helpful! I'm planning my sister's virtual wedding and these tips are exactly what I needed.",
      post: "10 Tips for Planning a Virtual Wedding",
      date: "April 16, 2024",
      status: "approved",
    },
    {
      id: 2,
      author: "Michael Chen",
      email: "michael.c@example.com",
      content: "Great ideas for budget-friendly parties. I especially liked the DIY decoration suggestions.",
      post: "Budget-Friendly Birthday Party Ideas",
      date: "April 12, 2024",
      status: "approved",
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      email: "emily.r@example.com",
      content: "I tried the virtual ice breakers at our last team meeting and they were a hit! Thanks for sharing.",
      post: "Corporate Events: From Home to Zoom",
      date: "April 7, 2024",
      status: "pending",
    },
    {
      id: 4,
      author: "David Wilson",
      email: "david.w@example.com",
      content: "The baby shower games were perfect for our virtual celebration. Everyone had a great time!",
      post: "How to Host a Virtual Baby Shower",
      date: "March 30, 2024",
      status: "approved",
    },
    {
      id: 5,
      author: "Jessica Lee",
      email: "jessica.l@example.com",
      content: "I've been struggling with my home office setup. These tips helped me create a more productive space.",
      post: "Setting Up Your Home Office for Event Planning",
      date: "March 22, 2024",
      status: "pending",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Comments</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Comments</CardTitle>
          <CardDescription>Review and moderate comments on your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search comments..." className="pl-8" />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Comments</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{comment.author}</h3>
                      <span className="text-xs text-muted-foreground">({comment.email})</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      On: <span className="font-medium">{comment.post}</span> • {comment.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        comment.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {comment.status === "approved" ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm">{comment.content}</p>
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                  {comment.status === "pending" && (
                    <Button size="sm" variant="outline" className="h-8 gap-1 text-green-600">
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                  )}
                  {comment.status === "approved" && (
                    <Button size="sm" variant="outline" className="h-8 gap-1 text-amber-600">
                      <X className="h-4 w-4" />
                      Unapprove
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="h-8 gap-1 text-destructive">
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
