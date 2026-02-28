'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function WordCounterForm() {
    const calc = calculators.find(c => c.href === '/word-counter');
    const [text, setText] = useState('');

    const stats = {
        words: text.trim().split(/\s+/).filter(w => w !== '').length,
        characters: text.length,
        charNoSpaces: text.replace(/\s/g, '').length,
        lines: text.split('\n').filter(l => l !== '').length,
        readingTime: Math.ceil(text.trim().split(/\s+/).filter(w => w !== '').length / 200)
    };

    const faqs = [
        {
            question: "How is reading time calculated?",
            answer: "It's based on an average human reading speed of 200 words per minute."
        },
        {
            question: "Does this count special characters?",
            answer: "Yes, the character count includes everything—spaces, punctuation, and special symbols."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Word Counter'}
                description={calc?.description || 'Count words, characters, and analyze text length instantly.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <textarea
                    className="input"
                    placeholder="Paste or type your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: '100%', minHeight: '300px', padding: '1.5rem', fontSize: '1.1rem', resize: 'vertical', lineHeight: '1.6' }}
                />

                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    <ResultCard title="Words" value={stats.words.toString()} />
                    <ResultCard title="Characters" value={stats.characters.toString()} />
                    <ResultCard title="Lines" value={stats.lines.toString()} />
                    <ResultCard title="Read Time" value={`~${stats.readingTime} min`} color="secondary" />
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Word Counter"
                howToUse="To analyze your content, simply paste or type your text into the expandable input area. The tool instantly calculates total words, characters, and estimated reading time. Results are displayed in high-fidelity cards that update with every keystroke, ensuring you hit your exact length targets without any manual refreshing. This automated process provides a professional-grade baseline for bloggers, students, and SEO specialists."
                whyUse="Our Word Counter is an 'elite' text analysis utility designed for absolute precision and a premium user experience. It provides a stable and reliable count that distinguishes between total characters and character density, helping you optimize your content for any platform. The high-fidelity interface features clean, responsive design and glassmorphic panels that make editing a distraction-free experience. It is a completely free, privacy-focused tool that processes all text locally, guaranteeing your sensitive content remains entirely secure."
            />
        </div>
    );
}
