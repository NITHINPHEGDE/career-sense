"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-border/50">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Search className="w-12 h-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm text-center">{description}</p>
      </CardContent>
    </Card>
  )
}
