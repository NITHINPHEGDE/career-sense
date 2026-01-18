"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { PredictionForm } from "@/components/dashboard/prediction-form"
import { PredictionResult } from "@/components/dashboard/prediction-result"
import { LoadingSkeleton } from "@/components/dashboard/loading-skeleton"
import { EmptyState } from "@/components/dashboard/empty-state"
import { useState } from "react"
import { AlertCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [prediction, setPrediction] = useState<{
    salary: number
    monthly: number
    yearsOfExperience: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePredict = async (data: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error("Server error. Please ensure your FastAPI backend is running at the configured URL.")
        }
        throw new Error("Prediction failed. Please check your inputs and try again.")
      }

      const result = await response.json()
      if (!result.predicted_salary) {
        throw new Error("Invalid response from prediction service.")
      }

      setPrediction({
        salary: result.predicted_salary,
        monthly: Math.round(result.predicted_salary / 12),
        yearsOfExperience: data.experience_years,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get prediction. Please try again."
      setError(errorMessage)
      console.error("Prediction error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/comparison">
            <Button className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Compare Careers
            </Button>
          </Link>
          <Link href="/dashboard/skills">
            <Button variant="outline" className="gap-2 bg-transparent">
              <span>View Skill Impact</span>
            </Button>
          </Link>
          <Link href="/dashboard/analytics">
            <Button variant="outline" className="gap-2 bg-transparent">
              <span>View Analytics</span>
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
          </div>
          <div>
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive text-sm mb-1">Prediction Error</p>
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              </div>
            )}
            {isLoading ? (
              <LoadingSkeleton />
            ) : prediction ? (
              <PredictionResult prediction={prediction} />
            ) : (
              <EmptyState
                title="No Prediction Yet"
                description="Fill out the form and submit to get your personalized salary prediction based on your profile."
              />
          )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
