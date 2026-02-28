'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function CsvToJsonForm() {
    const calc = calculators.find(c => c.href === '/csv-to-json-converter');
    const [csvInput, setCsvInput] = useState('name,age,city\nJohn,30,New York\nJane,25,London');
    const [jsonOutput, setJsonOutput] = useState('');
    const [error, setError] = useState('');

    const convertCsvToJson = () => {
        try {
            const lines = csvInput.trim().split('\n');
            if (lines.length < 2) {
                setError('CSV must contain at least a header row and one data row.');
                return;
            }

            const headers = lines[0].split(',').map(h => h.trim());
            const result = [];

            for (let i = 1; i < lines.length; i++) {
                const obj: any = {};
                const currentline = lines[i].split(',');

                headers.forEach((header, index) => {
                    let val = currentline[index]?.trim() || '';
                    // Try to parse numbers or booleans
                    if (!isNaN(Number(val)) && val !== '') {
                        obj[header] = Number(val);
                    } else if (val.toLowerCase() === 'true') {
                        obj[header] = true;
                    } else if (val.toLowerCase() === 'false') {
                        obj[header] = false;
                    } else {
                        obj[header] = val.replace(/^["']|["']$/g, ''); // Remove surrounding quotes
                    }
                });
                result.push(obj);
            }

            setJsonOutput(JSON.stringify(result, null, 4));
            setError('');
        } catch (err: any) {
            setError(`Error parsing CSV: ${err.message}`);
        }
    };

    const faqs = [
        {
            question: "How does the CSV to JSON conversion work?",
            answer: "The tool treats the first row of your CSV as object keys (headers) and subsequent rows as values. It then maps each row into a structured JSON array of objects."
        },
        {
            question: "Can I use semicolons instead of commas?",
            answer: "This version is optimized for standard comma-separated values (CSV). For best results, ensure your data uses commas as the primary delimiter."
        },
        {
            question: "Is my data privacy protected?",
            answer: "Yes. The conversion happens entirely within your browser's local memory using JavaScript. Your CSV data and the generated JSON are never transmitted to any external servers."
        }
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'CSV to JSON Converter'}
                description={calc?.description || 'Seamlessly transform your CSV data into structured JSON format for developers.'}
            />

            <div className="card-elite" style={{ marginBottom: '3rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Input CSV Data</label>
                    <textarea
                        className="input-elite"
                        value={csvInput}
                        onChange={(e) => setCsvInput(e.target.value)}
                        placeholder="Paste your CSV here (comma-separated)..."
                        style={{ width: '100%', minHeight: '200px', fontFamily: 'monospace', fontSize: '0.9rem' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={convertCsvToJson}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '12px',
                            background: 'var(--color-secondary)',
                            color: '#fff',
                            border: 'none',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.3s'
                        }}
                    >
                        Convert to JSON
                    </button>
                </div>

                {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

                {jsonOutput && (
                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="input-elite"
                            readOnly
                            value={jsonOutput}
                            style={{
                                width: '100%',
                                minHeight: '350px',
                                background: 'rgba(0,0,0,0.15)',
                                fontFamily: "'Fira Code', monospace",
                                fontSize: '0.9rem',
                                color: 'var(--color-primary)'
                            }}
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(jsonOutput)}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            Copy JSON
                        </button>
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Advanced CSV to JSON Data Engine"
                howToUse="To restructure your tabular data, paste your raw CSV into the input field. Ensure the first row contains descriptive headers for your properties. Click 'Convert to JSON' to instantly transform your rows into high-fidelity JSON objects. The engine automatically handles data types including numbers and booleans, providing code-ready output for your next web development project or API integration."
                whyUse="Our CSV to JSON Converter is an elite data utility designed for full-stack developers and data analysts who prioritize speed, accuracy, and security. By executing all parsing logic locally on your machine, it guarantees that sensitive business datasets are never exposed to the network. The premium glassmorphic interface paired with integrated type-detection makes data transform processes feel sophisticated and perfectly organized. It is a completely free, privacy-first resource built for high-performance development teams."
            />

            <style jsx>{`
                .card-elite {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 28px;
                    padding: 2.5rem;
                }
                .input-elite {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 16px;
                    padding: 1rem;
                    color: #fff;
                    outline: none;
                }

                @media (max-width: 768px) {
                    .card-elite {
                        padding: 1.5rem;
                        border-radius: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .card-elite {
                        padding: 1rem;
                    }
                    .input-elite {
                        padding: 0.75rem;
                        font-size: 0.85rem;
                    }
                }
            `}</style>
        </div>
    );
}
