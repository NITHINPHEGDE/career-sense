"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl opacity-50 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              ✨ AI-Powered Insights
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Predict Your Salary
            <br />
            with Machine Learning
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Get AI-powered salary predictions and career insights based on real market data. Analyze your skills value,
            compare career paths, and make data-driven decisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Start Predicting
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline">
                Learn How It Works
              </Button>
            </Link>
          </div>

          <div className="mt-16 pt-12 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">Trusted by thousands of professionals</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {["Tech", "Finance", "Startups", "Enterprise"].map((org) => (
                <div key={org} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                  <span className="text-sm font-medium">{org}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
