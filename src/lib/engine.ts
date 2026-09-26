import { CORPUS, EQUIPMENT_SAFE_HARBOR_LIMIT, MILEAGE_RATE_2026 } from '../data/corpus'
import type { DeductionResult, IntakeAnswers } from '../types'

function findSection(ruleId: string, index = 0) {
  const matches = CORPUS.filter((chunk) => chunk.ruleId === ruleId)
  const chunk = matches[index] ?? matches[0]
  return { publication: chunk.publication, section: chunk.section }
}

function evaluateStandardMileage(answers: IntakeAnswers): DeductionResult {
  const { publication, section } = findSection('standardMileage')
  const eligible =
    answers.vehicleType === 'car' &&
    answers.mileageMethod === 'standard' &&
    answers.businessMiles > 0 &&
    !answers.claimedDepreciationBefore

  if (answers.claimedDepreciationBefore && answers.vehicleType === 'car' && answers.mileageMethod === 'standard') {
    return {
      id: 'standardMileage',
      title: 'Standard mileage deduction',
      eligible: false,
      amount: null,
      requiresRecords: true,
      summary: 'Not available for this vehicle.',
      reasoning:
        'Once actual-cost depreciation (MACRS or Section 179) has been claimed on a vehicle, the standard mileage rate can no longer be used for it. The actual expense method applies instead.',
      publication,
      section,
    }
  }

  return {
    id: 'standardMileage',
    title: 'Standard mileage deduction',
    eligible,
    amount: eligible ? Math.round(answers.businessMiles * MILEAGE_RATE_2026 * 100) / 100 : null,
    requiresRecords: true,
    summary: eligible
      ? `${answers.businessMiles.toLocaleString()} business miles × $${MILEAGE_RATE_2026.toFixed(3)}/mile (2026 rate).`
      : 'Requires a car/van/pickup/panel truck, the standard mileage method, and at least one business mile logged.',
    reasoning:
      'The standard mileage rate bundles gas, maintenance, insurance, and depreciation into a single per-mile figure for cars, vans, pickups, and panel trucks used for business.',
    publication,
    section,
  }
}

function evaluateActualExpenses(answers: IntakeAnswers): DeductionResult {
  const { publication, section } = findSection('actualExpenses')
  const eligible = answers.vehicleType === 'car' && answers.mileageMethod === 'actual'

  return {
    id: 'actualExpenses',
    title: 'Actual vehicle expense deduction',
    eligible,
    amount: null,
    requiresRecords: true,
    summary: eligible
      ? 'Deduct the business-use percentage of gas, insurance, repairs, registration, and depreciation. This tool does not total these for you — keep every receipt.'
      : 'Applies only when the actual expense method is chosen for a car, van, pickup, or panel truck.',
    reasoning:
      'Under the actual expense method, total real vehicle costs are multiplied by the business-use share of total mileage for the year.',
    publication,
    section,
  }
}

function evaluateBikeScooter(answers: IntakeAnswers): DeductionResult {
  const { publication, section } = findSection('bikeScooterExpenses')
  const eligible = answers.vehicleType === 'bike_scooter'

  return {
    id: 'bikeScooterExpenses',
    title: 'Bicycle or scooter expense deduction',
    eligible,
    amount: null,
    requiresRecords: true,
    summary: eligible
      ? 'The standard mileage rate does not apply. Deduct the business-use share of maintenance, repairs, and depreciation for the bike or scooter instead.'
      : 'Applies only to bicycle or scooter delivery work.',
    reasoning:
      'The standard mileage rate is limited to cars, vans, pickups, and panel trucks, so bicycle and scooter costs are deducted through actual, allocated expenses.',
    publication,
    section,
  }
}

function evaluateParkingTolls(answers: IntakeAnswers): DeductionResult {
  const { publication, section } = findSection('parkingTolls')
  const eligible = answers.parkingTollsPaid && answers.parkingTollsAmount > 0

  return {
    id: 'parkingTolls',
    title: 'Parking fees and tolls',
    eligible,
    amount: eligible ? Math.round(answers.parkingTollsAmount * 100) / 100 : null,
    requiresRecords: true,
    summary: eligible
      ? `$${answers.parkingTollsAmount.toLocaleString()} in business-related parking and tolls, claimed on top of your vehicle expense method.`
      : 'Report any business parking fees or tolls paid to claim this separately.',
    reasoning:
      'Parking fees and tolls are deducted separately from whichever vehicle expense method is used — they are never folded into the mileage rate.',
    publication,
    section,
  }
}

function evaluateCellPhone(answers: IntakeAnswers): DeductionResult {
  const { publication, section } = findSection('cellPhone')
  const eligible = answers.phoneUsedForWork && answers.phoneBusinessPercent > 0 && answers.monthlyPhoneBill > 0
  const amount = eligible
    ? Math.round(answers.monthlyPhoneBill * 12 * (answers.phoneBusinessPercent / 100) * 100) / 100
    : null

  return {
    id: 'cellPhone',
    title: 'Cell phone and data plan deduction',
    eligible,
    amount,
    requiresRecords: true,
    summary: eligible
      ? `$${answers.monthlyPhoneBill.toLocaleString()}/mo × 12 × ${answers.phoneBusinessPercent}% business use.`
      : 'Report your monthly bill and the share of use that is for work.',
    reasoning:
      'Only the business-use portion of a phone bill is deductible, estimated with a reasonable, consistent method and kept on record.',
    publication,
    section,
  }
}

function evaluateEquipment(answers: IntakeAnswers): DeductionResult {
  const isSafeHarbor = answers.equipmentCost > 0 && answers.equipmentCost <= EQUIPMENT_SAFE_HARBOR_LIMIT
  const chunkIndex = isSafeHarbor ? 0 : 1
  const { publication, section } = findSection('equipment', chunkIndex)
  const eligible = answers.equipmentPurchased && answers.equipmentCost > 0

  return {
    id: 'equipment',
    title: 'Equipment and gear deduction',
    eligible,
    amount: eligible && isSafeHarbor ? Math.round(answers.equipmentCost * 100) / 100 : null,
    requiresRecords: true,
    summary: !eligible
      ? 'Report equipment purchased for delivery or rideshare work, like phone mounts, dash cams, or insulated bags.'
      : isSafeHarbor
        ? `$${answers.equipmentCost.toLocaleString()} deducted in full under the de minimis safe harbor (items under $${EQUIPMENT_SAFE_HARBOR_LIMIT.toLocaleString()}).`
        : `$${answers.equipmentCost.toLocaleString()} exceeds the $${EQUIPMENT_SAFE_HARBOR_LIMIT.toLocaleString()} safe harbor per item, so it is depreciated over its useful life rather than deducted all at once.`,
    reasoning: isSafeHarbor
      ? 'Lower-cost items used more than half the time for business can be deducted in full the year they are bought, under the de minimis safe harbor election.'
      : 'Costlier equipment is a capital expense recovered through depreciation, such as Section 179 expensing or MACRS, instead of an immediate full deduction.',
    publication,
    section,
  }
}

function evaluateHealthInsurance(answers: IntakeAnswers): DeductionResult {
  if (answers.hasOtherJobWithEmployerCoverage) {
    const { publication, section } = findSection('selfEmployedHealthInsurance', 1)
    return {
      id: 'selfEmployedHealthInsurance',
      title: 'Self-employed health insurance deduction',
      eligible: false,
      amount: null,
      requiresRecords: false,
      summary: 'Not available while eligible for an employer-subsidized plan.',
      reasoning:
        'This deduction is unavailable for any month the filer was eligible to participate in an employer-subsidized health plan, including through a spouse\'s employer.',
      publication,
      section,
    }
  }

  const { publication, section } = findSection('selfEmployedHealthInsurance', 0)
  const eligible = answers.selfEmployedHealthInsurance && answers.healthInsurancePremiumsPaid > 0

  return {
    id: 'selfEmployedHealthInsurance',
    title: 'Self-employed health insurance deduction',
    eligible,
    amount: eligible ? Math.round(answers.healthInsurancePremiumsPaid * 100) / 100 : null,
    requiresRecords: true,
    summary: eligible
      ? `$${answers.healthInsurancePremiumsPaid.toLocaleString()} in premiums paid, capped at your net self-employment earnings for the year.`
      : 'Report premiums paid for your own medical, dental, or long-term care coverage.',
    reasoning:
      'Self-employed filers can generally deduct premiums for themselves, a spouse, and dependents, up to net self-employment earnings.',
    publication,
    section,
  }
}

export function evaluateDeductions(answers: IntakeAnswers): DeductionResult[] {
  return [
    evaluateStandardMileage(answers),
    evaluateActualExpenses(answers),
    evaluateBikeScooter(answers),
    evaluateParkingTolls(answers),
    evaluateCellPhone(answers),
    evaluateEquipment(answers),
    evaluateHealthInsurance(answers),
  ].filter((result) => {
    if (result.id === 'standardMileage') return answers.vehicleType === 'car'
    if (result.id === 'actualExpenses') return answers.vehicleType === 'car'
    if (result.id === 'bikeScooterExpenses') return answers.vehicleType === 'bike_scooter'
    return true
  })
}

export function totalEstimatedDeduction(results: DeductionResult[]): number {
  return Math.round(results.reduce((sum, r) => sum + (r.eligible && r.amount ? r.amount : 0), 0) * 100) / 100
}
