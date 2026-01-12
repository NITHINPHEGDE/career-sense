import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { SalaryInsight } from "@/components/sections/salary-insight"
import { SkillSimulator } from "@/components/sections/skill-simulator"
import { GrowthForecast } from "@/components/sections/growth-forecast"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="careersense-theme">
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex-1">
          <SalaryInsight />
          <SkillSimulator />
          <GrowthForecast />
        </main>
      </div>
    </ThemeProvider>
  )
}
