"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { TrendingUp, TrendingDown } from "lucide-react"

const SKILLS_IMPACT = [
  { skill: "Python", impact: 12 },
  { skill: "TensorFlow", impact: 15 },
  { skill: "SQL", impact: 10 },
  { skill: "AWS", impact: 18 },
  { skill: "React", impact: 8 },
]

interface SkillImpactSimulatorProps {
  baseSalary: number
  delay?: number
}

export function SkillImpactSimulator({ baseSalary, delay = 0.6 }: SkillImpactSimulatorProps) {
  const [activeSkills, setActiveSkills] = useState<string[]>([])

  const toggleSkill = (skill: string) => {
    setActiveSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  // Calculate total salary impact from selected skills
  const totalImpactPercentage = activeSkills.reduce((sum, skill) => {
    const skillData = SKILLS_IMPACT.find((s) => s.skill === skill)
    return sum + (skillData?.impact || 0)
  }, 0)

  const simulatedSalary = baseSalary * (1 + totalImpactPercentage / 100)

  const formatCurrency = (value: number) => {
    const crores = Math.floor(value / 10000000)
    const lakhs = Math.floor((value % 10000000) / 100000)

    if (crores > 0) return `₹${crores}.${lakhs}Cr`
    if (lakhs > 0) return `₹${lakhs}L`
    return `₹${value}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <Card className="border border-border/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Skill Impact Simulator</CardTitle>
          <p className="text-xs text-foreground/60 mt-1">
            Toggle skills to see how they influence your estimated salary
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Interactive Skills */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-foreground">Select skills to simulate:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SKILLS_IMPACT.map((item, index) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: delay + 0.05 + index * 0.05 }}
                >
                  <Toggle
                    pressed={activeSkills.includes(item.skill)}
                    onPressedChange={() => toggleSkill(item.skill)}
                    variant="outline"
                    className="w-full justify-center hover:bg-accent/50 data-[state=on]:bg-primary/20 data-[state=on]:border-primary"
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xs font-semibold">{item.skill}</span>
                      <span className="text-xs text-muted-foreground">+{item.impact}%</span>
                    </div>
                  </Toggle>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Salary Impact Display */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2 }}
            className="bg-muted/50 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Simulated Annual Salary:</p>
              <div className="flex items-center gap-2">
                {totalImpactPercentage > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
            <div className="text-2xl font-bold text-primary">{formatCurrency(simulatedSalary)}</div>

            {/* Delta Indicator */}
            {totalImpactPercentage > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30"
              >
                <p className="text-sm font-semibold text-green-600">+{totalImpactPercentage}% salary impact</p>
              </motion.div>
            )}
          </motion.div>

          {/* Disclaimer Note */}
          <div className="pt-2 px-3 py-2 bg-muted/20 rounded-lg border border-border/40">
            <p className="text-xs text-foreground/60">
              ⚠️ <span className="font-medium">Simulation based on model assumptions.</span> These are estimated impacts
              derived from our training data and may not reflect all real-world factors. Backend simulation results will
              replace these mock values.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
