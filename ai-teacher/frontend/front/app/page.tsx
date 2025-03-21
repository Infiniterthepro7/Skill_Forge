import Link from "next/link"
import { Button } from "@/front/components/ui/button"
import { ArrowRight, Code, LineChart, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center bg-gradient-to-b from-white to-gray-100">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="text-orange-500">Master</span> real skills with{" "}
          <span className="text-blue-500">real challenges</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mb-8">
          a Skill Forge helps you learn practical skills by solving real-world tasks, not just abstract puzzles. Our AI
          adapts to your pace, checks your answers, and gives hints when you need them.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/goals">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Start Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/auth/signin?tab=signup">
            <Button size="lg" variant="outline">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How Skill Forge Works</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Goal</h3>
              <p className="text-gray-600">
                Select a skill path like "Python Developer" or "Data Analyst" and set your learning pace.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 mb-4">
                <Code className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Solve Real Tasks</h3>
              <p className="text-gray-600">
                Practice with practical challenges like "Calculate sales data" or "Build a web scraper".
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <LineChart className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Our spaced repetition system ensures you review concepts at the optimal time for retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to forge your skills?</h2>
          <p className="text-xl mb-8">
            Join thousands of learners who are building practical skills through real-world challenges.
          </p>
          <Link href="/goals">
            <Button size="lg" variant="outline" className="bg-white text-blue-500 hover:bg-gray-100">
              Explore Learning Paths
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

