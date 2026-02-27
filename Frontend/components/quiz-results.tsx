"use client"

import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  RotateCcw,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { QuizResult } from "@/lib/quiz-data"

interface QuizResultsProps {
  result: QuizResult
  subject: string
  onRestart: () => void
}

export function QuizResults({ result, subject, onRestart }: QuizResultsProps) {
  const subjectLabel = subject === "aiml" ? "AI & Machine Learning" : "Python Programming"

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-end shadow-lg shadow-primary/20">
          <Sparkles className="size-7 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Your Efficiency Report
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {subjectLabel}
        </p>
      </div>

      {/* Main Score Card */}
      <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-xl shadow-primary/5">
        <div className="text-center">
          <div className="relative mx-auto flex size-32 items-center justify-center">
            <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-secondary"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(result.accuracy / 100) * 351.86} 351.86`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gradient-start)" />
                  <stop offset="100%" stopColor="var(--gradient-end)" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <span className="text-4xl font-bold text-foreground">
                {result.score}
              </span>
              <span className="text-lg text-muted-foreground">/{result.total}</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Overall Score</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Score */}
          <div className="rounded-xl border border-border bg-secondary/50 p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Trophy className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Score</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {result.score}
              <span className="text-sm font-normal text-muted-foreground"> / {result.total}</span>
            </p>
            <Progress
              value={(result.score / result.total) * 100}
              className="mt-3 h-1.5 bg-secondary"
            />
          </div>

          {/* Accuracy */}
          <div className="rounded-xl border border-border bg-secondary/50 p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Accuracy</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {result.accuracy}
              <span className="text-sm font-normal text-muted-foreground">%</span>
            </p>
            <Progress
              value={result.accuracy}
              className="mt-3 h-1.5 bg-secondary"
            />
          </div>

          {/* Avg Response Time */}
          <div className="rounded-xl border border-border bg-secondary/50 p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Avg Time</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {result.avgResponseTime}
              <span className="text-sm font-normal text-muted-foreground">s</span>
            </p>
            <div className="mt-3 text-xs text-muted-foreground">
              per question
            </div>
          </div>

          {/* Efficiency */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Efficiency</span>
            </div>
            <p className={`mt-2 text-lg font-bold ${result.efficiencyColor}`}>
              {result.efficiencyLevel}
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              AI Predicted Level
            </div>
          </div>
        </div>
      </div>

      {/* Retry Button */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={onRestart}
          size="lg"
          className="h-12 rounded-xl bg-gradient-to-r from-gradient-start to-gradient-end px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
        >
          <RotateCcw className="mr-2 size-4" />
          Take Another Quiz
        </Button>
      </div>
    </div>
  )
}
