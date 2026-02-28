'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function SalaryAfterTaxForm() {
    const calc = calculators.find(c => c.href === '/salary-after-tax');
    const [grossSalary, setGrossSalary] = useState('');
    const [taxPercentage, setTaxPercentage] = useState('');
    const [payPeriod, setPayPeriod] = useState<'yearly' | 'monthly'>('yearly');

    const calculateSalary = () => {
        const gross = parseFloat(grossSalary);
        const tax = parseFloat(taxPercentage);

        if (isNaN(gross) || isNaN(tax)) return null;

        const taxAmount = gross * (tax / 100);
        const netSalary = gross - taxAmount;

        const monthlyNet = payPeriod === 'yearly' ? netSalary / 12 : netSalary;
        const yearlyNet = payPeriod === 'yearly' ? netSalary : netSalary * 12;

        return {
            taxAmount,
            netSalary,
            monthlyNetFormatted: monthlyNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            yearlyNetFormatted: yearlyNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateSalary();

    const faqs = [
        {
            question: "How is the monthly salary calculated?",
            answer: "If you enter a yearly salary, we deduct the tax first and then divide the remaining amount by 12. If you enter a monthly salary, we deduct tax from that amount and multiply by 12 to show the yearly estimate."
        },
        {
            question: "Does this include social security or other deductions?",
            answer: "This is a simplified calculator that focuses on the primary tax percentage. For more precise results, you should add your total percentage of all deductions (tax, insurance, pension) into the tax field."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Salary After Tax'}
                description={calc?.description || 'Estimate your real take-home monthly or yearly income after tax deductions.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Gross Salary</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 60000"
                            value={grossSalary}
                            onChange={(e) => setGrossSalary(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Tax Rate (%)</label>
                        <input
                            type="number"
                            className="input"
                            placeholder="e.g. 25"
                            value={taxPercentage}
                            onChange={(e) => setTaxPercentage(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setPayPeriod('yearly')}
                        style={{
                            padding: '0.6rem 1.25rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--color-border)',
                            backgroundColor: payPeriod === 'yearly' ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: payPeriod === 'yearly' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Yearly
                    </button>
                    <button
                        onClick={() => setPayPeriod('monthly')}
                        style={{
                            padding: '0.6rem 1.25rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--color-border)',
                            backgroundColor: payPeriod === 'monthly' ? 'var(--color-primary)' : 'var(--color-surface)',
                            color: payPeriod === 'monthly' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                            cursor: 'pointer',
                            fontWeight: 500,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Monthly
                    </button>
                </div>

                {res && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <ResultCard
                            title="Net Monthly Income"
                            value={res.monthlyNetFormatted}
                            color="secondary"
                        />
                        <ResultCard
                            title="Net Yearly Income"
                            value={res.yearlyNetFormatted}
                            color="primary"
                        />
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Salary After Tax Calculator"
                howToUse="To estimate your take-home pay, enter your 'Gross Salary' and your estimated 'Tax Rate' percentage into the input fields above. You can toggle between 'Yearly' and 'Monthly' views to see how your income is distributed across different time periods. The tool instantly calculates your net monthly and yearly income, displaying the results in premium cards that highlight your actual available funds. This simple and effective process helps you manage your household budget and understand your real purchasing power in seconds."
                whyUse="Our Salary After Tax Calculator is an essential utility for anyone looking to bridge the gap between gross numbers and actual take-home pay. By providing a synchronized view of monthly and yearly net income, it offers a professional perspective on personal finance that is often missing from simple paystubs. The 'elite' design features vibrantly colored result cards and optimized typography that look stunning on any device, from mobile phones to high-resolution monitors. It is a completely free, privacy-focused resource that ensures your income data remains locally on your browser. Whether you're negotiating a new job offer or planning your monthly spending, this tool delivers the stable and professional performance you need."
            />
        </div>
    );
}
