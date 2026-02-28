'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function WaterIntakeCalculator() {
    const [weight, setWeight] = useState<string>('');
    const [activity, setActivity] = useState<string>('0'); // Minutes of exercise

    const calculateWater = () => {
        const w = parseFloat(weight);
        const a = parseFloat(activity);

        if (isNaN(w)) return null;

        // Base intake: 35ml per kg
        let baseMl = w * 35;

        // Activity adjustment: ~350ml extra per 30 mins of exercise
        let extraMl = (a / 30) * 350;

        const totalMl = baseMl + extraMl;
        const glasses = totalMl / 250; // 250ml per glass

        return {
            liters: (totalMl / 1000).toFixed(2),
            glasses: Math.ceil(glasses),
            ounces: Math.round(totalMl * 0.033814)
        };
    };

    const res = calculateWater();

    const faqs = [
        {
            question: "How much water do I really need?",
            answer: "A general rule is 30-35ml per kg of body weight. However, climate, activity levels, and health status can all influence your personal requirements."
        },
        {
            question: "Does coffee count towards my water intake?",
            answer: "Yes, tea and coffee do contribute to your hydration, although plain water is typically the best source. Most beverages and even water-rich foods (like watermelon) count."
        },
        {
            question: "Is it possible to drink too much water?",
            answer: "While rare, excessive water intake can lead to hyponatremia, where sodium levels in the blood become dangerously low. Drink when you feel thirsty if you're healthy."
        }
    ];

    const calc = calculators.find(c => c.href === '/water-intake');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>


            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Weight (kg)</label>
                            <input
                                type="number"
                                className="input"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="e.g. 70"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Daily Exercise (Minutes)</label>
                            <input
                                type="number"
                                className="input"
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
                                placeholder="e.g. 30"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                            <ResultCard
                                title="Daily Target"
                                value={`${res.liters} Liters`}
                                subtitle={`Approx. ${res.glasses} glasses (250ml size)`}
                                highlight
                                color="primary"
                            />
                            <ResultCard
                                title="US Customary"
                                value={`${res.ounces} fl oz`}
                                subtitle="Total fluid ounces"
                                color="secondary"
                            />
                        </div>
                    )}

                    <div style={{
                        backgroundColor: 'rgba(37, 99, 235, 0.05)',
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(37, 99, 235, 0.1)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <strong>💡 Tip:</strong> Try to drink a glass of water first thing in the morning and before every meal to stay consistently hydrated.
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Water Intake Calculator"
                howToUse="To determine your hydration needs, enter your current body weight and your daily exercise duration in minutes. The tool uses high-fidelity logic to calculate your target intake in liters, glasses, and fluid ounces. Results update in real-time, providing a stable daily goal that adjusts to your lifestyle. Use the built-in health tips to integrate hydration seamlessly into your wellness routine."
                whyUse="Our Water Intake Calculator is an 'elite' wellness utility designed to provide precise hydration targets tailored to your specific physical activity. It moves beyond generic '8 glasses a day' advice to offer a scientific approach based on body mass and metabolic needs. The premium interface features glassmorphism and clear, responsive result cards that make tracking your health goals a sophisticated experience. It is a completely free, privacy-focused tool that ensures your personal metrics are never shared, as all calculations are handled locally."
            />
        </div>
    );
}
