"use client"

import { Card, CardContent } from "@/components/ui/card"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Enter Your Details",
      description: "Provide your experience, location, employment status, and skills",
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our ML model analyzes your profile against market data",
    },
    {
      number: "03",
      title: "Get Insights",
      description: "Receive salary predictions and detailed career insights",
    },
    {
      number: "04",
      title: "Explore Analytics",
      description: "Dive deeper with interactive charts and comparisons",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple, intuitive, and powered by advanced machine learning
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="border-border/50 h-full">
                <CardContent className="pt-8">
                  <div className="text-4xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
