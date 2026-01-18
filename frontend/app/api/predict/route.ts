import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

    
    const payload = {
      rating: Number(data.rating),
      experience_years: Number(data.experience_years),
      employment_status: String(data.employment_status),
      location: String(data.location),
      company_size: String(data.company_size),
      job_roles: String(data.job_roles),
      skills: String(data.skills ?? ""),
    }

   
    if (
      Number.isNaN(payload.rating) ||
      Number.isNaN(payload.experience_years)
    ) {
      return NextResponse.json(
        { error: "Invalid numeric input" },
        { status: 400 }
      )
    }

    const response = await fetch(`${backendUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const text = await response.text()

    if (!response.ok) {
      console.error("BACKEND ERROR:", text)
      return NextResponse.json(
        { error: text },
        { status: response.status }
      )
    }

    return NextResponse.json(JSON.parse(text))
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json(
      { error: "Prediction failed" },
      { status: 500 }
    )
  }
}
