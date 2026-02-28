'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function TaxCalculatorSimpleForm() {
    const calc = calculators.find(c => c.href === '/tax-calculator-simple');
    const [income, setIncome] = useState('');
    const [taxRate, setTaxRate] = useState('');

    const calculateTax = () => {
        const inc = parseFloat(income);
        const rate = parseFloat(taxRate);

        if (isNaN(inc) || isNaN(rate)) return null;

        const taxAmount = inc * (rate / 100);
        const netIncome = inc - taxAmount;

        return {
            taxAmount,
            netIncome,
            taxAmountFormatted: taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            netIncomeFormatted: netIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateTax();

    const faqs = [
        {
            question: "How is the tax calculated?",
            answer: "This is a simple percentage calculator. It takes your gross income and applies the percentage rate you provide to find the tax amount and your remaining net income."
        },
        {
            question: "Does this include tiered tax brackets?",
            answer: "No, this specific tool is for simple flat-rate calculations. If you need complex tiered brackets, check our other professional finance tools."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Tax Calculator (Simple %)'}
                description={calc?.description || 'Quickly estimate tax amount and net income based on a simple percentage rate.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Gross Income</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 50000"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tax Rate (%)</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 20"
                            value={taxRate}
                            onChange={(e) => setTaxRate(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {res && (
                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <ResultCard
                            title="Tax Amount"
                            value={res.taxAmountFormatted}
                            color="primary"
                        />
                        <ResultCard
                            title="Net Income"
                            value={res.netIncomeFormatted}
                            color="secondary"
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Tax Calculator (Simple %)"
                howToUse="To quickly estimate your tax obligations, enter your 'Gross Income' and the applicable 'Tax Rate' as a percentage. The tool instantly calculates the 'Tax Amount' and your 'Net Income' (take-home pay) in high-contrast result cards. You can adjust the figures to see how different tax rates impact your earnings in real-time."
                whyUse="Our Simple Tax Calculator is a professional financial utility designed for rapid estimation and clarity. It removes the need for manual percentage math by providing a stable, 100% accurate calculation of flat-rate taxes. The 'elite' design features glassmorphic elements and clean typography that make financial planning feel intuitive and premium. It is a completely free, privacy-focused resource where all calculations occur locally in your browser. Whether you're budgeting for a side project or checking a simple tax bill, this tool delivers professional performance."
            />
        </div>
    );
}
