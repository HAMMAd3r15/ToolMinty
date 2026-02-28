'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function SalesTaxForm() {
    const [price, setPrice] = useState<string>('');
    const [taxRate, setTaxRate] = useState<string>('');

    const calculateTax = () => {
        const p = parseFloat(price);
        const r = parseFloat(taxRate);

        if (isNaN(p) || isNaN(r) || p < 0 || r < 0) return null;

        const taxAmount = (p * r) / 100;
        const totalPrice = p + taxAmount;

        return {
            taxAmount: taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            totalPrice: totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            basePrice: p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateTax();

    const faqs = [
        {
            question: "How is sales tax calculated?",
            answer: "Sales tax is calculated by multiplying the base price of an item by the tax rate percentage. For example, a $100 item with a 7% tax rate would have $7 in tax, totaling $107."
        },
        {
            question: "Does this calculator handle state and local tax?",
            answer: "Yes. Simply add your state tax rate and local tax rate together and enter the total percentage into the 'Sales Tax Rate' field."
        },
        {
            question: "What is the difference between Sales Tax and VAT?",
            answer: "Sales tax is generally collected at the final point of sale to the consumer. VAT (Value Added Tax) is collected at every stage of production."
        }
    ];

    const calc = calculators.find(c => c.href === '/sales-tax-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Sales Tax Calculator'}
                description={calc?.description || 'Find the total price of an item after adding local or state sales tax.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Net Price ($)</label>
                            <input type="number" className="input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 150.00" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Sales Tax Rate (%)</label>
                            <input type="number" className="input" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="e.g. 7.5" style={{ width: '100%' }} />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Total Price (Inc. Tax)"
                                value={`$${res.totalPrice}`}
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                <ResultCard
                                    title="Sales Tax Amount"
                                    value={`$${res.taxAmount}`}
                                    color="secondary"
                                />
                                <ResultCard
                                    title="Base Price"
                                    value={`$${res.basePrice}`}
                                    color="accent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Sales Tax Calculator"
                howToUse="To determine the final cost of a purchase, enter the 'Net Price' of the item and your local 'Sales Tax Rate' as a percentage. The tool instantly calculates the exact tax amount and the final total price. This clean, frictionless process allows you to quickly understand your total expenditure before reaching the checkout counter."
                whyUse="Our Sales Tax Calculator is an 'elite' digital utility built for speed and mathematical accuracy. It features a premium glassmorphic design that provides a distraction-free, professional environment for essential daily calculations. Privacy is a core priority; all inputs are processed entirely within your browser, ensuring your shopping habits and financial data never leave your device. It is the most sophisticated and secure way to handle sales tax calculations on the web."
            />
        </div>
    );
}
