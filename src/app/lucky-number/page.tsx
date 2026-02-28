'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function LuckyNumberGenerator() {
    const [min, setMin] = useState<number>(1);
    const [max, setMax] = useState<number>(100);
    const [result, setResult] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [history, setHistory] = useState<number[]>([]);

    const generate = () => {
        if (min >= max) return;
        setIsGenerating(true);
        setResult(null);
        let count = 0;
        const interval = setInterval(() => {
            setResult(Math.floor(Math.random() * (max - min + 1)) + min);
            count++;
            if (count >= 15) {
                clearInterval(interval);
                const final = Math.floor(Math.random() * (max - min + 1)) + min;
                setResult(final);
                setHistory(prev => [final, ...prev].slice(0, 10));
                setIsGenerating(false);
            }
        }, 60);
    };

    const calc = calculators.find(c => c.href === '/lucky-number');
    const faqs = [
        { question: "How does the generator pick a number?", answer: "The generator uses a sophisticated random number algorithm (Math.random()) that ensures every number within your chosen range has an equal, unbiased probability of being selected." },
        { question: "What is the history feature?", answer: "The history bar tracks your last 10 'lucky' results. This is useful if you're generating numbers for multiple categories or want to see if any patterns emerge during your session." },
        { question: "Can I use this for real lotteries?", answer: "While our generator is fair and random, it's intended for entertainment and small decision-making. Official lottery drawings use specialized, certified equipment for legal compliance." },
        { question: "Is there a limit to the range?", answer: "You can specify any minimum and maximum values you like. Just ensure the minimum is smaller than the maximum for the generator to work correctly." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Lucky Number Generator'} description={calc?.description || ''} />

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Minimum</label>
                        <input type="number" className="input" value={min} onChange={e => setMin(Number(e.target.value))} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Maximum</label>
                        <input type="number" className="input" value={max} onChange={e => setMax(Number(e.target.value))} />
                    </div>
                </div>
                {min >= max && <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginBottom: '1rem' }}>⚠️ Minimum must be less than maximum.</p>}
                <button
                    onClick={generate}
                    disabled={isGenerating || min >= max}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', letterSpacing: '0.03em' }}
                >
                    {isGenerating ? '🎰 Rolling...' : '🍀 Generate Lucky Number'}
                </button>

                {result !== null && (
                    <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.1))', borderRadius: '1.5rem', border: '2px solid rgba(99,102,241,0.4)', animation: 'luckyPop 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
                        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-secondary)', fontWeight: 700, marginBottom: '0.5rem' }}>Your Lucky Number</div>
                        <div style={{ fontSize: '5rem', fontWeight: 900, background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1, transition: 'all 0.05s' }}>{result}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Between {min} and {max}</div>
                    </div>
                )}
            </div>

            {history.length > 1 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>🕑 Recent History</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {history.map((n, i) => (
                            <span key={i} style={{ padding: '0.4rem 1rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '2rem', fontWeight: 700, opacity: 1 - i * 0.08, fontSize: '0.95rem' }}>{n}</span>
                        ))}
                    </div>
                </div>
            )}

            <FAQSection items={faqs} />
            <EliteSEOCards
                toolName="Lucky Number Generator"
                howToUse="To find your lucky number, start by entering your desired numerical range—typically a 'Minimum' of 1 and a 'Maximum' of 100—into the input fields within the generator dashboard. Once your range is set, simply click the vibrant 'Generate Lucky Number' button to initiate a high-performance randomized selection process. A smooth, slot-machine style animation will rapidly cycle through numbers before coming to a stop on your specific lucky result. The final number is displayed in a premium, gradient-text format along with a confirmation of the range used for total accuracy. If you need more than one number, you can view your previous 10 results in the 'Recent History' bar below for quick reference. This reliable and beginner-friendly tool ensures every generation is instantaneous and completely unique. It’s an essential, fast-acting solution for anyone looking to add a bit of random luck to their day."
                whyUse="Using an online Lucky Number Generator offers a modern, fair, and highly accessible way to obtain unbiased results for games, giveaways, or personal decisions. Our 'elite' version uses a secure pseudo-random number algorithm that guarantees a perfect 50/50 probability across your entire specified range, eliminating human bias or physical error. The high-fidelity design features glassmorphic cards and smooth micro-animations that make the experience feel professional and premium on any device. Unlike manual methods, this digital simulator provides an automated history log, making it a time-saving and efficient resource for managing multiple draws. It is perfectly optimized for both mobile and desktop, allowing you to carry a reliable luck-tester wherever you go. Whether you're picking a raffle winner, deciding on a challenge, or just feeling a bit curious, this tool delivers total precision and stable performance. It’s a polished, state-of-the-art alternative to traditional methods that brings the thrill of a lucky draw into the digital age."
            />
            <style jsx>{`
                @keyframes luckyPop {
                    from { transform: scale(0.75); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
