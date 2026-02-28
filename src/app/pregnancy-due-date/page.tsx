'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import DateInput from '@/components/UI/DateInput';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function PregnancyDueDateCalculator() {
    const [lmpDate, setLmpDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const calculateDueDate = () => {
        if (!lmpDate) return null;

        const date = new Date(lmpDate);
        if (isNaN(date.getTime())) return null;

        // Naegele's rule is common (LMP + 7 days - 3 months + 1 year)
        // Simple version: LMP + 280 days
        const dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 280);

        const today = new Date();
        const diffTime = Math.abs(today.getTime() - date.getTime());
        const weeksPregnant = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return {
            dueDate: dueDate.toLocaleDateString(undefined, options),
            weeks: weeksPregnant,
            daysLeft: Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
            zodiac: getZodiac(dueDate)
        };
    };

    const getZodiac = (date: Date) => {
        const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
        const signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
        let month = date.getMonth();
        let day = date.getDate();
        if (month === 0 && day <= 20) return signs[0];
        if (day < days[month]) return signs[month];
        return signs[(month + 1) % 12];
    };

    const res = calculateDueDate();

    const faqs = [
        {
            question: "How accurate is the due date?",
            answer: "Only about 4% of babies are born on their exact due date. Most babies arrive between 37 and 42 weeks of pregnancy."
        },
        {
            question: "What if I don't know my LMP?",
            answer: "If you're unsure of your last menstrual period, an ultrasound (usually performed in the first trimester) is the most accurate way for a doctor to estimate your due date."
        },
        {
            question: "How many weeks is a full-term pregnancy?",
            answer: "A pregnancy is considered 'full term' at 39 weeks. Delivery between 37 weeks and 38 weeks 6 days is 'early term'."
        }
    ];

    const calc = calculators.find(c => c.href === '/pregnancy-due-date');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Pregnancy Due Date Calculator'}
                description={calc?.description || 'Estimate your expected delivery date and track how far along you are in your journey.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <DateInput
                        label="First Day of Last Period (LMP)"
                        value={lmpDate}
                        onChange={(e) => setLmpDate(e.target.value)}
                    />

                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                            <ResultCard
                                title="Estimated Due Date"
                                value={res.dueDate}
                                subtitle={res.daysLeft > 0 ? `${res.daysLeft} days remaining` : 'Your baby is due!'}
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <ResultCard
                                    title="Current Progress"
                                    value={`~${res.weeks} Weeks`}
                                    subtitle="Approximate pregnancy week"
                                    color="secondary"
                                />
                                <ResultCard
                                    title="Baby's Likely Zodiac"
                                    value={res.zodiac}
                                    color="accent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Pregnancy Due Date Calculator"
                howToUse="To estimate your baby's arrival date, enter the first day of your last menstrual period (LMP). The tool instantly calculates your estimated due date, your current progress in weeks, and even your baby's likely zodiac sign. Results are displayed in premium result cards that highlight your journey's timeline with absolute clarity. This automated process provides a stable and reliable baseline for your pregnancy planning, helping you visualize your milestones at a glance."
                whyUse="Our Pregnancy Due Date Calculator is a compassionate and professional utility designed to provide clarity during one of life's most important journeys. By leveraging Naegele's rule and standard gestational timelines, it offers a reliable and stable estimate that helps you prepare with confidence. The 'elite' design features glassmorphic panels and high-fidelity typography that make tracking your progress feel sophisticated and inspiring. It is a completely free, privacy-focused resource where all your personal dates stay locally in your browser, ensuring your journey remains secure."
            />
        </div>
    );
}
