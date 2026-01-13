"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-32 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Predict Your Future?</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Join thousands of professionals making smarter career decisions with AI-powered insights
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="gap-2">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
