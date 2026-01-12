"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

const JOB_ROLES = ["Data Scientist", "ML Engineer", "Backend Developer", "Full Stack Developer"]
const SKILLS_OPTIONS = ["Python", "TensorFlow", "SQL", "React", "AWS"]
const EDUCATION_LEVELS = ["Bachelor", "Master", "PhD"]
const COMPANY_SIZES = ["Startup", "Mid-size", "Enterprise"]
const LOCATIONS = ["Bengaluru", "Hyderabad", "Pune", "Remote"]

interface SalaryFormProps {
  experience: number
  setExperience: (value: number) => void
  jobRole: string
  setJobRole: (value: string) => void
  skills: string[]
  setSkills: (value: string[]) => void
  education: string
  setEducation: (value: string) => void
  companySize: string
  setCompanySize: (value: string) => void
  location: string
  setLocation: (value: string) => void
  onPredict: () => void
  isLoading: boolean
}

export function SalaryForm({
  experience,
  setExperience,
  jobRole,
  setJobRole,
  skills,
  setSkills,
  education,
  setEducation,
  companySize,
  setCompanySize,
  location,
  setLocation,
  onPredict,
  isLoading,
}: SalaryFormProps) {
  const toggleSkill = (skill: string) => {
    setSkills(skills.includes(skill) ? skills.filter((s) => s !== skill) : [...skills, skill])
  }

  return (
    <Card className="border border-border/40 shadow-sm">
      <CardHeader>
        <CardTitle>Salary Calculator</CardTitle>
        <CardDescription>Enter your details to get a personalized salary estimate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Years of Experience */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="experience" className="text-base font-medium">
              Years of Experience
            </Label>
            <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {experience} years
            </span>
          </div>
          <Slider
            id="experience"
            min={0}
            max={20}
            step={1}
            value={[experience]}
            onValueChange={(value) => setExperience(value[0])}
            className="w-full"
          />
        </div>

        {/* Job Role */}
        <div className="space-y-2">
          <Label htmlFor="role" className="text-base font-medium">
            Job Role
          </Label>
          <Select value={jobRole} onValueChange={setJobRole}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select a job role" />
            </SelectTrigger>
            <SelectContent>
              {JOB_ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skills Multi-select */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Technical Skills</Label>
          <div className="flex flex-wrap gap-2">
            {SKILLS_OPTIONS.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  skills.includes(skill)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Education Level */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Education Level</Label>
          <div className="grid grid-cols-3 gap-2">
            {EDUCATION_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setEducation(level)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  education === level
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/50"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Company Size */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Company Size</Label>
          <div className="grid grid-cols-3 gap-2">
            {COMPANY_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setCompanySize(size)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  companySize === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-base font-medium">
            Location
          </Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select a location" />
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

        {/* Predict Button */}
        <Button
          onClick={onPredict}
          disabled={isLoading || !jobRole || !education || !companySize || !location}
          className="w-full h-10 mt-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            "Predict Salary"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
