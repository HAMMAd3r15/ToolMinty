'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function CommuteCost() {
    const [distance, setDistance] = useState('15');
    const [efficiency, setEfficiency] = useState('25');
    const [fuelPrice, setFuelPrice] = useState('3.50');
    const [daysPerWeek, setDaysPerWeek] = useState('5');
    const [maintenance, setMaintenance] = useState('50'); // Monthly maintenance/wear

    const calculateCosts = () => {
        const d = parseFloat(distance) * 2; // Round trip
        const e = parseFloat(efficiency);
        const p = parseFloat(fuelPrice);
        const days = parseFloat(daysPerWeek);
        const m = parseFloat(maintenance);

        if (!d || !e || !p || !days) return null;

        const dailyFuel = (d / e) * p;
        const weeklyFuel = dailyFuel * days;
        const monthlyFuel = (weeklyFuel * 52) / 12;
        const yearlyFuel = weeklyFuel * 52;

        const monthlyTotal = monthlyFuel + m;
        const yearlyTotal = monthlyTotal * 12;

        return {
            daily: dailyFuel.toFixed(2),
            weekly: weeklyFuel.toFixed(2),
            monthly: monthlyTotal.toFixed(2),
            yearly: yearlyTotal.toFixed(2),
            fuelOnlyYearly: yearlyFuel.toFixed(2)
        };
    };

    const costs = calculateCosts();
    const calc = calculators.find(c => c.href === '/commute-cost-calculator');

    const faqs = [
        { question: "How is the commute cost calculated?", answer: "We calculate the daily fuel cost by dividing your total daily round-trip distance by your vehicle's fuel efficiency, then multiplying by the price per unit of fuel. We then scale this by your work days per week and add estimated maintenance costs for a full monthly and yearly view." },
        { question: "What should I include in 'Maintenance Cost'?", answer: "This field represents wear and tear, tire replacement, oil changes, and depreciation. A common estimate is about $0.05 to $0.10 per mile, but you can enter a flat monthly estimate for simplicity." },
        { question: "How can I reduce my commute costs?", answer: "Consider carpooling, using public transit even once a week, maintaining proper tire pressure for better efficiency, or discussing remote work options with your employer." },
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Commute Cost Calculator'} description={calc?.description || ''} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <div className="card">
                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                        <div>
                            <label className="label">Daily Trip Distance (One Way, miles)</label>
                            <input type="number" className="input" value={distance} onChange={(e) => setDistance(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">Fuel Efficiency (MPG)</label>
                            <input type="number" className="input" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">Fuel Price ($/gal)</label>
                            <input type="number" className="input" step="0.01" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">Work Days Per Week</label>
                            <select className="input" value={daysPerWeek} onChange={(e) => setDaysPerWeek(e.target.value)}>
                                {[1, 2, 3, 4, 5, 6, 7].map(d => <option key={d} value={d}>{d} Days</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Monthly Maintenance/Wear ($)</label>
                            <input type="number" className="input" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {costs ? (
                        <>
                            <div className="card" style={{ background: 'var(--color-bg-secondary)', textAlign: 'center', border: 'none' }}>
                                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated Yearly Total</div>
                                <div style={{ color: 'var(--color-secondary)', fontSize: '3rem', fontWeight: 800 }}>${costs.yearly}</div>
                                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Including maintenance & fuel</div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="card" style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.3rem' }}>Daily</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>${costs.daily}</div>
                                </div>
                                <div className="card" style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.3rem' }}>Weekly</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>${costs.weekly}</div>
                                </div>
                            </div>

                            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Monthly Cost:</span>
                                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>${costs.monthly}</span>
                            </div>

                            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(99, 102, 241, 0.05)' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Annual Fuel Alone:</span>
                                <span style={{ fontWeight: 600 }}>${costs.fuelOnlyYearly}</span>
                            </div>
                        </>
                    ) : (
                        <div className="card" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                            Enter commute details to see full analysis
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Commute Cost Calculator"
                howToUse="To start your analysis, enter your one-way commute distance, your vehicle's average fuel efficiency (MPG), and the current price of fuel in your area. Select how many days per week you travel to work. You can also include an optional monthly amount for maintenance, which covers hidden costs like oil changes, tires, and general wear. The calculator instantly generates a comprehensive report showing your daily, weekly, monthly, and yearly travel budget."
                whyUse="Commuting is often one of the largest hidden expenses in a household budget. Beyond just gas, the mileage on your car leads to depreciation and maintenance needs that aggregate into significant annual figures. Our Commute Cost Calculator provides a high-fidelity 'elite' visualization of these expenses, helping you understand the real value of your time and money. Whether you're considering a new job offer or contemplating a move to public transit, this tool provides the hard data needed for informed financial decisions."
            />
        </div>
    );
}
