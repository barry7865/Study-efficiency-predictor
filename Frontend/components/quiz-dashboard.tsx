"use client"

import { useState, useRef, useCallback } from "react"
import { QuizSetup } from "@/components/quiz-setup"
import { QuizActive } from "@/components/quiz-active"
import { QuizResults } from "@/components/quiz-results"
import { calculateResult } from "@/lib/quiz-data"
import type { Question, QuizResult } from "@/lib/quiz-data"

type QuizState = "setup" | "active" | "results"

export function QuizDashboard() {
  const [quizState, setQuizState] = useState<QuizState>("setup")
  const [subject, setSubject] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<QuizResult | null>(null)

  // Track response times
  const questionStartTimes = useRef<Record<number, number>>({})
  const responseTimes = useRef<Record<number, number>>({})

  const handleStartQuiz = async (selectedSubject: string) => {
    setSubject(selectedSubject)
    setAnswers({})
    setResult(null)
    responseTimes.current = {}
    questionStartTimes.current = {}

    try {
      console.log("Fetching questions for subject:", selectedSubject)
      
      const response = await fetch(
        `http://127.0.0.1:8000/questions/${selectedSubject}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log("Response status:", response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API Response received:", data)

      if (!data || !data.questions || !Array.isArray(data.questions)) {
        console.error("Invalid response data:", data)
        throw new Error("Invalid response format: questions not found or not an array")
      }

      console.log("Questions count:", data.questions.length)

      setQuestions(
        data.questions.map((q, index) => ({
          id: index,
          ...q,
        }))
      )

      // Initialize start times for all questions
      const now = Date.now()
      data.questions.forEach((_: any, index: number) => {
        questionStartTimes.current[index] = now
      })

      setQuizState("active")
    } catch (error) {
      console.error("Failed to fetch questions:", error)
      alert(`Failed to load questions: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleSelectAnswer = useCallback(
    (questionIndex: number, answerIndex: number) => {
      setAnswers((prev) => {
        // If this is the first time answering this question, record response time
        if (prev[questionIndex] === undefined) {
          const startTime = questionStartTimes.current[questionIndex]
          if (startTime) {
            responseTimes.current[questionIndex] = (Date.now() - startTime) / 1000
          }
        }
        return { ...prev, [questionIndex]: answerIndex }
      })
    },
    []
  )

  const handleSubmit = useCallback(async () => {
    const quizResult = calculateResult(answers, questions, responseTimes.current)

    const payload = {
      subject,
      accuracy: quizResult.accuracy,
      avg_time: quizResult.avgResponseTime,
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      // merge backend efficiency value into quizResult
      const mergedResult = { ...quizResult, efficiency: data.efficiency }
      setResult(mergedResult)
    } catch (error) {
      console.error("Prediction request failed:", error)
      // fallback to local result if request fails
      setResult(quizResult)
    }

    setQuizState("results")
  }, [answers, questions, subject])

  const handleRestart = useCallback(() => {
    setQuizState("setup")
    setSubject("")
    setQuestions([])
    setAnswers({})
    setResult(null)
    responseTimes.current = {}
    questionStartTimes.current = {}
  }, [])

  return (
    <>
      {quizState === "setup" && (
        <QuizSetup
          subject={subject}
          onSubjectChange={setSubject}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {quizState === "active" && (
        <QuizActive
          questions={questions}
          answers={answers}
          subject={subject}
          onSelectAnswer={handleSelectAnswer}
          onSubmit={handleSubmit}
        />
      )}

      {quizState === "results" && result && (
        <QuizResults result={result} subject={subject} onRestart={handleRestart} />
      )}
    </>
  )
}
