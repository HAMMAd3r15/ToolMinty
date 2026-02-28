'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import DateInput from '@/components/UI/DateInput';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function WeeksBetweenDatesForm() {
    const calc = calculators.find(c => c.href === '/weeks-between-dates');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const calculateWeeks = () => {
        if (!startDate || !endDate) return null;
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Reset time for accurate calculation
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);
        const remainingDays = diffDays % 7;

        return {
            totalDays: diffDays,
            weeks,
            remainingDays,
            resultString: `${weeks} weeks and ${remainingDays} days`
        };
    };

    const res = calculateWeeks();

    const faqs = [
        {
            question: "How is the week count calculated?",
            answer: "We calculate the total number of days between the two selected dates and divide by 7. The result shows full weeks plus any remaining days."
        },
        {
            question: "Is the start date included in the count?",
            answer: "Standard calculation usually counts the duration between dates, often excluding the start date but including the end date, or vice versa. This tool calculates the absolute mathematical difference in days."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Weeks Between Dates'}
                description={calc?.description || 'Calculate the total number of weeks and days between any two specific dates.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <DateInput
                        label="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <DateInput
                        label="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                {res && (
                    <div style={{ marginTop: '2rem' }}>
                        <ResultCard
                            title="Total Duration"
                            value={res.resultString}
                            subtitle={`Approximately ${res.totalDays} total days`}
                            color="secondary"
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Weeks Between Dates"
                howToUse="To find the duration between two points in time, start by entering your 'Start Date' and 'End Date' using the calendar inputs above. The tool automatically processes the mathematical difference as you select each date. You'll instantly see the total number of full weeks and any remaining days presented in a clear, high-fidelity result card. It also provides the total count of absolute days for comprehensive tracking. This streamlined process eliminates the need for manual tallying and ensures precision for any planning or scheduling task."
                whyUse="Using an online Weeks Between Dates calculator is the most efficient way to manage long-term projects, travel plans, or pregnancy milestones with total accuracy. Instead of flipping through a physical calendar, this digital tool removes human error and provides instant results across any mobile or desktop device. The 'elite' interface is designed for maximum clarity, featuring glassmorphic designs and responsive feedback that make timeline tracking feel professional and premium. Whether you're calculating your next vacation's length or monitoring a business project's runway, this tool delivers the stable and reliable performance you need for modern time management."
            />
        </div>
    );
}
