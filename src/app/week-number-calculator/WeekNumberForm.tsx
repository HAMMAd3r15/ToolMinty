'use client';

import { useState, useMemo } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';
import ResultCard from '@/components/UI/ResultCard';

export default function WeekNumberForm() {
    const calc = calculators.find(c => c.href === '/week-number-calculator');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const weekData = useMemo(() => {
        const date = new Date(selectedDate);
        if (isNaN(date.getTime())) return null;

        // ISO Week calculation logic
        const target = new Date(date.valueOf());
        const dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        const firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
        }
        const weekNum = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);

        // Day of year
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000);
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        return {
            weekNum,
            dayOfYear,
            year: date.getFullYear(),
            isLeap: (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) || (date.getFullYear() % 400 === 0)
        };
    }, [selectedDate]);

    const faqs = [
        {
            question: "What is an ISO week number?",
            answer: "The ISO week-numbering system is part of the ISO 8601 date and time standard. It defines week 1 of the year as the week containing the first Thursday of the year."
        },
        {
            question: "How many weeks are in a year?",
            answer: "Most years have 52 ISO weeks, but some years (known as 'leap weeks' years) have 53 weeks. This occurs approximately every 5 to 6 years."
        },
        {
            question: "Is this calculation accurate for 2025 and 2026?",
            answer: "Yes, our algorithm follows the strict ISO 8601 standard, making it perfectly accurate for any year in both the past and the future."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Week Number Calculator'}
                description={calc?.description || 'Find the current week number or calculate it for any specific date.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Select Date</label>
                        <input
                            type="date"
                            className="input"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.85rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                colorScheme: 'dark'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])} className="btn-secondary" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', fontSize: '0.9rem' }}>Today</button>
                    </div>
                </div>

                {weekData && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div className="stat-card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--color-primary), #1d4ed8)', padding: '2rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, opacity: 0.8, color: '#fff' }}>Week Number</div>
                            <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#fff', margin: '0.5rem 0' }}>{weekData.weekNum}</div>
                            <div style={{ fontSize: '1rem', color: '#fff', opacity: 0.9 }}>ISO 8601 Standard</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="info-row">
                                <span className="label">Day of Year</span>
                                <span className="value">{weekData.dayOfYear}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Year</span>
                                <span className="value">{weekData.year}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Leap Year</span>
                                <span className="value">{weekData.isLeap ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="ISO Week Number Calculator"
                howToUse="To find specific scheduling details, enter any date into the calendar selector. The tool instantly computes the ISO 8601 week number, which is the gold standard for international business and logistics. You can also see the 'Day of Year' count (1–366) and leap year status. Use the 'Today' button to quickly reset to the current date and stay synchronized with global professional timelines."
                whyUse="Our Week Number Calculator is an elite administrative utility designed for project managers, logistics coordinators, and global developers. It provides absolute certainty in time-tracking by adhering strictly to international ISO standards, eliminating the ambiguity often found in regional calendar apps. The interface is optimized for high-speed use, featuring a glassmorphic aesthetic and a high-contrast display that makes precise time-management feel premium and effortless. It's a completely local, privacy-first tool that ensures your professional scheduling remains secure and accurate."
            />

            <style jsx>{`
                .card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 2rem;
                }
                .info-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .label {
                    font-size: 0.9rem;
                    opacity: 0.7;
                    font-weight: 500;
                }
                .value {
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 1.1rem;
                }
                .btn-secondary {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}
