'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function MortgagePayoffForm() {
    const [balance, setBalance] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [remainingYears, setRemainingYears] = useState<string>('');
    const [extraPayment, setExtraPayment] = useState<string>('');

    const calculatePayoff = () => {
        const p = parseFloat(balance);
        const annualRate = parseFloat(interestRate);
        const years = parseFloat(remainingYears);
        const extra = parseFloat(extraPayment) || 0;

        if (isNaN(p) || isNaN(annualRate) || isNaN(years) || p <= 0 || years <= 0) return null;

        const r = annualRate / 100 / 12;
        const n = years * 12;

        let scheduledMonthlyPayment: number;
        if (r === 0) {
            scheduledMonthlyPayment = p / n;
        } else {
            scheduledMonthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }

        const totalScheduledPayment = scheduledMonthlyPayment * n;
        const totalScheduledInterest = totalScheduledPayment - p;

        // Accelerated Payoff Calculation
        let currentBalance = p;
        let monthsToPayoff = 0;
        let totalInterestPaidWithExtra = 0;
        const totalMonthlyPayment = scheduledMonthlyPayment + extra;

        while (currentBalance > 0 && monthsToPayoff < 600) { // Safety cap at 50 years
            const interestForMonth = currentBalance * r;
            totalInterestPaidWithExtra += interestForMonth;

            const principalForMonth = totalMonthlyPayment - interestForMonth;
            currentBalance -= principalForMonth;
            monthsToPayoff++;
        }

        const interestSaved = totalScheduledInterest - totalInterestPaidWithExtra;
        const monthsSaved = n - monthsToPayoff;
        const yearsSaved = Math.floor(monthsSaved / 12);
        const remMonthsSaved = monthsSaved % 12;

        return {
            scheduledMonthly: Math.round(scheduledMonthlyPayment).toLocaleString(),
            totalInterestSaved: Math.round(interestSaved).toLocaleString(),
            timeSaved: `${yearsSaved} years, ${remMonthsSaved} months`,
            totalInterest: Math.round(totalInterestPaidWithExtra).toLocaleString(),
            newTermMonths: monthsToPayoff
        };
    };

    const res = calculatePayoff();

    const faqs = [
        {
            question: "How do extra payments save money on a mortgage?",
            answer: "Every dollar you pay above your scheduled monthly amount goes directly toward the principal. This reduces the balance faster, meaning interest is calculated on a smaller amount in every subsequent month."
        },
        {
            question: "Is it better to pay extra monthly or as a lump sum?",
            answer: "Paying extra as soon as possible is always better because it reduces the principal faster. However, even small monthly additions can save tens of thousands of dollars over 15-30 years."
        },
        {
            question: "Will my lender charge me for paying early?",
            answer: "Most modern residential mortgages do not have prepayment penalties, but you should always check your loan documents or ask your lender to be sure."
        }
    ];

    const calc = calculators.find(c => c.href === '/mortgage-payoff-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Mortgage Payoff Calculator'}
                description={calc?.description || 'Calculate how much interest and time you can save by making extra payments on your mortgage.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Current Mortgage Balance ($)</label>
                            <input type="number" className="input" value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="e.g. 300000" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Interest Rate (%)</label>
                            <input type="number" className="input" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g. 4.5" style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Remaining Term (Years)</label>
                            <input type="number" className="input" value={remainingYears} onChange={(e) => setRemainingYears(e.target.value)} placeholder="e.g. 25" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Extra Monthly Payment ($)</label>
                            <input type="number" className="input" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} placeholder="e.g. 200" style={{ width: '100%' }} />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Total Interest Saved"
                                value={`$${res.totalInterestSaved}`}
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                <ResultCard
                                    title="Time Saved"
                                    value={res.timeSaved}
                                    color="secondary"
                                />
                                <ResultCard
                                    title="Base Monthly Payment"
                                    value={`$${res.scheduledMonthly}`}
                                    color="accent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Mortgage Payoff Calculator"
                howToUse="To discover your potential savings, enter your 'Current Mortgage Balance', your 'Interest Rate', and the 'Remaining Term' in years. Then, input an 'Extra Monthly Payment' amount. The tool instantly calculates exactly how much total interest you will save and how many years you will shave off your mortgage. The premium interface provides a clear contrast between your scheduled path and your accelerated financial freedom, visualized through high-fidelity results cards."
                whyUse="Our Mortgage Payoff Calculator is an elite financial utility designed for homeowners who want to take control of their long-term debt. It provides absolute mathematical precision in calculating the compounding benefits of extra principal payments. The glassmorphic design ensures a clean, distraction-free environment for serious financial planning. Built with a privacy-first approach, all your sensitive mortgage data remains local on your device, making it a secure and sophisticated resource for achieving mortgage-free homeownership faster."
            />
        </div>
    );
}
