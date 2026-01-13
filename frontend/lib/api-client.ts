export const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

export interface PredictionRequest {
  rating: number
  experience_years: number
  employment_status: string
  location: string
  company_size: string
  job_category: string
  skills: string[]
}

export interface PredictionResponse {
  predicted_salary: number
  confidence?: number
}

export async function predictSalary(data: PredictionRequest): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Prediction API error:", error)
    throw error
  }
}
