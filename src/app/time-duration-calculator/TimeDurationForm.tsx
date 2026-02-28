'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function TimeDurationForm() {
    const calc = calculators.find(c => c.href === '/time-duration-calculator');
    const [hours1, setHours1] = useState('');
    const [minutes1, setMinutes1] = useState('');
    const [seconds1, setSeconds1] = useState('');
    const [hours2, setHours2] = useState('');
    const [minutes2, setMinutes2] = useState('');
    const [seconds2, setSeconds2] = useState('');
    const [operation, setOperation] = useState<'add' | 'subtract'>('add');

    const calculateTime = () => {
        const h1 = parseInt(hours1 || '0');
        const m1 = parseInt(minutes1 || '0');
        const s1 = parseInt(seconds1 || '0');
        const h2 = parseInt(hours2 || '0');
        const m2 = parseInt(minutes2 || '0');
        const s2 = parseInt(seconds2 || '0');

        const totalSeconds1 = h1 * 3600 + m1 * 60 + s1;
        const totalSeconds2 = h2 * 3600 + m2 * 60 + s2;

        let resultSeconds = 0;
        if (operation === 'add') {
            resultSeconds = totalSeconds1 + totalSeconds2;
        } else {
            resultSeconds = Math.max(0, totalSeconds1 - totalSeconds2);
        }

        const h = Math.floor(resultSeconds / 3600);
        const m = Math.floor((resultSeconds % 3600) / 60);
        const s = resultSeconds % 60;

        return {
            h, m, s,
            formatted: `${h}h ${m}m ${s}s`
        };
    };

    const res = calculateTime();

    const faqs = [
        {
            question: "Can I add more than 60 minutes?",
            answer: "Yes, the tool automatically rolls over seconds into minutes and minutes into hours. For example, 70 minutes will be calculated as 1 hour and 10 minutes."
        },
        {
            question: "What happens if I subtract a larger time from a smaller one?",
            answer: "The tool currently floors the result at 0 hours, 0 minutes, and 0 seconds, as negative time duration is not supported in this basic mode."
        }
    ];

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        fontSize: '1rem'
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Time Duration Calculator'}
                description={calc?.description || 'Add or subtract time values in hours, minutes, and seconds.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    {/* Time 1 */}
                    <div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>First Time Value</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                            <input type="number" placeholder="HH" value={hours1} onChange={(e) => setHours1(e.target.value)} style={inputStyle} />
                            <input type="number" placeholder="MM" value={minutes1} onChange={(e) => setMinutes1(e.target.value)} style={inputStyle} />
                            <input type="number" placeholder="SS" value={seconds1} onChange={(e) => setSeconds1(e.target.value)} style={inputStyle} />
                        </div>
                    </div>

                    {/* Operation */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <button
                            onClick={() => setOperation('add')}
                            style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '2rem',
                                border: operation === 'add' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                backgroundColor: operation === 'add' ? 'var(--color-primary-transparent)' : 'transparent',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            + Add
                        </button>
                        <button
                            onClick={() => setOperation('subtract')}
                            style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '2rem',
                                border: operation === 'subtract' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                backgroundColor: operation === 'subtract' ? 'var(--color-primary-transparent)' : 'transparent',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            - Subtract
                        </button>
                    </div>

                    {/* Time 2 */}
                    <div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Second Time Value</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                            <input type="number" placeholder="HH" value={hours2} onChange={(e) => setHours2(e.target.value)} style={inputStyle} />
                            <input type="number" placeholder="MM" value={minutes2} onChange={(e) => setMinutes2(e.target.value)} style={inputStyle} />
                            <input type="number" placeholder="SS" value={seconds2} onChange={(e) => setSeconds2(e.target.value)} style={inputStyle} />
                        </div>
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem' }}>
                            <ResultCard
                                title="Resulting Duration"
                                value={res.formatted}
                                color="primary"
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Time Duration Calculator"
                howToUse="To add or subtract time, first enter the hours, minutes, and seconds for your initial duration into the 'First Time Value' fields. Then, select either the '+ Add' or '- Subtract' operation and enter your second duration into the corresponding fields. The tool instantly processes the math and provides a clean, formatted result in a high-contrast card. It automatically handles 'overflow'—for example, converting 70 minutes into 1 hour and 10 minutes—ensuring your final duration is always logically sound. This frictionless process is perfect for totaling work hours, video durations, or athletic splits with absolute precision."
                whyUse="Our Time Duration Calculator is a professional-grade utility designed to handle the complexities of sexagesimal (base-60) arithmetic without the need for manual conversions. Instead of struggling with mental math or calculator errors, this tool provides a stable and reliable way to manage time logs and productivity targets in seconds. The 'elite' user interface features a responsive, mobile-first design with clear input zones and interactive buttons that make even complex time subtraction feel effortless. It is an essential resource for freelancers tracking billable hours, editors managing clip lengths, and athletes monitoring training sessions. By using this digital assistant, you guarantee total accuracy for any time-based task while enjoying a premium, modern user experience."
            />
        </div>
    );
}
