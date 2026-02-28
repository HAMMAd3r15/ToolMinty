'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function PersonalLoanForm() {
    const [loanAmount, setLoanAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [tenure, setTenure] = useState<string>('');
    const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

    const calculateEMI = () => {
        const p = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate);
        let n = parseFloat(tenure);

        if (isNaN(p) || isNaN(annualRate) || isNaN(n) || p <= 0 || n <= 0) return null;

        if (tenureType === 'years') n = n * 12;

        const r = annualRate / 12 / 100;

        let emi: number;
        if (r === 0) {
            emi = p / n;
        } else {
            emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }
        const totalPayment = emi * n;
        const totalInterest = totalPayment - p;

        return {
            emi: Math.round(emi).toLocaleString(),
            totalInterest: Math.round(totalInterest).toLocaleString(),
            totalPayment: Math.round(totalPayment).toLocaleString()
        };
    };

    const res = calculateEMI();

    const faqs = [
        {
            question: "What is a personal loan?",
            answer: "A personal loan is an unsecured loan that you can use for various purposes like debt consolidation, home improvement, or major purchases. Unlike a mortgage or auto loan, it usually doesn't require collateral."
        },
        {
            question: "How is personal loan interest calculated?",
            answer: "Most personal loans use a fixed interest rate and amortized payments. This means your monthly payment remains the same, but the portion going toward interest decreases as you pay down the principal."
        },
        {
            question: "Does checking my rate affect my credit score?",
            answer: "Using this calculator has no impact on your credit. When you apply with a lender, they will perform a 'hard pull' which can slightly affect your score, but many lenders offer 'soft pull' pre-approvals first."
        }
    ];

    const calc = calculators.find(c => c.href === '/personal-loan-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Personal Loan Calculator'}
                description={calc?.description || 'Quickly estimate monthly payments for personal loans with fixed interest rates.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Loan Amount ($)</label>
                        <input type="number" className="input" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="e.g. 10000" style={{ width: '100%' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Interest Rate (%)</label>
                            <input type="number" className="input" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g. 12.0" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Loan Tenure</label>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                <input type="number" className="input" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="3" style={{ flex: 1 }} />
                                <CustomSelect
                                    value={tenureType}
                                    onChange={(val) => setTenureType(val as any)}
                                    options={[
                                        { value: "years", label: "Years" },
                                        { value: "months", label: "Months" }
                                    ]}
                                    containerStyle={{ width: '130px' }}
                                />
                            </div>
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Expected Monthly Payment"
                                value={`$${res.emi}`}
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                <ResultCard
                                    title="Total Interest"
                                    value={`$${res.totalInterest}`}
                                    color="secondary"
                                />
                                <ResultCard
                                    title="Total Repayment"
                                    value={`$${res.totalPayment}`}
                                    color="accent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Personal Loan Calculator"
                howToUse="To estimate your personal financing costs, enter the 'Loan Amount', the 'Interest Rate', and the 'Loan Tenure' in years or months. The calculator provides an instant, high-fidelity breakdown of your monthly payment, total interest, and the full repayment amount. This professional-grade utility allows you to experiment with different terms and rates to find a monthly payment that fits comfortably within your personal budget."
                whyUse="Our Personal Loan Calculator is a sophisticated financial tool designed for absolute speed and precision. Unlike bank-hosted calculators that may track your data, this is a privacy-first utility that processes all calculations locally in your browser. The 'elite' glassmorphic interface offers a clean, premium environment for evaluating your borrowing options. It is a completely free, objective resource that helps you understand the true cost of credit without any hidden motives or tracking."
            />
        </div>
    );
}
