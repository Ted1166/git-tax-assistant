# Mile - Gig Worker Tax Deduction Assistant

Access to Justice & Civic Tech (with ties to Legal Automation & Workflow Innovation).

Mile is a guided intake tool that helps rideshare and delivery drivers find tax deductions they're legally owed and shows them exactly where in the IRS publications each one comes from. It exists because professional tax prep is expensive and generic tax software doesn't reason about a filer's specific situation, it just plugs numbers into a form. Mile asks a few plain-language questions about how someone actually works, and returns deductions grounded in the real text of IRS Publication 463 and Publication 535, not a chatbot's best guess.

## The problem

Gig and delivery drivers are among the filers most likely to miss deductions they qualify for. They're classified as self-employed, which means the deduction rules that matter to them including vehicle expenses, phone use, equipment, health insurance are scattered across dense IRS publications that most people never read. A preparer costs money most drivers would rather not spend on a return that might only take twenty minutes with the right guidance. The result is a predictable gap: money left unclaimed, every year, by the people who can least afford to leave it.

## How it works

1. **Guided intake.** A short set of questions covers vehicle type, mileage, phone and data use, equipment purchases, and health insurance are the categories that actually apply to rideshare and delivery work.
2. **Deterministic eligibility engine.** Each answer is run through explicit rules, not a language model, so the numbers are exact rather than approximate. The 2026 standard mileage rate (72.5¢/mile), the $2,500 de minimis safe harbor for equipment, and the employer-coverage exclusion on the self-employed health insurance deduction are all encoded as real logic, not left to inference.
3. **Every result is cited.** Each deduction card names the IRS publication and the specific chapter/section it's drawn from, so nothing shown is unsourced. The goal is to be checkable, not just plausible.
4. **Free-text retrieval.** A short "anything else" field runs a TF-IDF and cosine-similarity search over the same source material, surfacing related guidance even when a situation doesn't map neatly onto the structured questions.
5. **A running, honest total.** The estimate updates live as answers change, with a standing disclaimer on every screen: this is an educational estimate, not filed tax advice.

## Who it helps

- **Rideshare and delivery drivers** filing as self-employed for the first time, who don't know what they're allowed to claim.
- **Anyone deciding between the standard mileage rate and actual expenses**, a choice with a real, easy-to-miss lock-in rule: once depreciation is claimed on a vehicle, standard mileage is no longer available for it.
- **People about to see a preparer** who want to walk in already knowing what to ask about, rather than paying for time spent explaining the basics.

## Advantages over a general chatbot or generic tax software

- **Grounded, not generated.** Deduction logic is a rules engine built directly from publication text, not an LLM producing plausible-sounding tax advice from training data.
- **Citable.** Every claim points to a specific section of a specific IRS publication, so a user or their preparer can verify it directly rather than taking the tool's word for it.
- **Transparent about its own limits.** Where a deduction legally requires the user's own receipts (actual vehicle expenses, for example), the tool says so instead of fabricating a total.
- **Narrow on purpose.** It doesn't try to cover every filer type or every deduction, which is what lets the deductions it does cover be genuinely correct rather than broadly approximate.

## What this deliberately does not do

Scoping decisions, stated outright rather than left implicit:

- **One filer type only** - rideshare and delivery drivers. No W-2 employees, no small business owners, no itemized deductions beyond driving-related expenses.
- **No filing or e-filing integration.** This is a research and preparation tool, not a filing product.
- **Federal deductions only.** No state tax logic.
- **No multi-year or multi-state situations.**
- **No advice framed as final.** Every output is labeled an educational estimate and points the user toward a licensed preparer.

## Tech stack

- **Frontend:** React + TypeScript, built with Vite
- **Deduction logic:** a deterministic, hand-written rules engine (no LLM in the eligibility path)
- **Retrieval:** a from-scratch TF-IDF index with cosine similarity, run entirely client-side over a small corpus of paraphrased IRS Publication 463/535 excerpts
- **No backend, no database, no external API calls** - everything runs in the browser

## Running locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## What's next

- Server-side retrieval over the full text of Publications 463 and 535, rather than a hand-picked corpus
- A downloadable or printable summary a user can hand directly to a preparer
- Expanding to additional self-employed filer types beyond rideshare and delivery driving

## Disclaimer

Mile produces educational estimates only. It is not tax advice and nothing it outputs should be filed without review by a licensed tax preparer.