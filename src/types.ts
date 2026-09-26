export type VehicleType = 'car' | 'bike_scooter' | 'on_foot'
export type MileageMethod = 'standard' | 'actual' | 'unsure'

export interface IntakeAnswers {
  vehicleType: VehicleType
  mileageMethod: MileageMethod
  businessMiles: number
  claimedDepreciationBefore: boolean
  parkingTollsPaid: boolean
  parkingTollsAmount: number
  phoneUsedForWork: boolean
  monthlyPhoneBill: number
  phoneBusinessPercent: number
  equipmentPurchased: boolean
  equipmentCost: number
  equipmentItems: string
  selfEmployedHealthInsurance: boolean
  healthInsurancePremiumsPaid: number
  hasOtherJobWithEmployerCoverage: boolean
  freeText: string
}

export interface SourceChunk {
  id: string
  ruleId: string
  publication: string
  section: string
  text: string
}

export interface DeductionResult {
  id: string
  title: string
  eligible: boolean
  amount: number | null
  requiresRecords: boolean
  summary: string
  reasoning: string
  publication: string
  section: string
}

export interface RetrievedChunk extends SourceChunk {
  score: number
}
