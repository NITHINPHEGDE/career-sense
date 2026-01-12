"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Target } from "lucide-react"

const forecastData = [
  { quarter: "Q1 2024", role_level: "Senior", salary: 115000 },
  { quarter: "Q2 2024", role_level: "Senior", salary: 120000 },
  { quarter: "Q3 2024", role_level: "Staff", salary: 135000 },
  { quarter: "Q4 2024", role_level: "Staff", salary: 145000 },
  { quarter: "Q1 2025", role_level: "Lead", salary: 165000 },
  { quarter: "Q2 2025", role_level: "Lead", salary: 180000 },
]

export function GrowthForecast() {
  return (
    <section id="growth" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">FORECASTING</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">12-Month Growth Forecast</h2>
          <p className="mt-2 text-foreground/60">
            AI-powered predictions for your career trajectory and earning potential
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Career & Salary Forecast</CardTitle>
              <CardDescription>Projected trajectory based on market trends and your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={forecastData}>
                  <defs>
                    <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="quarter" stroke="var(--foreground)" />
                  <YAxis stroke="var(--foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="salary"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSalary)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
