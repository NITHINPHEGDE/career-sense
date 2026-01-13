"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { useState, useMemo } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
const COMPANY_SIZES = ["Small", "Mid", "Large"]

export default function AnalyticsPage() {
  const [selectedJobCategory, setSelectedJobCategory] = useState("backend")
  const [selectedLocation, setSelectedLocation] = useState("Mumbai")

  // Mock data for charts
  const salaryVsExperienceData = useMemo(() => {
    return [
      { years: 0, salary: 300000 },
      { years: 1, salary: 450000 },
      { years: 2, salary: 600000 },
      { years: 3, salary: 750000 },
      { years: 5, salary: 1200000 },
      { years: 7, salary: 1800000 },
      { years: 10, salary: 2500000 },
      { years: 15, salary: 3500000 },
      { years: 20, salary: 4200000 },
    ]
  }, [])

  const salaryByJobCategoryData = useMemo(() => {
    return [
      { category: "Backend", salary: 1100000, count: 2400 },
      { category: "Frontend", salary: 950000, count: 2210 },
      { category: "Data", salary: 1400000, count: 2290 },
      { category: "Python", salary: 1200000, count: 2000 },
      { category: "Java", salary: 1050000, count: 2181 },
      { category: "iOS", salary: 1300000, count: 2500 },
      { category: "Testing", salary: 750000, count: 2100 },
    ]
  }, [])

  const salaryByLocationData = useMemo(() => {
    return [
      { location: "Mumbai", salary: 1200000 },
      { location: "New Delhi", salary: 1150000 },
      { location: "Hyderabad", salary: 1050000 },
      { location: "Pune", salary: 1100000 },
      { location: "Bangalore", salary: 1300000 },
      { location: "Chennai", salary: 950000 },
      { location: "Kolkata", salary: 850000 },
      { location: "Jaipur", salary: 800000 },
      { location: "Kerala", salary: 900000 },
    ]
  }, [])

  const skillImpactData = useMemo(() => {
    return [
      { skill: "Java", value: 1.2 },
      { skill: "Python", value: 1.15 },
      { skill: "SQL", value: 1.1 },
      { skill: "Android", value: 1.3 },
      { skill: "Django", value: 1.12 },
      { skill: "Kotlin", value: 1.25 },
    ]
  }, [])

  const companySizeData = useMemo(() => {
    return [
      { size: "Small", salary: 800000, companies: 1500 },
      { size: "Mid", salary: 1200000, companies: 2800 },
      { size: "Large", salary: 1500000, companies: 3200 },
    ]
  }, [])

  const customTooltip = (props: any) => {
    if (!props.active || !props.payload) return null
    return (
      <div className="bg-card border border-border rounded-lg p-2 text-sm">
        {props.payload.map((entry: any) => (
          <div key={entry.key} style={{ color: entry.color }}>
            {entry.name}: ₹{typeof entry.value === "number" ? entry.value.toLocaleString("en-IN") : entry.value}
          </div>
        ))}
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
          <p className="text-muted-foreground">Explore salary trends and market insights</p>
        </div>

        {/* Salary vs Experience */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Salary vs Years of Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryVsExperienceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="years" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip content={customTooltip} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--primary)", r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Average Salary (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salary by Job Category */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Salary Distribution by Job Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryByJobCategoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip content={customTooltip} />
                <Legend />
                <Bar dataKey="salary" fill="var(--primary)" name="Average Salary (₹)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salary by Location */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Salary Comparison Across Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryByLocationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="location" stroke="var(--muted-foreground)" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip content={customTooltip} />
                <Legend />
                <Bar dataKey="salary" fill="var(--accent)" name="Average Salary (₹)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skill Impact Analysis */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Impact of Skills on Salary (Multiplier)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillImpactData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="skill" stroke="var(--muted-foreground)" />
                <PolarRadiusAxis stroke="var(--muted-foreground)" />
                <Radar
                  name="Salary Multiplier"
                  dataKey="value"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.5}
                />
                <Tooltip content={customTooltip} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Company Size vs Salary */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Salary by Company Size</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={companySizeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="size" stroke="var(--muted-foreground)" />
                <YAxis yAxisId="left" stroke="var(--muted-foreground)" />
                <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" />
                <Tooltip content={customTooltip} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="salary"
                  fill="var(--primary)"
                  name="Average Salary (₹)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="companies"
                  fill="var(--accent)"
                  name="Number of Companies"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Highest Avg Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹1,50,00,000</p>
              <p className="text-xs text-muted-foreground mt-1">Data Engineers (Large Companies)</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Skill Boost (Max)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">+30%</p>
              <p className="text-xs text-muted-foreground mt-1">With Android & Kotlin Skills</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Experience Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">+12x</p>
              <p className="text-xs text-muted-foreground mt-1">0 to 20 years salary growth</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
