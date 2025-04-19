import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, Plus } from "lucide-react"

export default function EventsPage() {
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Live Q&A Session: Wedding Planning",
      type: "Webinar",
      date: "April 25, 2024",
      time: "3:00 PM - 4:00 PM",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Webinar: DIY Event Decorations",
      type: "Webinar",
      date: "May 2, 2024",
      time: "2:00 PM - 3:30 PM",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Virtual Workshop: Digital Invitations",
      type: "Workshop",
      date: "May 10, 2024",
      time: "1:00 PM - 3:00 PM",
      status: "Upcoming",
    },
    {
      id: 4,
      title: "Panel Discussion: The Future of Virtual Events",
      type: "Panel",
      date: "March 15, 2024",
      time: "4:00 PM - 5:30 PM",
      status: "Completed",
    },
    {
      id: 5,
      title: "Workshop: Event Planning Tools",
      type: "Workshop",
      date: "March 5, 2024",
      time: "2:00 PM - 4:00 PM",
      status: "Completed",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Events</CardTitle>
          <CardDescription>View and manage your upcoming and past events</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.time}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        event.status === "Upcoming" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
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
