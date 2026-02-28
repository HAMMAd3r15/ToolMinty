'use client';

import { useState, useMemo } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';
import ResultCard from '@/components/UI/ResultCard';

export default function HexConverterForm() {
    const calc = calculators.find(c => c.href === '/hex-converter');
    const [hexValue, setHexValue] = useState('1A2F');
    const [colorHex, setColorHex] = useState('#2563eb');

    const numResults = useMemo(() => {
        try {
            const dec = parseInt(hexValue, 16);
            if (isNaN(dec)) throw new Error();
            return {
                decimal: dec.toLocaleString(),
                binary: dec.toString(2),
                octal: dec.toString(8)
            };
        } catch {
            return null;
        }
    }, [hexValue]);

    const colorResults = useMemo(() => {
        let hex = colorHex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
        if (hex.length !== 6) return null;

        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);

        // RGB to HSL
        const r1 = r / 255, g1 = g / 255, b1 = b / 255;
        const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r1: h = (g1 - b1) / d + (g1 < b1 ? 6 : 0); break;
                case g1: h = (b1 - r1) / d + 2; break;
                case b1: h = (r1 - g1) / d + 4; break;
            }
            h /= 6;
        }

        return {
            rgb: `rgb(${r}, ${g}, ${b})`,
            hsl: `hsl(${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
            values: { r, g, b }
        };
    }, [colorHex]);

    const faqs = [
        {
            question: "What is a HEX converter?",
            answer: "A HEX converter allows you to translate hexadecimal (base-16) values—commonly used in programming and digital design—into more readable decimal, binary, or color formats."
        },
        {
            question: "How do HEX color codes work?",
            answer: "HEX color codes are six-character strings where each pair represents the intensity of Red, Green, and Blue light. For example, #FF0000 is pure red."
        },
        {
            question: "Can I convert large numbers?",
            answer: "Yes, our numeric converter supports massive hexadecimal strings, providing accurate decimal and binary representations instantly for computer science applications."
        }
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'HEX Converter'}
                description={calc?.description || 'Convert hexadecimal values to decimal, binary, or high-fidelity color formats.'}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card-elite">
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.6 }}>Numeric HEX to DEC/BIN</h3>
                    <input
                        className="input-elite"
                        value={hexValue}
                        onChange={(e) => setHexValue(e.target.value.toUpperCase().replace(/[^0-9A-F]/g, ''))}
                        placeholder="e.g. 7A"
                        style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}
                    />
                    {numResults ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="result-row"><span>Decimal</span><strong>{numResults.decimal}</strong></div>
                            <div className="result-row"><span>Binary</span><strong style={{ fontSize: '0.8rem', wordWrap: 'break-word', maxWidth: '200px' }}>{numResults.binary}</strong></div>
                            <div className="result-row"><span>Octal</span><strong>{numResults.octal}</strong></div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#ff4d4d', opacity: 0.8 }}>Invalid HEX sequence</div>
                    )}
                </div>

                <div className="card-elite">
                    <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.6 }}>Color HEX to RGB/HSL</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: colorHex, border: '2px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                        <input
                            className="input-elite"
                            value={colorHex}
                            onChange={(e) => {
                                let val = e.target.value;
                                if (!val.startsWith('#')) val = '#' + val;
                                setColorHex(val.slice(0, 7));
                            }}
                            style={{ fontSize: '1.5rem', fontWeight: 700, flex: 1 }}
                        />
                    </div>
                    {colorResults ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="result-row"><span>RGB</span><strong>{colorResults.rgb}</strong></div>
                            <div className="result-row"><span>HSL</span><strong>{colorResults.hsl}</strong></div>
                            <div className="result-row" style={{ marginTop: '0.5rem' }}>
                                <div style={{ flex: 1, textAlign: 'center' }}><div style={{ fontSize: '0.7rem', opacity: 0.5 }}>R</div><strong>{colorResults.values.r}</strong></div>
                                <div style={{ flex: 1, textAlign: 'center' }}><div style={{ fontSize: '0.7rem', opacity: 0.5 }}>G</div><strong>{colorResults.values.g}</strong></div>
                                <div style={{ flex: 1, textAlign: 'center' }}><div style={{ fontSize: '0.7rem', opacity: 0.5 }}>B</div><strong>{colorResults.values.b}</strong></div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#ff4d4d', opacity: 0.8 }}>Invalid color HEX (#RRGGBB)</div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Advanced HEX conversion suite"
                howToUse="To convert mathematical values, enter your base-16 string into the numeric input. To analyze digital aesthetics, input a six-digit hex color code. The system instantly visualizes decimal equivalents for complex calculations and generates high-fidelity RGB/HSL color mappings for UI/UX design. These integrated workflows ensure that whether you are debugging embedded code or drafting a brand palette, your technical data maintains absolute precision and visual clarity."
                whyUse="Our HEX Converter is an elite-tier utility crafted for computer scientists and digital designers who demand both functional versatility and data privacy. By processing massive numeric strings and complex color spaces locally in your browser, it eliminates the risks associated with cloud-based tools. The interface features a premium glassmorphic aesthetic paired with high-contrast typography, offering a sophisticated conversion experience that is as beautiful as it is technically accurate. It is a completely free, professional-grade resource tailored for the modern digital architect."
            />

            <style jsx>{`
                .card-elite {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 28px;
                    padding: 2.2rem;
                }
                .input-elite {
                    width: 100%;
                    padding: 1.2rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 16px;
                    color: var(--color-primary);
                    outline: none;
                    transition: border 0.3s;
                }
                .input-elite:focus { border-color: var(--color-primary); }
                .result-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.4rem;
                    background: rgba(255,255,255,0.02);
                    border-radius: 14px;
                    border: 1px solid rgba(255,255,255,0.03);
                }
                .result-row span { font-size: 0.85rem; opacity: 0.6; }
                .result-row strong { font-family: 'Fira Code', monospace; font-size: 1.1rem; color: #fff; }
            `}</style>
        </div>
    );
}
