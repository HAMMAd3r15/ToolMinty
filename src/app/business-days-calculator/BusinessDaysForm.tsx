'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import DateInput from '@/components/UI/DateInput';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function BusinessDaysForm() {
    const calc = calculators.find(c => c.href === '/business-days-calculator');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const calculateBusinessDays = () => {
        if (!startDate || !endDate) return null;
        let start = new Date(startDate);
        let end = new Date(endDate);

        // Ensure start is before end for calculation
        const isReversed = start > end;
        if (isReversed) {
            [start, end] = [end, start];
        }

        let count = 0;
        let curDate = new Date(start);
        curDate.setHours(0, 0, 0, 0);
        const targetDate = new Date(end);
        targetDate.setHours(0, 0, 0, 0);

        while (curDate <= targetDate) {
            const dayOfWeek = curDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
                count++;
            }
            curDate.setDate(curDate.getDate() + 1);
        }

        return {
            count,
            totalDays: Math.floor((targetDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
        };
    };

    const res = calculateBusinessDays();

    const faqs = [
        {
            question: "Which days are excluded?",
            answer: "This calculator excludes Saturdays and Sundays. It does not automatically exclude public holidays, as these vary by region."
        },
        {
            question: "Is the end date included?",
            answer: "Yes, this tool includes both the start and end dates in its calculation if they are business days."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Business Days Calculator'}
                description={calc?.description || 'Calculate working days between two dates by automatically excluding weekends.'}
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
                            title="Business Days"
                            value={`${res.count} Days`}
                            subtitle={`Out of ${res.totalDays} total calendar days`}
                            color="primary"
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Business Days Calculator"
                howToUse="To calculate the working days between two dates, enter your 'Start Date' and 'End Date' into the provided calendar inputs. The tool will automatically exclude weekends (Saturdays and Sundays) and display the net business day count in a clear result card. You can also see the total number of calendar days for comparison. This automated process ensures you get an accurate count for project planning or payroll without manual tallying. It's a quick and efficient way to stay on top of professional deadlines and schedules."
                whyUse="Our Business Days Calculator provides a precise and time-saving way to manage professional timelines and project runways. By automatically filtering out non-working days, it removes the complexity of manual counting and helps prevent scheduling errors that can delay importantes tasks. The 'elite' user interface is optimized for speed and clarity, featuring a stable design that works perfectly across all mobile and desktop devices. Whether you're a project manager tracking milestones or a freelancer calculating delivery dates, this tool delivers the reliability and professional performance required for modern business environments."
            />
        </div>
    );
}
