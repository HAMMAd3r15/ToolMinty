'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function BodyFatForm() {
    const calc = calculators.find(c => c.href === '/body-fat-calculator');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [neck, setNeck] = useState('');
    const [waist, setWaist] = useState('');
    const [hip, setHip] = useState('');
    const [unit, setUnit] = useState<'cm' | 'in'>('cm');

    const calculateBodyFat = () => {
        const h = parseFloat(height);
        const n = parseFloat(neck);
        const w = parseFloat(waist);
        const hi = parseFloat(hip);

        if (isNaN(h) || isNaN(n) || isNaN(w) || (gender === 'female' && isNaN(hi))) return null;

        let bodyFat = 0;
        if (unit === 'cm') {
            if (gender === 'male') {
                bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
            } else {
                bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
            }
        } else {
            // US Navy Method (inches)
            if (gender === 'male') {
                bodyFat = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
            } else {
                bodyFat = 163.205 * Math.log10(w + hi - n) - 97.684 * Math.log10(h) - 78.387;
            }
        }

        return bodyFat.toFixed(1);
    };

    const res = calculateBodyFat();

    const faqs = [
        {
            question: "How accurate is the Navy Method?",
            answer: "The US Navy Body Fat formula is widely used and provides a good estimate for most people with an accuracy of within 3-4% compared to professional methods like DEXA scans."
        },
        {
            question: "Where should I measure?",
            answer: "Measure your waist at the navel, your neck just below the larynx, and (for women) your hips at the widest point."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Body Fat Calculator'}
                description={calc?.description || 'Estimate your body fat percentage using standard fitness and health formulas.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setGender('male')}
                        style={{
                            flex: 1, padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)',
                            backgroundColor: gender === 'male' ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: gender === 'male' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                            fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                    >
                        Male
                    </button>
                    <button
                        onClick={() => setGender('female')}
                        style={{
                            flex: 1, padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)',
                            backgroundColor: gender === 'female' ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: gender === 'female' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                            fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                        }}
                    >
                        Female
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Height ({unit})</label>
                        <input type="number" className="input" value={height} onChange={e => setHeight(e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Neck ({unit})</label>
                        <input type="number" className="input" value={neck} onChange={e => setNeck(e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Waist ({unit})</label>
                        <input type="number" className="input" value={waist} onChange={e => setWaist(e.target.value)} style={{ width: '100%' }} />
                    </div>
                    {gender === 'female' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Hip ({unit})</label>
                            <input type="number" className="input" value={hip} onChange={e => setHip(e.target.value)} style={{ width: '100%' }} />
                        </div>
                    )}
                </div>

                {res && (
                    <div style={{ textAlign: 'center' }}>
                        <ResultCard
                            title="Body Fat Estimate"
                            value={`${res}%`}
                            subtitle="Based on Navy Formula"
                            color="primary"
                            highlight
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Body Fat Calculator"
                howToUse="To estimate your body fat percentage, start by selecting your gender and preferred unit of measurement (cm or in). Enter your height, neck circumference, and waist circumference (plus hip circumference for women) into the provided fields. The tool uses the clinically recognized US Navy formula to process these metrics and display your estimated fat percentage in a high-fidelity result card. This provides a stable and reliable baseline for tracking your physical transformation without the need for expensive scanning equipment."
                whyUse="Our Body Fat Calculator is a professional-grade fitness utility designed to give you a more nuanced understanding of your body composition than weight alone. By using precise anatomical measurements, it provides a stable and reliable estimate that helps you adjust your training and nutrition with total confidence. The 'elite' user interface features glassmorphic design elements and responsive input zones that make tracking your fitness journey feel premium and sophisticated. It is a completely free, privacy-focused resource that empowers you to take control of your health metrics on any device."
            />
        </div>
    );
}
