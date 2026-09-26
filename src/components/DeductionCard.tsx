import type { DeductionResult } from '../types'

function formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function DeductionCard({ result }: { result: DeductionResult }) {
    return (
        <article className={result.eligible ? 'deduction-card eligible' : 'deduction-card'}>
            <div className="deduction-card-top">
                <h3>{result.title}</h3>
                {result.eligible && result.amount !== null ? (
                    <span className="deduction-amount">{formatCurrency(result.amount)}</span>
                ) : (
                    <span className="deduction-status">{result.eligible ? 'Eligible' : 'Not yet'}</span>
                )}
            </div>
            <p className="deduction-summary">{result.summary}</p>
            <p className="deduction-reasoning">{result.reasoning}</p>
            <div className="deduction-citation">
                <span className="citation-pub">{result.publication}</span>
                <span className="citation-section">{result.section}</span>
            </div>
        </article>
    )
}
