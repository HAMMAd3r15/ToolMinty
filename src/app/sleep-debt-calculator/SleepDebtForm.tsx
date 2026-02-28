'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function SleepDebtForm() {
    const calc = calculators.find(c => c.href === '/sleep-debt-calculator');
    const [neededHours, setNeededHours] = useState('8');
    const [actualHours, setActualHours] = useState('');
    const [days, setDays] = useState('7');

    const calculateSleepDebt = () => {
        const needed = parseFloat(neededHours);
        const actual = parseFloat(actualHours);
        const d = parseInt(days);

        if (isNaN(needed) || isNaN(actual) || isNaN(d)) return null;

        const debtPerDay = needed - actual;
        const totalDebt = debtPerDay * d;

        return {
            totalDebt: totalDebt.toFixed(1),
            debtPerDay: debtPerDay.toFixed(1),
            status: totalDebt > 0 ? 'Sleep Deficit' : totalDebt < 0 ? 'Sleep Surplus' : 'Optimal Sleep'
        };
    };

    const res = calculateSleepDebt();

    const faqs = [
        {
            question: "What is sleep debt?",
            answer: "Sleep debt is the difference between the amount of sleep you should be getting and the amount you actually get. It accumulates over time and can affect cognitive function and mood."
        },
        {
            question: "How do I catch up on sleep?",
            answer: "You can reach a healthy sleep balance by adding an extra hour or two of sleep per night over several days rather than trying to sleep all day on the weekend."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Sleep Debt Calculator'}
                description={calc?.description || 'Calculate your accumulated sleep deficit to better manage fatigue and rest.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Ideal Sleep (hours/night)</label>
                        <input
                            type="number"
                            className="input"
                            value={neededHours}
                            onChange={(e) => setNeededHours(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Actual Sleep (hours/night)</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 6.5"
                            value={actualHours}
                            onChange={(e) => setActualHours(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Time Period (days)</label>
                        <input
                            type="number"
                            className="input"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {res && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <ResultCard
                            title="Total Sleep Debt"
                            value={`${res.totalDebt} hours`}
                            subtitle={`Accumulated over ${days} days`}
                            color={parseFloat(res.totalDebt) > 0 ? 'secondary' : 'success'}
                            highlight
                        />
                        <ResultCard
                            title="Daily Difference"
                            value={`${res.debtPerDay} hours`}
                            subtitle={res.status}
                            color="primary"
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Sleep Debt Calculator"
                howToUse="To find your sleep deficit, enter your ideal sleeping hours, your average actual sleep per night, and the number of days you want to analyze. The tool instantly calculates your cumulative 'Sleep Debt' and provides a high-fidelity status report, range from 'Optimal Sleep' to 'Sleep Deficit'. This automated process helps you visualize fatigue accumulation and plan your recovery with absolute precision."
                whyUse="Our Sleep Debt Calculator is an 'elite' health utility designed for individuals who prioritize cognitive performance and long-term wellness. It provides a stable and reliable way to track rest patterns that often go unnoticed in busy schedules. The premium user interface features glassmorphism and responsive feedback cards that make managing your health markers feel modern and sophisticated. It is a free, privacy-focused resource that processes all your sleep data locally in your browser, keeping your personal routines entirely private."
            />
        </div>
    );
}
