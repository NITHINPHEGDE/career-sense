"use client"

import { BarChart3, TrendingUp, Zap, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: "Salary Prediction",
      description:
        "Get accurate salary predictions based on your experience, location, skills, and job category using advanced ML models.",
      color: "from-primary/20 to-primary/5",
    },
    {
      icon: BarChart3,
      title: "Interactive Analytics",
      description:
        "Explore salary trends across locations, job categories, company sizes, and skill combinations with beautiful visualizations.",
      color: "from-accent/20 to-accent/5",
    },
    {
      icon: Zap,
      title: "Skill Impact Analysis",
      description:
        "See exactly how much each skill adds to your salary. Toggle skills on and off to understand your market value.",
      color: "from-primary/20 to-accent/20",
    },
    {
      icon: Brain,
      title: "Career Comparison",
      description:
        "Compare different career paths side-by-side. Understand salary differences between roles and locations.",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand your career value and make informed decisions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border-border/50 hover:border-border/80 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
