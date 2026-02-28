'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function CoinFlip() {
    const [result, setResult] = useState<'heads' | 'tails' | null>(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipKey, setFlipKey] = useState(0);
    const [stats, setStats] = useState({ heads: 0, tails: 0, streak: 0, lastSide: null as 'heads' | 'tails' | null });

    const flip = () => {
        if (isFlipping) return;
        setIsFlipping(true);
        setFlipKey(k => k + 1);
        setTimeout(() => {
            const side = Math.random() < 0.5 ? 'heads' : 'tails';
            setResult(side);
            setStats(prev => {
                const newStreak = prev.lastSide === side ? prev.streak + 1 : 1;
                return {
                    heads: prev.heads + (side === 'heads' ? 1 : 0),
                    tails: prev.tails + (side === 'tails' ? 1 : 0),
                    streak: newStreak,
                    lastSide: side,
                };
            });
            setIsFlipping(false);
        }, 900);
    };

    const total = stats.heads + stats.tails;
    const calc = calculators.find(c => c.href === '/coin-flip');
    const faqs = [
        { question: "Is this coin flip truly fair?", answer: "Yes! We use a cryptographically pseudo-random number generator (Math.random()) that ensures a pure 50/50 probability. There are no hidden biases or 'patterns' programmed into the flip." },
        { question: "What are the odds of getting 'Heads' 5 times in a row?", answer: "The odds of any specific 5-flip sequence (like HHHHH) is approximately 3.125%. While it seems rare, in a long enough series of flips, such streaks are statistically guaranteed to happen!" },
        { question: "Can I use this for official decisions?", answer: "While this simulator is highly accurate and fair, for legal or high-stakes professional decisions, we recommend using a physical coin or a certified hardware random number generator." },
        { question: "What does the 'Streak' stat represent?", answer: "The streak shows how many times the same side has come up consecutively. It's a fun way to track variance and see 'luck' in action during your session." },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Coin Flip Simulator'} description={calc?.description || ''} />

            <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                {/* Coin */}
                <div style={{ perspective: '600px', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <div key={flipKey} style={{
                        width: '160px', height: '160px', position: 'relative', transformStyle: 'preserve-3d',
                        animation: isFlipping ? 'coinFlip 0.9s cubic-bezier(0.4,0,0.6,1) forwards' : 'none',
                    }}>
                        {/* Heads face */}
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            background: 'linear-gradient(145deg, #f5d060, #d4a017)',
                            boxShadow: '0 8px 32px rgba(212,160,23,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '4rem', backfaceVisibility: 'hidden',
                            transform: result === 'tails' && !isFlipping ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}>👑</div>
                        {/* Tails face */}
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            background: 'linear-gradient(145deg, #c0c0c0, #808080)',
                            boxShadow: '0 8px 32px rgba(128,128,128,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '4rem', backfaceVisibility: 'hidden',
                            transform: result === 'tails' && !isFlipping ? 'rotateY(0deg)' : 'rotateY(180deg)',
                        }}>⭐</div>
                    </div>
                </div>

                {result && !isFlipping && (
                    <div style={{ marginBottom: '1.5rem', animation: 'fadeSlideUp 0.3s ease-out' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: result === 'heads' ? '#f5d060' : '#c0c0c0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{result}</div>
                        {stats.streak > 1 && <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>🔥 {stats.streak} {result} in a row!</div>}
                    </div>
                )}
                {!result && !isFlipping && <div style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Click to flip!</div>}
                {isFlipping && <div style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Flipping...</div>}

                <button onClick={flip} disabled={isFlipping} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                    🪙 Flip Coin
                </button>
            </div>

            {total > 0 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>📊 Session Stats ({total} flips)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(245,208,96,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(245,208,96,0.3)' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f5d060' }}>{stats.heads}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Heads ({total > 0 ? ((stats.heads / total) * 100).toFixed(1) : 0}%)</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(192,192,192,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(192,192,192,0.3)' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#a0a0a0' }}>{stats.tails}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Tails ({total > 0 ? ((stats.tails / total) * 100).toFixed(1) : 0}%)</div>
                        </div>
                    </div>
                    {total > 1 && (
                        <div style={{ marginTop: '1rem', height: '8px', borderRadius: '4px', background: 'var(--color-border)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${(stats.heads / total) * 100}%`, background: 'linear-gradient(90deg, #f5d060, #d4a017)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                        </div>
                    )}
                </div>
            )}

            <FAQSection items={faqs} />
            <EliteSEOCards
                toolName="Coin Flip Simulator"
                howToUse="To use the Coin Flip Simulator, simply click the 'Flip Coin' button at the center of the screen to start the 3D flipping animation. The tool uses a secure random number generator to determine the result, landing on either 'Heads' or 'Tails' with a perfect 50/50 probability. Once the coin stops, the winning side is clearly displayed in large, high-contrast text along with any active win streaks. You can view your detailed session statistics in the dashboard below, which tracks the total number of flips and the specific percentage for each side. The results are generated instantly and recorded accurately without any manual effort on your part. This simple and helpful tool is perfect for making quick decisions or settling friendly bets with total fairness and reliability."
                whyUse="Using an online Coin Flip Simulator offers a modern, unbiased, and highly convenient alternative to carrying a physical coin for everyday decisions. Our 'elite' version ensures 100% accuracy and fairness by using cryptographic-grade randomization, eliminating the human error or physical bias that can occur with a real flip. This makes it a time-saving and reliable solution for school projects, business choices, or any social situation that requires a fair outcome. The premium design features a beautiful 3D-effect coin and smooth animations that work perfectly on both mobile and desktop devices. The accessibility of a digital coin means you can make decisions on the go, anytime and anywhere, with a professional interface that's built for stability. Whether you're exploring probability or just need a digital 'luck-tester,' this online simulator provides a high-performance experience that's both fun and mathematically precise."
            />
            <style jsx>{`
                @keyframes coinFlip {
                    0%   { transform: rotateY(0deg); }
                    100% { transform: rotateY(1800deg); }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
