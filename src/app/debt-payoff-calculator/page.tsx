'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function DebtPayoffCalculator() {
    const [balance, setBalance] = useState('');
    const [rate, setRate] = useState('');
    const [payment, setPayment] = useState('');

    const calc = () => {
        const b = parseFloat(balance);
        const r = parseFloat(rate) / 100 / 12;
        const p = parseFloat(payment);
        if (isNaN(b) || isNaN(r) || isNaN(p) || p <= b * r) return null;
        const months = Math.ceil(-Math.log(1 - (b * r) / p) / Math.log(1 + r));
        const totalPaid = p * months;
        const totalInterest = totalPaid - b;
        const years = Math.floor(months / 12);
        const remainMonths = months % 12;
        return {
            months,
            timeline: years > 0 ? `${years}y ${remainMonths}m` : `${remainMonths} months`,
            totalPaid: totalPaid.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
        };
    };

    const res = calc();
    const faqs = [
        { question: "How is payoff time calculated?", answer: "We use the standard amortization formula: n = -log(1 - (balance × monthly rate) / payment) / log(1 + monthly rate)." },
        { question: "Why is my payment 'too low'?", answer: "If your monthly payment is less than or equal to the monthly interest charge, you'll never pay off the debt. Increase your payment." },
    ];

    const calcInfo = calculators.find(c => c.href === '/debt-payoff-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calcInfo?.title || 'Debt Payoff Calculator'}
                description={calcInfo?.description || 'Find out exactly when you\'ll be debt-free.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Debt Balance ($)</label>
                            <input type="number" className="input" value={balance} onChange={e => setBalance(e.target.value)} placeholder="e.g. 5000" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Annual Interest Rate (%)</label>
                            <input type="number" className="input" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 18" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Monthly Payment ($)</label>
                            <input type="number" className="input" value={payment} onChange={e => setPayment(e.target.value)} placeholder="e.g. 200" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Payoff Timeline" value={res.timeline} color="primary" highlight />
                            <ResultCard title="Total You'll Pay" value={`$${res.totalPaid}`} color="secondary" />
                            <ResultCard title="Total Interest" value={`$${res.totalInterest}`} color="accent" />
                        </div>
                    )}
                    {!res && balance && rate && payment && (
                        <p style={{ textAlign: 'center', color: '#ef4444', fontWeight: 500 }}>
                            ⚠️ Monthly payment is too low to cover interest. Please increase it.
                        </p>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Debt Payoff Calculator"
                howToUse="To plan your path to financial freedom, enter your 'Debt Balance', 'Annual Interest Rate', and your 'Monthly Payment'. The tool instantly calculates your 'Payoff Timeline', the 'Total You'll Pay', and the 'Total Interest' in premium result cards. You can increase your monthly payment to see how much time and interest you save in real-time with smooth animations."
                whyUse="Our Debt Payoff Calculator is a professional-grade financial utility designed for absolute clarity and strategic debt management. It removes the ambiguity of long-term interest costs by providing a clear, stable roadmap to becoming debt-free. The 'elite' design features glassmorphic result panels and high-fidelity typography that make financial planning feel sophisticated and empowering. It is a completely free, privacy-focused resource where all your sensitive calculations occur locally. Whether you're tackling credit cards or personal loans, this tool delivers the professional performance you need."
            />
        </div>
    );
}
