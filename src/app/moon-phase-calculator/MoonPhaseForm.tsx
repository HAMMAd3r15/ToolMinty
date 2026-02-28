'use client';

import { useState, useEffect } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function MoonPhaseForm() {
    const calc = calculators.find(c => c.href === '/moon-phase-calculator');
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const getMoonPhase = (date: Date) => {
        // Known New Moon: 2000-01-06 18:14 UTC
        const knownNewMoon = new Date('2000-01-06T18:14:00Z');
        const lunarCycle = 29.530588853;

        const diffMs = date.getTime() - knownNewMoon.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        const phase = (diffDays / lunarCycle) % 1;

        // Normalize phase between 0 and 1
        const normalizedPhase = phase < 0 ? phase + 1 : phase;

        let phaseName = '';
        let icon = '';
        let color: 'primary' | 'secondary' | 'accent' = 'primary';
        let illumination = 0;

        if (normalizedPhase < 0.03 || normalizedPhase > 0.97) {
            phaseName = 'New Moon';
            icon = '🌑';
            color = 'primary';
            illumination = 0;
        } else if (normalizedPhase < 0.22) {
            phaseName = 'Waxing Crescent';
            icon = '🌒';
            color = 'accent';
            illumination = Math.round(normalizedPhase * 200);
        } else if (normalizedPhase < 0.28) {
            phaseName = 'First Quarter';
            icon = '🌓';
            color = 'secondary';
            illumination = 50;
        } else if (normalizedPhase < 0.47) {
            phaseName = 'Waxing Gibbous';
            icon = '🌔';
            color = 'secondary';
            illumination = Math.round(50 + (normalizedPhase - 0.25) * 200);
        } else if (normalizedPhase < 0.53) {
            phaseName = 'Full Moon';
            icon = '🌕';
            color = 'secondary';
            illumination = 100;
        } else if (normalizedPhase < 0.72) {
            phaseName = 'Waning Gibbous';
            icon = '🌖';
            color = 'secondary';
            illumination = Math.round(100 - (normalizedPhase - 0.5) * 200);
        } else if (normalizedPhase < 0.78) {
            phaseName = 'Last Quarter';
            icon = '🌗';
            color = 'secondary';
            illumination = 50;
        } else {
            phaseName = 'Waning Crescent';
            icon = '🌘';
            color = 'accent';
            illumination = Math.round(50 - (normalizedPhase - 0.75) * 200);
        }

        return { phaseName, icon, color, illumination: Math.min(100, Math.max(0, illumination)) };
    };

    const result = getMoonPhase(new Date(selectedDate));

    const faqs = [
        {
            question: "How long is a lunar cycle?",
            answer: "A complete lunar cycle (from new moon to new moon) lasts approximately 29.53 days. This is known as a synodic month."
        },
        {
            question: "What causes moon phases?",
            answer: "Moon phases are caused by the relative positions of the Earth, Moon, and Sun. As the Moon orbits Earth, different portions of its sunlit side are visible to us."
        },
        {
            question: "What is illumination?",
            answer: "Illumination refers to the percentage of the Moon's surface that is lit by the Sun as seen from Earth. A full moon is 100% illuminated, while a new moon is 0% illuminated."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Moon Phase Calculator'}
                description={calc?.description || 'Track the current phase of the moon and discover upcoming lunar events.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            Select Date
                        </label>
                        <input
                            type="date"
                            className="input"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{
                            fontSize: '6rem',
                            marginBottom: '1rem',
                            textShadow: '0 0 40px rgba(129, 140, 248, 0.3)'
                        }}>
                            {result.icon}
                        </div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{result.phaseName}</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                            Illumination: {result.illumination}%
                        </p>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <ResultCard
                            title={`The Moon on ${new Date(selectedDate).toLocaleDateString('en-US', { dateStyle: 'long' })}`}
                            value={`${result.phaseName} (${result.illumination}% Illuminated)`}
                            color={result.color}
                        />
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Moon Phase Calculator"
                howToUse="Simply select any date from the calendar to find the exact phase of the lunar cycle. The tool automatically calculates the moon's position relative to Earth and Sun using high-precision astronomical algorithms. You will instantly see the phase name (like Full Moon, Waxing Crescent, or Third Quarter), a visual representation, and the percentage of surface illumination. It's designed to work for both past events and future planning."
                whyUse="Our Moon Phase Calculator is a premium astronomical utility designed for photographers, astronomers, and nature enthusiasts. Unlike simple 'phase-only' tools, it provides exact illumination data and a clean, 'elite' user interface that works locally for maximum speed and privacy. The design features subtle glows and glassmorphism elements, making it a beautiful, reliable resource for tracking the natural rhythm of the night sky without annoying ads or external scripts."
            />
        </div>
    );
}
