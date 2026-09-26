import type { ChangeEvent } from 'react'
import type { IntakeAnswers, VehicleType, MileageMethod } from '../types'

interface Props {
    answers: IntakeAnswers
    onChange: (next: IntakeAnswers) => void
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <label className="field">
            <span className="field-label">{label}</span>
            {children}
            {hint ? <span className="field-hint">{hint}</span> : null}
        </label>
    )
}

function Section({ index, title, children }: { index: number; title: string; children: React.ReactNode }) {
    return (
        <section className="intake-section">
            <div className="intake-section-header">
                <span className="intake-section-index">{index}</span>
                <h2>{title}</h2>
            </div>
            <div className="intake-section-body">{children}</div>
        </section>
    )
}

export function IntakeForm({ answers, onChange }: Props) {
    function set<K extends keyof IntakeAnswers>(key: K, value: IntakeAnswers[K]) {
        onChange({ ...answers, [key]: value })
    }

    function update(partial: Partial<IntakeAnswers>) {
        onChange({ ...answers, ...partial })
    }

    function numberField(e: ChangeEvent<HTMLInputElement>) {
        return e.target.value === '' ? 0 : Number(e.target.value)
    }

    return (
        <form className="intake-form" onSubmit={(e) => e.preventDefault()}>
            <Section index={1} title="How do you drive">
                <Field label="Vehicle used for work">
                    <div className="segmented">
                        {(['car', 'bike_scooter', 'on_foot'] as VehicleType[]).map((type) => (
                            <button
                                key={type}
                                type="button"
                                className={answers.vehicleType === type ? 'segment active' : 'segment'}
                                onClick={() => set('vehicleType', type)}
                            >
                                {type === 'car' ? 'Car / van / truck' : type === 'bike_scooter' ? 'Bike / scooter' : 'On foot'}
                            </button>
                        ))}
                    </div>
                </Field>

                {answers.vehicleType === 'car' && (
                    <>
                        <Field label="Expense method">
                            <div className="segmented">
                                {(['standard', 'actual', 'unsure'] as MileageMethod[]).map((method) => (
                                    <button
                                        key={method}
                                        type="button"
                                        className={answers.mileageMethod === method ? 'segment active' : 'segment'}
                                        onClick={() => set('mileageMethod', method)}
                                    >
                                        {method === 'standard' ? 'Standard mileage' : method === 'actual' ? 'Actual expenses' : "I'm not sure"}
                                    </button>
                                ))}
                            </div>
                        </Field>

                        <Field label="Business miles driven this year" hint="Miles for deliveries or rides, not your commute.">
                            <input
                                type="number"
                                min={0}
                                inputMode="numeric"
                                value={answers.businessMiles || ''}
                                onChange={(e) => set('businessMiles', numberField(e))}
                                placeholder="0"
                            />
                        </Field>

                        <Field label="Have you already claimed depreciation on this vehicle in a prior year?">
                            <div className="segmented">
                                <button
                                    type="button"
                                    className={!answers.claimedDepreciationBefore ? 'segment active' : 'segment'}
                                    onClick={() => set('claimedDepreciationBefore', false)}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    className={answers.claimedDepreciationBefore ? 'segment active' : 'segment'}
                                    onClick={() => set('claimedDepreciationBefore', true)}
                                >
                                    Yes
                                </button>
                            </div>
                        </Field>
                    </>
                )}

                <Field label="Parking fees or tolls paid for work trips">
                    <div className="inline-amount">
                        <span className="currency">$</span>
                        <input
                            type="number"
                            min={0}
                            inputMode="decimal"
                            value={answers.parkingTollsAmount || ''}
                            onChange={(e) => {
                                const value = numberField(e)
                                update({ parkingTollsAmount: value, parkingTollsPaid: value > 0 })
                            }}
                            placeholder="0.00"
                        />
                    </div>
                </Field>
            </Section>

            <Section index={2} title="Phone and data">
                <Field label="Do you use your phone for this work?">
                    <div className="segmented">
                        <button
                            type="button"
                            className={answers.phoneUsedForWork ? 'segment active' : 'segment'}
                            onClick={() => set('phoneUsedForWork', true)}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={!answers.phoneUsedForWork ? 'segment active' : 'segment'}
                            onClick={() => set('phoneUsedForWork', false)}
                        >
                            No
                        </button>
                    </div>
                </Field>

                {answers.phoneUsedForWork && (
                    <>
                        <Field label="Monthly phone and data bill">
                            <div className="inline-amount">
                                <span className="currency">$</span>
                                <input
                                    type="number"
                                    min={0}
                                    inputMode="decimal"
                                    value={answers.monthlyPhoneBill || ''}
                                    onChange={(e) => set('monthlyPhoneBill', numberField(e))}
                                    placeholder="0.00"
                                />
                            </div>
                        </Field>

                        <Field label={`Share used for work: ${answers.phoneBusinessPercent}%`}>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={5}
                                value={answers.phoneBusinessPercent}
                                onChange={(e) => set('phoneBusinessPercent', Number(e.target.value))}
                            />
                        </Field>
                    </>
                )}
            </Section>

            <Section index={3} title="Equipment and gear">
                <Field label="Equipment bought for this work" hint="Phone mounts, dash cams, insulated bags, chargers.">
                    <input
                        type="text"
                        value={answers.equipmentItems}
                        onChange={(e) => {
                            const value = e.target.value
                            update({
                                equipmentItems: value,
                                equipmentPurchased: value.trim().length > 0 || answers.equipmentCost > 0,
                            })
                        }}
                        placeholder="e.g. insulated delivery bag, phone mount"
                    />
                </Field>

                <Field label="Total spent on this equipment">
                    <div className="inline-amount">
                        <span className="currency">$</span>
                        <input
                            type="number"
                            min={0}
                            inputMode="decimal"
                            value={answers.equipmentCost || ''}
                            onChange={(e) => {
                                const value = numberField(e)
                                update({
                                    equipmentCost: value,
                                    equipmentPurchased: value > 0 || answers.equipmentItems.trim().length > 0,
                                })
                            }}
                            placeholder="0.00"
                        />
                    </div>
                </Field>
            </Section>

            <Section index={4} title="Health insurance">
                <Field label="Do you pay your own health insurance premiums?">
                    <div className="segmented">
                        <button
                            type="button"
                            className={answers.selfEmployedHealthInsurance ? 'segment active' : 'segment'}
                            onClick={() => set('selfEmployedHealthInsurance', true)}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={!answers.selfEmployedHealthInsurance ? 'segment active' : 'segment'}
                            onClick={() => set('selfEmployedHealthInsurance', false)}
                        >
                            No
                        </button>
                    </div>
                </Field>

                {answers.selfEmployedHealthInsurance && (
                    <>
                        <Field label="Annual premiums paid">
                            <div className="inline-amount">
                                <span className="currency">$</span>
                                <input
                                    type="number"
                                    min={0}
                                    inputMode="decimal"
                                    value={answers.healthInsurancePremiumsPaid || ''}
                                    onChange={(e) => set('healthInsurancePremiumsPaid', numberField(e))}
                                    placeholder="0.00"
                                />
                            </div>
                        </Field>

                        <Field label="Could you join an employer-subsidized plan, including through a spouse?">
                            <div className="segmented">
                                <button
                                    type="button"
                                    className={!answers.hasOtherJobWithEmployerCoverage ? 'segment active' : 'segment'}
                                    onClick={() => set('hasOtherJobWithEmployerCoverage', false)}
                                >
                                    No
                                </button>
                                <button
                                    type="button"
                                    className={answers.hasOtherJobWithEmployerCoverage ? 'segment active' : 'segment'}
                                    onClick={() => set('hasOtherJobWithEmployerCoverage', true)}
                                >
                                    Yes
                                </button>
                            </div>
                        </Field>
                    </>
                )}
            </Section>

            <Section index={5} title="Anything else">
                <Field label="Describe your work situation in your own words" hint="Optional — used to surface related guidance below.">
                    <textarea
                        value={answers.freeText}
                        onChange={(e) => set('freeText', e.target.value)}
                        placeholder="e.g. I deliver groceries on weekends and use a cooler bag I bought myself"
                        rows={3}
                    />
                </Field>
            </Section>
        </form>
    )
}