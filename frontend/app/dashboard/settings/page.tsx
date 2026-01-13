"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    currency: "INR",
    chartType: "interactive",
    notifications: true,
    compactMode: false,
    autoSave: true,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem("careeraiSettings", JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Customize your CareerAI experience</p>
        </div>

        {/* Theme Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Dark Mode</Label>
                <p className="text-sm text-muted-foreground mt-1">Toggle between light and dark theme</p>
              </div>
              <ThemeToggle />
            </div>

            <div className="pt-6 border-t border-border/50">
              <Label htmlFor="compact" className="text-base font-semibold">
                Compact Mode
              </Label>
              <div className="flex items-center gap-3 mt-3">
                <Checkbox
                  id="compact"
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, compactMode: !!checked }))}
                />
                <Label htmlFor="compact" className="text-sm font-normal cursor-pointer">
                  Reduce spacing and padding in the interface
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Display</CardTitle>
            <CardDescription>Configure how data is displayed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-base font-semibold">
                Currency
              </Label>
              <Select
                value={settings.currency}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, currency: value }))}
              >
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 pt-6 border-t border-border/50">
              <Label htmlFor="chartType" className="text-base font-semibold">
                Chart Style
              </Label>
              <Select
                value={settings.chartType}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, chartType: value }))}
              >
                <SelectTrigger id="chartType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interactive">Interactive (Animated)</SelectItem>
                  <SelectItem value="static">Static</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, notifications: !!checked }))}
              />
              <Label htmlFor="notifications" className="text-base font-semibold cursor-pointer">
                Enable Notifications
              </Label>
            </div>

            {settings.notifications && (
              <div className="ml-8 space-y-3 pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <Checkbox id="market-updates" defaultChecked />
                  <Label htmlFor="market-updates" className="text-sm font-normal cursor-pointer">
                    Market updates and salary trends
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="tips" defaultChecked />
                  <Label htmlFor="tips" className="text-sm font-normal cursor-pointer">
                    Tips for increasing your salary
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="new-features" defaultChecked />
                  <Label htmlFor="new-features" className="text-sm font-normal cursor-pointer">
                    New features announcements
                  </Label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>Manage your data preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Auto-save Predictions</Label>
                <p className="text-sm text-muted-foreground mt-1">Automatically save your prediction history</p>
              </div>
              <Checkbox
                checked={settings.autoSave}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoSave: !!checked }))}
              />
            </div>

            <div className="pt-6 border-t border-border/50">
              <Button variant="outline" className="w-full bg-transparent">
                Export My Data
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Download all your predictions and analytics</p>
            </div>

            <div className="pt-6 border-t border-border/50">
              <Button variant="destructive" className="w-full">
                Clear All Data
              </Button>
              <p className="text-xs text-muted-foreground mt-2">This action cannot be undone</p>
            </div>
          </CardContent>
        </Card>

        {/* About & Support */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Version</span>
              <span className="font-mono text-sm">1.0.0</span>
            </div>
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                View Documentation
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Report an Issue
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <div>
            {saved && <p className="text-sm text-green-600 dark:text-green-400">Settings saved successfully!</p>}
          </div>
          <Button onClick={handleSave} size="lg">
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
