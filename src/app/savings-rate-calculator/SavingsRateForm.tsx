'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function SavingsRateForm() {
    const [income, setIncome] = useState<string>('');
    const [savings, setSavings] = useState<string>('');

    const calculateRate = () => {
        const i = parseFloat(income);
        const s = parseFloat(savings);

        if (isNaN(i) || isNaN(s) || i <= 0 || s < 0) return null;

        const rate = (s / i) * 100;

        return {
            rate: rate.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
            yearlySavings: (s * 12).toLocaleString(),
            isExpertSaver: rate >= 20
        };
    };

    const res = calculateRate();

    const faqs = [
        {
            question: "What is a good savings rate?",
            answer: "While it depends on personal goals, a common benchmark is the 50/30/20 rule, where 20% of your income goes toward savings and debt repayment. High-performance savers often aim for 30% or more."
        },
        {
            question: "Should I calculate with gross or net income?",
            answer: "Most financial planners recommend using your net (take-home) income, as this reflects the actual cash flow you have available to manage."
        },
        {
            question: "How can I increase my savings rate?",
            answer: "You can increase your rate by either reducing monthly expenses or increasing your income. Small changes to recurring costs often have the biggest impact over long periods."
        }
    ];

    const calc = calculators.find(c => c.href === '/savings-rate-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Savings Rate Calculator'}
                description={calc?.description || 'Determine the percentage of your income that you are successfully saving each month.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Monthly Take-Home Income ($)</label>
                            <input type="number" className="input" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g. 5000" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Monthly Total Savings ($)</label>
                            <input type="number" className="input" value={savings} onChange={(e) => setSavings(e.target.value)} placeholder="e.g. 1000" style={{ width: '100%' }} />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Your Savings Rate"
                                value={`${res.rate}%`}
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                <ResultCard
                                    title="Estimated Annual Savings"
                                    value={`$${res.yearlySavings}`}
                                    color="secondary"
                                />
                                <ResultCard
                                    title="Financial Status"
                                    value={res.isExpertSaver ? 'Elite Saver' : 'On Your Way'}
                                    color="accent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Savings Rate Calculator"
                howToUse="To evaluate your financial health, enter your 'Monthly Take-Home Income' and your 'Monthly Total Savings'. The tool instantly calculates your savings rate as a percentage of your total income. It also provides an annual projection of your savings, helping you visualize the long-term impact of your current financial habits. Results are displayed in high-fidelity cards that respond in real-time to your inputs."
                whyUse="Our Savings Rate Calculator is an elite utility designed for high-net-worth planning and personal financial optimization. It features a premium glassmorphic interface that provides a clinical, professional environment for analyzing your wealth-building efficiency. Built with absolute privacy in mind, all calculations occur locally on your device—your income and savings data never leave your browser. It is the most secure and sophisticated way to track your journey toward financial independence."
            />
        </div>
    );
}
