'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function FuelCalculator() {
    const [distance, setDistance] = useState('');
    const [mileage, setMileage] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');

    const calc = () => {
        const d = parseFloat(distance);
        const m = parseFloat(mileage);
        const p = parseFloat(fuelPrice);
        if (isNaN(d) || isNaN(m) || isNaN(p) || m <= 0) return null;
        const liters = d / m;
        const cost = liters * p;
        const costPer100km = (100 / m) * p;
        return { liters: liters.toFixed(2), cost: cost.toFixed(2), costPer100km: costPer100km.toFixed(2) };
    };

    const res = calc();
    const faqs = [
        { question: "How is fuel cost calculated?", answer: "Fuel used = Distance ÷ Mileage (km per liter). Total cost = Fuel used × Price per liter." },
    ];

    const toolData = calculators.find(c => c.href === '/fuel-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Fuel Cost Calculator'}
                description={toolData?.description || 'Calculate trip fuel expenses based on distance, fuel efficiency, and price.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Distance (km)</label>
                            <input type="number" className="input" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 300" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Fuel Efficiency (km/L)</label>
                            <input type="number" className="input" value={mileage} onChange={e => setMileage(e.target.value)} placeholder="e.g. 15" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Price per Liter ($)</label>
                            <input type="number" className="input" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)} placeholder="e.g. 1.50" step="0.01" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                            <ResultCard title="Total Fuel Used" value={`${res.liters}L`} color="secondary" />
                            <ResultCard title="Total Trip Cost" value={`$${res.cost}`} color="primary" highlight />
                            <ResultCard title="Cost per 100km" value={`$${res.costPer100km}`} color="accent" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Fuel Cost Calculator"
                howToUse="To plan your trip expenses, enter the 'Distance' in kilometers, your vehicle's 'Fuel Efficiency' (km/L), and the current 'Price per Liter'. The tool instantly calculates the total fuel used, the total trip cost, and the cost per 100km in premium result cards. You can easily adjust the efficiency or price to compare different vehicles or routes, all within a smooth, interactive interface."
                whyUse="Our Fuel Cost Calculator is a professional-grade travel utility designed for absolute precision in budgeting and trip planning. It removes the guesswork from road trip expenses and provides a clear, stable breakdown of your fuel consumption and costs. The 'elite' design features glassmorphic panels and high-fidelity typography that make financial planning feel sophisticated and engaging. It is a completely free resource that respects your privacy by processing all inputs locally in your browser. Whether you're commuting daily or planning a cross-country journey, this tool delivers the professional insights you need."
            />
        </div>
    );
}
