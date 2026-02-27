"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { Question } from "@/lib/quiz-data"

interface QuestionCardProps {
  question: Question
  questionIndex: number
  selectedAnswer: number | undefined
  onSelectAnswer: (questionIndex: number, answerIndex: number) => void
}

export function QuestionCard({
  question,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="mb-4 flex items-start gap-4">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gradient-start to-gradient-end text-xs font-bold text-primary-foreground">
          {questionIndex + 1}
        </span>
        <h3 className="text-sm font-medium leading-relaxed text-foreground">
          {question.question}
        </h3>
      </div>

      <RadioGroup
        value={selectedAnswer !== undefined ? String(selectedAnswer) : undefined}
        onValueChange={(value) => onSelectAnswer(questionIndex, parseInt(value))}
        className="ml-12 grid gap-2.5"
      >
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedAnswer === optionIndex
          return (
            <Label
              key={optionIndex}
              htmlFor={`q${questionIndex}-o${optionIndex}`}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
                isSelected
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/20 hover:bg-secondary"
              }`}
            >
              <RadioGroupItem
                value={String(optionIndex)}
                id={`q${questionIndex}-o${optionIndex}`}
                className="shrink-0"
              />
              <span className="leading-relaxed">{option}</span>
            </Label>
          )
        })}
      </RadioGroup>
    </div>
  )
}
