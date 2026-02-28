'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function SavingsInflationForm() {
    const calc = calculators.find(c => c.href === '/savings-inflation-calculator');
    const [savings, setSavings] = useState('');
    const [inflationRate, setInflationRate] = useState('');
    const [years, setYears] = useState('');

    const calculateInflation = () => {
        const s = parseFloat(savings);
        const i = parseFloat(inflationRate);
        const y = parseFloat(years);

        if (isNaN(s) || isNaN(i) || isNaN(y)) return null;

        // Future Value adjusted for inflation: FV = PV / (1 + i)^n
        const purchasingPower = s / Math.pow(1 + (i / 100), y);
        const lossInValue = s - purchasingPower;

        return {
            purchasingPower,
            lossInValue,
            purchasingPowerFormatted: purchasingPower.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            lossInValueFormatted: lossInValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateInflation();

    const faqs = [
        {
            question: "What is 'Purchasing Power'?",
            answer: "Purchasing power is the value of a currency expressed in terms of the amount of goods or services that one unit of money can buy. Inflation reduces this power over time."
        },
        {
            question: "How does inflation affect my savings?",
            answer: "Even if your savings amount stays the same numerically, if inflation is 3%, you will be able to buy 3% less next year than you can today. This tool shows you what your current savings will be worth in 'today's money' in the future."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Savings vs Inflation'}
                description={calc?.description || 'Visualize how inflation impacts your savings and purchasing power over time.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Current Savings</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 10000"
                            value={savings}
                            onChange={(e) => setSavings(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Annual Inflation Rate (%)</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 3"
                            value={inflationRate}
                            onChange={(e) => setInflationRate(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Time Period (Years)</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 10"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {res && (
                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <ResultCard
                            title="Future Purchasing Power"
                            value={res.purchasingPowerFormatted}
                            subtitle="In today's currency value"
                            color="secondary"
                        />
                        <ResultCard
                            title="Estimated Value Loss"
                            value={res.lossInValueFormatted}
                            subtitle="Due to inflation decay"
                            color="primary"
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Savings vs Inflation Calculator"
                howToUse="To understand the impact of inflation on your money, enter your 'Current Savings', the 'Annual Inflation Rate', and the 'Time Period' in years. The tool instantly calculates your 'Future Purchasing Power' in today's currency value and the 'Estimated Value Loss'. You can adjust the inflation rate to see different economic scenarios and how they affect your long-term wealth."
                whyUse="Our Savings vs Inflation Calculator is a professional-grade economic utility designed to provide absolute clarity on long-term purchasing power. It removes the complexity of compound interest and inflation math by providing a clear, stable projection of your money's future value. The 'elite' design features glassmorphic result panels and optimized typography that make complex financial concepts feel intuitive and engaging. It is a completely free resource that respects your privacy by processing all data locally. Whether you're planning for retirement or a major purchase, this tool delivers the professional insights you need."
            />
        </div>
    );
}
