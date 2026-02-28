'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function HeartRateCalculator() {
    const [age, setAge] = useState<string>('');

    const calculateZones = () => {
        const a = parseInt(age);
        if (isNaN(a) || a <= 0 || a > 120) return null;

        const maxHR = 220 - a;
        return {
            max: maxHR,
            fatBurn: { min: Math.round(maxHR * 0.50), max: Math.round(maxHR * 0.70) },
            cardio: { min: Math.round(maxHR * 0.70), max: Math.round(maxHR * 0.85) },
            peak: { min: Math.round(maxHR * 0.85), max: maxHR }
        };
    };

    const zones = calculateZones();

    const faqs = [
        {
            question: "What is Max HR?",
            answer: "Target Maximum Heart Rate (Max HR) is the highest number of times your heart can safely beat in one minute during exercise. A common formula is 220 minus your age."
        },
        {
            question: "What are heart rate zones?",
            answer: "Zones are ranges of heart intensity. Fat Burn (50-70%) is great for endurance, Cardio (70-85%) improves fitness, and Peak (85%+) is for maximum performance."
        }
    ];

    const calc = calculators.find(c => c.href === '/heart-rate-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Target Heart Rate Calculator'}
                description={calc?.description || 'Determine your optimal heart rate zones for different types of exercise and intensity.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ maxWidth: '300px', margin: '0 auto', width: '100%' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, textAlign: 'center' }}>
                            Your Age
                        </label>
                        <input
                            type="number"
                            className="input"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g. 25"
                            style={{ textAlign: 'center' }}
                        />
                    </div>

                    {zones && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Max Heart Rate" value={`${zones.max} BPM`} color="primary" highlight />
                            <ResultCard title="Fat Burn (50-70%)" value={`${zones.fatBurn.min}-${zones.fatBurn.max} BPM`} color="secondary" />
                            <ResultCard title="Cardio (70-85%)" value={`${zones.cardio.min}-${zones.cardio.max} BPM`} color="accent" />
                            <ResultCard title="Peak (85%+)" value={`${zones.peak.min}-${zones.peak.max} BPM`} color="success" />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Target Heart Rate Calculator"
                howToUse="To find your optimal training zones, enter your age into the input field. The tool instantly calculates your Maximum Heart Rate (Max HR) and provides specific BPM ranges for Fat Burn, Cardio, and Peak intensity levels. Each zone is displayed in a color-coded result card, allowing you to quickly identify your target beats per minute for any workout style. This automated process provides a professional-grade baseline for heart-rate based training in seconds."
                whyUse="Our Target Heart Rate Calculator is an 'elite' fitness utility that brings precision to your cardio sessions. By using established physiological formulas, it provides a stable and reliable guide for managing workout intensity and safety. The high-fidelity interface features responsive design elements and glassmorphism that make health tracking feel premium and modern. It is a free, privacy-focused resource that ensures your personal data is processed safeley in your browser, giving you the professional edge needed to maximize your athletic performance."
            />
        </div>
    );
}
