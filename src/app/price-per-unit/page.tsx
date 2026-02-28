'use client';

import { useState, useMemo } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

interface Item {
    id: string;
    name: string;
    price: string;
    quantity: string;
    unit: string;
}

export default function PricePerUnit() {
    const [items, setItems] = useState<Item[]>([
        { id: '1', name: 'Item 1', price: '', quantity: '', unit: '' },
        { id: '2', name: 'Item 2', price: '', quantity: '', unit: '' },
    ]);

    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), name: `Item ${items.length + 1}`, price: '', quantity: '', unit: '' }]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const updateItem = (id: string, field: keyof Item, value: string) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const results = useMemo(() => {
        return items.map(item => {
            const p = parseFloat(item.price);
            const q = parseFloat(item.quantity);
            const ppu = (p && q) ? p / q : null;
            return { ...item, ppu };
        });
    }, [items]);

    const bestPpu = useMemo(() => {
        const validPpus = results.map(r => r.ppu).filter((ppu): ppu is number => ppu !== null);
        return validPpus.length > 0 ? Math.min(...validPpus) : null;
    }, [results]);

    const calc = calculators.find(c => c.href === '/price-per-unit');

    const faqs = [
        { question: "How do I use the Price Per Unit calculator?", answer: "Enter the price and quantity for two or more items. The calculator will automatically determine the cost per unit for each. The item with the lowest unit price will be highlighted as the 'Best Deal'." },
        { question: "Why is calculating price per unit important?", answer: "Packaging can be deceptive. A larger 'family size' pack isn't always cheaper than two smaller ones. Calculating price per unit helps you find the true value and save money during shopping." },
        { question: "What units should I use?", answer: "You can use any unit (grams, ounces, milliliters, counts), but ensure you use the same unit for all items being compared for an accurate result." },
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Price Per Unit Calculator'} description={calc?.description || ''} />

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                {results.map((item, index) => {
                    const isBest = item.ppu !== null && item.ppu === bestPpu && results.filter(r => r.ppu !== null).length > 1;
                    return (
                        <div key={item.id} className="card" style={{
                            position: 'relative',
                            border: isBest ? '2px solid var(--color-secondary)' : '1px solid var(--color-border)',
                            transition: 'all 0.3s ease'
                        }}>
                            {isBest && (
                                <div style={{
                                    position: 'absolute', top: '-12px', right: '20px',
                                    background: 'var(--color-secondary)', color: 'white',
                                    padding: '2px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700
                                }}>
                                    🏆 BEST DEAL
                                </div>
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.8fr 40px', gap: '1rem', alignItems: 'end' }}>
                                <div>
                                    <label className="label">Item Name</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={item.name}
                                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                        placeholder="e.g. Brand A"
                                    />
                                </div>
                                <div>
                                    <label className="label">Price ($)</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="label">Quantity</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                                        placeholder="1"
                                    />
                                </div>
                                <div>
                                    <label className="label">Unit</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={item.unit}
                                        onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                                        placeholder="e.g. oz, g"
                                    />
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    style={{
                                        height: '3.5rem', width: '3.5rem', borderRadius: '0.75rem',
                                        background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                                        border: 'none', cursor: 'pointer', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                                    }}
                                    title="Remove Item"
                                >
                                    ✕
                                </button>
                            </div>

                            {item.ppu !== null && (
                                <div style={{
                                    marginTop: '1.5rem', padding: '1rem', background: 'var(--color-bg)',
                                    borderRadius: '0.75rem', border: '1px solid var(--color-border)',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Price Per Unit:</span>
                                    <span style={{ fontWeight: 700, fontSize: '1.2rem', color: isBest ? 'var(--color-secondary)' : 'var(--color-text-primary)' }}>
                                        ${item.ppu.toFixed(3)} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>/ {item.unit || 'unit'}</span>
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                onClick={addItem}
                className="btn btn-secondary"
                style={{ width: '100%', marginBottom: '2.5rem', borderStyle: 'dashed' }}
            >
                + Add Another Item
            </button>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Price Per Unit Calculator"
                howToUse="Start by entering the name, total price, and total quantity for at least two products you wish to compare. You can also specify the unit of measurement (like grams, liters, or pieces) for better clarity. As you type, the tool instantly calculates the 'Price Per Unit' for each item. Once multiple items have data, the smart algorithm automatically highlights the item with the lowest unit price with a 'Best Deal' badge, helping you make the most cost-effective choice in seconds."
                whyUse="Savvy shoppers know that 'larger' doesn't always mean 'cheaper'. Retailers often use varied packaging sizes and confusing bulk deals to make it difficult to spot the best value. Our Price Per Unit Calculator levels the playing field, providing a high-precision comparison tool that works for groceries, office supplies, business inventory, and more. With its premium 'elite' interface and real-time computation, it's designed for quick use on your phone while in the aisle or at your desk during procurement planning."
            />
        </div>
    );
}
