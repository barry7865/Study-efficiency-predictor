"use client"

import { BookOpen, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface QuizSetupProps {
  subject: string
  onSubjectChange: (value: string) => void
  onStartQuiz: (selectedSubject: string) => void
}

export function QuizSetup({ subject, onSubjectChange, onStartQuiz }: QuizSetupProps) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="text-center">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-end shadow-lg shadow-primary/20">
          <Sparkles className="size-7 text-primary-foreground" />
        </div>
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Predict Your Study Efficiency
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
          Take a 10-question quiz powered by our AI engine. We analyze your
          accuracy and response time to predict your learning efficiency.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl shadow-primary/5">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <BookOpen className="size-4" />
            <span>Select Subject</span>
          </div>

          <Select value={subject} onValueChange={onSubjectChange}>
            <SelectTrigger className="mt-3 h-12 w-full rounded-xl border-border bg-secondary text-foreground">
              <SelectValue placeholder="Choose a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AIML">AI & Machine Learning</SelectItem>
              <SelectItem value="Python">Python Programming</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => onStartQuiz(subject)}
            disabled={!subject}
            size="lg"
            className="mt-6 h-12 w-full rounded-xl bg-gradient-to-r from-gradient-start to-gradient-end text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
          >
            Start Quiz
            <ArrowRight className="ml-1 size-4" />
          </Button>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "Questions", value: "10" },
              { label: "Duration", value: "~5 min" },
              { label: "AI Analysis", value: "Real-time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
