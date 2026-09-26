import type { IntakeAnswers } from '../types'

export const DEFAULT_ANSWERS: IntakeAnswers = {
  vehicleType: 'car',
  mileageMethod: 'standard',
  businessMiles: 0,
  claimedDepreciationBefore: false,
  parkingTollsPaid: false,
  parkingTollsAmount: 0,
  phoneUsedForWork: false,
  monthlyPhoneBill: 0,
  phoneBusinessPercent: 50,
  equipmentPurchased: false,
  equipmentCost: 0,
  equipmentItems: '',
  selfEmployedHealthInsurance: false,
  healthInsurancePremiumsPaid: 0,
  hasOtherJobWithEmployerCoverage: false,
  freeText: '',
}
