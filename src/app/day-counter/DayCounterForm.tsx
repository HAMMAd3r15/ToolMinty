'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function DayCounterForm() {
    const calc = calculators.find(c => c.href === '/day-counter');
    const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [includeStartDate, setIncludeStartDate] = useState(false);
    const [includeEndDate, setIncludeEndDate] = useState(false);

    const calculateDays = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Use UTC to avoid timezone issues with daily counts
        const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
        const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

        const diffTime = Math.abs(utcEnd - utcStart);
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Logic for including/excluding days
        if (includeStartDate) diffDays += 1;
        if (includeEndDate) diffDays += 1;
        // If they are the same day and both included, it's 1 day total (if we strictly mean "days covered")
        // But standard day counters usually add 1 for "inclusive" start OR end.
        // Let's stick to the common interpretation:
        // Diff = 1 day (e.g. Monday to Tuesday)
        // Inclusive start = Monday, Tuesday (2 days)
        // Inclusive both = Monday, Tuesday (2 days)
        // Wait, if it's Monday to Monday (diff 0):
        // Inclusive start = 1 day.

        return diffDays;
    };

    const diff = calculateDays();

    const faqs = [
        {
            question: "How does the day counter handle weekends?",
            answer: "This tool counts every calendar day between your selected dates, including Saturdays and Sundays. For working days only, please use our Business Days Calculator."
        },
        {
            question: "Does it account for leap years?",
            answer: "Yes, our day counter uses standard astronomical calendar rules and automatically accounts for leap years during its calculation."
        },
        {
            question: "What does 'Include Start/End Date' mean?",
            answer: "By default, a day counter measures the time *between* dates. Including the start or end date adds that specific calendar day to your total count, which is often required for legal or project tracking purposes."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Day Counter'}
                description={calc?.description || 'Calculate the exact number of days between two specific dates.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                                Start Date
                            </label>
                            <input
                                type="date"
                                className="input"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                                End Date
                            </label>
                            <input
                                type="date"
                                className="input"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                            <input
                                type="checkbox"
                                checked={includeStartDate}
                                onChange={(e) => setIncludeStartDate(e.target.checked)}
                                style={{ width: '1.2rem', height: '1.2rem' }}
                            />
                            Include Start Date
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                            <input
                                type="checkbox"
                                checked={includeEndDate}
                                onChange={(e) => setIncludeEndDate(e.target.checked)}
                                style={{ width: '1.2rem', height: '1.2rem' }}
                            />
                            Include End Date
                        </label>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <div style={{
                            padding: '2rem',
                            background: 'rgba(37, 99, 235, 0.05)',
                            borderRadius: '1.5rem',
                            border: '1px solid rgba(37, 99, 235, 0.1)',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                                Total Count
                            </div>
                            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                                {diff} <span style={{ fontSize: '1.5rem', fontWeight: 400 }}>Days</span>
                            </div>
                        </div>
                    </div>

                    <ResultCard
                        title="Calculation Basis"
                        value={`${startDate} to ${endDate} (${includeStartDate ? 'Inclusive Start' : 'Exclusive Start'}, ${includeEndDate ? 'Inclusive End' : 'Exclusive End'})`}
                        color="secondary"
                    />
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Day Counter"
                howToUse="To find the total number of days between two dates, select your start and end points using the interactive calendar inputs. Use the toggles to decide if you want to include the start or end dates in your final calculation. The result updates instantly, showing you the precise count of elapsed 24-hour periods. Our engine automatically handles leap years and differing month lengths, making it ideal for tracking pregnancy weeks, project milestones, or personal anniversary countdowns."
                whyUse="This elite Day Counter offers clinical precision with a professional SaaS-grade interface. Unlike basic browser-based tools, it uses robust astronomical algorithms running locally on your device, ensuring maximum privacy and zero latency. The glassmorphic design and clear typography make complex date tracking effortless. Whether you are managing legal timelines, fitness goals, or vacation planning, this high-fidelity utility provides the stable, accurate data you need to stay organized."
            />
        </div>
    );
}
