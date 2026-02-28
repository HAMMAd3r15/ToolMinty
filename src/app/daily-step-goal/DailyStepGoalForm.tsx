'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function DailyStepGoalForm() {
    const calc = calculators.find(c => c.href === '/daily-step-goal');
    const [age, setAge] = useState('');
    const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active'>('moderate');

    const calculateStepGoal = () => {
        const a = parseInt(age);
        if (isNaN(a)) return null;

        let baseSteps = 8000;
        if (a < 18) baseSteps = 10000;
        else if (a > 65) baseSteps = 6000;

        let multiplier = 1;
        if (activityLevel === 'sedentary') multiplier = 0.7;
        else if (activityLevel === 'active') multiplier = 1.5;

        const goal = Math.round(baseSteps * multiplier);

        return {
            goal,
            description: activityLevel === 'active' ? 'Highly ambitious' : activityLevel === 'sedentary' ? 'Baseline maintenance' : 'Healthy standard'
        };
    };

    const res = calculateStepGoal();

    const faqs = [
        {
            question: "Is 10,000 steps the universal goal?",
            answer: "While 10,000 is a common marketing metric, science shows that significant health benefits start at around 7,000 to 8,000 steps for most adults. Our tool adjusts based on your age and current habits."
        },
        {
            question: "How do I reach my goal easily?",
            answer: "Try taking a 15-minute walk after each meal, using stairs instead of elevators, and parking further away from your destination."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Daily Step Goal'}
                description={calc?.description || 'Discover your ideal daily step target based on your age and activity level.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Your Age</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 30"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Current Activity</label>
                        <select
                            className="input"
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value as any)}
                            style={{ width: '100%' }}
                        >
                            <option value="sedentary">Sedentary (Low)</option>
                            <option value="moderate">Moderate</option>
                            <option value="active">Active (High)</option>
                        </select>
                    </div>
                </div>

                {res && (
                    <div style={{ textAlign: 'center' }}>
                        <ResultCard
                            title="Daily Goal"
                            value={`${res.goal.toLocaleString()} Steps`}
                            subtitle={res.description}
                            color="success"
                            highlight
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Daily Step Goal Calculator"
                howToUse="To find your personal movement target, enter your age and select your current activity level from the dropdown menu. The tool instantly calculates a scientific Daily Goal in steps and provides a high-fidelity description of your target's health impact. This automated process helps you set realistic expectations for your fitness journey with absolute precision."
                whyUse="Our Daily Step Goal calculator is an 'elite' fitness utility that moves beyond the generic 10,000-step myth. It provides a stable and personalized recommendation based on your biology and existing lifestyle habits. The premium interface features glassmorphic design and responsive result cards that make goal-setting a sophisticated and motivating experience. It is a completely free, privacy-focused resource where all your personal data is processed locally, ensuring your fitness plans stay private."
            />
        </div>
    );
}
