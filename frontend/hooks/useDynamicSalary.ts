"use client"

import { useEffect, useState } from "react"

export function useDynamicSalary(profile: any) {
  const [salary, setSalary] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchSalary() {
      try {
       
        const payload = {
          experience_years: profile.experience_years,
          location: profile.location,
          company_size: profile.company_size,
          job_category: profile.job_category,
          skills: profile.skills,
        }

        const res = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })

        if (!res.ok) return

        const data = await res.json()
        setSalary(data.predicted_salary)
      } catch {
        // silent fail (UI unchanged)
      }
    }

    fetchSalary()
    return () => controller.abort()
  }, [
    profile.experience_years,
    profile.location,
    profile.company_size,
    profile.job_category,
    profile.skills.join(","),
  ])

  return salary
}
