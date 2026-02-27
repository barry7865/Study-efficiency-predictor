import { BrainCircuit } from "lucide-react"

export function QuizHeader() {
  return (
    <header className="relative overflow-hidden border-b border-border bg-card">
      <div className="absolute inset-0 bg-gradient-to-r from-gradient-start/10 to-gradient-end/10" />
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-gradient-start to-gradient-end">
            <BrainCircuit className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              StudyIQ
            </h1>
            <p className="text-xs text-muted-foreground">
              AI-Powered Efficiency Predictor
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            v2.0 Beta
          </span>
        </div>
      </div>
    </header>
  )
}
