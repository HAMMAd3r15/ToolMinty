'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function WaistHeightRatioForm() {
    const calc = calculators.find(c => c.href === '/waist-to-height-ratio');
    const [waist, setWaist] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');

    const calculateRatio = () => {
        const w = parseFloat(waist);
        const h = parseFloat(height);

        if (isNaN(w) || isNaN(h) || h <= 0) return null;

        const ratio = w / h;
        let healthZone = '';
        let color: 'success' | 'primary' | 'secondary' | 'accent' = 'success';

        if (ratio < 0.4) {
            healthZone = 'Underweight risk';
            color = 'accent';
        } else if (ratio <= 0.5) {
            healthZone = 'Healthy';
            color = 'success';
        } else if (ratio <= 0.6) {
            healthZone = 'Overweight risk';
            color = 'primary';
        } else {
            healthZone = 'Health risk (Obese)';
            color = 'secondary';
        }

        return {
            ratio: ratio.toFixed(2),
            zone: healthZone,
            color
        };
    };

    const res = calculateRatio();

    const faqs = [
        {
            question: "Why use Waist-to-Height Ratio anyway?",
            answer: "Research suggests that WHtR is a better predictor of heart disease, diabetes, and cardiovascular risk than BMI because it focuses on central obesity (abdominal fat)."
        },
        {
            question: "How should I measure my waist?",
            answer: "Measure at the midpoint between the lower margin of the last palpable rib and the top of the iliac crest (hip bone). Usually, this is just above the belly button."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Waist-to-Height Ratio'}
                description={calc?.description || 'Measure your health risk based on body proportions with this simple metric.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Waist (cm/in)</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 80"
                            value={waist}
                            onChange={(e) => setWaist(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Height (cm/in)</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 180"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {res && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <ResultCard
                            title="Measured Ratio"
                            value={res.ratio}
                            color="primary"
                        />
                        <ResultCard
                            title="Health Category"
                            value={res.zone}
                            color={res.color}
                            highlight
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Waist-to-Height Ratio (WHtR)"
                howToUse="To calculate your ratio, enter your waist circumference and total height in the same unit of measurement (cm or inches). The tool instantly computes your Measured Ratio and identifies your health category—from 'Healthy' to 'Health risk'. This high-fidelity analysis provides a clear visual indicator of your body proportions and potential cardiovascular risk markers."
                whyUse="Our Waist-to-Height Ratio calculator is an 'elite' health utility that provides a more specialized view of your physical well-being than traditional BMI. It focuses on abdominal fat, a stable and scientifically backed indicator of metabolic health. The premium user interface features glassmorphic design and responsive result cards that make health tracking feel sophisticated and modern. It is a completely free, privacy-focused resource that processes all your body metrics locally, ensuring your health data remains strictly confidential."
            />
        </div>
    );
}
