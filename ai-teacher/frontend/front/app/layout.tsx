import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/front/components/theme-provider"
import { Navbar } from "@/front/components/navbar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Skill Forge - Learn by Doing",
  description: "Master practical skills through real-world challenges",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'