'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import CustomSelect from '@/components/UI/CustomSelect';
import FAQSection from '@/components/UI/FAQSection';
import Button from '@/components/UI/Button';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const UNITS = [
    { label: 'Bits (b)', value: 'bits' },
    { label: 'Bytes (B)', value: 'bytes' },
    { label: 'Kilobytes (KB)', value: 'kb' },
    { label: 'Megabytes (MB)', value: 'mb' },
    { label: 'Gigabytes (GB)', value: 'gb' },
    { label: 'Terabytes (TB)', value: 'tb' },
    { label: 'Petabytes (PB)', value: 'pb' }
];

export default function FileSizeConverterPage() {
    const calculator = calculators.find(c => c.href === '/file-size-converter')!;
    const [inputValue, setInputValue] = useState<string>('1');
    const [fromUnit, setFromUnit] = useState<string>('mb');
    const [toUnit, setToUnit] = useState<string>('kb');
    const [isBinary, setIsBinary] = useState<boolean>(true);
    const [result, setResult] = useState<number>(0);
    const [copyStatus, setCopyStatus] = useState<string>('Copy Result');

    useEffect(() => {
        calculateResult();
    }, [inputValue, fromUnit, toUnit, isBinary]);

    const calculateResult = () => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) {
            setResult(0);
            return;
        }

        const base = isBinary ? 1024 : 1000;
        const exponents: Record<string, number> = {
            'bits': -1 / 8,
            'bytes': 0,
            'kb': 1,
            'mb': 2,
            'gb': 3,
            'tb': 4,
            'pb': 5
        };

        let bytes = 0;
        if (fromUnit === 'bits') {
            bytes = value / 8;
        } else {
            bytes = value * Math.pow(base, exponents[fromUnit]);
        }

        let finalResult = 0;
        if (toUnit === 'bits') {
            finalResult = bytes * 8;
        } else {
            finalResult = bytes / Math.pow(base, exponents[toUnit]);
        }

        setResult(finalResult);
    };

    const handleCopy = () => {
        const text = `${inputValue} ${fromUnit.toUpperCase()} = ${result.toLocaleString(undefined, { maximumFractionDigits: 8 })} ${toUnit.toUpperCase()}`;
        navigator.clipboard.writeText(text);
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy Result'), 2000);
    };

    const faqs = [
        {
            question: "What is the difference between Binary and Decimal units?",
            answer: "Binary units (used by operating systems like Windows) use a base of 1024 (2^10), while Decimal units (often used by storage manufacturers) use a base of 1000 (10^3). This is why a '1TB' drive often shows as ~931GB in Windows."
        },
        {
            question: "What are KiB, MiB, and GiB?",
            answer: "These are 'IEC' units specifically designed to refer to binary multiples (1024). KB, MB, and GB are technically SI units (1000), though they are often used interchangeably with binary units in software."
        },
        {
            question: "How many bits are in a byte?",
            answer: "There are exactly 8 bits in 1 byte."
        }
    ];

    return (
        <ToolLayout calculator={calculator}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <ToolHeader
                    title={calculator.title}
                    description={calculator.description}
                />

                <div className="card" style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {/* Mode Switcher - Premium Segmented Control */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Calculation Mode</label>
                            <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.08)', padding: '0.35rem' }}>
                                <button
                                    onClick={() => setIsBinary(true)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: '0.75rem',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        background: isBinary ? 'var(--color-secondary)' : 'transparent',
                                        color: isBinary ? 'white' : 'rgba(255,255,255,0.5)',
                                        boxShadow: isBinary ? '0 4px 15px rgba(129, 140, 248, 0.3)' : 'none',
                                    }}
                                >
                                    Binary (Base 1024)
                                </button>
                                <button
                                    onClick={() => setIsBinary(false)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: '0.75rem',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        background: !isBinary ? 'var(--color-secondary)' : 'transparent',
                                        color: !isBinary ? 'white' : 'rgba(255,255,255,0.5)',
                                        boxShadow: !isBinary ? '0 4px 15px rgba(129, 140, 248, 0.3)' : 'none',
                                    }}
                                >
                                    Decimal (Base 1000)
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
                            <div className="input-group" style={{ margin: 0 }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Value</label>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="input"
                                    placeholder="e.g. 1024"
                                    style={{ fontSize: '1.1rem', fontWeight: 600 }}
                                />
                            </div>
                            <div className="input-group" style={{ margin: 0 }}>
                                <CustomSelect
                                    label="From Unit"
                                    options={UNITS}
                                    value={fromUnit}
                                    onChange={setFromUnit}
                                />
                            </div>
                            <div className="input-group" style={{ margin: 0 }}>
                                <CustomSelect
                                    label="To Unit"
                                    options={UNITS}
                                    value={toUnit}
                                    onChange={setToUnit}
                                />
                            </div>
                        </div>

                        {(parseFloat(inputValue) > 0 || inputValue !== '') && (
                            <div style={{ marginTop: '1rem', animation: 'fadeIn 0.5s ease-out' }}>
                                <ResultCard
                                    title="Calculation Result"
                                    value={`${result.toLocaleString(undefined, { maximumFractionDigits: 8 })} ${UNITS.find(u => u.value === toUnit)?.label.split(' ')[0]}`}
                                    highlight
                                    color="primary"
                                    subtitle={`${inputValue || '0'} ${UNITS.find(u => u.value === fromUnit)?.label.split(' ')[0]} converted in ${isBinary ? 'Binary' : 'Decimal'} mode.`}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Button
                                onClick={handleCopy}
                                variant="primary"
                                style={{ flex: 1, minWidth: '150px' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                                </svg>
                                {copyStatus}
                            </Button>
                            <Button
                                onClick={() => { setInputValue('1'); setFromUnit('mb'); setToUnit('kb'); }}
                                variant="secondary"
                                style={{ flex: 1, minWidth: '150px' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                    <path d="M23 4v6h-6" />
                                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                </svg>
                                Reset Tool
                            </Button>
                        </div>
                    </div>
                </div>

                <FAQSection items={faqs} />

                <EliteSEOCards
                    toolName="File Size Converter"
                    howToUse="To convert file sizes, enter your numeric value in the 'Value' field, then select your starting unit in the 'From Unit' dropdown (e.g., Megabytes). Select the target unit in the 'To Unit' dropdown (e.g., Kilobytes). Choose between 'Binary (Base 1024)' mode for how operating systems measure sizes, or 'Decimal (Base 1000)' for how storage manufacturers advertise space. The converted result appears instantly. Click 'Copy Result' to copy it to your clipboard."
                    whyUse="Our File Size Converter is an essential technical utility for developers, IT professionals, and power users who frequently work with storage, bandwidth, and data values. The ability to switch between Binary and Decimal modes is a critical feature that most converters lack, yet it explains the common discrepancy between a drive's advertised size and what your OS reports. The elite, segmented-control interface makes this distinction intuitive and clear. It's completely free, works instantly in your browser, and always produces accurate results."
                />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </ToolLayout>
    );
}
