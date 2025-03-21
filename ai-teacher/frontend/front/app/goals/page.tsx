import Link from "next/link"
import { Button } from "@/front/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/front/components/ui/card"
import { Badge } from "@/front/components/ui/badge"
import { ArrowRight, Code, Database, LineChart, Globe, Server, Cpu } from "lucide-react"

const goals = [
  {
    id: "python-dev",
    title: "Python Developer",
    description: "Learn Python programming through practical tasks like data processing, web scraping, and automation.",
    icon: <Code className="h-8 w-8 text-blue-500" />,
    level: "Beginner to Intermediate",
    tasks: 42,
    estimatedTime: "10 weeks",
    color: "blue",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "Master data analysis with real datasets, visualization techniques, and statistical methods.",
    icon: <LineChart className="h-8 w-8 text-green-500" />,
    level: "Intermediate",
    tasks: 38,
    estimatedTime: "12 weeks",
    color: "green",
  },
  {
    id: "web-dev",
    title: "Web Developer",
    description: "Build responsive websites and web applications with HTML, CSS, JavaScript, and modern frameworks.",
    icon: <Globe className="h-8 w-8 text-purple-500" />,
    level: "Beginner to Advanced",
    tasks: 56,
    estimatedTime: "16 weeks",
    color: "purple",
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    description: "Create robust server-side applications, APIs, and database systems.",
    icon: <Server className="h-8 w-8 text-orange-500" />,
    level: "Intermediate",
    tasks: 45,
    estimatedTime: "14 weeks",
    color: "orange",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    description: "Design and build systems for collecting, storing, and analyzing large datasets.",
    icon: <Database className="h-8 w-8 text-red-500" />,
    level: "Advanced",
    tasks: 40,
    estimatedTime: "15 weeks",
    color: "red",
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    description: "Develop machine learning models to solve real-world problems with practical datasets.",
    icon: <Cpu className="h-8 w-8 text-indigo-500" />,
    level: "Advanced",
    tasks: 48,
    estimatedTime: "18 weeks",
    color: "indigo",
  },
]

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Learning Path</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a goal that matches your interests and career aspirations. Each path contains practical, real-world
            tasks designed to build your skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              className="overflow-hidden border-t-4"
              style={{ borderTopColor: `var(--${goal.color}-500)` }}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">{goal.icon}</div>
                  <Badge variant="outline" className="text-xs">
                    {goal.level}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{goal.title}</CardTitle>
                <CardDescription>{goal.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{goal.tasks} Tasks</span>
                  <span>~{goal.estimatedTime}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/tasks/${goal.id}`} className="w-full">
                  <Button className={`w-full bg-${goal.color}-500 hover:bg-${goal.color}-600`}>
                    Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

