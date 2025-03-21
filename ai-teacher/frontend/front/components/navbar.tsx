import Link from "next/link"
import { AuthButton } from "@/front/components/auth-button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Skill Forge Logo" className="h-8 w-8 object-contain" />
          <span className="font-bold text-xl">Skill Forge</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/goals" className="font-medium transition-colors hover:text-primary">
            Learning Paths
          </Link>
          <Link href="/about" className="font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/pricing" className="font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </header>
  )
}

