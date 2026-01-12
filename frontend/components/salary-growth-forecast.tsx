"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface SalaryGrowthForecastProps {
  baseSalary: number
  currentExperience: number
  delay?: number
}

// Mock data generator - placeholder for backend data
const generateGrowthForecast = (baseSalary: number, years: number) => {
  const data = []
  for (let i = 0; i <= years; i++) {
    // Mock growth: 5-8% annual growth with diminishing returns
    const growthRate = 0.06 - i * 0.003
    const salary = Math.round(baseSalary * Math.pow(1 + growthRate, i))
    data.push({
      year: i,
      salary,
      label: `+${i}y`,
    })
  }
  return data
}

export function SalaryGrowthForecast({ baseSalary, currentExperience, delay = 0.7 }: SalaryGrowthForecastProps) {
  const [yearsProjected, setYearsProjected] = useState(3)
  const forecastData = generateGrowthForecast(baseSalary, 5)

  const formatCurrency = (value: number) => {
    const crores = Math.floor(value / 10000000)
    const lakhs = Math.floor((value % 10000000) / 100000)

    if (crores > 0) return `₹${crores}.${lakhs}Cr`
    if (lakhs > 0) return `₹${lakhs}L`
    return `₹${value}`
  }

  const projectedSalary = forecastData[yearsProjected]?.salary || baseSalary

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <Card className="border border-border/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Salary Growth Forecast</CardTitle>
          <p className="text-xs text-foreground/60 mt-1">Projected salary growth assuming steady skill progression</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Years Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="years-projected" className="text-sm font-medium">
                Project career growth
              </Label>
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                +{yearsProjected} years
              </span>
            </div>
            <Slider
              id="years-projected"
              min={0}
              max={5}
              step={1}
              value={[yearsProjected]}
              onValueChange={(value) => setYearsProjected(value[0])}
              className="w-full"
            />
            <p className="text-xs text-foreground/50">
              Currently: {currentExperience} years • Projected: {currentExperience + yearsProjected} years
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            className="w-full h-64"
          >
            <ChartContainer
              config={{
                salary: {
                  label: "Annual Salary",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="label" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => `₹${(value / 1000000).toFixed(0)}M`}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length > 0) {
                        const data = payload[0].payload
                        return (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-background border border-border rounded-lg p-3 shadow-lg"
                          >
                            <p className="text-sm font-semibold text-foreground">{data.label}</p>
                            <p className="text-sm text-primary font-bold">{formatCurrency(data.salary)}</p>
                          </motion.div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="salary"
                    stroke="var(--color-salary)"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "var(--color-salary)", strokeWidth: 2, stroke: "var(--color-background)" }}
                    activeDot={{ r: 7 }}
                    isAnimationActive={true}
                    animationDuration={800}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </motion.div>

          {/* Projected Salary Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3 }}
            className="bg-muted/50 rounded-lg p-4 space-y-2"
          >
            <p className="text-sm font-medium text-foreground">Projected Salary:</p>
            <div className="text-2xl font-bold text-primary">{formatCurrency(projectedSalary)}</div>
            <p className="text-xs text-foreground/60">
              Expected in {currentExperience + yearsProjected} years of experience
            </p>
          </motion.div>

          {/* Disclaimer */}
          <div className="pt-2 px-3 py-2 bg-muted/20 rounded-lg border border-border/40">
            <p className="text-xs text-foreground/60">
              📊 <span className="font-medium">Model placeholder:</span> Backend integration point for real salary
              growth predictions. Current forecast uses mock growth assumptions.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
