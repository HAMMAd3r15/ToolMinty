'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function DailySpendingLimitForm() {
    const [monthlyBudget, setMonthlyBudget] = useState<string>('');
    const [spentSoFar, setSpentSoFar] = useState<string>('');
    const [daysLeft, setDaysLeft] = useState<string>('');

    const calculateLimit = () => {
        const budget = parseFloat(monthlyBudget);
        const spent = parseFloat(spentSoFar) || 0;
        const days = parseFloat(daysLeft);

        if (isNaN(budget) || isNaN(days) || budget <= 0 || days <= 0) return null;

        const remaining = budget - spent;
        const dailyLimit = remaining / days;

        return {
            remaining: Math.max(0, remaining).toLocaleString(),
            dailyLimit: Math.max(0, dailyLimit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            isOverBudget: remaining < 0
        };
    };

    const res = calculateLimit();

    const faqs = [
        {
            question: "How is the daily spending limit calculated?",
            answer: "It is calculated by taking your remaining budget (Monthly Budget minus Spent So Far) and dividing it by the number of days remaining in the month."
        },
        {
            question: "Why should I track my daily limit?",
            answer: "Daily limits help prevent 'lifestyle creep' and ensure you don't run out of money before your next paycheck. It turns a large, daunting monthly goal into a manageable daily habit."
        },
        {
            question: "What if I go over my limit one day?",
            answer: "Simply update the 'Spent So Far' and 'Days Left' on the next day. The calculator will automatically adjust your new daily limit to help you stay on track for the rest of the month."
        }
    ];

    const calc = calculators.find(c => c.href === '/daily-spending-limit');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Daily Spending Limit'}
                description={calc?.description || 'Calculate how much you can spend each day to stay within your monthly budget.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Total Monthly Budget ($)</label>
                        <input type="number" className="input" value={monthlyBudget} onChange={(e) => setMonthlyBudget(e.target.value)} placeholder="e.g. 3000" style={{ width: '100%' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Amount Spent So Far ($)</label>
                            <input type="number" className="input" value={spentSoFar} onChange={(e) => setSpentSoFar(e.target.value)} placeholder="e.g. 1200" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Days Remaining in Month</label>
                            <input type="number" className="input" value={daysLeft} onChange={(e) => setDaysLeft(e.target.value)} placeholder="e.g. 15" style={{ width: '100%' }} />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Available Daily Limit"
                                value={res.isOverBudget ? '$0.00' : `$${res.dailyLimit}`}
                                highlight
                                color={res.isOverBudget ? 'secondary' : 'primary'}
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                <ResultCard
                                    title="Remaining Budget"
                                    value={res.isOverBudget ? 'OVER BUDGET' : `$${res.remaining}`}
                                    color={res.isOverBudget ? 'secondary' : 'accent'}
                                />
                                <ResultCard
                                    title="Budget Status"
                                    value={res.isOverBudget ? 'Adjust Plan' : 'On Track'}
                                    color={res.isOverBudget ? 'secondary' : 'secondary'}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Daily Spending Limit"
                howToUse="To manage your finances effectively, enter your 'Total Monthly Budget', the 'Amount Spent So Far', and the 'Days Remaining' in the current month. The tool automatically subtracts your spending from your budget and divides the remainder by the days left. This gives you a clear, actionable daily allowance that helps you stay within your financial boundaries without the stress of complex spreadsheets."
                whyUse="Our Daily Spending Limit calculator is a premium productivity tool designed for high-performance financial management. It simplifies the abstract concept of a 'monthly budget' into a concrete daily number that is easy to follow. The glassmorphic interface offers a clean, professional aesthetic that makes budgeting feel like a sophisticated part of your daily routine. Privacy is paramount; all your budget data is processed locally in your browser, ensuring your financial habits remain entirely confidential."
            />
        </div>
    );
}
