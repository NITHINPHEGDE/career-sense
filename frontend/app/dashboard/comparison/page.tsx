"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { predictSalary } from "@/lib/api-client"

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
const JOB_CATEGORIES = ["backend", "frontend", "data", "python", "java", "ios", "testing", "other"]
const COMPANY_SIZES = ["Small", "Mid", "Large"]
const SKILLS = ["java", "kotlin", "android", "python", "django", "sql"]

interface Profile {
  name: string
  experience_years: number
  location: string
  company_size: string
  job_category: string
  skills: string[]
  salary: number
  loading?: boolean
  error?: string
}

export default function ComparisonPage() {
  const [profile1, setProfile1] = useState<Profile>({
    name: "Backend Role",
    experience_years: 5,
    location: "Mumbai",
    company_size: "Mid",
    job_category: "backend",
    skills: ["java", "sql"],
    salary: 0,
    loading: true,
    error: undefined,
  })

  const [profile2, setProfile2] = useState<Profile>({
    name: "Data Role",
    experience_years: 5,
    location: "Hyderabad",
    company_size: "Large",
    job_category: "data",
    skills: ["python", "sql"],
    salary: 0,
    loading: true,
    error: undefined,
  })

  const debounceTimers = useRef<{ [key: number]: NodeJS.Timeout }>({})

  // Fetch salary prediction for a profile
  const fetchSalaryPrediction = async (profile: Profile, profileNum: 1 | 2) => {
    if (profileNum === 1) {
      setProfile1((prev) => ({ ...prev, loading: true, error: undefined }))
    } else {
      setProfile2((prev) => ({ ...prev, loading: true, error: undefined }))
    }

    try {
      const response = await predictSalary({
        experience_years: profile.experience_years,
        company_rating: 4, // Default rating for comparison
        employment_status: "Full-time",
        location: profile.location,
        company_size: profile.company_size,
        job_category: profile.job_category,
        skills: profile.skills,
      })

      if (profileNum === 1) {
        setProfile1((prev) => ({
          ...prev,
          salary: response.predicted_salary,
          loading: false,
          error: undefined,
        }))
      } else {
        setProfile2((prev) => ({
          ...prev,
          salary: response.predicted_salary,
          loading: false,
          error: undefined,
        }))
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to predict salary"
      if (profileNum === 1) {
        setProfile1((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }))
      } else {
        setProfile2((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }))
      }
    }
  }

  const updateProfile = (profileNum: 1 | 2, field: string, value: any) => {
    if (profileNum === 1) {
      setProfile1((prev) => {
        const updated = { ...prev, [field]: value }
        
        // Clear existing debounce timer
        if (debounceTimers.current[1]) {
          clearTimeout(debounceTimers.current[1])
        }
        
        // Debounce API call by 500ms
        debounceTimers.current[1] = setTimeout(() => {
          fetchSalaryPrediction(updated, 1)
        }, 500)
        
        return updated
      })
    } else {
      setProfile2((prev) => {
        const updated = { ...prev, [field]: value }
        
        // Clear existing debounce timer
        if (debounceTimers.current[2]) {
          clearTimeout(debounceTimers.current[2])
        }
        
        // Debounce API call by 500ms
        debounceTimers.current[2] = setTimeout(() => {
          fetchSalaryPrediction(updated, 2)
        }, 500)
        
        return updated
      })
    }
  }

  const toggleSkill = (profileNum: 1 | 2, skill: string) => {
    const profile = profileNum === 1 ? profile1 : profile2
    const newSkills = profile.skills.includes(skill)
      ? profile.skills.filter((s) => s !== skill)
      : [...profile.skills, skill]
    updateProfile(profileNum, "skills", newSkills)
  }

  // Initial fetch on component mount
  useEffect(() => {
    fetchSalaryPrediction(profile1, 1)
    fetchSalaryPrediction(profile2, 2)
  }, [])

  const salaryDifference = profile2.salary - profile1.salary
  const percentDifference = ((salaryDifference / profile1.salary) * 100).toFixed(1)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Career Comparison</h1>
          <p className="text-muted-foreground">Compare two career paths side by side</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile 1 */}
          <ProfileEditor profile={profile1} profileNum={1} onUpdate={updateProfile} onToggleSkill={toggleSkill} />

          {/* Profile 2 */}
          <ProfileEditor profile={profile2} profileNum={2} onUpdate={updateProfile} onToggleSkill={toggleSkill} />
        </div>

        {/* Comparison Results */}
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile 1 Salary */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{profile1.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {profile1.loading ? (
                  <div className="space-y-2">
                    <div className="h-8 bg-muted rounded animate-pulse" />
                    <p className="text-xs text-muted-foreground">Loading prediction...</p>
                  </div>
                ) : profile1.error ? (
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400">{profile1.error}</p>
                    <p className="text-xs text-muted-foreground mt-1">Try again</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-3xl font-bold text-primary">₹{profile1.salary.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-muted-foreground mt-1">Annual Salary</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Difference */}
            <Card
              className={`border-border/50 ${
                profile1.loading || profile2.loading
                  ? "bg-muted"
                  : salaryDifference >= 0
                    ? "bg-green-50 dark:bg-green-950"
                    : "bg-red-50 dark:bg-red-950"
              }`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Difference</CardTitle>
              </CardHeader>
              <CardContent>
                {profile1.loading || profile2.loading ? (
                  <div className="space-y-2">
                    <div className="h-8 bg-muted rounded animate-pulse" />
                    <p className="text-xs text-muted-foreground">Calculating...</p>
                  </div>
                ) : profile1.error || profile2.error ? (
                  <p className="text-sm text-muted-foreground">Unable to calculate</p>
                ) : (
                  <div>
                    <p
                      className={`text-3xl font-bold ${salaryDifference >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {salaryDifference >= 0 ? "+" : ""}
                      {salaryDifference.toLocaleString("en-IN")}
                    </p>
                    <p
                      className={`text-xs mt-1 ${salaryDifference >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {percentDifference}% {salaryDifference >= 0 ? "higher" : "lower"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Profile 2 Salary */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{profile2.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {profile2.loading ? (
                  <div className="space-y-2">
                    <div className="h-8 bg-muted rounded animate-pulse" />
                    <p className="text-xs text-muted-foreground">Loading prediction...</p>
                  </div>
                ) : profile2.error ? (
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400">{profile2.error}</p>
                    <p className="text-xs text-muted-foreground mt-1">Try again</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-3xl font-bold text-accent">₹{profile2.salary.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-muted-foreground mt-1">Annual Salary</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Detailed Comparison Table */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Attribute</th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">{profile1.name}</th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">{profile2.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4">Experience</td>
                      <td className="text-right py-3 px-4">{profile1.experience_years} years</td>
                      <td className="text-right py-3 px-4">{profile2.experience_years} years</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4">Location</td>
                      <td className="text-right py-3 px-4">{profile1.location}</td>
                      <td className="text-right py-3 px-4">{profile2.location}</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4">Company Size</td>
                      <td className="text-right py-3 px-4">{profile1.company_size}</td>
                      <td className="text-right py-3 px-4">{profile2.company_size}</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-4">Job Category</td>
                      <td className="text-right py-3 px-4 font-mono text-primary">{profile1.job_category}</td>
                      <td className="text-right py-3 px-4 font-mono text-accent">{profile2.job_category}</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="py-3 px-4">Skills</td>
                      <td className="text-right py-3 px-4">{profile1.skills.length} skills</td>
                      <td className="text-right py-3 px-4">{profile2.skills.length} skills</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Skill Comparison */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Skills Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">{profile1.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile1.skills.length > 0 ? (
                      profile1.skills.map((skill) => (
                        <Badge key={skill} variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">No skills selected</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">{profile2.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile2.skills.length > 0 ? (
                      profile2.skills.map((skill) => (
                        <Badge key={skill} variant="default" className="bg-accent/20 text-accent hover:bg-accent/30">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">No skills selected</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

function ProfileEditor({
  profile,
  profileNum,
  onUpdate,
  onToggleSkill,
}: {
  profile: Profile
  profileNum: 1 | 2
  onUpdate: (profileNum: 1 | 2, field: string, value: any) => void
  onToggleSkill: (profileNum: 1 | 2, skill: string) => void
}) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex-1">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onUpdate(profileNum, "name", e.target.value)}
              className="bg-transparent border-b border-border/50 focus:border-primary outline-none w-full"
            />
          </CardTitle>
          {profile.loading && (
            <div className="text-xs text-muted-foreground ml-2 whitespace-nowrap">Updating...</div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Experience */}
        <div className="space-y-2">
          <Label className="text-base font-semibold">Years of Experience</Label>
          <div className="flex items-center justify-between">
            <Slider
              value={[profile.experience_years]}
              onValueChange={(value) => onUpdate(profileNum, "experience_years", value[0])}
              min={0}
              max={50}
              step={1}
              className="flex-1"
            />
            <span className="ml-4 text-lg font-bold text-primary min-w-fit">{profile.experience_years} yrs</span>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor={`location-${profileNum}`} className="text-base font-semibold">
            Location
          </Label>
          <Select value={profile.location} onValueChange={(value) => onUpdate(profileNum, "location", value)}>
            <SelectTrigger id={`location-${profileNum}`}>
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

        {/* Company Size */}
        <div className="space-y-2">
          <Label htmlFor={`company-size-${profileNum}`} className="text-base font-semibold">
            Company Size
          </Label>
          <Select value={profile.company_size} onValueChange={(value) => onUpdate(profileNum, "company_size", value)}>
            <SelectTrigger id={`company-size-${profileNum}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Category */}
        <div className="space-y-2">
          <Label htmlFor={`job-category-${profileNum}`} className="text-base font-semibold">
            Job Category
          </Label>
          <Select value={profile.job_category} onValueChange={(value) => onUpdate(profileNum, "job_category", value)}>
            <SelectTrigger id={`job-category-${profileNum}`}>
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

        {/* Skills */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Skills</Label>
          <div className="grid grid-cols-2 gap-3">
            {SKILLS.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${profileNum}-${skill}`}
                  checked={profile.skills.includes(skill)}
                  onCheckedChange={() => onToggleSkill(profileNum, skill)}
                />
                <Label htmlFor={`skill-${profileNum}-${skill}`} className="font-normal cursor-pointer text-sm">
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
