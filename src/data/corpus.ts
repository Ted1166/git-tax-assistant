import type { SourceChunk } from '../types'

export const MILEAGE_RATE_2026 = 0.725
export const EQUIPMENT_SAFE_HARBOR_LIMIT = 2500

export const CORPUS: SourceChunk[] = [
  {
    id: 'p463-mileage-rate',
    ruleId: 'standardMileage',
    publication: 'IRS Publication 463',
    section: 'Ch. 4 — Transportation, Standard Mileage Rate',
    text: 'Instead of tracking actual car costs, a driver can multiply business miles by the yearly standard mileage rate, which bundles gas, maintenance, insurance, and depreciation into one per-mile figure. The rate is set annually and applies to cars, vans, pickups, and panel trucks used for business.',
  },
  {
    id: 'p463-mileage-eligibility',
    ruleId: 'standardMileage',
    publication: 'IRS Publication 463',
    section: 'Ch. 4 — Choosing a Method',
    text: 'The standard mileage rate is only available if it is chosen in the first year the vehicle is used for business. If actual cost depreciation, including MACRS or a Section 179 deduction, was already claimed on that vehicle, the standard mileage rate cannot be used going forward for it.',
  },
  {
    id: 'p463-actual-expenses',
    ruleId: 'actualExpenses',
    publication: 'IRS Publication 463',
    section: 'Ch. 4 — Actual Car Expenses',
    text: 'Under the actual expense method, a driver totals real costs such as gas, oil, repairs, insurance, registration, and depreciation, then deducts the percentage of those costs that matches the vehicle\'s business-use share. This requires records of both total and business mileage for the year.',
  },
  {
    id: 'p463-bicycle',
    ruleId: 'bikeScooterExpenses',
    publication: 'IRS Publication 463',
    section: 'Ch. 4 — Vehicles Other Than Cars',
    text: 'The standard mileage rate applies only to cars, vans, pickups, and panel trucks. Bicycles, mopeds, and other vehicles are not eligible for it. A driver using a bicycle or scooter for deliveries instead deducts the business-use share of actual maintenance, repair, and depreciation costs for that vehicle.',
  },
  {
    id: 'p463-parking-tolls',
    ruleId: 'parkingTolls',
    publication: 'IRS Publication 463',
    section: 'Ch. 4 — Parking Fees and Tolls',
    text: 'Business-related parking fees and tolls are deductible separately from the standard mileage rate or actual expense calculation. They are not folded into either method and should be tracked and claimed on top of whichever vehicle expense method is used.',
  },
  {
    id: 'p535-cell-phone',
    ruleId: 'cellPhone',
    publication: 'IRS Publication 535',
    section: 'Ch. 11 — Business Expenses, Cell Phones',
    text: 'When a phone is used for both personal and business purposes, only the business-use portion of the bill is deductible. A reasonable, consistent method for estimating that percentage, such as tracking business versus personal call or data use over a sample period, should be used and kept on record.',
  },
  {
    id: 'p535-equipment-safe-harbor',
    ruleId: 'equipment',
    publication: 'IRS Publication 535',
    section: 'Ch. 2 — Deducting Business Expenses, De Minimis Safe Harbor',
    text: 'Under the de minimis safe harbor election, a business can deduct the full cost of a lower-cost item used more than 50% for business in the year it is bought, instead of depreciating it, provided the per-item or per-invoice cost stays under the safe harbor threshold and the business has a consistent policy of doing so.',
  },
  {
    id: 'p535-equipment-depreciation',
    ruleId: 'equipment',
    publication: 'IRS Publication 535',
    section: 'Ch. 2 — Deducting Business Expenses, Capital Expenses',
    text: 'Equipment that costs more than the de minimis safe harbor threshold, or that is not covered by a safe harbor election, is generally a capital expense recovered over time through depreciation, such as under Section 179 expensing or MACRS, rather than deducted all at once.',
  },
  {
    id: 'p535-health-insurance',
    ruleId: 'selfEmployedHealthInsurance',
    publication: 'IRS Publication 535',
    section: 'Ch. 6 — Self-Employed Health Insurance Deduction',
    text: 'A self-employed individual can generally deduct premiums paid for medical, dental, and qualifying long-term care insurance for themselves, a spouse, and dependents, up to their net self-employment earnings for the year.',
  },
  {
    id: 'p535-health-insurance-exclusion',
    ruleId: 'selfEmployedHealthInsurance',
    publication: 'IRS Publication 535',
    section: 'Ch. 6 — Self-Employed Health Insurance Deduction, Limits',
    text: 'The self-employed health insurance deduction is not available for any month in which the taxpayer was eligible to participate in an employer-subsidized health plan, including one offered through a spouse\'s employer.',
  },
  {
    id: 'p463-recordkeeping',
    ruleId: 'recordkeeping',
    publication: 'IRS Publication 463',
    section: 'Ch. 5 — Recordkeeping',
    text: 'Vehicle expense claims, under either method, need contemporaneous records: the date of each trip, miles driven, destination, and business purpose. A mileage log kept during the year is treated far more favorably than a reconstruction made later.',
  },
]
