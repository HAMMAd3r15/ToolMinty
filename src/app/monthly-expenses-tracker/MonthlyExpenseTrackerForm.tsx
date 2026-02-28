'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

interface Expense {
    id: string;
    category: string;
    amount: string;
}

export default function MonthlyExpenseTrackerForm() {
    const calc = calculators.find(c => c.href === '/monthly-expenses-tracker');
    const [expenses, setExpenses] = useState<Expense[]>([
        { id: '1', category: 'Rent/Mortgage', amount: '' },
        { id: '2', category: 'Groceries', amount: '' },
        { id: '3', category: 'Utilities', amount: '' },
        { id: '4', category: 'Transport', amount: '' },
        { id: '5', category: 'Entertainment', amount: '' },
    ]);

    const addExpense = () => {
        setExpenses([...expenses, { id: Date.now().toString(), category: '', amount: '' }]);
    };

    const updateExpense = (id: string, field: keyof Expense, value: string) => {
        setExpenses(expenses.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };

    const removeExpense = (id: string) => {
        if (expenses.length > 1) {
            setExpenses(expenses.filter(exp => exp.id !== id));
        }
    };

    const calculateTotal = () => {
        const total = expenses.reduce((acc, exp) => acc + (parseFloat(exp.amount) || 0), 0);
        return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const faqs = [
        {
            question: "Is my data saved?",
            answer: "In this current version, your data is processed only in your browser and is not saved on our server. If you refresh the page, the data will reset."
        },
        {
            question: "How should I categorize my expenses?",
            answer: "We recommend separating fixed costs (like rent and insurance) from variable costs (like groceries and gas) to get a better view of your spending flexibility."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Monthly Expense Tracker'}
                description={calc?.description || 'Track and categorize your monthly spending habits.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                    {expenses.map((exp) => (
                        <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'center' }}>
                            <input
                                type="text"
                                className="input"
                                placeholder="Category"
                                value={exp.category}
                                onChange={(e) => updateExpense(exp.id, 'category', e.target.value)}
                                style={{ width: '100%' }}
                            />
                            <input
                                type="number"
                                className="input"
                                placeholder="Amount"
                                value={exp.amount}
                                onChange={(e) => updateExpense(exp.id, 'amount', e.target.value)}
                                style={{ width: '100%' }}
                            />
                            <button
                                onClick={() => removeExpense(exp.id)}
                                style={{ background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        onClick={addExpense}
                        style={{ padding: '0.6rem 1.25rem', borderRadius: '0.5rem', border: '1px solid var(--color-primary)', background: 'transparent', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}
                    >
                        + Add Expense
                    </button>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: 'block' }}>Estimated Total:</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>${calculateTotal()}</span>
                    </div>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                    <ResultCard
                        title="Monthly Spending Estimate"
                        value={`$${calculateTotal()}`}
                        subtitle="Based on currently entered items"
                        color="primary"
                        highlight
                    />
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Monthly Expense Tracker"
                howToUse="To gain control of your finances, enter your various 'Categories' (e.g., Rent, Groceries) and their corresponding 'Amounts'. You can add as many rows as needed with the '+ Add Expense' button. The tool instantly aggregates your spending and displays a high-fidelity 'Monthly Spending Estimate'. You can remove items or update values in real-time to simulate different budget scenarios."
                whyUse="Our Monthly Expense Tracker is a professional-grade budgeting utility designed for absolute transparency and financial mindfulness. It removes the complexity of spreadsheets by providing a clean, stable interface for listing and totaling your monthly overhead. The 'elite' design features glassmorphic input cards and smooth UI transitions that make financial tracking feel modern and rewarding. It is a completely free, privacy-focused resource where your personal financial data never leaves your device. Whether you're auditing your lifestyle or planning for savings, this tool delivers professional-level insights."
            />
        </div>
    );
}
