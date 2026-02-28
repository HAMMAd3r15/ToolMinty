'use client';

import { useState, useMemo } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';
import ResultCard from '@/components/UI/ResultCard';
import CustomSelect from '@/components/UI/CustomSelect';

const TAX_BRACKETS = {
    single: [
        { rate: 0.10, min: 0, max: 11600 },
        { rate: 0.12, min: 11601, max: 47150 },
        { rate: 0.22, min: 47151, max: 100525 },
        { rate: 0.24, min: 100526, max: 191950 },
        { rate: 0.32, min: 191951, max: 243725 },
        { rate: 0.35, min: 243726, max: 609350 },
        { rate: 0.37, min: 609351, max: Infinity }
    ],
    married: [
        { rate: 0.10, min: 0, max: 23200 },
        { rate: 0.12, min: 23201, max: 94300 },
        { rate: 0.22, min: 94301, max: 201050 },
        { rate: 0.24, min: 201051, max: 383900 },
        { rate: 0.32, min: 383901, max: 487450 },
        { rate: 0.35, min: 487451, max: 731200 },
        { rate: 0.37, min: 731201, max: Infinity }
    ]
};

export default function TaxBracketForm() {
    const calc = calculators.find(c => c.href === '/tax-bracket-calculator');
    const [income, setIncome] = useState<number | ''>('');
    const [status, setStatus] = useState<'single' | 'married'>('single');

    const taxResults = useMemo(() => {
        if (!income || income <= 0) return null;

        const brackets = TAX_BRACKETS[status];
        let totalTax = 0;
        let marginalRate = 0;

        for (const bracket of brackets) {
            const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
            if (taxableInBracket > 0) {
                totalTax += taxableInBracket * bracket.rate;
                marginalRate = bracket.rate * 100;
            } else {
                break;
            }
        }

        const effectiveRate = (totalTax / income) * 100;

        return {
            totalTax: Math.round(totalTax),
            marginalRate,
            effectiveRate: effectiveRate.toFixed(2),
            takeHome: Math.round(income - totalTax)
        };
    }, [income, status]);

    const faqs = [
        {
            question: "What is a marginal tax bracket?",
            answer: "Your marginal tax bracket is the tax rate applied to the last dollar you earned. It doesn't mean you pay that rate on all your income; only the portion that falls within that specific bracket."
        },
        {
            question: "How does the effective tax rate differ?",
            answer: "The effective tax rate is the actual percentage of your total income that you pay in taxes. It is calculated by dividing your total tax liability by your total taxable income."
        },
        {
            question: "Which tax year are these brackets for?",
            answer: "These brackets reflect the estimated 2024/2025 US Federal Income Tax rates. Please note that state and local taxes are not included in this calculation."
        }
    ];

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Tax Bracket Calculator'}
                description={calc?.description || 'Estimate your federal tax bracket and effective tax rate based on your annual income.'}
            />

            <div className="calculation-card card no-print">
                <div className="input-grid">
                    <div className="input-group">
                        <label className="input-label">Annual Taxable Income ($)</label>
                        <input
                            type="number"
                            className="input"
                            value={income}
                            onChange={(e) => setIncome(e.target.value === '' ? '' : parseFloat(e.target.value))}
                            placeholder="e.g. 75000"
                        />
                    </div>
                    <div className="input-group">
                        <CustomSelect
                            label="Filing Status"
                            value={status}
                            onChange={(val: string) => setStatus(val as any)}
                            options={[
                                { value: 'single', label: 'Single' },
                                { value: 'married', label: 'Married Filing Jointly' }
                            ]}
                        />
                    </div>
                </div>

                {taxResults && (
                    <div className="results-grid">
                        <ResultCard
                            title="Tax Estimate"
                            results={[
                                { label: 'Total Estimated Tax', value: `$${taxResults.totalTax.toLocaleString()}` },
                                { label: 'Marginal Bracket', value: `${taxResults.marginalRate}%` },
                                { label: 'Effective Tax Rate', value: `${taxResults.effectiveRate}%` },
                                { label: 'Estimated Take-Home', value: `$${taxResults.takeHome.toLocaleString()}` }
                            ]}
                        />
                        <div className="card take-home-card">
                            <h3 className="take-home-title">Take-Home Pay</h3>
                            <div className="take-home-value">${taxResults.takeHome.toLocaleString()}</div>
                            <div className="take-home-monthly">Monthly: ${(taxResults.takeHome / 12).toFixed(2).toLocaleString()}</div>
                        </div>
                    </div>
                )}

            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Investment & Federal Tax Bracket Calculator"
                howToUse="To estimate your tax liability, enter your total projected taxable income for the current year. Select your filing status—either 'Single' or 'Married Filing Jointly'—to adjust the mathematical thresholds. The tool immediately displays your marginal tax bracket and your actual effective tax rate. Use this data-driven insight to plan your contributions to retirement accounts or evaluate potential investment returns after-tax."
                whyUse="Our Tax Bracket Calculator is an elite financial utility designed for high-net-worth individuals and proactive taxpayers who value precision and privacy. By utilizing the latest federal tax formulas locally in your browser, it allows you to model various income scenarios without ever transmitting confidential financial data over the web. The high-fidelity interface paired with real-time reactive calculations makes complex financial planning feel sophisticated, secure, and incredibly reliable."
            />

            <style jsx>{`
                .calculation-card {
                    margin-bottom: 3rem;
                }
                .card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    padding: 2rem;
                }
                .input-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .input-group {
                    position: relative;
                }
                .input-label {
                    display: block;
                    font-size: 0.85rem;
                    margin-bottom: 0.5rem;
                    opacity: 0.7;
                }
                .input {
                    width: 100%;
                    padding: 0.85rem;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.05);
                    color: #fff;
                    border-radius: 12px;
                    transition: border 0.3s;
                    outline: none;
                }
                .input:focus {
                    border-color: var(--color-primary);
                    background: rgba(255,255,255,0.1);
                }
                .results-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                }
                .take-home-card {
                    background: rgba(var(--color-primary-rgb), 0.1);
                    border: 1px solid var(--color-primary);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 1.5rem;
                }
                .take-home-title {
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 1rem;
                    color: var(--color-primary);
                }
                .take-home-value {
                    font-size: 2.5rem;
                    font-weight: 900;
                    margin-bottom: 0.5rem;
                }
                .take-home-monthly {
                    opacity: 0.7;
                    font-size: 0.85rem;
                }

                @media (max-width: 768px) {
                    .input-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                    .take-home-value {
                        font-size: 2rem;
                    }
                }

                @media (max-width: 480px) {
                    .take-home-value {
                        font-size: 1.75rem;
                    }
                }
            `}</style>
        </div>
    );
}
