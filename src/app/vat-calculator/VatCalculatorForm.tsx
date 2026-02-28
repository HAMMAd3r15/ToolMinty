'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function VatCalculatorForm() {
    const [amount, setAmount] = useState<string>('');
    const [vatRate, setVatRate] = useState<string>('');
    const [calcType, setCalcType] = useState<'exclusive' | 'inclusive'>('exclusive');

    const calculateVAT = () => {
        const a = parseFloat(amount);
        const r = parseFloat(vatRate);

        if (isNaN(a) || isNaN(r) || a < 0 || r < 0) return null;

        let vatAmount: number;
        let totalAmount: number;
        let netAmount: number;

        if (calcType === 'exclusive') {
            vatAmount = (a * r) / 100;
            netAmount = a;
            totalAmount = a + vatAmount;
        } else {
            netAmount = a / (1 + r / 100);
            vatAmount = a - netAmount;
            totalAmount = a;
        }

        return {
            vatAmount: vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            netAmount: netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            totalAmount: totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateVAT();

    const faqs = [
        {
            question: "What is the difference between inclusive and exclusive VAT?",
            answer: "VAT Exclusive means the tax is added onto the base price. VAT Inclusive means the price already includes the tax, and our calculator helps you find out how much of that price is the tax itself."
        },
        {
            question: "How do I calculate VAT for different countries?",
            answer: "Simply find the standard VAT rate for your country (e.g., 20% for the UK, 19% for Germany) and enter it into the 'VAT Rate' field."
        },
        {
            question: "Can this be used for GST?",
            answer: "Yes. GST (Goods and Services Tax) works mathematically the same way as VAT, so you can use this tool for GST calculations by entering your local GST rate."
        }
    ];

    const calc = calculators.find(c => c.href === '/vat-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'VAT Calculator'}
                description={calc?.description || 'Easily calculate Value Added Tax (VAT) for inclusive or exclusive amounts.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Amount ($)</label>
                            <input type="number" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 1000" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>VAT Rate (%)</label>
                            <input type="number" className="input" value={vatRate} onChange={(e) => setVatRate(e.target.value)} placeholder="e.g. 20" style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Calculation Type</label>
                        <CustomSelect
                            value={calcType}
                            onChange={(val) => setCalcType(val as any)}
                            options={[
                                { value: "exclusive", label: "VAT Exclusive (Add Tax to Net)" },
                                { value: "inclusive", label: "VAT Inclusive (Extract Tax from Total)" }
                            ]}
                        />
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title={calcType === 'exclusive' ? "Total Amount (Inc. VAT)" : "Net Amount (Exc. VAT)"}
                                value={`$${calcType === 'exclusive' ? res.totalAmount : res.netAmount}`}
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                <ResultCard
                                    title="VAT Amount"
                                    value={`$${res.vatAmount}`}
                                    color="secondary"
                                />
                                <ResultCard
                                    title={calcType === 'exclusive' ? "Net Price" : "Total Price"}
                                    value={`$${calcType === 'exclusive' ? res.netAmount : res.totalAmount}`}
                                    color="accent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="VAT Calculator"
                howToUse="To quickly calculate Value Added Tax, enter the 'Amount' and the 'VAT Rate' for your region. Choose whether the amount is 'VAT Exclusive' (to add tax) or 'VAT Inclusive' (to extract tax). The tool instantly provides the exact VAT amount, the net price, and the total gross price. These results update in real-time, allowing for efficient business and personal financial planning."
                whyUse="Our VAT Calculator is a professional-grade financial utility optimized for commercial accuracy and visual excellence. It features a premium glassmorphic interface that provides a clean, distraction-free environment for calculating taxes across multiple international jurisdictions. Privacy is central to our design; all data is processed locally within your browser, ensuring your business transactions and financial details remain entirely confidential. It is the most secure and sophisticated solution for modern tax calculations."
            />
        </div>
    );
}
