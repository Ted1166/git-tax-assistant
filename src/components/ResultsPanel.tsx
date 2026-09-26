import type { DeductionResult, RetrievedChunk } from '../types'
import { DeductionCard } from './DeductionCard'

interface Props {
    results: DeductionResult[]
    total: number
    retrieved: RetrievedChunk[]
}

export function ResultsPanel({ results, total, retrieved }: Props) {
    const eligible = results.filter((r) => r.eligible)
    const notYet = results.filter((r) => !r.eligible)

    return (
        <aside className="results-panel">
            <div className="results-total">
                <span className="results-total-label">Estimated deduction so far</span>
                <span className="results-total-amount">
                    {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
                <span className="results-total-note">
                    Educational estimate, not filed tax advice - consult a licensed preparer.
                </span>
            </div>

            {eligible.length > 0 && (
                <div className="results-group">
                    <h4>Deductions found</h4>
                    {eligible.map((result) => (
                        <DeductionCard key={result.id} result={result} />
                    ))}
                </div>
            )}

            {notYet.length > 0 && (
                <div className="results-group muted">
                    <h4>Not yet applicable</h4>
                    {notYet.map((result) => (
                        <DeductionCard key={result.id} result={result} />
                    ))}
                </div>
            )}

            {retrieved.length > 0 && (
                <div className="results-group">
                    <h4>Related guidance from your notes</h4>
                    {retrieved.map((chunk) => (
                        <div key={chunk.id} className="retrieved-chunk">
                            <p>{chunk.text}</p>
                            <div className="deduction-citation">
                                <span className="citation-pub">{chunk.publication}</span>
                                <span className="citation-section">{chunk.section}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </aside>
    )
}
