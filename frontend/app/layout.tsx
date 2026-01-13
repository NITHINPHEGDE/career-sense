import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CareerAI - ML-Powered Salary & Career Insights",
  description:
    "Predict your salary and get AI-powered career insights based on machine learning analysis of market data",
  
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "CareerAI - Predict Your Salary with ML",
    description: "Get AI-powered career insights and accurate salary predictions",
    type: "website",
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", content: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", content: "#1a1a2e" },
  ],
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
       
      </body>
    </html>
  )
}
