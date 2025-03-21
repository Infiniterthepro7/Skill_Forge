"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/front/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/front/components/ui/card"
import { Progress } from "@/front/components/ui/progress"
import { CheckCircle, HelpCircle } from "lucide-react"
import { TaskInterface } from "@/front/components/task-interface"

const goalData = {
  "python-dev": {
    title: "Python Developer",
    description: "Master Python programming through practical tasks",
    currentTask: 3,
    totalTasks: 42,
    color: "blue",
  },
  "data-analyst": {
    title: "Data Analyst",
    description: "Become proficient in data analysis and visualization",
    currentTask: 1,
    totalTasks: 38,
    color: "green",
  },
  "web-dev": {
    title: "Web Developer",
    description: "Learn to build modern, responsive web applications",
    currentTask: 5,
    totalTasks: 56,
    color: "purple",
  },
  "backend-dev": {
    title: "Backend Developer",
    description: "Create robust server-side applications and APIs",
    currentTask: 2,
    totalTasks: 45,
    color: "orange",
  },
  "data-engineer": {
    title: "Data Engineer",
    description: "Design systems for collecting and analyzing data",
    currentTask: 4,
    totalTasks: 40,
    color: "red",
  },
  "ml-engineer": {
    title: "ML Engineer",
    description: "Develop machine learning models for real-world problems",
    currentTask: 1,
    totalTasks: 48,
    color: "indigo",
  },
}

const pythonTasks = [
  {
    id: "task-1",
    title: "Calculate Total Sales",
    description: "Write a Python function to calculate the total sales from a list of transactions.",
    difficulty: "Easy",
    estimatedTime: "15 min",
    instructions: `
# Task: Calculate Total Sales

You are working for a retail company that needs to calculate their total sales for the day.
You have been given a list of transactions, where each transaction is a tuple containing
(product_name, quantity, price_per_unit).

Write a Python function called \`calculate_total_sales\` that:
1. Takes a list of transactions as input
2. Calculates the total sales amount
3. Returns the total as a float rounded to 2 decimal places

## Example:
transactions = [
    ("Shirt", 2, 25.50),
    ("Pants", 1, 35.99),
    ("Shoes", 1, 59.99),
    ("Hat", 3, 15.00)
]

calculate_total_sales(transactions) should return 192.48
    `,
    initialCode: `def calculate_total_sales(transactions):
    # Your code here
    pass

# Test your function
transactions = [
    ("Shirt", 2, 25.50),
    ("Pants", 1, 35.99),
    ("Shoes", 1, 59.99),
    ("Hat", 3, 15.00)
]

total = calculate_total_sales(transactions)
print(f"Total sales: ${total}")`,
    solution: `def calculate_total_sales(transactions):
    total = 0
    for product, quantity, price in transactions:
        total += quantity * price
    return round(total, 2)

# Test your function
transactions = [
    ("Shirt", 2, 25.50),
    ("Pants", 1, 35.99),
    ("Shoes", 1, 59.99),
    ("Hat", 3, 15.00)
]

total = calculate_total_sales(transactions)
print(f"Total sales: ${total}")`,
    hints: [
      "Start by initializing a variable to store the total sales amount.",
      "Loop through each transaction in the list.",
      "For each transaction, multiply the quantity by the price per unit and add it to the total.",
      "Remember to round the final result to 2 decimal places using the round() function.",
    ],
  },
  {
    id: "task-2",
    title: "Filter Customer Data",
    description: "Create a function to filter customer data based on purchase history.",
    difficulty: "Medium",
    estimatedTime: "25 min",
    instructions: `
# Task: Filter Customer Data

Your marketing team wants to identify customers who have spent more than a certain amount
to target them for a loyalty program. You need to filter the customer data based on their
total purchase amount.

Write a Python function called \`filter_customers\` that:
1. Takes a list of customer dictionaries and a minimum spend amount as input
2. Returns a new list containing only customers who have spent at least the minimum amount
3. Sorts the resulting list by total_spent in descending order

## Example:
customers = [
    {"id": 1, "name": "Alice", "total_spent": 340.50},
    {"id": 2, "name": "Bob", "total_spent": 125.99},
    {"id": 3, "name": "Charlie", "total_spent": 550.00},
    {"id": 4, "name": "Diana", "total_spent": 210.75}
]

filter_customers(customers, 200) should return:
[
    {"id": 3, "name": "Charlie", "total_spent": 550.00},
    {"id": 1, "name": "Alice", "total_spent": 340.50},
    {"id": 4, "name": "Diana", "total_spent": 210.75}
]
    `,
    initialCode: `def filter_customers(customers, min_spend):
    # Your code here
    pass

# Test your function
customers = [
    {"id": 1, "name": "Alice", "total_spent": 340.50},
    {"id": 2, "name": "Bob", "total_spent": 125.99},
    {"id": 3, "name": "Charlie", "total_spent": 550.00},
    {"id": 4, "name": "Diana", "total_spent": 210.75}
]

loyal_customers = filter_customers(customers, 200)
print(loyal_customers)`,
    solution: `def filter_customers(customers, min_spend):
    filtered = [customer for customer in customers if customer["total_spent"] >= min_spend]
    return sorted(filtered, key=lambda x: x["total_spent"], reverse=True)

# Test your function
customers = [
    {"id": 1, "name": "Alice", "total_spent": 340.50},
    {"id": 2, "name": "Bob", "total_spent": 125.99},
    {"id": 3, "name": "Charlie", "total_spent": 550.00},
    {"id": 4, "name": "Diana", "total_spent": 210.75}
]

loyal_customers = filter_customers(customers, 200)
print(loyal_customers)`,
    hints: [
      "Use a list comprehension to filter customers based on their total_spent value.",
      "The sorted() function can help you sort the list based on a specific key.",
      "To sort in descending order, use the reverse=True parameter in the sorted() function.",
      "You can use a lambda function as the key for sorting based on the total_spent field.",
    ],
  },
]

export default function TaskPage() {
  const params = useParams()
  const goalId = params.goalId as string
  const goal = goalData[goalId as keyof typeof goalData] || {
    title: "Unknown Goal",
    description: "Goal not found",
    currentTask: 0,
    totalTasks: 0,
    color: "gray",
  }

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const tasks = pythonTasks // In a real app, this would be fetched based on goalId
  const currentTask = tasks[currentTaskIndex]

  const [code, setCode] = useState(currentTask.initialCode)
  const [output, setOutput] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  const runCode = () => {
    // In a real app, this would send the code to a backend for execution
    // For now, we'll just simulate output
    setOutput("Running code...\n\nTotal sales: $192.48\n\nGreat job! Your solution is correct.")
  }

  const checkAnswer = () => {
    // In a real app, this would validate the user's solution
    // For now, we'll just simulate a correct answer
    setOutput("Checking your solution...\n\nYour solution is correct! Great job!")
  }

  const showNextHint = () => {
    if (currentHintIndex < currentTask.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1)
    }
    setShowHint(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{goal.title}</h1>
          <p className="text-gray-600 mb-4">{goal.description}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="flex-1">
              <Progress value={(goal.currentTask / goal.totalTasks) * 100} className="h-2" />
            </div>
            <div className="text-sm text-gray-500">
              Task {goal.currentTask} of {goal.totalTasks}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{currentTask.title}</CardTitle>
                <CardDescription>
                  <div className="flex justify-between">
                    <span>Difficulty: {currentTask.difficulty}</span>
                    <span>~{currentTask.estimatedTime}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
                    {currentTask.instructions}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button variant="outline" className="w-full flex items-center gap-2" onClick={showNextHint}>
                  <HelpCircle className="h-4 w-4" />
                  {showHint ? `Hint ${currentHintIndex + 1}/${currentTask.hints.length}` : "Get a Hint"}
                </Button>

                {showHint && (
                  <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                    {currentTask.hints[currentHintIndex]}
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => setShowSolution(!showSolution)}
                >
                  <CheckCircle className="h-4 w-4" />
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <TaskInterface
              code={showSolution ? currentTask.solution : code}
              setCode={setCode}
              output={output}
              runCode={runCode}
              checkAnswer={checkAnswer}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

