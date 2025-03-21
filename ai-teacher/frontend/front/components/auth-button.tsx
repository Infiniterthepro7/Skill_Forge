"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/front/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/front/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/front/components/ui/avatar"
import { LogOut, User, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

interface AuthButtonProps {
  className?: string
}

export function AuthButton({ className }: AuthButtonProps) {
  // In a real app, this would come from your auth provider
  const [isSignedIn, setIsSignedIn] = useState(false)
  const router = useRouter()

  const handleSignOut = () => {
    setIsSignedIn(false)
    // In a real app, you would sign out from your auth provider here
    router.push("/")
  }

  if (isSignedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={`rounded-full p-0 ${className}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>SF</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Link href="/auth/signin" className={className}>
      <Button variant="outline">Sign In</Button>
    </Link>
  )
}

