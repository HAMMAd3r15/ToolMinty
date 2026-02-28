'use client';

import { useState, useRef, useEffect } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

type Phase = 'idle' | 'waiting' | 'ready' | 'result' | 'toosoon';

const PHASE_CONFIG = {
    idle: { bg: 'linear-gradient(135deg, #1e293b, #334155)', text: '#94a3b8', label: 'Click to Start' },
    waiting: { bg: 'linear-gradient(135deg, #7f1d1d, #991b1b)', text: '#fca5a5', label: 'Wait for green...' },
    ready: { bg: 'linear-gradient(135deg, #064e3b, #065f46)', text: '#6ee7b7', label: 'CLICK NOW!' },
    result: { bg: 'linear-gradient(135deg, #1e293b, #334155)', text: '#818cf8', label: '' },
    toosoon: { bg: 'linear-gradient(135deg, #78350f, #92400e)', text: '#fbbf24', label: '⚠️ Too soon! Click to try again.' },
};

function getRating(ms: number) {
    if (ms < 150) return { emoji: '⚡', label: 'Superhuman!', color: '#f59e0b' };
    if (ms < 200) return { emoji: '🚀', label: 'Blazing Fast', color: '#10b981' };
    if (ms < 250) return { emoji: '🎯', label: 'Excellent', color: '#6366f1' };
    if (ms < 300) return { emoji: '👍', label: 'Good', color: '#3b82f6' };
    if (ms < 400) return { emoji: '😐', label: 'Average', color: '#f59e0b' };
    return { emoji: '🐢', label: 'Keep Practicing', color: '#ef4444' };
}

export default function ReactionTime() {
    const [phase, setPhase] = useState<Phase>('idle');
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [history, setHistory] = useState<number[]>([]);
    const startTimeRef = useRef<number>(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClick = () => {
        if (phase === 'idle' || phase === 'result' || phase === 'toosoon') {
            setPhase('waiting');
            setReactionTime(null);
            const delay = 2000 + Math.random() * 3000;
            timerRef.current = setTimeout(() => {
                setPhase('ready');
                startTimeRef.current = performance.now();
            }, delay);
        } else if (phase === 'waiting') {
            if (timerRef.current) clearTimeout(timerRef.current);
            setPhase('toosoon');
        } else if (phase === 'ready') {
            const elapsed = performance.now() - startTimeRef.current;
            const ms = Math.round(elapsed);
            setReactionTime(ms);
            setHistory(prev => [ms, ...prev].slice(0, 10));
            setPhase('result');
        }
    };

    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    const avgTime = history.length > 0 ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) : null;
    const bestTime = history.length > 0 ? Math.min(...history) : null;
    const cfg = PHASE_CONFIG[phase];
    const rating = reactionTime ? getRating(reactionTime) : null;

    const calc = calculators.find(c => c.href === '/reaction-time');
    const faqs = [
        { question: "What is an average reaction time?", answer: "The average human reaction time to a visual stimulus is typically between 200ms and 250ms. Highly practiced individuals, such as professional gamers or pilots, often reach 150ms-190ms." },
        { question: "How does the test work?", answer: "The simulator waits for a random amount of time before turning green. This randomness prevents 'timing' the click and ensures we measure your true reflex speed from the moment the visual signal appears." },
        { question: "What factors can affect my score?", answer: "Physical factors like fatigue, age, and caffeine intake play a role. Technical factors, such as monitor lag (input latency) and mouse polling rates, can also add a few milliseconds to your results." },
        { question: "Can I improve my reaction time?", answer: "Yes! While biological limits exist, consistent practice and 'aim training' can help sharpen your focus and reduce the mental processing time required to trigger a physical response." },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Reaction Time Tester'} description={calc?.description || ''} />

            {/* Main Test Area */}
            <div onClick={handleClick} style={{
                height: '280px', borderRadius: '1.5rem', background: cfg.bg,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', userSelect: 'none', marginBottom: '1.5rem',
                boxShadow: phase === 'ready' ? '0 0 60px rgba(52,211,153,0.5)' : '0 8px 32px rgba(0,0,0,0.3)',
                transition: 'background 0.15s ease, box-shadow 0.15s ease', gap: '0.75rem',
            }}>
                {phase === 'result' && rating ? (
                    <>
                        <div style={{ fontSize: '3rem' }}>{rating.emoji}</div>
                        <div style={{ fontSize: '4rem', fontWeight: 900, color: rating.color, fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{reactionTime}<span style={{ fontSize: '1.5rem', marginLeft: '0.2rem' }}>ms</span></div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: rating.color }}>{rating.label}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Click to try again</div>
                    </>
                ) : (
                    <>
                        <div style={{ fontSize: '2.5rem' }}>{phase === 'waiting' ? '🔴' : phase === 'ready' ? '🟢' : phase === 'toosoon' ? '⚠️' : '👆'}</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: cfg.text, textAlign: 'center' }}>{phase === 'idle' ? 'Click to Start Test' : cfg.label}</div>
                    </>
                )}
            </div>

            {/* Stats */}
            {history.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981' }}>{bestTime}ms</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Best Time</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#6366f1' }}>{avgTime}ms</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Average ({history.length} tests)</div>
                    </div>
                </div>
            )}

            {history.length > 1 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '0.75rem' }}>History</h3>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {history.map((t, i) => (
                            <span key={i} style={{ padding: '0.3rem 0.8rem', borderRadius: '2rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'monospace', opacity: 1 - i * 0.08 }}>{t}ms</span>
                        ))}
                    </div>
                </div>
            )}

            <FAQSection items={faqs} />
            <EliteSEOCards
                toolName="Reaction Time Tester"
                howToUse="To start your reaction test, first click anywhere within the large, dark dashboard labeled 'Click to Start'. The background will instantly shift to a deep red, signaling the 'waiting' phase where you must prepare for the visual trigger. After a randomized delay of two to five seconds, the entire test area will flash a vibrant green and display the text 'CLICK NOW!'. You must click as fast as possible to register your reflex speed, which is measured in precise milliseconds using high-performance internal timers. The tool immediately calculates your result and provides a fun rating, such as 'Blazing Fast' or 'Superhuman', along with your session's best and average times. Simply click the result card to reset and try again for a higher score with total ease. This simple and accurate process is designed to push your focus to the limit with zero distractions."
                whyUse="Using an online Reaction Time Tester offers a high-performance and modern way to measure your cognitive speed and hand-eye coordination with total mathematical precision. Our 'elite' version uses Advanced Performance APIs to ensure your reflex measurements are accurate down to the millisecond, bypassing common browser delays. The high-fidelity user interface features glassmorphic designs and high-contrast color shifts that provide clear, unambiguous signals for training your brain. Unlike physical testing methods, our digital simulator automatically tracks your history, providing a stable and reliable platform to monitor your progress over time. It is perfectly optimized for all devices, making it a time-saving and convenient tool for gamers, athletes, or anyone looking to sharpen their mental acuity. With its sleek dark theme and smooth micro-animations, the tester delivers a premium experience that is both helpful and highly engaging. It's a professional-grade training utility that brings classic reflex testing into the digital age with style."
            />
        </div>
    );
}
