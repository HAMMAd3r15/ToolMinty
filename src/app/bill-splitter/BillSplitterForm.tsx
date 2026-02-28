'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function BillSplitterForm() {
    const calc = calculators.find(c => c.href === '/bill-splitter');
    const [billTotal, setBillTotal] = useState('');
    const [numPeople, setNumPeople] = useState('2');
    const [tipPercentage, setTipPercentage] = useState('15');

    const calculateSplit = () => {
        const total = parseFloat(billTotal);
        const people = parseInt(numPeople);
        const tip = parseFloat(tipPercentage);

        if (isNaN(total) || isNaN(people) || people <= 0) return null;

        const tipAmount = total * (tip / 100);
        const grandTotal = total + tipAmount;
        const perPerson = grandTotal / people;

        return {
            tipAmount,
            grandTotal,
            perPerson,
            formattedPerPerson: perPerson.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            formattedTotal: grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateSplit();

    const faqs = [
        {
            question: "Is this for splitting items or total?",
            answer: "This is a quick total-bill splitter. For complex item-by-item splitting, we recommend tracking each individual's order and adding tax/tip proportionally."
        },
        {
            question: "How much should I tip?",
            answer: "Standard tipping in many regions is between 15% and 20%. Our calculator defaults to 15% but you can adjust it easily."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Bill Splitter'}
                description={calc?.description || 'Divide any bill evenly or with custom shares among multiple people.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Bill Amount ($)</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 100.00"
                            value={billTotal}
                            onChange={(e) => setBillTotal(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Number of People</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 4"
                            value={numPeople}
                            onChange={(e) => setNumPeople(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tip Percentage (%)</label>
                        <input
                            type="number"
                            className="input"
                            value={tipPercentage}
                            onChange={(e) => setTipPercentage(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {res && (
                    <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <ResultCard
                            title="Total Bill (with Tip)"
                            value={`$${res.formattedTotal}`}
                            color="primary"
                        />
                        <ResultCard
                            title="Amount Per Person"
                            value={`$${res.formattedPerPerson}`}
                            color="secondary"
                            highlight
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Bill Splitter"
                howToUse="To divide a bill fairly among your group, enter the 'Bill Amount', the 'Number of People', and a 'Tip Percentage'. The tool instantly calculates the 'Total Bill' (including tip) and the exact 'Amount Per Person' in premium result cards. You can adjust the tip or the number of people to see different split scenarios in real-time with smooth animations."
                whyUse="Our Bill Splitter is a professional-grade social utility designed for absolute precision and ease of use in dining and group activities. It removes the stress of manual calculations and ensures everyone pays their fair share with total transparency. The 'elite' design features glassmorphic elements and high-fidelity typography that look stunning on any mobile device. It is a completely free, privacy-focused resource that processes all inputs locally on your device. Whether it's a casual dinner or a shared trip expense, this tool delivers the professional performance you need."
            />
        </div>
    );
}
