'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function HealthyWeightRangeForm() {
    const calc = calculators.find(c => c.href === '/healthy-weight-range');
    const [height, setHeight] = useState('');
    const [unit, setUnit] = useState<'cm' | 'in'>('cm');

    const calculateHealthyRange = () => {
        const h = parseFloat(height);
        if (isNaN(h) || h <= 0) return null;

        let heightInMeters = unit === 'cm' ? h / 100 : h * 0.0254;

        // BMI range for healthy is 18.5 to 24.9
        const minWeight = 18.5 * (heightInMeters * heightInMeters);
        const maxWeight = 24.9 * (heightInMeters * heightInMeters);

        const formatWeight = (w: number) => {
            if (unit === 'cm') {
                return `${w.toFixed(1)} kg`;
            } else {
                return `${(w * 2.20462).toFixed(1)} lbs`;
            }
        };

        return {
            range: `${formatWeight(minWeight)} - ${formatWeight(maxWeight)}`,
            minWeight: formatWeight(minWeight),
            maxWeight: formatWeight(maxWeight)
        };
    };

    const res = calculateHealthyRange();

    const faqs = [
        {
            question: "How is the healthy weight range determined?",
            answer: "The range is based on the World Health Organization's BMI (Body Mass Index) standards, where a BMI between 18.5 and 24.9 is considered 'healthy' for most adults."
        },
        {
            question: "Does this apply to everyone?",
            answer: "BMI ranges are general guidelines. They may not be accurate for athletes with high muscle mass, pregnant women, or the elderly. Consult with a healthcare provider for personalized advice."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Healthy Weight Range'}
                description={calc?.description || 'Find your clinically recommended healthy weight range according to BMI standards.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '2rem', alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Your Height</label>
                        <input
                            type="number"
                            className="input"
                            placeholder={unit === 'cm' ? 'e.g. 175' : 'e.g. 69'}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <select
                        className="input"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as any)}
                        style={{ height: '3.5rem', padding: '0 1rem' }}
                    >
                        <option value="cm">cm</option>
                        <option value="in">in</option>
                    </select>
                </div>

                {res && (
                    <div style={{ textAlign: 'center' }}>
                        <ResultCard
                            title="Healthy Weight Range"
                            value={res.range}
                            subtitle={`For a height of ${height}${unit}`}
                            color="success"
                            highlight
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Healthy Weight Range"
                howToUse="To find your clinically recommended weight range, enter your height into the input field and select your preferred unit (cm or in). The tool instantly calculates the healthy weight boundaries based on World Health Organization (WHO) BMI standards. Results are displayed in a high-fidelity 'success' card that highlights the range for your specific height, providing a professional and stable baseline for your wellness journey."
                whyUse="Our Healthy Weight Range calculator is a premium health utility designed to provide a clear, data-driven perspective on body composition targets. Unlike basic charts, it offers a personalized range that is both stable and reliable, helping you set realistic fitness goals. The 'elite' design features glassmorphic panels and responsive input fields that make health tracking feel sophisticated and modern. It is a completely free, privacy-focused resource that ensures your personal biometric data is never stored, giving you total peace of mind."
            />
        </div>
    );
}
