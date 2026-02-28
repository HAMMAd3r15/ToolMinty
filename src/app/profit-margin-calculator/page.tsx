'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function ProfitMarginCalculator() {
    const [revenue, setRevenue] = useState('');
    const [cost, setCost] = useState('');

    const toolData = calculators.find(c => c.href === '/profit-margin-calculator');

    const calc = () => {
        const r = parseFloat(revenue);
        const c = parseFloat(cost);
        if (isNaN(r) || isNaN(c) || r <= 0) return null;
        const profit = r - c;
        const margin = (profit / r) * 100;
        const markup = c > 0 ? (profit / c) * 100 : 0;
        return {
            profit: profit.toFixed(2),
            margin: margin.toFixed(2),
            markup: markup.toFixed(2),
        };
    };

    const res = calc();

    const faqs = [
        { question: "What is profit margin?", answer: "Profit margin = (Revenue - Cost) ÷ Revenue × 100. It tells you what percentage of revenue is actual profit." },
        { question: "What is markup?", answer: "Markup = (Revenue - Cost) ÷ Cost × 100. It tells you how much you marked up above cost. Markup is always higher than margin for the same product." },
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Profit Margin Calculator'}
                description={toolData?.description || 'Instantly calculate profit, margin percentage, and markup for any product or service.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Revenue / Selling Price ($)</label>
                            <input type="number" className="input" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="e.g. 150" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Cost / COGS ($)</label>
                            <input type="number" className="input" value={cost} onChange={e => setCost(e.target.value)} placeholder="e.g. 100" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Profit" value={`$${res.profit}`} color="primary" highlight />
                            <ResultCard title="Profit Margin" value={`${res.margin}%`} color="secondary" highlight />
                            <ResultCard title="Markup" value={`${res.markup}%`} color="accent" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Profit Margin Calculator"
                howToUse="To analyze your business performance, enter the 'Revenue / Selling Price' and the 'Cost / COGS' of your product or service. The tool instantly calculates the 'Profit', 'Profit Margin' percentage, and 'Markup' in premium, glassmorphic result cards. You can update the pricing or cost structures to immediately see the impact on your bottom line with total precision."
                whyUse="Our Profit Margin Calculator is a professional-grade business utility designed for absolute clarity and financial optimization. It removes the ambiguity from pricing strategies by providing clear, stable metrics for both margin and markup. The 'elite' design features high-contrast result cards and smooth UI transitions that make financial analysis feel modern and rewarding. It is a completely free, privacy-focused resource that respects your proprietary data by processing all numbers locally. Whether you're a retail owner or a freelance consultant, this tool delivers the professional performance you need."
            />
        </div>
    );
}
