'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function TextReverserForm() {
    const calc = calculators.find(c => c.href === '/text-reverser');
    const [text, setText] = useState('');
    const [mode, setMode] = useState<'chars' | 'words'>('chars');

    const reverseText = () => {
        if (!text) return '';
        if (mode === 'chars') {
            return text.split('').reverse().join('');
        } else {
            return text.split(/\s+/).reverse().join(' ');
        }
    };

    const reversed = reverseText();

    const faqs = [
        {
            question: "What is the difference between reversing characters and words?",
            answer: "Character reversal flips the entire string backward ('hello' becomes 'olleh'). Word reversal keeps the words themselves intact but puts the last word first ('hello world' becomes 'world hello')."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Text Reverser'}
                description={calc?.description || 'Instantly reverse any text character by character or word by word.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <textarea
                    className="input"
                    placeholder="Enter text to reverse..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: '100%', minHeight: '150px', marginBottom: '1.5rem' }}
                />

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setMode('chars')}
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '0.5rem',
                            background: mode === 'chars' ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                            color: mode === 'chars' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                            border: '1px solid var(--color-border)', cursor: 'pointer'
                        }}
                    >
                        Reverse Characters
                    </button>
                    <button
                        onClick={() => setMode('words')}
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '0.5rem',
                            background: mode === 'words' ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                            color: mode === 'words' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                            border: '1px solid var(--color-border)', cursor: 'pointer'
                        }}
                    >
                        Reverse Words
                    </button>
                </div>

                {reversed && (
                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="input"
                            readOnly
                            value={reversed}
                            style={{ width: '100%', minHeight: '150px', background: 'rgba(0,0,0,0.1)', color: 'var(--color-primary)', fontWeight: 600 }}
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(reversed)}
                            style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', background: 'var(--color-primary)', border: 'none', color: 'var(--color-on-primary)', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Text Reverser"
                howToUse="To flip your text, type or paste your content into the input field. Choose between 'Reverse Characters' for a full string flip or 'Reverse Words' to keep words intact but change their order. The result appears instantly in a premium result card with a dedicated 'Copy' button. This automated process allows you to create unique text effects or debug string sequences with absolute ease and precision."
                whyUse="Our Text Reverser is an 'elite' string manipulation utility designed for developers, creators, and puzzle enthusiasts who demand a stable and reliable platform. The high-fidelity interface features glassmorphic design elements and responsive action zones that make simple text tasks feel premium and sophisticated. It is a free, privacy-oriented tool that processes all text transformations locally in your browser, ensuring your creative thoughts remain secure and private at all times."
            />
        </div>
    );
}
