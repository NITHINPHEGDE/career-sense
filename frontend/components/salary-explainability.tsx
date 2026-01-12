"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { HelpCircle } from "lucide-react"

const featureData = [
  { feature: "Experience", importance: 35, description: "Years of professional experience in your field" },
  { feature: "Skills", importance: 25, description: "Technical and specialized skills you possess" },
  { feature: "Location", importance: 20, description: "Geographic location and cost of living index" },
  { feature: "Company Size", importance: 20, description: "Size of the organization you work for" },
]

interface SalaryExplainabilityProps {
  delay?: number
}

export function SalaryExplainability({ delay = 0.4 }: SalaryExplainabilityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <Card className="border border-border/40 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base">Why this salary?</CardTitle>
          </div>
          <p className="text-xs text-foreground/60 mt-1">Feature importance breakdown of your prediction</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bar Chart */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--foreground))" opacity={0.5} />
                <YAxis
                  type="category"
                  dataKey="feature"
                  stroke="hsl(var(--foreground))"
                  width={90}
                  tick={{ fontSize: 13 }}
                />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value) => `${value}%`}
                  labelFormatter={(label) => label}
                />
                <Bar dataKey="importance" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Feature Details */}
          <div className="space-y-3">
            {featureData.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.1 + index * 0.05 }}
                className="flex items-start gap-3 pb-3 border-b border-border/40 last:border-0 last:pb-0"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{item.importance}%</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.feature}</p>
                  <p className="text-xs text-foreground/60 mt-0.5">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="pt-2 px-3 py-2 bg-muted/30 rounded-lg">
            <p className="text-xs text-foreground/60">
              This breakdown shows how each factor contributes to your predicted salary. These percentages are based on
              our machine learning model trained on market data.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
