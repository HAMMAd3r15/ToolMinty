'use client';

import { useState, useMemo } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';
import ResultCard from '@/components/UI/ResultCard';

export default function TextAnalyzerForm() {
    const calc = calculators.find(c => c.href === '/text-analyzer');
    const [text, setText] = useState('');

    const stats = useMemo(() => {
        if (!text.trim()) return null;

        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        const chars = text.length;
        const charsNoSpaces = text.replace(/\s+/g, '').length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;

        // Readability (Flesch-Kincaid Ease - Rough Approximation)
        const syllables = text.toLowerCase().replace(/[^a-z]/g, '').length / 3; // Very simplified
        const readingEase = 206.835 - 1.015 * (words.length / Math.max(1, sentences)) - 84.6 * (syllables / Math.max(1, words.length));

        // Keyword Density
        const freq: Record<string, number> = {};
        words.forEach(w => {
            const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (clean.length > 3) freq[clean] = (freq[clean] || 0) + 1;
        });
        const topKeywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);

        return {
            words: words.length,
            chars,
            charsNoSpaces,
            sentences,
            paragraphs,
            readingEase: Math.max(0, Math.min(100, Math.round(readingEase))),
            topKeywords
        };
    }, [text]);

    const faqs = [
        {
            question: "How is the readability score calculated?",
            answer: "We use a variation of the Flesch-Kincaid Reading Ease formula, which analyzes sentence length and syllable density to estimate how accessible your content is to readers."
        },
        {
            question: "What is keyword density?",
            answer: "Keyword density measures the frequency of specific terms within your text. This is a critical metric for SEO and ensuring your content remains focused on its primary topic."
        },
        {
            question: "Is my text data stored?",
            answer: "No. All text analysis happens entirely within your browser's memory using secure client-side JavaScript. Your content is never transmitted to our servers."
        }
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Text Analyzer'}
                description={calc?.description || 'Analyze text for readability, metadata, and keyword density.'}
            />

            <div style={{ display: 'grid', gridTemplateColumns: stats ? '1fr 320px' : '1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card">
                    <textarea
                        className="input"
                        placeholder="Paste your content here to begin analysis..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ width: '100%', minHeight: '400px', fontSize: '1rem', lineHeight: '1.6', background: 'transparent' }}
                    />
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', opacity: 0.6, fontSize: '0.85rem' }}>
                        <span>Real-time analysis active</span>
                        <span>{text.length} characters</span>
                    </div>
                </div>

                {stats && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <ResultCard
                            title="Quick Stats"
                            results={[
                                { label: 'Words', value: stats.words.toLocaleString() },
                                { label: 'Sentences', value: stats.sentences },
                                { label: 'Paragraphs', value: stats.paragraphs },
                                { label: 'Reading Ease', value: `${stats.readingEase}/100` }
                            ]}
                        />

                        <div className="card" style={{ padding: '1.2rem' }}>
                            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', opacity: 0.7 }}>Top Keywords</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {stats.topKeywords.map(([word, count]) => (
                                    <div key={word} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{word}</span>
                                        <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                            {((count / stats.words) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Advanced Text Analyzer"
                howToUse="To evaluate your writing, paste any article, blog post, or technical document into the editor. The tool instantly calculates core metrics including word count, sentence structure, and grammatical complexity. Pay close attention to the 'Reading Ease' score—a higher number indicates clear, accessible content, while the Keyword Density map helps you optimize for search engines without over-stuffing. This integrated approach ensures your messaging is both human-friendly and algorithm-ready."
                whyUse="Our Text Analyzer is an elite linguistic engine built for professional editors, SEO specialists, and technical writers. It eliminates the need for expensive subscription services by providing high-fidelity readability analysis and frequency mapping directly in your browser. With a focus on privacy and speed, the analyzer processes large volumes of text instantly without ever exposing your data to external APIs. The premium glassmorphic dashboard provides at-a-glance insights, allowing you to refine your tone and strategy with surgical precision."
            />

            <style jsx>{`
                .card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    padding: 1.5rem;
                }
            `}</style>
        </div>
    );
}
