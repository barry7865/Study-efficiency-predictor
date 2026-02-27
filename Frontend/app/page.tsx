import { QuizHeader } from "@/components/quiz-header"
import { QuizDashboard } from "@/components/quiz-dashboard"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <QuizHeader />
      <main className="flex-1">
        <QuizDashboard />
      </main>
      <footer className="border-t border-border bg-card py-6">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              StudyIQ - AI-Powered Study Efficiency Predictor
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Next.js & AI Analytics
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
