'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function URLEncoderForm() {
    const calc = calculators.find(c => c.href === '/url-encoder-decoder');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleEncode = () => {
        try {
            setOutput(encodeURIComponent(input));
        } catch (e) {
            setOutput('Error encoding text');
        }
    };

    const handleDecode = () => {
        try {
            setOutput(decodeURIComponent(input));
        } catch (e) {
            setOutput('Error decoding text: invalid sequence');
        }
    };

    const faqs = [
        {
            question: "Why do URLs need encoding?",
            answer: "URLs can only contain a limited set of characters from the US-ASCII character set. Special characters like spaces or brackets must be converted into a 'percent-encoded' format to be valid."
        },
        {
            question: "What is encodeURIComponent vs encodeURI?",
            answer: "Our tool uses encodeURIComponent, which encodes all special characters including forward slashes, making it perfect for preparing query string parameters."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'URL Encoder / Decoder'}
                description={calc?.description || 'Safely encode or decode URL strings for web development and SEO tasks.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Input Text</label>
                    <textarea
                        className="input"
                        placeholder="Paste URL or text here..."
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
                        Encode URL
                    </button>
                    <button
                        onClick={handleDecode}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-secondary)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Decode URL
                    </button>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Result</label>
                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="input"
                            readOnly
                            value={output}
                            placeholder="Result will appear here..."
                            style={{ width: '100%', minHeight: '120px', background: 'rgba(0,0,0,0.1)' }}
                        />
                        {output && (
                            <button
                                onClick={() => navigator.clipboard.writeText(output)}
                                style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', fontSize: '0.8rem', cursor: 'pointer' }}
                            >
                                Copy
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="URL Encoder & Decoder"
                howToUse="To prepare your links, paste your URL or special characters into the input area. Click 'Encode URL' to safely escape characters for browser addresses, or 'Decode URL' to translate encoded percent sequences back into human-readable text. The result is displayed in a high-fidelity card with a 'Copy' function, allowing you to quickly move your data between development environments with absolute precision."
                whyUse="Our URL Encoder/Decoder is an 'elite' web development utility optimized for speed, reliability, and precision. It provides a stable and predictable way to handle URI components without the risk of common encoding errors. The premium user interface features glassmorphism and responsive design that makes technical tasks feel sophisticated and intuitive. It is a completely free, privacy-focused resource where all your URL transformations happen entirely on your machine, keeping your links and parameters secure."
            />
        </div>
    );
}
