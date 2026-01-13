"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { BarChart3, Home, Zap, TrendingUp } from "lucide-react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline text-foreground group-hover:text-primary transition-colors">
                CareerAI
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "/dashboard", icon: Home, label: "Prediction" },
                { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
                { href: "/dashboard/comparison", icon: TrendingUp, label: "Comparison" },
                { href: "/dashboard/skills", icon: Zap, label: "Skills" },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden lg:inline">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/">
                <Button variant="outline" size="sm">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">{children}</main>
    </div>
  )
}
