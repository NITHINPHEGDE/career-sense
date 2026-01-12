"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Zap } from "lucide-react"

const skillData = [
  { skill: "Python", current: 85, potential: 95 },
  { skill: "React", current: 78, potential: 92 },
  { skill: "System Design", current: 72, potential: 88 },
  { skill: "Leadership", current: 65, potential: 90 },
  { skill: "Cloud", current: 70, potential: 85 },
  { skill: "AI/ML", current: 60, potential: 95 },
]

export function SkillSimulator() {
  return (
    <section id="skills" className="border-b border-border/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">SKILL DEVELOPMENT</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Skill Growth Simulator</h2>
          <p className="mt-2 text-foreground/60">Explore your current skills and potential growth areas</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle>Current vs. Potential Skills</CardTitle>
              <CardDescription>Benchmark your skills and identify growth opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="skill" stroke="var(--foreground)" />
                  <YAxis stroke="var(--foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="current" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="potential" fill="var(--chart-2)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
