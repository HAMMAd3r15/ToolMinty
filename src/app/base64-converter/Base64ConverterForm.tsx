'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function Base64ConverterForm() {
    const calc = calculators.find(c => c.href === '/base64-converter');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleEncode = () => {
        try {
            setOutput(btoa(input));
        } catch (e) {
            setOutput('Error encoding: Ensure text contains only Latin-1 characters.');
        }
    };

    const handleDecode = () => {
        try {
            setOutput(atob(input));
        } catch (e) {
            setOutput('Error decoding: Invalid Base64 string.');
        }
    };

    const faqs = [
        {
            question: "What is Base64?",
            answer: "Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string format. It is commonly used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data."
        },
        {
            question: "Is Base64 encryption?",
            answer: "No, Base64 is an encoding format, not a security or encryption method. Anyone can easily decode Base64 back to its original form."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Base64 Converter'}
                description={calc?.description || 'Convert any text to and from Base64 format securely.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Input</label>
                    <textarea
                        className="input"
                        placeholder="Text or Base64 string..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ width: '100%', minHeight: '120px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        onClick={handleEncode}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Encode to Base64
                    </button>
                    <button
                        onClick={handleDecode}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-secondary)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Decode from Base64
                    </button>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Output</label>
                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="input"
                            readOnly
                            value={output}
                            style={{ width: '100%', minHeight: '120px', background: 'rgba(0,0,0,0.1)' }}
                        />
                        {output && (
                            <button
                                onClick={() => navigator.clipboard.writeText(output)}
                                style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                            >
                                Copy
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Base64 Converter"
                howToUse="To transform your data, enter your plain text or Base64 string into the input field. Use the 'Encode' button to convert text into a stable Base64 string, or the 'Decode' button to revert Base64 back to readable text. The results appear instantly in a secondary high-fidelity card with a built-in 'Copy' feature for seamless integration into your workflow."
                whyUse="Our Base64 Converter is an 'elite' utility designed for developers and data professionals which require a reliable way to handle binary-to-text encoding. Unlike basic tools, it provides a stable and secure environment that processes all conversions locally in your browser. The premium interface features glassmorphism and responsive design, making data transformation a sophisticated and frictionless experience. It is a completely free, privacy-focused tool that ensures your sensitive data never leaves your device."
            />
        </div>
    );
}
