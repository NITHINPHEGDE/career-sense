"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Info } from "lucide-react"
import { SalaryExplainability } from "@/components/salary-explainability"
import { SkillImpactSimulator } from "@/components/skill-impact-simulator"
import { SalaryGrowthForecast } from "@/components/salary-growth-forecast"
import { ModelConfidence } from "@/components/model-confidence"

interface SalaryResultsProps {
  results: {
    salary: number
    minRange: number
    maxRange: number
    percentile: number
  }
  currentExperience: number
}

export function SalaryResults({ results, currentExperience = 0 }: SalaryResultsProps) {
  const formatCurrency = (value: number) => {
    const crores = Math.floor(value / 10000000)
    const lakhs = Math.floor((value % 10000000) / 100000)
    const thousands = Math.floor((value % 100000) / 1000)

    if (crores > 0) return `₹${crores}.${lakhs}Cr`
    if (lakhs > 0) return `₹${lakhs}.${thousands}L`
    return `₹${value}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Main Salary Card */}
      <Card className="border border-primary/30 shadow-lg bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-lg">Estimated Annual Salary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center py-4"
          >
            <div className="text-5xl font-bold text-primary mb-2">{formatCurrency(results.salary)}</div>
            <p className="text-foreground/60 text-sm">per year</p>
          </motion.div>

          {/* Confidence Range */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-muted/50 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Confidence Range</p>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {formatCurrency(results.minRange)} – {formatCurrency(results.maxRange)}
            </p>
            <p className="text-xs text-foreground/60 mt-1">95% confidence interval</p>
          </motion.div>

          {/* Percentile Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 pt-2"
          >
            <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              Top {100 - results.percentile}%
            </Badge>
            <p className="text-sm text-foreground/60">Higher than {results.percentile}% of similar profiles</p>
          </motion.div>
        </CardContent>
      </Card>

      <SalaryExplainability delay={0.3} />

      {/* Skill Impact Simulator */}
      <SkillImpactSimulator baseSalary={results.salary} delay={0.5} />

      {/* Salary Growth Forecast */}
      <SalaryGrowthForecast baseSalary={results.salary} currentExperience={currentExperience} delay={0.7} />

      <ModelConfidence delay={0.9} />

      {/* Additional Info Card */}
      <Card className="border border-border/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">About This Estimate</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-foreground/70 space-y-2">
          <p>This salary prediction is based on:</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>Your years of experience and job role</li>
            <li>Technical skills and education level</li>
            <li>Company size and location</li>
            <li>Current market trends (2024-2025)</li>
          </ul>
          <p className="pt-2 text-xs text-foreground/50">
            Note: This is a prediction based on anonymized market data. Actual salaries may vary.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
