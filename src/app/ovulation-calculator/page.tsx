'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import DateInput from '@/components/UI/DateInput';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function OvulationCalculator() {
    const [lmpDate, setLmpDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [cycleLength, setCycleLength] = useState<string>('28');

    const calculateOvulation = () => {
        if (!lmpDate) return null;

        const date = new Date(lmpDate);
        const cycle = parseInt(cycleLength);
        if (isNaN(date.getTime()) || isNaN(cycle)) return null;

        // Next period = LMP + cycle length
        const nextPeriod = new Date(date);
        nextPeriod.setDate(nextPeriod.getDate() + cycle);

        // Ovulation = Next Period - 14 days
        const ovulationDate = new Date(nextPeriod);
        ovulationDate.setDate(ovulationDate.getDate() - 14);

        // Fertile window = Ovulation - 5 days to Ovulation + 1 day
        const windowStart = new Date(ovulationDate);
        windowStart.setDate(windowStart.getDate() - 5);
        const windowEnd = new Date(ovulationDate);
        windowEnd.setDate(windowEnd.getDate() + 1);

        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

        return {
            ovulation: ovulationDate.toLocaleDateString(undefined, options),
            fertileWindow: `${windowStart.toLocaleDateString(undefined, options)} - ${windowEnd.toLocaleDateString(undefined, options)}`,
            nextPeriod: nextPeriod.toLocaleDateString(undefined, options)
        };
    };

    const res = calculateOvulation();

    const faqs = [
        {
            question: "When is the most fertile time in a cycle?",
            answer: "The most fertile window is typically the five days leading up to and including the day of ovulation. Having sex during this time increases the chances of conception."
        },
        {
            question: "How long does ovulation last?",
            answer: "An egg is usually viable for about 12 to 24 hours after it's released from the ovary. However, sperm can live inside the female body for up to 5 days."
        },
        {
            question: "Is this accurate if my cycles are irregular?",
            answer: "This calculator assumes a regular cycle. If your cycles vary significantly in length, tracking other signs like cervical mucus or basal body temperature may be more accurate."
        }
    ];

    const calc = calculators.find(c => c.href === '/ovulation-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Ovulation Calculator'}
                description={calc?.description || 'Track your menstrual cycle and estimate your most fertile window to help plan your pregnancy.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <DateInput
                        label="First Day of Last Period"
                        value={lmpDate}
                        onChange={(e) => setLmpDate(e.target.value)}
                    />

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, textAlign: 'center' }}>
                            Average Cycle Length (Days)
                        </label>
                        <input
                            type="number"
                            className="input"
                            value={cycleLength}
                            onChange={(e) => setCycleLength(e.target.value)}
                            style={{ width: '100%', maxWidth: '320px', margin: '0 auto', display: 'block', textAlign: 'center' }}
                            min="20"
                            max="45"
                        />
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Next Ovulation Date"
                                value={res.ovulation}
                                subtitle="Estimated peak fertility day"
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                <ResultCard
                                    title="Fertile Window"
                                    value={res.fertileWindow}
                                    subtitle="Best days to conceive"
                                    color="secondary"
                                />
                                <ResultCard
                                    title="Next Period Starts"
                                    value={res.nextPeriod}
                                    color="accent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Ovulation Calculator"
                howToUse="To estimate your fertile window, enter the first day of your last period and your average cycle length (typically 28 days). The tool instantly calculates your next ovulation date, your peak fertile window, and your next expected period. Results are displayed in high-fidelity cards that highlight the most critical dates for planning, providing a professional and stable roadmap for your reproductive health."
                whyUse="Our Ovulation Calculator is an 'elite' wellness utility designed for absolute precision and ease of use in family planning. By using standard physiological algorithms, it provides a reliable and stable estimate of your cycle, helping you identify your most fertile days with confidence. The high-fidelity interface features glassmorphism and color-coded results that make tracking your health feel premium and modern. It is a completely free, privacy-focused resource that ensures your personal health data remains entirely secure within your browser."
            />
        </div>
    );
}
