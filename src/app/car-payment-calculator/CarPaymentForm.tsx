'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function CarPaymentForm() {
    const [loanAmount, setLoanAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [tenure, setTenure] = useState<string>('');
    const [tenureType, setTenureType] = useState<'years' | 'months'>('months');

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
            question: "Should I choose a longer or shorter car loan term?",
            answer: "A shorter term (e.g., 36-48 months) means higher monthly payments but lower total interest. A longer term (e.g., 60-84 months) reduces your monthly bill but significantly increases the total cost of the vehicle due to interest."
        },
        {
            question: "Does my credit score affect car loan rates?",
            answer: "Yes, significantly. Borrowers with excellent credit (740+) generally qualify for the lowest interest rates, while those with lower scores may face rates several percentage points higher."
        },
        {
            question: "What is a down payment?",
            answer: "A down payment is cash you pay upfront. Entering a smaller 'Loan Amount' in this calculator (total price minus down payment) will show you how much cash upfront can save you in monthly costs and interest."
        }
    ];

    const calc = calculators.find(c => c.href === '/car-payment-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Car Payment Calculator'}
                description={calc?.description || 'Calculate your monthly auto loan payments based on price, interest, and term.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Loan Amount (Vehicle Price - Down Payment) ($)</label>
                        <input type="number" className="input" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="e.g. 35000" style={{ width: '100%' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Annual Interest Rate (%)</label>
                            <input type="number" className="input" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g. 5.9" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Loan Tenure</label>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                <input type="number" className="input" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="60" style={{ flex: 1 }} />
                                <CustomSelect
                                    value={tenureType}
                                    onChange={(val) => setTenureType(val as any)}
                                    options={[
                                        { value: "months", label: "Months" },
                                        { value: "years", label: "Years" }
                                    ]}
                                    containerStyle={{ width: '130px' }}
                                />
                            </div>
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Monthly Auto Payment"
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
                                    title="Total Vehicle Cost"
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
                toolName="Car Payment Calculator"
                howToUse="To find your perfect monthly auto budget, enter the 'Loan Amount' (the vehicle price minus any down payment or trade-in value), the 'Annual Interest Rate', and your desired 'Loan Tenure' in months or years. The calculator instantly displays your monthly payment along with a detailed breakdown of total interest and the final cost of the vehicle. These high-fidelity results update in real-time, allowing you to walk into a dealership with total confidence in your numbers."
                whyUse="Our Car Payment Calculator is a premium financial utility optimized for clarity and speed. It cuts through the complexity of auto financing by providing clean, clinical results processed entirely within your browser for maximum privacy. The elite 'glassmorphic' design offers a professional experience that mirrors the quality of the insights it provides. Whether you're buying new or used, this tool ensures you understand every dollar of your investment before you sign on the dotted line."
            />
        </div>
    );
}
