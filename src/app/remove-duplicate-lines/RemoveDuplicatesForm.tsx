'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function RemoveDuplicatesForm() {
    const calc = calculators.find(c => c.href === '/remove-duplicate-lines');
    const [text, setText] = useState('');

    const processText = () => {
        if (!text) return { result: '', originalLines: 0, removedCount: 0 };
        const lines = text.split('\n');
        const uniqueLines = Array.from(new Set(lines));
        return {
            result: uniqueLines.join('\n'),
            originalLines: lines.length,
            removedCount: lines.length - uniqueLines.length
        };
    };

    const { result, originalLines, removedCount } = processText();

    const faqs = [
        {
            question: "Does it remove blank lines?",
            answer: "If blank lines are identical, they will be collapsed into a single blank line. If you want to remove all blank lines entirely, you would need a different filter tool."
        },
        {
            question: "Is it case-sensitive?",
            answer: "Yes, this version is case-sensitive. 'Apple' and 'apple' would be considered distinct lines."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Remove Duplicate Lines'}
                description={calc?.description || 'Clean up your lists and data by removing all repeated text lines instantly.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <textarea
                    className="input"
                    placeholder="Paste your list here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: '100%', minHeight: '200px', marginBottom: '1.5rem' }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <ResultCard title="Original Lines" value={originalLines.toString()} />
                    <ResultCard title="Duplicates Removed" value={removedCount.toString()} color="secondary" />
                </div>

                {result && (
                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="input"
                            readOnly
                            value={result}
                            style={{ width: '100%', minHeight: '200px', background: 'rgba(0,0,0,0.1)', color: 'var(--color-primary)' }}
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(result)}
                            style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', background: 'var(--color-primary)', border: 'none', color: 'var(--color-on-primary)', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                            Copy Result
                        </button>
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Remove Duplicate Lines"
                howToUse="To clean your data, simply paste your list into the text area. The tool instantly scans the entire input, identifies repeated entries, and provides a unique list in real-time. You'll see high-fidelity result cards showing exactly how many lines were original and how many duplicates were removed. Use the 'Copy Result' button to get your cleaned data back into your clipboard with absolute precision."
                whyUse="Our Duplicate Line Remover is an 'elite' data-cleaning utility designed for productivity and reliability. It provides a stable and fast way to manage large lists without the need for complex spreadsheet formulas. The premium user interface features glassmorphism and responsive feedback that make data management feel modern and sophisticated. It is a completely free, privacy-focused tool that ensures your personal lists are processed locally on your device, giving you total control over your data."
            />
        </div>
    );
}
