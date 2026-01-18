"use client"

import { useEffect, useState } from "react"

export function useSalaryPrediction(profile: any) {
  const [salary, setSalary] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!profile) return

    const controller = new AbortController()

    const predict = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
          signal: controller.signal,
        })

        if (!res.ok) throw new Error("Prediction failed")

        const data = await res.json()
        setSalary(data.predicted_salary)
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Prediction error")
        }
      } finally {
        setLoading(false)
      }
    }

    predict()
    return () => controller.abort()
  }, [
    profile.experience_years,
    profile.location,
    profile.company_size,
    profile.job_category,
    profile.skills.join(","),
  ])

  return { salary, loading, error }
}
