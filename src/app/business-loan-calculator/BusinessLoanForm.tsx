'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function BusinessLoanForm() {
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
            question: "How do business loans differ from personal loans?",
            answer: "Business loans are specifically designed for commercial purposes, like expansion, inventory, or equipment. They often require business financial statements and may have different interest rate structures compared to personal loans."
        },
        {
            question: "What is the cost of capital?",
            answer: "The cost of capital is effectively the interest rate you pay on the loan. It's critical for businesses to ensure that the return on the investment funded by the loan exceeds this cost."
        },
        {
            question: "Can business loans be paid off early?",
            answer: "Many commercial loans allow early repayment, but it's important to check for 'prepayment penalties' which are more common in business financing than in personal lending."
        }
    ];

    const calc = calculators.find(c => c.href === '/business-loan-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Business Loan Calculator'}
                description={calc?.description || 'Estimate your monthly payments and total interest for a commercial or business loan.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Loan Amount ($)</label>
                        <input type="number" className="input" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="e.g. 500000" style={{ width: '100%' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Annual Interest Rate (%)</label>
                            <input type="number" className="input" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g. 7.5" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Loan Tenure</label>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                <input type="number" className="input" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="5" style={{ flex: 1 }} />
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
                                title="Monthly Business Payment"
                                value={`$${res.emi}`}
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                <ResultCard
                                    title="Total Interest Cost"
                                    value={`$${res.totalInterest}`}
                                    color="secondary"
                                />
                                <ResultCard
                                    title="Total Business Repayment"
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
                toolName="Business Loan Calculator"
                howToUse="To evaluate the feasibility of a business loan, simply enter your 'Loan Amount', the 'Annual Interest Rate', and the expected 'Loan Tenure'. Our tool instantly generates your estimated monthly payment and provides a transparent look at the total interest cost and total repayment amount. This high-fidelity interface allows founders and entrepreneurs to model different financing scenarios quickly, helping you determine how new capital will impact your monthly cash flow and long-term profitability."
                whyUse="Our Business Loan Calculator is an elite financial modeling tool designed for precision-minded business owners. Unlike generic calculators, it provides clinical accuracy in interest compounding, helping you understand the true cost of business financing. The glassmorphic, professional-grade interface ensures that your financial planning occurs in a focused, premium workspace. Built with a privacy-first philosophy, all your commercial inputs are processed locally on your device, making it the most secure and sophisticated choice for modern company growth planning."
            />
        </div>
    );
}
