import { useMemo, useState } from 'react'
import { IntakeForm } from './components/IntakeForm'
import { ResultsPanel } from './components/ResultsPanel'
import { Logo } from './components/Logo'
import { DEFAULT_ANSWERS } from './data/defaults'
import { CORPUS } from './data/corpus'
import { evaluateDeductions, totalEstimatedDeduction } from './lib/engine'
import { buildRetrievalIndex } from './lib/retrieval'
import type { IntakeAnswers } from './types'
import './App.css'

const retrievalIndex = buildRetrievalIndex(CORPUS)

function App() {
  const [answers, setAnswers] = useState<IntakeAnswers>(DEFAULT_ANSWERS)

  const results = useMemo(() => evaluateDeductions(answers), [answers])
  const total = useMemo(() => totalEstimatedDeduction(results), [results])
  const retrieved = useMemo(() => retrievalIndex.search(answers.freeText, 3), [answers.freeText])

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-title">
            <span className="app-kicker">LexHack 2026 - Access to Justice &amp; Civic Tech</span>
            <div className="app-title-row">
              <Logo size={44} />
              <h1>Mile - Gig Worker Tax Assistant</h1>
            </div>
          </div>
          <p className="app-disclaimer">
            Educational estimate grounded in IRS Publications 463 and 535. Not filed tax advice -
            consult a licensed preparer before filing.
          </p>
        </div>
      </header>

      <main className="app-main">
        <IntakeForm answers={answers} onChange={setAnswers} />
        <ResultsPanel results={results} total={total} retrieved={retrieved} />
      </main>

      <footer className="app-footer">
        <p>
          Scope: rideshare and delivery drivers only, federal deductions from Pub 463 (car and travel
          expenses) and Pub 535 (business expenses). No state tax, no filing, no other worker types.
        </p>
      </footer>
    </div>
  )
}

export default App