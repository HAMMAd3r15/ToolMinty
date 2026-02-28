'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function InflationCalculator() {
    const [amount, setAmount] = useState<string>('');
    const [rate, setRate] = useState<string>('3');
    const [years, setYears] = useState<string>('10');

    const calculateInflation = () => {
        const p = parseFloat(amount);
        const r = parseFloat(rate) / 100;
        const n = parseFloat(years);

        if (isNaN(p) || isNaN(r) || isNaN(n)) return null;

        const futureValue = p * Math.pow(1 + r, n);
        const purchasingPower = p / Math.pow(1 + r, n);

        return {
            futureValue: futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            purchasingPower: purchasingPower.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateInflation();

    const faqs = [
        {
            question: "How does inflation work?",
            answer: "Inflation is the rate at which the general level of prices for goods and services is rising. As inflation rises, every dollar you own buys a smaller percentage of a good or service."
        },
        {
            question: "What is 'Purchasing Power'?",
            answer: "It shows what your current amount of money will be worth in the future. For example, $100 today might only buy $70 worth of goods in 10 years if inflation stays at 3%."
        }
    ];

    const calc = calculators.find(c => c.href === '/inflation-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Inflation Calculator'}
                description={calc?.description || 'See how the value of your money changes over time due to inflation.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Starting Amount ($)</label>
                            <input type="number" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 1000" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Annual Inflation (%)</label>
                            <input type="number" className="input" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 3" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Number of Years</label>
                            <input type="number" className="input" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 10" />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Future Monthly Cost" value={`$${res.futureValue}`} color="primary" />
                            <ResultCard title="Future Purchasing Power" value={`$${res.purchasingPower}`} color="secondary" highlight />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Inflation Calculator"
                howToUse="To see how the value of your money changes over time, enter your 'Starting Amount', the estimated 'Annual Inflation' rate (e.g., 3%), and the 'Number of Years'. The tool instantly calculates the future monthly cost and your future purchasing power in high-fidelity result cards. You can adjust the inflation rate to see different economic scenarios, all presented with smooth animations and clear, bold typography."
                whyUse="Our Inflation Calculator is a professional-grade economic utility designed to help you understand the long-term impact of price increases on your savings and purchasing power. Instead of guessing, this tool uses precise mathematical models to give you a stable and accurate projection of future costs. The 'elite' design features glassmorphic panels and responsive layout that looks premium on any device. It is a completely free, privacy-focused resource that processes all your financial data locally in your browser. Whether you're planning for a major purchase or adjusting your retirement goals, this tool delivers the professional insights you need."
            />
        </div>
    );
}
