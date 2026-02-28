'use client';

import { useState, useEffect, useMemo } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';
import ResultCard from '@/components/UI/ResultCard';

export default function EpochConverterForm() {
    const calc = calculators.find(c => c.href === '/epoch-converter');
    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));
    const [epochInput, setEpochInput] = useState(Math.floor(Date.now() / 1000).toString());
    const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(Math.floor(Date.now() / 1000)), 1000);
        return () => clearInterval(timer);
    }, []);

    const epochToDate = useMemo(() => {
        try {
            const val = parseInt(epochInput);
            if (isNaN(val)) throw new Error();
            // Handle both seconds and milliseconds
            const d = new Date(val > 9999999999 ? val : val * 1000);
            return d.toUTCString();
        } catch {
            return 'Invalid Epoch';
        }
    }, [epochInput]);

    const dateToEpoch = useMemo(() => {
        try {
            const d = new Date(dateInput);
            if (isNaN(d.getTime())) throw new Error();
            return Math.floor(d.getTime() / 1000);
        } catch {
            return null;
        }
    }, [dateInput]);

    const faqs = [
        {
            question: "What is a Unix Epoch?",
            answer: "The Unix Epoch is the number of seconds that have elapsed since January 1, 1970 (UTC), not counting leap seconds. It is the standard time format for Unix systems and many modern APIs."
        },
        {
            question: "Does this support milliseconds?",
            answer: "Yes, our converter automatically detects if an epoch is in seconds (10 digits) or milliseconds (13 digits) and provides the correct human-readable date."
        },
        {
            question: "Is the time in UTC or Local?",
            answer: "We display the converted date in Coordinated Universal Time (UTC) to ensure consistency across different time zones and server applications."
        }
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Epoch Converter'}
                description={calc?.description || 'Convert Unix timestamps to human-readable dates and vice-versa in real-time.'}
            />

            <div className="card-elite" style={{ marginBottom: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))' }}>
                <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.6, marginBottom: '0.5rem' }}>Current Unix Epoch</div>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'monospace' }}>{currentTime}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.5 }}>Seconds since 1970-01-01</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card-elite">
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.6 }}>Epoch to Date</h3>
                    <input
                        className="input-elite"
                        value={epochInput}
                        onChange={(e) => setEpochInput(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="Enter Unix Timestamp..."
                        style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}
                    />
                    <div className="result-display">
                        <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem' }}>Human Readable (UTC)</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{epochToDate}</div>
                    </div>
                </div>

                <div className="card-elite">
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.6 }}>Date to Epoch</h3>
                    <input
                        type="datetime-local"
                        className="input-elite"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        style={{ fontSize: '1.1rem', marginBottom: '1.5rem', colorScheme: 'dark' }}
                    />
                    <div className="result-display">
                        <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem' }}>Unix Timestamp</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'monospace' }}>{dateToEpoch || '---'}</div>
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="High-Precision Epoch Converter"
                howToUse="To decode a system timestamp, paste your numeric string into the 'Epoch to Date' input. The tool supports both 10-digit (seconds) and 13-digit (milliseconds) formats, rendering a UTC timestamp instantly. To generate a new epoch, use the datetime selector to pick a specific moment in time. The corresponding integer value is calculated in real-time, providing immediate data for software development, database queries, and system logging."
                whyUse="Our Epoch Converter is an elite backend utility designed for software engineers and systems architects who require absolute temporal precision. By utilizing local system time and high-resolution date parsing in your browser, it eliminates the latency and security risks of external API calls. The premium glassmorphic interface features a real-time running clock and high-contrast typography, making complex time-zone management and debugging feel sophisticated and effortless. It is a completely free, privacy-first resource built for the modern DevOps workflow."
            />

            <style jsx>{`
                .card-elite {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 2rem;
                }
                .input-elite {
                    width: 100%;
                    padding: 1rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: #fff;
                    outline: none;
                }
                .result-display {
                    padding: 1.2rem;
                    background: rgba(var(--color-primary-rgb), 0.05);
                    border: 1px solid rgba(var(--color-primary-rgb), 0.2);
                    border-radius: 16px;
                }
            `}</style>
        </div>
    );
}
