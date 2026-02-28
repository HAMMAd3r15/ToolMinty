'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import Button from '@/components/UI/Button';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function SavingsGoalPage() {
    const calculator = calculators.find(c => c.href === '/savings-goal')!;
    const [targetGoal, setTargetGoal] = useState<string>('10000');
    const [initialBalance, setInitialBalance] = useState<string>('0');
    const [years, setYears] = useState<string>('2');
    const [months, setMonths] = useState<string>('0');
    const [interestRate, setInterestRate] = useState<string>('5');

    const [monthlySavings, setMonthlySavings] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalContributions, setTotalContributions] = useState<number>(0);

    const calculateSavings = () => {
        const goal = parseFloat(targetGoal) || 0;
        const initial = parseFloat(initialBalance) || 0;
        const y = parseFloat(years) || 0;
        const m = parseFloat(months) || 0;
        const rate = (parseFloat(interestRate) || 0) / 100;

        const totalMonths = (y * 12) + m;

        if (totalMonths <= 0) {
            setMonthlySavings(0);
            setTotalInterest(0);
            setTotalContributions(0);
            return;
        }

        if (initial >= goal) {
            setMonthlySavings(0);
            setTotalInterest(0);
            setTotalContributions(0);
            return;
        }

        const monthlyRate = rate / 12;
        let requiredMonthly = 0;

        if (rate === 0) {
            requiredMonthly = (goal - initial) / totalMonths;
        } else {
            // Formula: A = (FV - P*(1+i)^n) / (((1+i)^n - 1) / i)
            const power = Math.pow(1 + monthlyRate, totalMonths);
            requiredMonthly = (goal - (initial * power)) / ((power - 1) / monthlyRate);
        }

        const contributions = requiredMonthly * totalMonths;
        const interest = goal - contributions - initial;

        setMonthlySavings(Math.max(0, requiredMonthly));
        setTotalContributions(Math.max(0, contributions));
        setTotalInterest(Math.max(0, interest));
    };

    useEffect(() => {
        calculateSavings();
    }, [targetGoal, initialBalance, years, months, interestRate]);

    const handleCopy = () => {
        const text = `Savings Goal: $${targetGoal}\nRequired Monthly Savings: $${monthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\nTime: ${years}y ${months}m at ${interestRate}%`;
        navigator.clipboard.writeText(text);
    };

    const faqs = [
        {
            question: "How is the monthly savings calculated?",
            answer: "We use the Future Value of an Annuity formula, adjusted to solve for the monthly contribution. It takes into account your initial balance, interest rate, and compounding frequency (monthly)."
        },
        {
            question: "Does this account for taxes?",
            answer: "No, this calculator provides gross figures. Depending on your type of savings account, you may owe taxes on the interest earned."
        },
        {
            question: "Should I include inflation?",
            answer: "The 'Expected Annual Return' can be adjusted to a 'Real Return' (Interest Rate minus Inflation) if you want to calculate your savings in today's purchasing power."
        }
    ];

    return (
        <ToolLayout calculator={calculator}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <ToolHeader
                    title={calculator.title}
                    description={calculator.description}
                />

                <div className="card" style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div className="input-group" style={{ margin: 0 }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Target Savings Goal ($)</label>
                                <input
                                    type="number"
                                    value={targetGoal}
                                    onChange={(e) => setTargetGoal(e.target.value)}
                                    className="input"
                                    placeholder="e.g. 10000"
                                    style={{ fontSize: '1.1rem', fontWeight: 600 }}
                                />
                            </div>
                            <div className="input-group" style={{ margin: 0 }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Initial Balance ($)</label>
                                <input
                                    type="number"
                                    value={initialBalance}
                                    onChange={(e) => setInitialBalance(e.target.value)}
                                    className="input"
                                    placeholder="e.g. 500"
                                    style={{ fontSize: '1.1rem', fontWeight: 600 }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="input-group" style={{ margin: 0 }}>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Years</label>
                                    <input
                                        type="number"
                                        value={years}
                                        onChange={(e) => setYears(e.target.value)}
                                        className="input"
                                        placeholder="Yrs"
                                    />
                                </div>
                                <div className="input-group" style={{ margin: 0 }}>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Months</label>
                                    <input
                                        type="number"
                                        value={months}
                                        onChange={(e) => setMonths(e.target.value)}
                                        className="input"
                                        placeholder="Mos"
                                    />
                                </div>
                            </div>
                            <div className="input-group" style={{ margin: 0 }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Annual Return (%)</label>
                                <input
                                    type="number"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="input"
                                    placeholder="e.g. 7"
                                />
                            </div>
                        </div>

                        {monthlySavings > 0 && (
                            <div style={{ display: 'grid', gap: '1rem', animation: 'fadeIn 0.5s ease-out' }}>
                                <ResultCard
                                    title="Required Monthly Savings"
                                    value={`$${monthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    highlight
                                    color="primary"
                                    subtitle={`To reach $${parseFloat(targetGoal).toLocaleString()} in ${years}y ${months}m.`}
                                />
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                    <ResultCard
                                        title="Total Contributions"
                                        value={`$${totalContributions.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                                        color="secondary"
                                    />
                                    <ResultCard
                                        title="Interest Earned"
                                        value={`$${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                                        color="accent"
                                    />
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                            <Button
                                onClick={handleCopy}
                                variant="primary"
                                style={{ flex: 1, minWidth: '150px' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                                </svg>
                                Copy Results
                            </Button>
                            <Button
                                onClick={() => { setTargetGoal('10000'); setInitialBalance('0'); setYears('2'); setMonths('0'); setInterestRate('5'); }}
                                variant="secondary"
                                style={{ flex: 1, minWidth: '150px' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                    <path d="M23 4v6h-6" />
                                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                </svg>
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>

                <FAQSection items={faqs} />

                <EliteSEOCards
                    toolName="Savings Goal Calculator"
                    howToUse="To plan your financial future, enter your 'Target Savings Goal', 'Initial Balance', and the time period (Years and Months). Input your 'Expected Annual Return' percentage. The tool instantly calculates the 'Required Monthly Savings' needed to reach your goal, along with high-fidelity summaries of your total contributions and interest earned. Use the 'Copy Results' button to save your plan for later."
                    whyUse="Our Savings Goal Calculator is a professional-grade financial utility designed for absolute clarity and strategic planning. It provides a stable and highly-accurate way to visualize how compound interest works in your favor over time. The 'elite' design features glassmorphism and premium result cards that make long-term financial modeling feel sophisticated and motivating. It is a completely free, privacy-focused resource where all your sensitive financial metrics are processed locally on your device, ensuring total confidentiality."
                />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </ToolLayout>
    );
}
