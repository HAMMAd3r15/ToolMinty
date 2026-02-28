'use client';

import { useState, useMemo } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function MarkdownPreviewerForm() {
    const calc = calculators.find(c => c.href === '/markdown-previewer');
    const [markdown, setMarkdown] = useState('# Hello World\n\nStart typing **Markdown** here to see the preview.\n\n- List item 1\n- List item 2\n\n```javascript\nconsole.log("Success");\n```');

    const htmlPreview = useMemo(() => {
        if (!markdown) return '';

        // Extremely basic markdown parser (for preview only)
        let html = markdown
            .replace(/^# (.*)/gm, '<h1>$1</h1>')
            .replace(/^## (.*)/gm, '<h2>$1</h2>')
            .replace(/^### (.*)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*)\*/g, '<em>$1</em>')
            .replace(/^- (.*)/gm, '<li>$1</li>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\n\n/g, '<br/>');

        return html;
    }, [markdown]);

    const faqs = [
        {
            question: "What is Markdown?",
            answer: "Markdown is a lightweight markup language with plain-text formatting syntax. It is widely used by developers for documentation, README files, and static site content."
        },
        {
            question: "Does this support standard GFM?",
            answer: "It supports basic Github Flavored Markdown (GFM) elements including headers, bold/italic text, lists, and code blocks for quick visual validation."
        },
        {
            question: "Is my documentation private?",
            answer: "Yes. The preview generation happens locally in your browser session. Your markdown content is never sent to a server for processing."
        }
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Markdown Previewer'}
                description={calc?.description || 'Write markdown and preview the rendered output in real-time.'}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card shadow-elite">
                    <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', opacity: 0.6 }}>Editor</h3>
                    <textarea
                        className="input"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        style={{ width: '100%', minHeight: '500px', fontFamily: 'monospace', fontSize: '0.95rem', background: 'transparent' }}
                    />
                </div>

                <div className="card shadow-elite" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', opacity: 0.6 }}>Live Preview</h3>
                    <div
                        className="markdown-body"
                        dangerouslySetInnerHTML={{ __html: htmlPreview }}
                        style={{ minHeight: '500px', color: 'rgba(255,255,255,0.9)', overflowY: 'auto' }}
                    />
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Elite Markdown Previewer"
                howToUse="To draft your technical documentation, use the left-hand editor to input standard Markdown syntax. The tool instantly renders the formatted HTML on the right, allowing you to verify visual hierarchy, code block indentation, and text styling in real-time. This dual-pane interface ensures your final document maintains professional standards before you commit to GitHub or your CMS."
                whyUse="Our Markdown Previewer is a high-fidelity utility built for documentation architects and open-source contributors who value zero-latency feedback. By utilizing local JavaScript for rendering, it guarantees that your sensitive docs remain entirely private. The glassmorphic design system and high-contrast typography make for an elite drafting experience that feels superior to standard browser default editors. It is a completely free, privacy-focused resource tailored for modern development workflows."
            />

            <style jsx>{`
                .card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    padding: 1.5rem;
                }
                .shadow-elite {
                    box-shadow: 0 10px 40px rgba(0,0,0,0.25);
                }
                .markdown-body :global(h1) { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; margin-bottom: 1rem; }
                .markdown-body :global(pre) { background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; font-family: monospace; }
                .markdown-body :global(li) { margin-left: 1.5rem; list-style-type: disc; }
            `}</style>
        </div>
    );
}
