'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


const categories = [
    { label: 'Accommodation', key: 'stay', placeholder: '600' },
    { label: 'Flights / Transport', key: 'transport', placeholder: '800' },
    { label: 'Food & Dining', key: 'food', placeholder: '400' },
    { label: 'Activities & Tours', key: 'activities', placeholder: '300' },
    { label: 'Shopping & Souvenirs', key: 'shopping', placeholder: '200' },
    { label: 'Travel Insurance', key: 'insurance', placeholder: '100' },
    { label: 'Miscellaneous', key: 'misc', placeholder: '150' },
];

export default function TravelBudget() {
    const [values, setValues] = useState<Record<string, string>>({});
    const [days, setDays] = useState('7');
    const update = (key: string, val: string) => setValues(prev => ({ ...prev, [key]: val }));
    const total = categories.reduce((sum, c) => sum + (parseFloat(values[c.key]) || 0), 0);
    const perDay = total / (parseInt(days) || 1);
    const hasInput = Object.values(values).some(v => v);

    const faqs = [
        { question: "Should I overestimate or underestimate?", answer: "Always overestimate by 10–15% to account for unexpected costs. It's better to return home with leftover budget than to overspend." },
    ];
    const calcData = calculators.find(c => c.href === '/travel-budget');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calcData?.title || 'Travel Budget Planner'}
                description={calcData?.description || 'Plan your trip budget by estimating costs across categories for any destination.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ maxWidth: '200px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Trip Duration (days)</label>
                        <input type="number" className="input" value={days} onChange={e => setDays(e.target.value)} placeholder="7" min="1" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1.25rem' }}>
                        {categories.map(c => (
                            <div key={c.key}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 500 }}>{c.label} ($)</label>
                                <input type="number" className="input" value={values[c.key] || ''} onChange={e => update(c.key, e.target.value)} placeholder={c.placeholder} />
                            </div>
                        ))}
                    </div>
                    {hasInput && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                            <ResultCard title="Total Budget" value={`$${total.toLocaleString()}`} color="primary" highlight />
                            <ResultCard title="Per Day" value={`$${perDay.toFixed(0)}`} color="secondary" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Travel Budget Planner"
                howToUse="To plan your adventure, enter your 'Trip Duration' and estimate costs for categories like 'Accommodation', 'Flights', and 'Food'. The tool instantly aggregates your spending into a 'Total Budget' and a 'Per Day' cost, displayed in high-fidelity result cards. You can adjust category values in real-time to see how different choices affect your overall travel fund with absolute precision."
                whyUse="Our Travel Budget Planner is a professional-grade logistics utility designed for world travelers who demand precision and a premium planning experience. It provides a stable and reliable way to model your trip expenses before you even book a flight. The 'elite' design features glassmorphic input cards and smooth UI transitions that make financial planning feel like part of the excitement. It is a completely free, privacy-focused resource that ensures your travel dreams and budget metrics stay private on your device."
            />
        </div>
    );
}
