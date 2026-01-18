"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useSalaryPrediction } from "@/hooks/useSalaryPrediction"
import ProfileEditor from "./profile-editor"

interface Profile {
  name: string
  experience_years: number
  location: string
  company_size: string
  job_category: string
  skills: string[]
}

export default function ComparisonPage() {
  const [profile1, setProfile1] = useState<Profile>({
    name: "Backend Role",
    experience_years: 5,
    location: "Mumbai",
    company_size: "Mid",
    job_category: "backend",
    skills: ["java", "sql"],
  })

  const [profile2, setProfile2] = useState<Profile>({
    name: "Data Role",
    experience_years: 5,
    location: "Hyderabad",
    company_size: "Large",
    job_category: "data",
    skills: ["python", "sql"],
  })

  const salary1 = useSalaryPrediction(profile1)
  const salary2 = useSalaryPrediction(profile2)

  const diff =
    salary1.salary && salary2.salary
      ? salary2.salary - salary1.salary
      : 0

  const percent =
    salary1.salary && salary2.salary
      ? ((diff / salary1.salary) * 100).toFixed(1)
      : "0"

  const updateProfile = (num: 1 | 2, field: string, value: any) => {
    const updater = num === 1 ? setProfile1 : setProfile2
    updater((prev) => ({ ...prev, [field]: value }))
  }

  const toggleSkill = (num: 1 | 2, skill: string) => {
    const profile = num === 1 ? profile1 : profile2
    const skills = profile.skills.includes(skill)
      ? profile.skills.filter((s) => s !== skill)
      : [...profile.skills, skill]
    updateProfile(num, "skills", skills)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Career Comparison</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <ProfileEditor profile={profile1} num={1} onUpdate={updateProfile} onToggleSkill={toggleSkill} />
          <ProfileEditor profile={profile2} num={2} onUpdate={updateProfile} onToggleSkill={toggleSkill} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <SalaryCard title={profile1.name} salary={salary1.salary} />
          <DifferenceCard diff={diff} percent={percent} />
          <SalaryCard title={profile2.name} salary={salary2.salary} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Skills Comparison</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <SkillList title={profile1.name} skills={profile1.skills} />
            <SkillList title={profile2.name} skills={profile2.skills} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function SalaryCard({ title, salary }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {salary ? (
          <p className="text-3xl font-bold">₹{salary.toLocaleString("en-IN")}</p>
        ) : (
          <p className="text-muted-foreground text-sm">Calculating…</p>
        )}
      </CardContent>
    </Card>
  )
}

function DifferenceCard({ diff, percent }: any) {
  const positive = diff >= 0
  return (
    <Card className={positive ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"}>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">Difference</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-3xl font-bold ${positive ? "text-green-600" : "text-red-600"}`}>
          {positive ? "+" : ""}₹{Math.abs(diff).toLocaleString("en-IN")}
        </p>
        <p className="text-sm">{percent}%</p>
      </CardContent>
    </Card>
  )
}

function SkillList({ title, skills }: any) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((s: string) => (
          <Badge key={s}>{s}</Badge>
        ))}
      </div>
    </div>
  )
}
