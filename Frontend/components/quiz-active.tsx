"use client"

import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QuestionCard } from "@/components/question-card"
import type { Question } from "@/lib/quiz-data"

interface QuizActiveProps {
  questions: Question[]
  answers: Record<number, number>
  subject: string
  onSelectAnswer: (questionIndex: number, answerIndex: number) => void
  onSubmit: () => void
}

export function QuizActive({
  questions,
  answers,
  subject,
  onSelectAnswer,
  onSubmit,
}: QuizActiveProps) {
  const answeredCount = Object.keys(answers).length
  const totalQuestions = questions.length
  const progressPercent = (answeredCount / totalQuestions) * 100
  const allAnswered = answeredCount === totalQuestions
  const normalizedSubject = subject.trim().toLowerCase()
  const subjectLabel = normalizedSubject === "aiml" ? "AI & Machine Learning" : "Python Programming"

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Quiz Progress Header */}
      <div className="mb-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">{subjectLabel}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {answeredCount} of {totalQuestions} questions answered
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                {answeredCount}/{totalQuestions}
              </span>
            </div>
          </div>
        </div>
        <Progress
          value={progressPercent}
          className="mt-4 h-2 bg-secondary"
        />
      </div>

      {/* Questions */}
      <div className="grid gap-5">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionIndex={index}
            selectedAnswer={answers[index]}
            onSelectAnswer={onSelectAnswer}
          />
        ))}
      </div>

      {/* Submit */}
      <div className="mt-10 flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={!allAnswered}
          size="lg"
          className="h-12 rounded-xl bg-gradient-to-r from-gradient-start to-gradient-end px-10 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
        >
          <Send className="mr-2 size-4" />
          Submit Quiz
        </Button>
      </div>

      {!allAnswered && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Please answer all {totalQuestions} questions to submit
        </p>
      )}
    </div>
  )
}
