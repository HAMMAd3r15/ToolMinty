'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function ElectricityCalculator() {
    const [units, setUnits] = useState('');
    const [rate, setRate] = useState('0.12');

    const calc = () => {
        const u = parseFloat(units);
        const r = parseFloat(rate);
        if (isNaN(u) || isNaN(r) || u <= 0 || r <= 0) return null;
        const monthly = u * r;
        const annual = monthly * 12;
        return { monthly: monthly.toFixed(2), annual: annual.toFixed(2) };
    };

    const toolData = calculators.find(c => c.href === '/electricity-calculator');

    const res = calc();
    const faqs = [
        { question: "How do I find my units consumed?", answer: "Check your electricity bill or smart meter. Units are measured in kilowatt-hours (kWh)." },
        { question: "What is a good electricity rate?", answer: "The average US rate is around $0.12/kWh, but it varies widely by location. Check your local utility bill." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Electricity Bill Estimator'}
                description={toolData?.description || 'Estimate your monthly and annual electricity bill based on units consumed.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Monthly Units (kWh)</label>
                            <input type="number" className="input" value={units} onChange={e => setUnits(e.target.value)} placeholder="e.g. 500" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Cost per Unit ($/kWh)</label>
                            <input type="number" className="input" value={rate} onChange={e => setRate(e.target.value)} placeholder="0.12" step="0.01" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                            <ResultCard title="Monthly Bill" value={`$${res.monthly}`} color="primary" highlight />
                            <ResultCard title="Annual Bill" value={`$${res.annual}`} color="secondary" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Electricity Bill Estimator"
                howToUse="To estimate your energy costs, enter your 'Monthly Units' in kWh and your local 'Cost per Unit' in dollars. The tool instantly calculates your estimated monthly and annual bills, displaying them in high-contrast result cards. You can adjust the usage or rate to see how small changes in energy habits impact your long-term expenses, all presented with smooth animations and professional typography."
                whyUse="Our Electricity Bill Estimator is a professional-grade utility designed to help homeowners and businesses manage their energy overhead with total transparency. It removes the complexity of manual multiplication and provides a clear, stable projection of both monthly and annual costs. The 'elite' design utilizes glassmorphic elements and vibrant result cards that look premium on any screen. It is a completely free, privacy-focused resource that ensures your usage data stays locally on your device. Whether you're auditing your appliances or budgeting for a season, this tool delivers the professional insights you need."
            />
        </div>
    );
}
