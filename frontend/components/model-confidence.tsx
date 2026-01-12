"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Database, TrendingUp, Zap } from "lucide-react"

interface ModelConfidenceProps {
  delay?: number
}

export function ModelConfidence({ delay = 0 }: ModelConfidenceProps) {
  // Mock data - ready for backend integration
  const modelData = {
    confidence: "HIGH", // Integration point: Replace with dynamic backend value
    trainedOn: "50,000+",
    meanError: "±9%",
    version: "ANN v1.0",
  }

  const confidenceColor = {
    HIGH: "bg-emerald-50 border-emerald-200",
    MEDIUM: "bg-amber-50 border-amber-200",
    LOW: "bg-red-50 border-red-200",
  }

  const confidenceBadgeVariant = {
    HIGH: "bg-emerald-100 text-emerald-800",
    MEDIUM: "bg-amber-100 text-amber-800",
    LOW: "bg-red-100 text-red-800",
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className={`border ${confidenceColor[modelData.confidence as keyof typeof confidenceColor]} shadow-sm`}>
        <CardHeader>
          <CardTitle className="text-base">Model Confidence & Trust</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Confidence Status */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 pb-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-foreground/60">Model Confidence</p>
              <Badge className={confidenceBadgeVariant[modelData.confidence as keyof typeof confidenceBadgeVariant]}>
                {modelData.confidence}
              </Badge>
            </div>
          </motion.div>

          {/* Model Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Trained On */}
            <motion.div variants={itemVariants} className="bg-muted/40 rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs font-medium text-foreground/60">Trained On</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{modelData.trainedOn} profiles</p>
            </motion.div>

            {/* Mean Error */}
            <motion.div variants={itemVariants} className="bg-muted/40 rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs font-medium text-foreground/60">Mean Error</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{modelData.meanError}</p>
            </motion.div>

            {/* Model Version */}
            <motion.div variants={itemVariants} className="bg-muted/40 rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs font-medium text-foreground/60">Model Version</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{modelData.version}</p>
            </motion.div>
          </div>

          {/* Trust Note */}
          <motion.p variants={itemVariants} className="text-xs text-foreground/60 pt-2 border-t border-border/40">
            This model's predictions are based on historical market data and industry trends. Results may vary based on
            individual circumstances and negotiation skills.
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
