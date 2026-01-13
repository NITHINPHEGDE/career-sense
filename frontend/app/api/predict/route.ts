import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

    const response = await fetch(`${backendUrl}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  rating: data.rating,
  experience_years: data.experience_years,
  employment_status: data.employment_status, // OK
  location: data.location,                   // OK
  company_size: data.company_size,
  job_roles: data.job_roles,                  // 🔥 FIX HERE
  skills: data.skills,
}),
    })

    if (!response.ok) {
      throw new Error("Backend prediction failed")
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Prediction failed" }, { status: 500 })
  }
}
