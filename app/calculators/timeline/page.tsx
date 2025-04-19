"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Download, Plus, Trash, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Define timeline task types
type TimelineTask = {
  id: string
  name: string
  description: string
  dueDate: Date | null
  completed: boolean
  category: string
}

// Define timeline milestone types
type TimelineMilestone = {
  id: string
  name: string
  date: Date | null
  tasks: TimelineTask[]
}

export default function TimelineCalculatorPage() {
  const [eventDate, setEventDate] = useState<Date | null>(
    new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000), // 6 months from now
  )
  const [eventType, setEventType] = useState("wedding")

  // Initial milestones based on event type
  const generateInitialMilestones = (eventDate: Date | null, type: string): TimelineMilestone[] => {
    if (!eventDate) return []

    const milestones: TimelineMilestone[] = []

    if (type === "wedding") {
      // 12 months before
      const month12 = new Date(eventDate)
      month12.setMonth(eventDate.getMonth() - 12)
      milestones.push({
        id: "month-12",
        name: "12 Months Before",
        date: month12,
        tasks: [
          {
            id: "task-1",
            name: "Set a budget",
            description: "Determine your overall wedding budget",
            dueDate: month12,
            completed: false,
            category: "budget",
          },
          {
            id: "task-2",
            name: "Choose a venue",
            description: "Research and book your ceremony and reception venues",
            dueDate: month12,
            completed: false,
            category: "venue",
          },
          {
            id: "task-3",
            name: "Create guest list",
            description: "Make a preliminary guest list",
            dueDate: month12,
            completed: false,
            category: "planning",
          },
        ],
      })

      // 9 months before
      const month9 = new Date(eventDate)
      month9.setMonth(eventDate.getMonth() - 9)
      milestones.push({
        id: "month-9",
        name: "9 Months Before",
        date: month9,
        tasks: [
          {
            id: "task-4",
            name: "Book vendors",
            description: "Research and book photographer, videographer, caterer, and DJ/band",
            dueDate: month9,
            completed: false,
            category: "vendors",
          },
          {
            id: "task-5",
            name: "Shop for attire",
            description: "Start shopping for wedding dress and accessories",
            dueDate: month9,
            completed: false,
            category: "attire",
          },
        ],
      })

      // 6 months before
      const month6 = new Date(eventDate)
      month6.setMonth(eventDate.getMonth() - 6)
      milestones.push({
        id: "month-6",
        name: "6 Months Before",
        date: month6,
        tasks: [
          {
            id: "task-6",
            name: "Order invitations",
            description: "Design and order wedding invitations",
            dueDate: month6,
            completed: false,
            category: "stationery",
          },
          {
            id: "task-7",
            name: "Plan honeymoon",
            description: "Research and book honeymoon accommodations and transportation",
            dueDate: month6,
            completed: false,
            category: "travel",
          },
        ],
      })

      // 3 months before
      const month3 = new Date(eventDate)
      month3.setMonth(eventDate.getMonth() - 3)
      milestones.push({
        id: "month-3",
        name: "3 Months Before",
        date: month3,
        tasks: [
          {
            id: "task-8",
            name: "Send invitations",
            description: "Mail out wedding invitations",
            dueDate: month3,
            completed: false,
            category: "stationery",
          },
          {
            id: "task-9",
            name: "Finalize menu",
            description: "Finalize menu selections with caterer",
            dueDate: month3,
            completed: false,
            category: "food",
          },
        ],
      })

      // 1 month before
      const month1 = new Date(eventDate)
      month1.setMonth(eventDate.getMonth() - 1)
      milestones.push({
        id: "month-1",
        name: "1 Month Before",
        date: month1,
        tasks: [
          {
            id: "task-10",
            name: "Final dress fitting",
            description: "Schedule final dress fitting",
            dueDate: month1,
            completed: false,
            category: "attire",
          },
          {
            id: "task-11",
            name: "Confirm with vendors",
            description: "Confirm all details with vendors",
            dueDate: month1,
            completed: false,
            category: "vendors",
          },
        ],
      })

      // 1 week before
      const week1 = new Date(eventDate)
      week1.setDate(eventDate.getDate() - 7)
      milestones.push({
        id: "week-1",
        name: "1 Week Before",
        date: week1,
        tasks: [
          {
            id: "task-12",
            name: "Final headcount",
            description: "Provide final headcount to caterer",
            dueDate: week1,
            completed: false,
            category: "food",
          },
          {
            id: "task-13",
            name: "Create seating chart",
            description: "Finalize seating arrangements",
            dueDate: week1,
            completed: false,
            category: "planning",
          },
        ],
      })

      // Day of event
      milestones.push({
        id: "day-of",
        name: "Wedding Day",
        date: eventDate,
        tasks: [
          {
            id: "task-14",
            name: "Enjoy your day!",
            description: "Relax and enjoy your special day",
            dueDate: eventDate,
            completed: false,
            category: "celebration",
          },
        ],
      })
    } else if (type === "corporate") {
      // 3 months before
      const month3 = new Date(eventDate)
      month3.setMonth(eventDate.getMonth() - 3)
      milestones.push({
        id: "month-3",
        name: "3 Months Before",
        date: month3,
        tasks: [
          {
            id: "task-1",
            name: "Set objectives",
            description: "Define event goals and objectives",
            dueDate: month3,
            completed: false,
            category: "planning",
          },
          {
            id: "task-2",
            name: "Book venue",
            description: "Research and book event venue",
            dueDate: month3,
            completed: false,
            category: "venue",
          },
          {
            id: "task-3",
            name: "Create budget",
            description: "Develop detailed event budget",
            dueDate: month3,
            completed: false,
            category: "budget",
          },
        ],
      })

      // 2 months before
      const month2 = new Date(eventDate)
      month2.setMonth(eventDate.getMonth() - 2)
      milestones.push({
        id: "month-2",
        name: "2 Months Before",
        date: month2,
        tasks: [
          {
            id: "task-4",
            name: "Book speakers",
            description: "Confirm speakers or presenters",
            dueDate: month2,
            completed: false,
            category: "speakers",
          },
          {
            id: "task-5",
            name: "Plan catering",
            description: "Select menu and catering options",
            dueDate: month2,
            completed: false,
            category: "food",
          },
        ],
      })

      // 1 month before
      const month1 = new Date(eventDate)
      month1.setMonth(eventDate.getMonth() - 1)
      milestones.push({
        id: "month-1",
        name: "1 Month Before",
        date: month1,
        tasks: [
          {
            id: "task-6",
            name: "Send invitations",
            description: "Send out event invitations",
            dueDate: month1,
            completed: false,
            category: "marketing",
          },
          {
            id: "task-7",
            name: "Arrange AV equipment",
            description: "Confirm AV equipment and technical requirements",
            dueDate: month1,
            completed: false,
            category: "equipment",
          },
        ],
      })

      // 2 weeks before
      const week2 = new Date(eventDate)
      week2.setDate(eventDate.getDate() - 14)
      milestones.push({
        id: "week-2",
        name: "2 Weeks Before",
        date: week2,
        tasks: [
          {
            id: "task-8",
            name: "Finalize agenda",
            description: "Finalize event agenda and schedule",
            dueDate: week2,
            completed: false,
            category: "planning",
          },
          {
            id: "task-9",
            name: "Prepare materials",
            description: "Prepare event materials and handouts",
            dueDate: week2,
            completed: false,
            category: "materials",
          },
        ],
      })

      // Day of event
      milestones.push({
        id: "day-of",
        name: "Event Day",
        date: eventDate,
        tasks: [
          {
            id: "task-10",
            name: "Setup",
            description: "Oversee venue setup and preparation",
            dueDate: eventDate,
            completed: false,
            category: "logistics",
          },
          {
            id: "task-11",
            name: "Registration",
            description: "Manage attendee registration",
            dueDate: eventDate,
            completed: false,
            category: "logistics",
          },
        ],
      })
    } else if (type === "birthday") {
      // 2 months before
      const month2 = new Date(eventDate)
      month2.setMonth(eventDate.getMonth() - 2)
      milestones.push({
        id: "month-2",
        name: "2 Months Before",
        date: month2,
        tasks: [
          {
            id: "task-1",
            name: "Set budget",
            description: "Determine your party budget",
            dueDate: month2,
            completed: false,
            category: "budget",
          },
          {
            id: "task-2",
            name: "Choose theme",
            description: "Select a party theme",
            dueDate: month2,
            completed: false,
            category: "planning",
          },
          {
            id: "task-3",
            name: "Book venue",
            description: "Reserve party venue if needed",
            dueDate: month2,
            completed: false,
            category: "venue",
          },
        ],
      })

      // 1 month before
      const month1 = new Date(eventDate)
      month1.setMonth(eventDate.getMonth() - 1)
      milestones.push({
        id: "month-1",
        name: "1 Month Before",
        date: month1,
        tasks: [
          {
            id: "task-4",
            name: "Create guest list",
            description: "Finalize guest list",
            dueDate: month1,
            completed: false,
            category: "planning",
          },
          {
            id: "task-5",
            name: "Send invitations",
            description: "Send out party invitations",
            dueDate: month1,
            completed: false,
            category: "stationery",
          },
        ],
      })

      // 2 weeks before
      const week2 = new Date(eventDate)
      week2.setDate(eventDate.getDate() - 14)
      milestones.push({
        id: "week-2",
        name: "2 Weeks Before",
        date: week2,
        tasks: [
          {
            id: "task-6",
            name: "Order cake",
            description: "Order birthday cake",
            dueDate: week2,
            completed: false,
            category: "food",
          },
          {
            id: "task-7",
            name: "Plan activities",
            description: "Plan party games and activities",
            dueDate: week2,
            completed: false,
            category: "entertainment",
          },
        ],
      })

      // 1 week before
      const week1 = new Date(eventDate)
      week1.setDate(eventDate.getDate() - 7)
      milestones.push({
        id: "week-1",
        name: "1 Week Before",
        date: week1,
        tasks: [
          {
            id: "task-8",
            name: "Shop for supplies",
            description: "Purchase party supplies and decorations",
            dueDate: week1,
            completed: false,
            category: "decor",
          },
          {
            id: "task-9",
            name: "Confirm RSVPs",
            description: "Follow up with guests who haven't responded",
            dueDate: week1,
            completed: false,
            category: "planning",
          },
        ],
      })

      // Day of event
      milestones.push({
        id: "day-of",
        name: "Birthday Party",
        date: eventDate,
        tasks: [
          {
            id: "task-10",
            name: "Setup",
            description: "Set up decorations and prepare venue",
            dueDate: eventDate,
            completed: false,
            category: "logistics",
          },
          {
            id: "task-11",
            name: "Enjoy the party!",
            description: "Have fun and celebrate",
            dueDate: eventDate,
            completed: false,
            category: "celebration",
          },
        ],
      })
    }

    return milestones
  }

  const [milestones, setMilestones] = useState<TimelineMilestone[]>(generateInitialMilestones(eventDate, eventType))

  // Handle event type change
  const handleEventTypeChange = (value: string) => {
    setEventType(value)
    setMilestones(generateInitialMilestones(eventDate, value))
  }

  // Handle event date change
  const handleEventDateChange = (date: Date | null) => {
    setEventDate(date)
    setMilestones(generateInitialMilestones(date, eventType))
  }

  // Add a new milestone
  const addMilestone = () => {
    const newMilestone: TimelineMilestone = {
      id: `milestone-${Date.now()}`,
      name: "New Milestone",
      date: null,
      tasks: [],
    }
    setMilestones([...milestones, newMilestone])
  }

  // Update a milestone
  const updateMilestone = (id: string, field: keyof TimelineMilestone, value: any) => {
    setMilestones(
      milestones.map((milestone) => {
        if (milestone.id === id) {
          return { ...milestone, [field]: value }
        }
        return milestone
      }),
    )
  }

  // Delete a milestone
  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id))
  }

  // Add a new task to a milestone
  const addTask = (milestoneId: string) => {
    setMilestones(
      milestones.map((milestone) => {
        if (milestone.id === milestoneId) {
          const newTask: TimelineTask = {
            id: `task-${Date.now()}`,
            name: "New Task",
            description: "",
            dueDate: milestone.date,
            completed: false,
            category: "planning",
          }
          return {
            ...milestone,
            tasks: [...milestone.tasks, newTask],
          }
        }
        return milestone
      }),
    )
  }

  // Update a task
  const updateTask = (milestoneId: string, taskId: string, field: keyof TimelineTask, value: any) => {
    setMilestones(
      milestones.map((milestone) => {
        if (milestone.id === milestoneId) {
          return {
            ...milestone,
            tasks: milestone.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, [field]: value }
              }
              return task
            }),
          }
        }
        return milestone
      }),
    )
  }

  // Delete a task
  const deleteTask = (milestoneId: string, taskId: string) => {
    setMilestones(
      milestones.map((milestone) => {
        if (milestone.id === milestoneId) {
          return {
            ...milestone,
            tasks: milestone.tasks.filter((task) => task.id !== taskId),
          }
        }
        return milestone
      }),
    )
  }

  // Sort milestones by date
  const sortedMilestones = [...milestones].sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return a.date.getTime() - b.date.getTime()
  })

  // Calculate progress
  const totalTasks = milestones.reduce((sum, milestone) => sum + milestone.tasks.length, 0)
  const completedTasks = milestones.reduce(
    (sum, milestone) => sum + milestone.tasks.filter((task) => task.completed).length,
    0,
  )
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20%283%29-42eiA6o5KiyCbApPkyR3dWCE8wt4wk.png"
                alt="#Ahem Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/calculators">
              <Button variant="ghost" size="sm">
                Back to Calculators
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl font-bold">Event Timeline Generator</h1>
            <p className="mt-2 text-muted-foreground">Create a customized planning timeline for your event</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Set your event type and date</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select value={eventType} onValueChange={handleEventTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="birthday">Birthday Party</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Event Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventDate ? format(eventDate, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={eventDate || undefined}
                        onSelect={handleEventDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Planning Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedTasks} of {totalTasks} tasks completed ({progressPercentage}%)
                  </p>
                </div>
                <Button onClick={addMilestone}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Milestone
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {sortedMilestones.map((milestone, index) => (
              <Card key={milestone.id} className="relative">
                {index > 0 && <div className="absolute -top-4 left-8 h-4 w-0.5 bg-border" />}
                <div className="absolute -bottom-4 left-8 h-4 w-0.5 bg-border" />
                <div className="absolute left-8 top-6 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                <CardHeader className="pl-16">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{milestone.name}</CardTitle>
                      <CardDescription>
                        {milestone.date ? format(milestone.date, "PPP") : "No date set"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Set Date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={milestone.date || undefined}
                            onSelect={(date) => updateMilestone(milestone.id, "date", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Button variant="ghost" size="icon" onClick={() => deleteMilestone(milestone.id)}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-16 space-y-4">
                  <div className="flex items-center justify-between">
                    <Input
                      value={milestone.name}
                      onChange={(e) => updateMilestone(milestone.id, "name", e.target.value)}
                      className="max-w-xs"
                      placeholder="Milestone name"
                    />
                    <Button size="sm" onClick={() => addTask(milestone.id)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>

                  {milestone.tasks.length > 0 ? (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-2 p-3 font-medium border-b">
                        <div className="col-span-1"></div>
                        <div className="col-span-3">Task</div>
                        <div className="col-span-4">Description</div>
                        <div className="col-span-2">Due Date</div>
                        <div className="col-span-1">Category</div>
                        <div className="col-span-1"></div>
                      </div>
                      {milestone.tasks.map((task) => (
                        <div key={task.id} className="grid grid-cols-12 gap-2 p-3 border-b last:border-0 items-center">
                          <div className="col-span-1">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={(checked) =>
                                updateTask(milestone.id, task.id, "completed", checked === true)
                              }
                            />
                          </div>
                          <div className="col-span-3">
                            <Input
                              value={task.name}
                              onChange={(e) => updateTask(milestone.id, task.id, "name", e.target.value)}
                              className={task.completed ? "line-through text-muted-foreground" : ""}
                            />
                          </div>
                          <div className="col-span-4">
                            <Input
                              value={task.description}
                              onChange={(e) => updateTask(milestone.id, task.id, "description", e.target.value)}
                              placeholder="Description"
                            />
                          </div>
                          <div className="col-span-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                  size="sm"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {task.dueDate ? format(task.dueDate, "PP") : "Set date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={task.dueDate || undefined}
                                  onSelect={(date) => updateTask(milestone.id, task.id, "dueDate", date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="col-span-1">
                            <Select
                              value={task.category}
                              onValueChange={(value) => updateTask(milestone.id, task.id, "category", value)}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="planning">Planning</SelectItem>
                                <SelectItem value="venue">Venue</SelectItem>
                                <SelectItem value="vendors">Vendors</SelectItem>
                                <SelectItem value="decor">Decor</SelectItem>
                                <SelectItem value="food">Food</SelectItem>
                                <SelectItem value="logistics">Logistics</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-1 text-right">
                            <Button variant="ghost" size="icon" onClick={() => deleteTask(milestone.id, task.id)}>
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No tasks yet. Click "Add Task" to create one.
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {sortedMilestones.length === 0 && (
              <div className="text-center py-12 border rounded-lg">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Milestones Yet</h3>
                <p className="text-muted-foreground mb-4">Start by adding a milestone to your timeline</p>
                <Button onClick={addMilestone}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Milestone
                </Button>
              </div>
            )}
          </div>

          {sortedMilestones.length > 0 && (
            <div className="mt-8 flex justify-end">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Timeline
              </Button>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t bg-background">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 #Ahem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
