"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const JOB_CATEGORIES = ["backend", "frontend", "data", "python", "java", "ios", "testing", "other"]
const LOCATIONS = [
  "Chennai",
  "Hyderabad",
  "Jaipur",
  "Kerala",
  "Kolkata",
  "Madhya Pradesh",
  "Mumbai",
  "New Delhi",
  "Pune",
]
const SKILLS = ["java", "kotlin", "android", "python", "django", "sql"]

// Skill value multipliers (percentage increase)
const SKILL_VALUES: Record<string, number> = {
  java: 20,
  kotlin: 25,
  android: 30,
  python: 15,
  django: 12,
  sql: 10,
}

const TOP_SKILLS = [
  { skill: "android", value: 30 },
  { skill: "kotlin", value: 25 },
  { skill: "java", value: 20 },
  { skill: "python", value: 15 },
  { skill: "django", value: 12 },
  { skill: "sql", value: 10 },
]

export default function SkillsPage() {
  const [baseProfile, setBaseProfile] = useState({
    experience_years: 5,
    location: "Mumbai",
    job_category: "backend",
    baseSalary: 800000,
  })

  const [selectedSkills, setSelectedSkills] = useState<string[]>(["java", "sql"])

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  // Calculate salary progression
  const salaryData = useMemo(() => {
    const data = []
    for (let i = 0; i <= selectedSkills.length; i++) {
      const skillsInRange = selectedSkills.slice(0, i)
      const totalBonus = skillsInRange.reduce((sum, skill) => sum + SKILL_VALUES[skill], 0)
      const multiplier = 1 + totalBonus / 100
      data.push({
        skillCount: i,
        salary: Math.round(baseProfile.baseSalary * multiplier),
        skillList: skillsInRange.join(", ") || "No skills",
      })
    }
    return data
  }, [selectedSkills, baseProfile.baseSalary])

  const currentSalary = salaryData[salaryData.length - 1]?.salary || baseProfile.baseSalary
  const baseSalaryData = salaryData[0]?.salary || baseProfile.baseSalary
  const totalBoost = ((currentSalary - baseSalaryData) / baseSalaryData) * 100

  const topSkillsForRole = TOP_SKILLS.slice(0, 3)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Skill Value Analyzer</h1>
          <p className="text-muted-foreground">See how much each skill adds to your salary</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Configuration */}
          <Card className="border-border/50 h-fit">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Experience */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Years of Experience</Label>
                <div className="flex items-center justify-between">
                  <Slider
                    value={[baseProfile.experience_years]}
                    onValueChange={(value) => setBaseProfile((prev) => ({ ...prev, experience_years: value[0] }))}
                    min={0}
                    max={50}
                    step={1}
                    className="flex-1"
                  />
                  <span className="ml-4 text-lg font-bold text-primary min-w-fit">
                    {baseProfile.experience_years} yrs
                  </span>
                </div>
              </div>

              {/* Base Salary */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Base Salary (₹)</Label>
                <div className="flex items-center justify-between">
                  <Slider
                    value={[baseProfile.baseSalary]}
                    onValueChange={(value) => setBaseProfile((prev) => ({ ...prev, baseSalary: value[0] }))}
                    min={300000}
                    max={2000000}
                    step={50000}
                    className="flex-1"
                  />
                  <span className="ml-4 text-lg font-bold text-primary min-w-fit">
                    ₹{(baseProfile.baseSalary / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-semibold">
                  Location
                </Label>
                <Select
                  value={baseProfile.location}
                  onValueChange={(value) => setBaseProfile((prev) => ({ ...prev, location: value }))}
                >
                  <SelectTrigger id="location">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Job Category */}
              <div className="space-y-2">
                <Label htmlFor="job-category" className="text-base font-semibold">
                  Job Category
                </Label>
                <Select
                  value={baseProfile.job_category}
                  onValueChange={(value) => setBaseProfile((prev) => ({ ...prev, job_category: value }))}
                >
                  <SelectTrigger id="job-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Salary Overview */}
          <div className="space-y-6">
            {/* Current Salary */}
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Your Current Salary with Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-5xl font-bold text-primary">₹{currentSalary.toLocaleString("en-IN")}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Base Salary</span>
                      <span className="font-mono">₹{baseSalaryData.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Skill Boost</span>
                      <span className="font-mono text-green-600 dark:text-green-400">
                        +₹{(currentSalary - baseSalaryData).toLocaleString("en-IN")} ({totalBoost.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Skills for Your Role */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Top 3 Skills for Your Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSkillsForRole.map((item, index) => (
                    <div key={item.skill} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary/60">#{index + 1}</span>
                        <span className="font-medium capitalize">{item.skill}</span>
                      </div>
                      <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">
                        +{item.value}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Selection */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Select Your Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {SKILLS.map((skill) => {
                const isSelected = selectedSkills.includes(skill)
                return (
                  <div
                    key={skill}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleSkill(skill)}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Checkbox checked={isSelected} onCheckedChange={() => toggleSkill(skill)} />
                      <span className="text-sm font-medium capitalize text-center">{skill}</span>
                      <span className="text-xs text-primary font-bold">+{SKILL_VALUES[skill]}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Salary Progression Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Salary Progression as You Add Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="skillCount"
                  stroke="var(--muted-foreground)"
                  label={{ value: "Number of Skills", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload) return null
                    return (
                      <div className="bg-card border border-border rounded-lg p-3 text-sm">
                        <p className="text-foreground font-medium">Skills: {payload[0].payload.skillCount}</p>
                        <p className="text-primary font-bold">₹{payload[0].payload.salary.toLocaleString("en-IN")}</p>
                        <p className="text-muted-foreground text-xs mt-1">{payload[0].payload.skillList}</p>
                      </div>
                    )
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ fill: "var(--primary)", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skills Impact Table */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Individual Skill Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Skill</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Salary Boost</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Annual Impact (₹)</th>
                    <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {SKILLS.map((skill) => {
                    const isSelected = selectedSkills.includes(skill)
                    const boostPercent = SKILL_VALUES[skill]
                    const annualImpact = Math.round((baseProfile.baseSalary * boostPercent) / 100)
                    return (
                      <tr key={skill} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-3 px-4 capitalize font-medium">{skill}</td>
                        <td className="text-right py-3 px-4">
                          <span className="text-primary font-bold">+{boostPercent}%</span>
                        </td>
                        <td className="text-right py-3 px-4">₹{annualImpact.toLocaleString("en-IN")}</td>
                        <td className="text-center py-3 px-4">
                          {isSelected ? (
                            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30">
                              Added
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">Not Selected</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
