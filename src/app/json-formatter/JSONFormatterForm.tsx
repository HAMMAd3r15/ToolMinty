'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function JSONFormatterForm() {
    const calc = calculators.find(c => c.href === '/json-formatter');
    const [jsonInput, setJsonInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [error, setError] = useState('');

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonOutput(JSON.stringify(parsed, null, 4));
            setError('');
        } catch (e: any) {
            setError(`Invalid JSON: ${e.message}`);
            setJsonOutput('');
        }
    };

    const handleMinify = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonOutput(JSON.stringify(parsed));
            setError('');
        } catch (e: any) {
            setError(`Invalid JSON: ${e.message}`);
            setJsonOutput('');
        }
    };

    const faqs = [
        {
            question: "Why use a JSON formatter?",
            answer: "Key benefits include making machine-readable JSON human-readable, validating syntax errors, and preparing data for documentation or debugging."
        },
        {
            question: "Is my data privacy protected?",
            answer: "Yes, this formatter works entirely client-side in your browser. Your JSON data is never sent to our servers."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'JSON Formatter'}
                description={calc?.description || 'Format messy JSON into a readable structure and validate its syntax.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <textarea
                        className="input"
                        placeholder="Paste your JSON here..."
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        style={{ width: '100%', minHeight: '180px', fontFamily: 'monospace', fontSize: '0.9rem' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={handleFormat}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Beautify / Format
                    </button>
                    <button
                        onClick={handleMinify}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-secondary)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Minify
                    </button>
                </div>

                {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}

                {jsonOutput && (
                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="input"
                            readOnly
                            value={jsonOutput}
                            style={{ width: '100%', minHeight: '250px', background: 'rgba(0,0,0,0.1)', fontFamily: 'monospace', fontSize: '0.9rem' }}
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(jsonOutput)}
                            style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="JSON Formatter & Validator"
                howToUse="To clean up your data, paste your messy or minified JSON into the input area. Click 'Beautify' to instantly organize it into a human-readable structure with proper indentation, or 'Minify' to compress it for production use. If there are syntax errors, the tool will provide a clear validation message in real-time. This automated process allows you to debug and document your data with absolute precision."
                whyUse="Our JSON Formatter is a professional-grade developer utility built for stability, speed, and privacy. By processing all data locally on your machine, it guarantees that your sensitive JSON structures are never transmitted over the network. The 'elite' interface features glassmorphic design elements and a high-fidelity editor experience that makes working with complex data feel premium and organized. It is a completely free, privacy-focused resource that delivers the professional performance needed for modern web development."
            />
        </div>
    );
}
