"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertCircle } from "lucide-react"

export function PredictionResult({
  prediction,
}: {
  prediction: {
    salary: number
    monthly: number
    yearsOfExperience: number
  }
}) {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Predicted Annual Salary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Annual Salary</p>
              <p className="text-5xl font-bold text-primary">₹{prediction.salary.toLocaleString("en-IN")}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly</p>
                <p className="text-2xl font-bold text-foreground">₹{prediction.monthly.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Experience</p>
                <p className="text-2xl font-bold text-foreground">{prediction.yearsOfExperience} years</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Salary Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: "Lower Range", value: Math.round(prediction.salary * 0.8), percent: 80 },
              { label: "Expected (Your Prediction)", value: prediction.salary, percent: 100 },
              { label: "Upper Range", value: Math.round(prediction.salary * 1.2), percent: 120 },
            ].map((range) => (
              <div key={range.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{range.label}</span>
                  <span className="text-sm text-muted-foreground">₹{range.value.toLocaleString("en-IN")}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-500`}
                    style={{ width: `${range.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/50">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Disclaimer</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This is an estimated prediction based on ML analysis of market data. Actual salary may vary based on
                company, negotiation, and other factors.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
