"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { SalaryForm } from "@/components/salary-form"
import { SalaryResults } from "@/components/salary-results"

export function SalaryInsight() {
  const [experience, setExperience] = useState(5)
  const [jobRole, setJobRole] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [education, setEducation] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{
    salary: number
    minRange: number
    maxRange: number
    percentile: number
  } | null>(null)

  const handlePredictSalary = async () => {
    setLoading(true)

    // const response = await fetch('/api/predict-salary', {
    //   method: 'POST',
    //   body: JSON.stringify({ experience, jobRole, skills, education, companySize, location })
    // })

    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setResults({
      salary: 1450000,
      minRange: 1280000,
      maxRange: 1620000,
      percentile: 68,
    })

    setLoading(false)
  }

  return (
    <section id="salary" className="border-b border-border/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">SALARY INSIGHTS</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Predict Your Salary</h2>
          <p className="mt-2 text-foreground/60">
            Discover what you can earn based on your skills, experience, and market conditions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <SalaryForm
              experience={experience}
              setExperience={setExperience}
              jobRole={jobRole}
              setJobRole={setJobRole}
              skills={skills}
              setSkills={setSkills}
              education={education}
              setEducation={setEducation}
              companySize={companySize}
              setCompanySize={setCompanySize}
              location={location}
              setLocation={setLocation}
              onPredict={handlePredictSalary}
              isLoading={loading}
            />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {results ? (
              <SalaryResults results={results} />
            ) : (
              <Card className="border border-border/40 shadow-sm h-full flex items-center justify-center min-h-96">
                <CardContent className="text-center">
                  <p className="text-foreground/60">
                    Fill the form and click "Predict Salary" to see your estimated earnings
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
