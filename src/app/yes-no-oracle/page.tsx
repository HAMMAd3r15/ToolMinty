'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const YES_RESPONSES = [
    'YES! ✨', 'DEFINITELY YES! 🌟', 'ABSOLUTELY! 💫', 'WITHOUT A DOUBT! ⚡',
    'YES, GO FOR IT! 🚀', 'ALL SIGNS POINT TO YES! 🎯', 'THE COSMOS SAYS YES! 🌠',
];
const NO_RESPONSES = [
    'NO! ❌', 'DEFINITELY NOT! 🚫', 'THE ORACLE SAYS NO! 🔮',
    'NOT LIKELY! ⚠️', 'THE STARS SAY NO! 🌑', 'REFRAIN FROM THIS! 🛑',
];

export default function YesNoOracle() {
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState<{ text: string; isYes: boolean } | null>(null);
    const [isConsulting, setIsConsulting] = useState(false);
    const [orbKey, setOrbKey] = useState(0);

    const consult = () => {
        if (!question.trim()) return;
        setIsConsulting(true);
        setResult(null);
        setOrbKey(k => k + 1);
        setTimeout(() => {
            const isYes = Math.random() > 0.5;
            const pool = isYes ? YES_RESPONSES : NO_RESPONSES;
            setResult({ text: pool[Math.floor(Math.random() * pool.length)], isYes });
            setIsConsulting(false);
        }, 1800);
    };

    const calc = calculators.find(c => c.href === '/yes-no-oracle');
    const faqs = [
        { question: "How does the oracle make its decision?", answer: "The oracle functions as a digital coin flip with a twist. It uses a random generator to pick between a library of positive and negative responses, ensuring each consult is a fresh 50/50 chance." },
        { question: "Should I follow the oracle's advice for major life choices?", answer: "Absolutely not! The Yes/No Oracle is designed for entertainment, novelty, and light-hearted decision-making (like choosing what to eat). Always use your better judgment for important matters." },
        { question: "Can I ask the same question multiple times?", answer: "You can consult the oracle as many times as you like. However, remember that it has no memory of past answers—it responds to each 'Consult' as a new, independent event." },
        { question: "Why does the orb change color?", answer: "The orb pulse indicates it's processing your question. Green light signifies a positive (Yes) response, while red light represents a negative (No) outcome." },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Yes/No Oracle'} description={calc?.description || ''} />

            <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                {/* Crystal Ball */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div key={orbKey} style={{
                        width: '180px', height: '180px', borderRadius: '50%',
                        background: isConsulting
                            ? 'linear-gradient(135deg, #581c87, #7c3aed, #a855f7)'
                            : result
                                ? result.isYes
                                    ? 'linear-gradient(135deg, #064e3b, #059669, #34d399)'
                                    : 'linear-gradient(135deg, #7f1d1d, #dc2626, #f87171)'
                                : 'linear-gradient(135deg, #1e1b4b, #3730a3, #6366f1)',
                        boxShadow: isConsulting
                            ? '0 0 60px rgba(139,92,246,0.8), inset 0 0 40px rgba(255,255,255,0.1)'
                            : result?.isYes
                                ? '0 0 60px rgba(52,211,153,0.6), inset 0 0 40px rgba(255,255,255,0.1)'
                                : result
                                    ? '0 0 60px rgba(248,113,113,0.6), inset 0 0 40px rgba(255,255,255,0.1)'
                                    : '0 0 40px rgba(99,102,241,0.4), inset 0 0 40px rgba(255,255,255,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.6s ease, box-shadow 0.6s ease',
                        animation: isConsulting ? 'orbPulse 0.8s ease-in-out infinite' : 'none',
                        position: 'relative', overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', top: '20%', left: '25%', width: '30%', height: '20%', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', filter: 'blur(4px)' }} />
                        {isConsulting ? (
                            <span style={{ fontSize: '3rem' }}>🔮</span>
                        ) : result ? (
                            <span style={{ fontSize: '3rem' }}>{result.isYes ? '✨' : '🌑'}</span>
                        ) : (
                            <span style={{ fontSize: '3rem' }}>🔮</span>
                        )}
                    </div>
                </div>

                {result && !isConsulting && (
                    <div style={{ marginBottom: '1.5rem', animation: 'oracleReveal 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>
                        <div style={{
                            fontSize: '1.8rem', fontWeight: 900, letterSpacing: '0.05em',
                            color: result.isYes ? '#34d399' : '#f87171',
                        }}>{result.text}</div>
                    </div>
                )}
                {isConsulting && <div style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '1rem', fontStyle: 'italic' }}>The oracle is consulting the cosmos...</div>}

                <input
                    className="input"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && consult()}
                    placeholder="Ask the oracle your question..."
                    style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1rem' }}
                />
                <button onClick={consult} disabled={!question.trim() || isConsulting} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
                    🔮 Consult the Oracle
                </button>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Yes/No Oracle"
                howToUse="Type your question into the input field and click 'Consult the Oracle' or press Enter. Watch as the mystical orb pulses and processes your query, eventually revealing a 'Yes' or 'No' answer from the cosmos. It's a fun and quick way to get a definitive answer to any question on your mind."
                whyUse="When you're faced with a simple decision or just looking for a bit of mystical fun, the Yes/No Oracle provides instant clarity with a touch of magic. It eliminates indecision by giving you a clear path forward, while the beautiful animations and light-hearted responses make the experience engaging and entertaining for everyone."
            />

            <style jsx>{`
                @keyframes orbPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.04); }
                }
                @keyframes oracleReveal {
                    from { transform: scale(0.7); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
