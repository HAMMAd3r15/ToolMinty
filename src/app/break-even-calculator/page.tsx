'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function BreakEvenCalculator() {
    const [fixedCosts, setFixedCosts] = useState('');
    const [pricePerUnit, setPricePerUnit] = useState('');
    const [variableCost, setVariableCost] = useState('');

    const toolData = calculators.find(c => c.href === '/break-even-calculator');

    const calc = () => {
        const fc = parseFloat(fixedCosts);
        const p = parseFloat(pricePerUnit);
        const vc = parseFloat(variableCost);
        if (isNaN(fc) || isNaN(p) || isNaN(vc)) return null;
        const contribution = p - vc;
        if (contribution <= 0) return null;
        const units = fc / contribution;
        const revenue = units * p;
        return {
            units: Math.ceil(units).toLocaleString(),
            revenue: revenue.toFixed(2),
            contribution: contribution.toFixed(2),
        };
    };

    const res = calc();

    const faqs = [
        { question: "What is the break-even point?", answer: "It's the number of units you must sell to cover all your costs. Above this point, every sale generates profit." },
        { question: "What is contribution margin?", answer: "Contribution margin = Price per unit − Variable cost per unit. It's how much each unit sold contributes toward covering fixed costs." },
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Break-Even Calculator'}
                description={toolData?.description || 'Find out exactly how many units you need to sell to start making a profit.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Fixed Costs ($)</label>
                            <input type="number" className="input" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} placeholder="e.g. 5000" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Price per Unit ($)</label>
                            <input type="number" className="input" value={pricePerUnit} onChange={e => setPricePerUnit(e.target.value)} placeholder="e.g. 50" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Variable Cost per Unit ($)</label>
                            <input type="number" className="input" value={variableCost} onChange={e => setVariableCost(e.target.value)} placeholder="e.g. 20" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Break-Even Units" value={res.units} color="primary" highlight />
                            <ResultCard title="Break-Even Revenue" value={`$${res.revenue}`} color="secondary" />
                            <ResultCard title="Contribution Margin" value={`$${res.contribution}`} color="accent" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Break-Even Calculator"
                howToUse="To find your project's profitability point, enter your 'Fixed Costs', 'Price per Unit', and 'Variable Cost per Unit' in the input fields above. The tool instantly calculates the exact number of units you need to sell to break even, as well as the required revenue and your contribution margin. Results are displayed in premium, interactive cards that highlight your targets with smooth transitions. This simple process allows you to quickly validate your business model and set realistic sales goals."
                whyUse="Our Break-Even Calculator is a professional-grade business utility designed to remove the uncertainty from your financial planning and product pricing strategies. Unlike simple math, this tool provides a focused, distraction-free interface that helps you visualize the relationship between costs and volume. The 'elite' design features vibrantly colored result cards and optimized typography that look stunning on both mobile and desktop screens. It is a completely free resource that respects your privacy by calculating everything locally on your device. Whether you're a startup founder or an established business owner, this tool delivers the stable and professional performance you need to ensure your success."
            />
        </div>
    );
}
