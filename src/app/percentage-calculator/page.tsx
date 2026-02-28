'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function PercentageCalculator() {
    const [num1, setNum1] = useState<string>('');
    const [num2, setNum2] = useState<string>('');
    const [type, setType] = useState<'what_is' | 'is_what_percent' | 'percentage_increase'>('what_is');

    const calculateResult = () => {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        if (isNaN(n1) || isNaN(n2)) return null;

        let result = 0;
        let label = '';

        switch (type) {
            case 'what_is':
                result = (n1 / 100) * n2;
                label = `${n1}% of ${n2} is`;
                break;
            case 'is_what_percent':
                result = (n1 / n2) * 100;
                label = `${n1} is what percent of ${n2}?`;
                break;
            case 'percentage_increase':
                result = ((n2 - n1) / n1) * 100;
                label = `Percentage change from ${n1} to ${n2} is`;
                break;
        }

        return {
            value: type === 'what_is' ? result.toLocaleString() : `${result.toFixed(2)}%`,
            label
        };
    };

    const res = calculateResult();

    const faqs = [
        {
            question: "How do I calculate a percentage of a number?",
            answer: "To find a percentage of a number, divide the percentage by 100 and multiply by the total number. For example, 20% of 50 is (20/100) * 50 = 10."
        },
        {
            question: "What is percentage increase?",
            answer: "Percentage increase is the relative change between an old value and a new value. Formula: ((New Value - Old Value) / Old Value) * 100."
        },
        {
            question: "Is this calculator private?",
            answer: "Yes, all calculations are performed locally in your browser. No data is sent to our servers."
        }
    ];

    const calc = calculators.find(c => c.href === '/percentage-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Percentage Calculator'}
                description={calc?.description || 'Solve any percentage-based problem quickly.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {(['what_is', 'is_what_percent', 'percentage_increase'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setType(t)}
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '2rem',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: type === t ? 'var(--color-primary)' : 'var(--color-surface)',
                                    color: type === t ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    transition: 'all 0.2s ease',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {t === 'what_is' && 'What is X% of Y?'}
                                {t === 'is_what_percent' && 'X is what % of Y?'}
                                {t === 'percentage_increase' && '% Increase/Decrease'}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                {type === 'percentage_increase' ? 'Old Value (X)' : 'Value (X)'}
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={num1}
                                onChange={(e) => setNum1(e.target.value)}
                                placeholder="Enter a number"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                {type === 'percentage_increase' ? 'New Value (Y)' : 'Value (Y)'}
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={num2}
                                onChange={(e) => setNum2(e.target.value)}
                                placeholder="Enter a number"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem' }}>
                            <ResultCard
                                title={res.label}
                                value={res.value}
                                color="secondary"
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Percentage Calculator"
                howToUse="To solve any percentage problem, choose the calculation type from the menu: find a percentage of a number, determine what percentage one number is of another, or calculate the percentage increase/decrease between two values. Simply enter the relevant numbers in the input fields and the tool will instantly display the result in a high-fidelity card. Whether you're calculating a discount, a tip, or a year-over-year change, this automated process handles the math for you with total precision and speed."
                whyUse="Our Percentage Calculator is a professional-grade math utility designed to remove the guesswork from everyday financial and commercial calculations. Instead of fumbling with formulas or manual division, this tool provides instant, 100% accurate results in a premium, glassmorphic interface that looks stunning on any device. It is a completely free resource that respects your privacy by processing all numbers locally in your browser. Whether you're a student, a business professional, or just managing your household budget, this tool delivers the stable and professional performance you need to handle percentages with confidence."
            />
        </div>
    );
}
