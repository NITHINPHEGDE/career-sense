"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

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
const JOB_CATEGORIES = ["backend", "frontend", "data", "python", "java", "ios", "testing", "other"]
const SKILLS = ["java", "kotlin", "android", "python", "django", "sql"]

export function PredictionForm({
  onPredict,
  isLoading,
}: {
  onPredict: (data: any) => void
  isLoading: boolean
}) {
  const [formData, setFormData] = useState({
    rating: 4.0,
    experience_years: 3,
    employment_status: "Full Time",
    location: "Mumbai",
    company_size: "Mid",
    job_category: "backend",
    skills: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPredict(formData)
  }

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Salary Prediction</CardTitle>
        <CardDescription>Enter your details to get a salary prediction</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience Slider */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Years of Experience</Label>
            <div className="flex items-center justify-between">
              <Slider
                value={[formData.experience_years]}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, experience_years: value[0] }))}
                min={0}
                max={50}
                step={1}
                className="flex-1"
              />
              <span className="ml-4 text-lg font-bold text-primary min-w-fit">{formData.experience_years} yrs</span>
            </div>
          </div>

          {/* Company Rating Slider */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Company Rating</Label>
            <div className="flex items-center justify-between">
              <Slider
                value={[formData.rating]}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, rating: Number.parseFloat(value[0].toFixed(1)) }))
                }
                min={1}
                max={5}
                step={0.1}
                className="flex-1"
              />
              <span className="ml-4 text-lg font-bold text-primary min-w-fit">{formData.rating.toFixed(1)} ★</span>
            </div>
          </div>

          {/* Employment Status */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Employment Status</Label>
            <RadioGroup
              value={formData.employment_status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, employment_status: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Full Time" id="fulltime" />
                <Label htmlFor="fulltime" className="font-normal cursor-pointer">
                  Full Time
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Intern" id="intern" />
                <Label htmlFor="intern" className="font-normal cursor-pointer">
                  Intern
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Trainee" id="trainee" />
                <Label htmlFor="trainee" className="font-normal cursor-pointer">
                  Trainee
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Location Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-base font-semibold">
              Location
            </Label>
            <Select
              value={formData.location}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
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

          {/* Company Size Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="company-size" className="text-base font-semibold">
              Company Size
            </Label>
            <Select
              value={formData.company_size}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, company_size: value }))}
            >
              <SelectTrigger id="company-size">
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

          {/* Job Category Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="job-category" className="text-base font-semibold">
              Job Category
            </Label>
            <Select
              value={formData.job_category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, job_category: value }))}
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

          {/* Skills Checkboxes */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Skills</Label>
            <div className="grid grid-cols-2 gap-3">
              {SKILLS.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={formData.skills.includes(skill)}
                    onCheckedChange={() => toggleSkill(skill)}
                  />
                  <Label htmlFor={skill} className="font-normal cursor-pointer">
                    {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Predicting..." : "Predict Salary"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
