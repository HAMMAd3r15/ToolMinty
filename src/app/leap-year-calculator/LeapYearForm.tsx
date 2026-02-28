'use client';

import { useState } from 'react';
import THeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function LeapYearForm() {
    const calc = calculators.find(c => c.href === '/leap-year-calculator');
    const [year, setYear] = useState('');

    const checkLeapYear = () => {
        const y = parseInt(year);
        if (isNaN(y)) return null;

        const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
        return isLeap;
    };

    const res = checkLeapYear();

    const faqs = [
        {
            question: "What are the leap year rules?",
            answer: "A year is a leap year if it is divisible by 4. However, if it is divisible by 100, it must also be divisible by 400 to be a leap year. This is why 2000 was a leap year, but 1900 was not."
        },
        {
            question: "Why do we have leap years?",
            answer: "Leap years help coordinate our 365-day calendar with the Earth's orbit around the sun, which takes approximately 365.24 days."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <THeader
                title={calc?.title || 'Leap Year Checker'}
                description={calc?.description || 'Instantly check whether a specific year is a leap year using standard calendar rules.'}
            />

            <div className="card" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>Enter Year</label>
                    <input
                        type="number"
                        className="input"
                        placeholder="e.g. 2024"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{ width: '100%', textAlign: 'center', fontSize: '1.2rem' }}
                    />
                </div>

                {res !== null && (
                    <div style={{ marginTop: '2rem' }}>
                        <ResultCard
                            title={`Year ${year}`}
                            value={res ? 'Leap Year! ✅' : 'Normal Year ❌'}
                            subtitle={res ? 'This year has 366 days.' : 'This year has 365 days.'}
                            color={res ? 'secondary' : 'primary'}
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Leap Year Checker"
                howToUse="To check any specific year, simply enter the four-digit year (e.g., 2024 or 2000) into the input box and watch as the result updates instantly. The tool uses standard astronomical rules to determine if the year contains 365 or 366 days, presenting the answer in a high-fidelity result card. It's a binary check that provides absolute certainty in a matter of seconds. You can test historical years or future dates to plan your calendar with total precision. This simple process makes it an essential utility for anyone curious about timekeeping rules."
                whyUse="An online Leap Year Checker is a reliable and fast resource for understanding the complexities of our Gregorian calendar without needing to memorize complicated mathematical rules. While most people know that leap years occur every four years, our tool also accounts for the specific century rules that determine true leap years, ensuring 100% accuracy for any date you check. The 'elite' design features a clean, focused interface with responsive feedback that makes even a simple check feel like a premium experience. It is a completely free and accessible tool for students, researchers, or anyone tracking long-term time durations. By using this digital assistant, you ensure your scheduling and historical calculations are always stable and correct."
            />
        </div>
    );
}
