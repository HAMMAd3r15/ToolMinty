'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import DateInput from '@/components/UI/DateInput';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function HalfBirthdayCalculator() {
    const [birthDate, setBirthDate] = useState<string>('');

    const calculateHalfBirthday = () => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        if (isNaN(birth.getTime())) return null;

        const half = new Date(birth);
        half.setMonth(half.getMonth() + 6);

        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };

        const now = new Date();
        const nextHalf = new Date(half);
        nextHalf.setFullYear(now.getFullYear());

        if (nextHalf < now) {
            nextHalf.setFullYear(now.getFullYear() + 1);
        }

        const diffTime = nextHalf.getTime() - now.getTime();
        const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            date: half.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
            nextHalfDate: nextHalf.toLocaleDateString(undefined, options),
            daysUntil
        };
    };

    const res = calculateHalfBirthday();

    const faqs = [
        {
            question: "What is a half birthday?",
            answer: "A half birthday is an event that occurs six months before or after a person's birthday."
        },
        {
            question: "How is it calculated?",
            answer: "We simply add six months to your birth date. If your birthday is on the 31st and the 6th month later has fewer days, the date is adjusted accordingly by the browser's date system."
        },
        {
            question: "Why celebrate a half birthday?",
            answer: "It's a popular way for children (or the young at heart) to celebrate if their actual birthday falls on a holiday or during a less convenient season."
        }
    ];

    const calc = calculators.find(c => c.href === '/half-birthday');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Half Birthday Calculator'}
                description={calc?.description || 'Determine your half birthday date and see how many days are left until your next one.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <DateInput
                        label="Date of Birth"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />

                    {res && (
                        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <ResultCard
                                title="Your Half Birthday is"
                                value={res.date}
                                subtitle={`Every year on this date.`}
                                color="secondary"
                                highlight={true}
                            />
                            <ResultCard
                                title="Next Occurrence"
                                value={res.nextHalfDate}
                                subtitle={`${res.daysUntil} days to go!`}
                                color="accent"
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Half Birthday Calculator"
                howToUse="To find your semi-annual celebration date, enter your 'Date of Birth' into the input field above. The tool instantly calculates the exact day six months after your birthday and provides a live countdown to the next occurrence. Results are displayed in premium, high-fidelity cards that show both the recurring date and the specific upcoming milestone date. It's a fast and interactive way to plan a 'half-way' party or just enjoy a fun fact about your calendar. The automated process ensures your results are perfectly accurate and generated in real-time."
                whyUse="Using our Half Birthday Calculator is a delightful and reliable way to sprinkle an extra celebration into your year without any manual date math. While most people know their 6-month offset roughly, our tool provides the absolute calendar match that correctly handles month-length differences and leap year cycles. The 'elite' design features glassmorphic cards and optimized typography that make the experience feel professional and premium on any device. It is a completely free, cross-platform resource that respects your privacy by processing all information locally. Whether you're planning a party for a child or just want to treat yourself to a secondary milestone, this tool delivers the clarity and stable performance you need."
            />
        </div>
    );
}
