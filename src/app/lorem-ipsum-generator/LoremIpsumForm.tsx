'use client';

import { useState, useMemo, useEffect } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';
import CustomSelect from '@/components/UI/CustomSelect';

const LOREM_TEXT = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.",
    "Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.",
    "Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.",
    "Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.",
    "Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi.",
    "Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst."
];

export default function LoremIpsumForm() {
    const calc = calculators.find(c => c.href === '/lorem-ipsum-generator');
    const [count, setCount] = useState(3);
    const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const generatedText = useMemo(() => {
        if (!mounted) return "";

        let result = [];
        let totalNeeded = count;

        if (type === 'paragraphs') {
            for (let i = 0; i < totalNeeded; i++) {
                let p = [];
                let pLength = 4 + Math.floor(Math.random() * 4);
                for (let j = 0; j < pLength; j++) {
                    p.push(LOREM_TEXT[Math.floor(Math.random() * LOREM_TEXT.length)]);
                }
                result.push(p.join(' '));
            }
        } else if (type === 'sentences') {
            for (let i = 0; i < totalNeeded; i++) {
                result.push(LOREM_TEXT[Math.floor(Math.random() * LOREM_TEXT.length)]);
            }
        } else {
            let wordsArr = LOREM_TEXT.join(' ').split(' ');
            for (let i = 0; i < totalNeeded; i++) {
                result.push(wordsArr[Math.floor(Math.random() * wordsArr.length)]);
            }
        }

        let final = result.join(type === 'paragraphs' ? '\n\n' : ' ');
        if (startWithLorem && final.length > 0) {
            final = "Lorem ipsum dolor sit amet, " + final.charAt(0).toLowerCase() + final.slice(1);
        }
        return final;
    }, [count, type, startWithLorem, mounted]);

    const faqs = [
        {
            question: "What is Lorem Ipsum?",
            answer: "Lorem Ipsum is the standard placeholder text used in the design and printing industries. It mimics the natural distribution of letters in English, helping designers visualize layouts without being distracted by readable content."
        },
        {
            question: "Why use a specialized generator?",
            answer: "A generator allows you to customize the volume of text (paragraphs vs words) and ensures your placeholder data is consistent and professionally formatted."
        },
        {
            question: "Is this text copyright-free?",
            answer: "Yes, Lorem Ipsum is based on a Latin text from 45 BC and has been in the public domain for centuries. You can use it freely for any commercial or personal project."
        }
    ];

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Lorem Ipsum Generator'}
                description={calc?.description || 'Generate customized placeholder text for your design and development projects.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.7 }}>Quantity</label>
                        <input
                            type="number"
                            className="input"
                            value={count}
                            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 0))}
                            style={{ width: '100%', padding: '0.8rem' }}
                        />
                    </div>
                    <div>
                        <CustomSelect
                            label="Type"
                            value={type}
                            onChange={(val) => setType(val as any)}
                            options={[
                                { value: 'paragraphs', label: 'Paragraphs' },
                                { value: 'sentences', label: 'Sentences' },
                                { value: 'words', label: 'Words' }
                            ]}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem' }}>
                        <input
                            type="checkbox"
                            checked={startWithLorem}
                            onChange={(e) => setStartWithLorem(e.target.checked)}
                            id="start-lorem"
                        />
                        <label htmlFor="start-lorem" style={{ fontSize: '0.9rem', opacity: 0.8, cursor: 'pointer' }}>Start with "Lorem ipsum"</label>
                    </div>
                </div>

                <div>
                    <div
                        style={{
                            width: '100%',
                            minHeight: '350px',
                            padding: '1.5rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            whiteSpace: 'pre-wrap',
                            lineHeight: '1.8',
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.9)',
                            fontFamily: 'serif'
                        }}
                    >
                        {generatedText}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button
                            onClick={() => navigator.clipboard.writeText(generatedText)}
                            style={{
                                padding: '0.6rem 2rem',
                                borderRadius: '12px',
                                background: 'var(--color-secondary)',
                                color: '#fff',
                                border: 'none',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Copy Text
                        </button>
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Premium Lorem Ipsum Generator"
                howToUse="To generate assets for your UI mocks, select whether you need raw paragraphs, individual sentences, or a specific word count. Toggle the 'Start with Lorem' option to ensure a standard bibliographic appearance. The tool instantly renders the placeholder text in a high-fidelity editor. Click 'Copy Text' to move the data onto your clipboard for immediate use in Figma, Sketch, or your front-end codebase."
                whyUse="Our Lorem Ipsum Generator is an elite designer's utility that prioritizes both visual professionalism and developer speed. By providing granular control over text volume and starting strings, it allows for more realistic prototyping than generic online generators. The interface features a glassmorphic aesthetic paired with premium typography, ensuring that even your placeholder data generation process feels high-end. Built to run entirely locally in your browser, it guarantees 100% privacy and zero latency for your creative workflow."
            />

            <style jsx>{`
                .card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 2rem;
                }
                .input {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    outline: none;
                }

                @media (max-width: 768px) {
                    .card {
                        padding: 1.5rem;
                        border-radius: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .card {
                        padding: 1rem;
                    }
                    .input {
                        padding: 0.6rem !important;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
}
