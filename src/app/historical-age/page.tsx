'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function HistoricalAgeCalculator() {
    const [birthYear, setBirthYear] = useState<string>('');
    const [eventYear, setEventYear] = useState<string>('');

    const calculateHistoricalAge = () => {
        const birth = parseInt(birthYear);
        const event = parseInt(eventYear);

        if (isNaN(birth) || isNaN(event)) return null;

        const ageAtEvent = event - birth;

        return {
            ageAtEvent,
            status: ageAtEvent < 0 ? 'Not yet born' : `${ageAtEvent} years old`
        };
    };

    const res = calculateHistoricalAge();

    const faqs = [
        {
            question: "Why use years instead of full dates?",
            answer: "For historical events, often only the year is precisely known. This provides a quick way to relate historical timelines to personal or familial age."
        },
        {
            question: "What if the event year is before the birth year?",
            answer: "The calculator will correctly show that the person was 'not yet born' at the time of the event."
        },
        {
            question: "Can I use this for historical figures?",
            answer: "Absolutely! You can enter the birth year of a famous person and the year of a major event to see how old they were during that time."
        }
    ];

    const calc = calculators.find(c => c.href === '/historical-age');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Historical Event Age'}
                description={calc?.description || 'Find out how old you (or anyone else) would have been during significant years in history.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Birth Year
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={birthYear}
                                onChange={(e) => setBirthYear(e.target.value)}
                                placeholder="e.g. 1990"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Historical Event Year
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={eventYear}
                                onChange={(e) => setEventYear(e.target.value)}
                                placeholder="e.g. 2010"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem' }}>
                            <ResultCard
                                title={`In the year ${eventYear}`}
                                value={res.status}
                                subtitle={res.ageAtEvent >= 0 ? `Calculated from birth year ${birthYear}.` : `Event occurred ${Math.abs(res.ageAtEvent)} years before birth.`}
                                color="secondary"
                                highlight={true}
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Historical Event Age Calculator"
                howToUse="To explore your place in history, start by entering your 'Birth Year' and then specify the 'Historical Event Year' you wish to analyze. The tool instantly calculates the age difference and displays your status for that specific year—whether you were a toddler, a teenager, or not yet born—in a premium result card. You can easily test multiple years to see how old you were during major global milestones, personal family events, or scientific breakthroughs. This streamlined process offers a fascinating way to contextualize your life timeline against the backdrop of history."
                whyUse="Our Historical Event Age Calculator provides a fast and engaging way to relate personal lives to the broader historical timeline without manual subtraction. While it seems like a simple subtraction, having a dedicated 'elite' interface makes it effortless to browse different years and visualize age-related contexts instantly. The design features glassmorphic elements and high-fidelity typography that look stunning on any device, turning a basic utility into a premium exploration tool. It is completely free and private, ensuring your personal birth year remains locally on your device. Whether you're a history buff, a student, or just curious about your family's past, this tool delivers the stable and insightful performance you need."
            />
        </div>
    );
}
