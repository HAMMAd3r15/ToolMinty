'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function BinaryConverter() {
    const [text, setText] = useState<string>('');
    const [binary, setBinary] = useState<string>('');

    const convertToBinary = (val: string) => {
        setText(val);
        const encoded = val.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
        setBinary(encoded);
    };

    const convertToText = (val: string) => {
        setBinary(val);
        try {
            const decoded = val.trim().split(/\s+/).map(bin => {
                if (bin.length === 0) return '';
                return String.fromCharCode(parseInt(bin, 2));
            }).join('');
            setText(decoded);
        } catch (e) {
            // Silently fail for invalid binary
        }
    };

    const faqs = [
        {
            question: "What is Binary?",
            answer: "Binary is a base-2 number system that uses only two digits: 0 and 1. It is the fundamental language of computers, representing the 'on' and 'off' states of transistors."
        },
        {
            question: "How does text become binary?",
            answer: "Each character is assigned a numeric value (ASCII or Unicode). That number is then converted from decimal (base-10) to binary (base-2)."
        },
        {
            question: "What is an 8-bit group?",
            answer: "Standard ASCII characters are often represented in 8-bit groups (1 byte). For example, the letter 'A' is 01000001 in binary."
        }
    ];

    const calc = calculators.find(c => c.href === '/binary-converter');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Binary to Text Converter'}
                description={calc?.description || 'Convert readable text into binary code and back again.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Readable Text</label>
                        <textarea
                            className="input"
                            value={text}
                            onChange={(e) => convertToBinary(e.target.value)}
                            placeholder="Type text here..."
                            style={{ width: '100%', minHeight: '120px', resize: 'vertical', padding: '1rem' }}
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>⇅</div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Binary Code (0 and 1)</label>
                        <textarea
                            className="input"
                            value={binary}
                            onChange={(e) => convertToText(e.target.value)}
                            placeholder="Type binary here (e.g. 01001000)..."
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                resize: 'vertical',
                                padding: '1rem',
                                letterSpacing: '0.1em',
                                fontFamily: 'monospace'
                            }}
                        />
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Binary to Text Converter"
                howToUse="To convert between text and binary, simply type your message into the 'Readable Text' box to see the 8-bit binary code generated instantly. Conversely, you can paste binary code into the 'Binary Code' box to translate it back into readable text. The tool handles the conversion in real-time bit-by-bit, ensuring absolute accuracy for every character. This bi-directional process is perfect for students, developers, or anyone curious about the fundamental language of digital systems."
                whyUse="Our Binary to Text Converter is a professional-grade utility designed for speed and technical precision. Instead of manually translating ASCII values or using complex command-line tools, this web-based assistant provides a stable and reliable way to encode and decode information in seconds. The 'elite' design features a high-fidelity interface with monospace typography and responsive input zones that make technical data entry feel premium. It is a completely free, privacy-focused tool that performs all calculations locally in your browser, keeping your data secure while delivering a modern and streamlined user experience."
            />
        </div>
    );
}
