"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Plus, Trash, Download, PieChart, BarChart } from "lucide-react"

// Define budget category types
type BudgetCategory = {
  id: string
  name: string
  percentage: number
  amount: number
  items: BudgetItem[]
}

type BudgetItem = {
  id: string
  name: string
  estimated: number
  actual: number
  paid: number
  notes: string
}

export default function BudgetCalculatorPage() {
  const [totalBudget, setTotalBudget] = useState(10000)
  const [eventType, setEventType] = useState("wedding")

  // Initial budget categories based on event type
  const initialCategories: Record<string, BudgetCategory[]> = {
    wedding: [
      {
        id: "venue",
        name: "Venue & Rentals",
        percentage: 40,
        amount: 4000,
        items: [
          { id: "venue1", name: "Ceremony Venue", estimated: 2000, actual: 0, paid: 0, notes: "" },
          { id: "venue2", name: "Reception Venue", estimated: 2000, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "catering",
        name: "Catering & Drinks",
        percentage: 25,
        amount: 2500,
        items: [
          { id: "catering1", name: "Food", estimated: 1500, actual: 0, paid: 0, notes: "" },
          { id: "catering2", name: "Beverages", estimated: 1000, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "decor",
        name: "Decor & Flowers",
        percentage: 10,
        amount: 1000,
        items: [
          { id: "decor1", name: "Flowers", estimated: 600, actual: 0, paid: 0, notes: "" },
          { id: "decor2", name: "Decorations", estimated: 400, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "attire",
        name: "Attire & Beauty",
        percentage: 10,
        amount: 1000,
        items: [
          { id: "attire1", name: "Wedding Dress", estimated: 600, actual: 0, paid: 0, notes: "" },
          { id: "attire2", name: "Suit/Tuxedo", estimated: 400, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "photo",
        name: "Photography & Video",
        percentage: 10,
        amount: 1000,
        items: [
          { id: "photo1", name: "Photographer", estimated: 600, actual: 0, paid: 0, notes: "" },
          { id: "photo2", name: "Videographer", estimated: 400, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "misc",
        name: "Miscellaneous",
        percentage: 5,
        amount: 500,
        items: [{ id: "misc1", name: "Contingency Fund", estimated: 500, actual: 0, paid: 0, notes: "" }],
      },
    ],
    corporate: [
      {
        id: "venue",
        name: "Venue & Equipment",
        percentage: 35,
        amount: 3500,
        items: [
          { id: "venue1", name: "Venue Rental", estimated: 2500, actual: 0, paid: 0, notes: "" },
          { id: "venue2", name: "AV Equipment", estimated: 1000, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "catering",
        name: "Catering & Refreshments",
        percentage: 30,
        amount: 3000,
        items: [
          { id: "catering1", name: "Meals", estimated: 2000, actual: 0, paid: 0, notes: "" },
          { id: "catering2", name: "Beverages", estimated: 1000, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "speakers",
        name: "Speakers & Entertainment",
        percentage: 15,
        amount: 1500,
        items: [
          { id: "speakers1", name: "Keynote Speaker", estimated: 1000, actual: 0, paid: 0, notes: "" },
          { id: "speakers2", name: "Entertainment", estimated: 500, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "marketing",
        name: "Marketing & Materials",
        percentage: 10,
        amount: 1000,
        items: [
          { id: "marketing1", name: "Promotional Materials", estimated: 500, actual: 0, paid: 0, notes: "" },
          { id: "marketing2", name: "Printing", estimated: 500, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "staff",
        name: "Staff & Management",
        percentage: 10,
        amount: 1000,
        items: [
          { id: "staff1", name: "Event Staff", estimated: 600, actual: 0, paid: 0, notes: "" },
          { id: "staff2", name: "Event Planner", estimated: 400, actual: 0, paid: 0, notes: "" },
        ],
      },
    ],
    birthday: [
      {
        id: "venue",
        name: "Venue & Space",
        percentage: 30,
        amount: 3000,
        items: [{ id: "venue1", name: "Venue Rental", estimated: 3000, actual: 0, paid: 0, notes: "" }],
      },
      {
        id: "food",
        name: "Food & Cake",
        percentage: 25,
        amount: 2500,
        items: [
          { id: "food1", name: "Catering", estimated: 2000, actual: 0, paid: 0, notes: "" },
          { id: "food2", name: "Birthday Cake", estimated: 500, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "decor",
        name: "Decorations",
        percentage: 15,
        amount: 1500,
        items: [
          { id: "decor1", name: "Balloons & Decor", estimated: 800, actual: 0, paid: 0, notes: "" },
          { id: "decor2", name: "Party Favors", estimated: 700, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "entertainment",
        name: "Entertainment",
        percentage: 20,
        amount: 2000,
        items: [
          { id: "entertainment1", name: "DJ/Music", estimated: 1000, actual: 0, paid: 0, notes: "" },
          { id: "entertainment2", name: "Activities", estimated: 1000, actual: 0, paid: 0, notes: "" },
        ],
      },
      {
        id: "misc",
        name: "Miscellaneous",
        percentage: 10,
        amount: 1000,
        items: [
          { id: "misc1", name: "Invitations", estimated: 300, actual: 0, paid: 0, notes: "" },
          { id: "misc2", name: "Photography", estimated: 700, actual: 0, paid: 0, notes: "" },
        ],
      },
    ],
  }

  const [categories, setCategories] = useState<BudgetCategory[]>(initialCategories[eventType])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Calculate totals
  const totalEstimated = categories.reduce(
    (sum, category) => sum + category.items.reduce((sum, item) => sum + item.estimated, 0),
    0,
  )
  const totalActual = categories.reduce(
    (sum, category) => sum + category.items.reduce((sum, item) => sum + (item.actual || 0), 0),
    0,
  )
  const totalPaid = categories.reduce(
    (sum, category) => sum + category.items.reduce((sum, item) => sum + (item.paid || 0), 0),
    0,
  )

  // Handle event type change
  const handleEventTypeChange = (value: string) => {
    setEventType(value)
    setCategories(
      initialCategories[value].map((category) => ({
        ...category,
        amount: (totalBudget * category.percentage) / 100,
      })),
    )
  }

  // Handle total budget change
  const handleTotalBudgetChange = (value: number) => {
    setTotalBudget(value)
    setCategories(
      categories.map((category) => ({
        ...category,
        amount: (value * category.percentage) / 100,
      })),
    )
  }

  // Add a new budget item to a category
  const addBudgetItem = (categoryId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          const newItem: BudgetItem = {
            id: `item-${Date.now()}`,
            name: "New Item",
            estimated: 0,
            actual: 0,
            paid: 0,
            notes: "",
          }
          return {
            ...category,
            items: [...category.items, newItem],
          }
        }
        return category
      }),
    )
  }

  // Update a budget item
  const updateBudgetItem = (categoryId: string, itemId: string, field: keyof BudgetItem, value: any) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, [field]: value }
              }
              return item
            }),
          }
        }
        return category
      }),
    )
  }

  // Delete a budget item
  const deleteBudgetItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.filter((item) => item.id !== itemId),
          }
        }
        return category
      }),
    )
  }

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
            <h1 className="text-3xl font-bold">Event Budget Calculator</h1>
            <p className="mt-2 text-muted-foreground">
              Plan and track your event budget with our interactive calculator
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Budget Settings</CardTitle>
              <CardDescription>Set your total budget and event type</CardDescription>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="total-budget">Total Budget</Label>
                    <div className="font-medium">${totalBudget.toLocaleString()}</div>
                  </div>
                  <Slider
                    id="total-budget"
                    min={1000}
                    max={50000}
                    step={500}
                    value={[totalBudget]}
                    onValueChange={(value) => handleTotalBudgetChange(value[0])}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Budget Summary</div>
                  <div className="text-sm text-muted-foreground">
                    Estimated: ${totalEstimated.toLocaleString()} | Actual: ${totalActual.toLocaleString()} | Paid: $
                    {totalPaid.toLocaleString()}
                  </div>
                </div>
                <Progress value={(totalActual / totalBudget) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="categories" className="space-y-4">
            <TabsList>
              <TabsTrigger value="categories">Budget Categories</TabsTrigger>
              <TabsTrigger value="details">Detailed View</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Card key={category.id} className={activeCategory === category.id ? "ring-2 ring-primary" : ""}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>
                        {category.percentage}% of total budget (${category.amount.toLocaleString()})
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Estimated: ${category.items.reduce((sum, item) => sum + item.estimated, 0).toLocaleString()}
                          </span>
                          <span>
                            Actual: $
                            {category.items.reduce((sum, item) => sum + (item.actual || 0), 0).toLocaleString()}
                          </span>
                        </div>
                        <Progress
                          value={
                            (category.items.reduce((sum, item) => sum + (item.actual || 0), 0) / category.amount) * 100
                          }
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                      >
                        {activeCategory === category.id ? "Close" : "View Details"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {activeCategory && (
                <Card className="mt-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{categories.find((c) => c.id === activeCategory)?.name} Details</CardTitle>
                      <CardDescription>Manage budget items for this category</CardDescription>
                    </div>
                    <Button size="sm" onClick={() => addBudgetItem(activeCategory)}>
                      <Plus className="mr-1 h-4 w-4" /> Add Item
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-2 p-3 font-medium border-b">
                        <div className="col-span-3">Item</div>
                        <div className="col-span-2">Estimated</div>
                        <div className="col-span-2">Actual</div>
                        <div className="col-span-2">Paid</div>
                        <div className="col-span-2">Notes</div>
                        <div className="col-span-1"></div>
                      </div>
                      {categories
                        .find((c) => c.id === activeCategory)
                        ?.items.map((item) => (
                          <div
                            key={item.id}
                            className="grid grid-cols-12 gap-2 p-3 border-b last:border-0 items-center"
                          >
                            <div className="col-span-3">
                              <Input
                                value={item.name}
                                onChange={(e) => updateBudgetItem(activeCategory, item.id, "name", e.target.value)}
                              />
                            </div>
                            <div className="col-span-2">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                                <Input
                                  type="number"
                                  value={item.estimated}
                                  onChange={(e) =>
                                    updateBudgetItem(activeCategory, item.id, "estimated", Number(e.target.value))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                                <Input
                                  type="number"
                                  value={item.actual || ""}
                                  onChange={(e) =>
                                    updateBudgetItem(activeCategory, item.id, "actual", Number(e.target.value))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                                <Input
                                  type="number"
                                  value={item.paid || ""}
                                  onChange={(e) =>
                                    updateBudgetItem(activeCategory, item.id, "paid", Number(e.target.value))
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-span-2">
                              <Input
                                value={item.notes}
                                onChange={(e) => updateBudgetItem(activeCategory, item.id, "notes", e.target.value)}
                              />
                            </div>
                            <div className="col-span-1 text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteBudgetItem(activeCategory, item.id)}
                              >
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Budget Breakdown</CardTitle>
                  <CardDescription>View all budget items across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-3 font-medium border-b">
                      <div className="col-span-2">Category</div>
                      <div className="col-span-3">Item</div>
                      <div className="col-span-2">Estimated</div>
                      <div className="col-span-2">Actual</div>
                      <div className="col-span-2">Paid</div>
                      <div className="col-span-1">Status</div>
                    </div>
                    {categories.flatMap((category) =>
                      category.items.map((item) => (
                        <div
                          key={`${category.id}-${item.id}`}
                          className="grid grid-cols-12 gap-2 p-3 border-b last:border-0"
                        >
                          <div className="col-span-2 font-medium">{category.name}</div>
                          <div className="col-span-3">{item.name}</div>
                          <div className="col-span-2">${item.estimated.toLocaleString()}</div>
                          <div className="col-span-2">${(item.actual || 0).toLocaleString()}</div>
                          <div className="col-span-2">${(item.paid || 0).toLocaleString()}</div>
                          <div className="col-span-1">
                            {item.paid >= (item.actual || item.estimated) ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Paid
                              </span>
                            ) : item.actual > 0 ? (
                              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                Partial
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                      )),
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Summary</CardTitle>
                  <CardDescription>Overview of your budget allocation and spending</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Budget Allocation</h3>
                      <div className="aspect-square rounded-md border p-4 flex items-center justify-center">
                        <PieChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Estimated vs. Actual</h3>
                      <div className="aspect-square rounded-md border p-4 flex items-center justify-center">
                        <BarChart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Budget Overview</h3>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 gap-2 p-3 font-medium border-b">
                        <div className="col-span-1">Category</div>
                        <div className="col-span-1">Allocation</div>
                        <div className="col-span-1">Estimated</div>
                        <div className="col-span-1">Actual</div>
                      </div>
                      {categories.map((category) => {
                        const categoryEstimated = category.items.reduce((sum, item) => sum + item.estimated, 0)
                        const categoryActual = category.items.reduce((sum, item) => sum + (item.actual || 0), 0)

                        return (
                          <div key={category.id} className="grid grid-cols-4 gap-2 p-3 border-b last:border-0">
                            <div className="col-span-1 font-medium">{category.name}</div>
                            <div className="col-span-1">
                              ${category.amount.toLocaleString()} ({category.percentage}%)
                            </div>
                            <div className="col-span-1">${categoryEstimated.toLocaleString()}</div>
                            <div className="col-span-1">${categoryActual.toLocaleString()}</div>
                          </div>
                        )
                      })}
                      <div className="grid grid-cols-4 gap-2 p-3 font-medium bg-muted/50">
                        <div className="col-span-1">Total</div>
                        <div className="col-span-1">${totalBudget.toLocaleString()} (100%)</div>
                        <div className="col-span-1">${totalEstimated.toLocaleString()}</div>
                        <div className="col-span-1">${totalActual.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Budget
                  </Button>
                  <Button>
                    <PieChart className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
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
