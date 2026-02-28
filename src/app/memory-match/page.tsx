'use client';

import { useState, useEffect, useCallback } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const CARD_EMOJIS = [
    '🎸', '🚀', '🦁', '🌍', '🍕', '🎩', '⚡', '🌈', '🦋', '🎯', '🐉', '💎',
    '🍄', '🍦', '🍩', '🥑', '🦊', '🦉', '🛸', '🛰️', '🌋', '🌊', '🎨', '🎹'
];

type Card = { id: number; emoji: string; isFlipped: boolean; isMatched: boolean };

function createDeck(size: number): Card[] {
    const pool = CARD_EMOJIS.slice(0, size / 2);
    const pairs = [...pool, ...pool];
    // Fisher-Yates shuffle
    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs.map((emoji, id) => ({ id, emoji, isFlipped: false, isMatched: false }));
}

export default function MemoryMatch() {
    const [difficulty, setDifficulty] = useState<8 | 12 | 16>(12);
    const [cards, setCards] = useState<Card[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [won, setWon] = useState(false);

    useEffect(() => {
        let t: ReturnType<typeof setInterval>;
        if (isRunning) t = setInterval(() => setTimeElapsed(s => s + 1), 1000);
        return () => clearInterval(t);
    }, [isRunning]);

    useEffect(() => {
        newGame(12);
    }, []);

    const newGame = (size: 8 | 12 | 16) => {
        setDifficulty(size);
        setCards(createDeck(size));
        setFlipped([]);
        setMoves(0);
        setMatches(0);
        setTimeElapsed(0);
        setIsRunning(false);
        setWon(false);
    };

    const handleFlip = useCallback((id: number) => {
        if (isChecking || cards[id].isFlipped || cards[id].isMatched) return;
        if (!isRunning) setIsRunning(true);

        const newFlipped = [...flipped, id];
        setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));

        if (newFlipped.length === 2) {
            setFlipped([]);
            setMoves(m => m + 1);
            setIsChecking(true);
            const [a, b] = newFlipped;
            if (cards[a].emoji === cards[b].emoji) {
                setCards(prev => prev.map(c => c.id === a || c.id === b ? { ...c, isMatched: true } : c));
                const newMatches = matches + 1;
                setMatches(newMatches);
                if (newMatches === difficulty / 2) { setIsRunning(false); setWon(true); }
                setIsChecking(false);
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map(c => c.id === a || c.id === b ? { ...c, isFlipped: false } : c));
                    setIsChecking(false);
                }, 900);
            }
        } else {
            setFlipped(newFlipped);
        }
    }, [cards, flipped, isChecking, isRunning, matches, difficulty]);

    const cols = difficulty === 8 ? 4 : difficulty === 12 ? 4 : 4;
    const calc = calculators.find(c => c.href === '/memory-match');
    const faqs = [
        { question: "How does the game work?", answer: "Click any card to flip it over and reveal the emoji. Click a second card — if they match, they stay face-up. If not, they flip back after a brief delay. Match all pairs to win!" },
        { question: "What are the difficulty levels?", answer: "Easy has 8 cards (4 pairs), Medium has 12 cards (6 pairs), and Hard has 16 cards (8 pairs). As you go higher, you'll need sharper focus to remember where each emoji is located." },
        { question: "Is there a time limit?", answer: "There is no strict time limit, but the game tracks how long you take to finish. Try to beat your own best time and finish in as few moves as possible!" },
    ];

    return (
        <div style={{ maxWidth: '620px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Memory Card Match'} description={calc?.description || ''} />

            {/* Controls */}
            <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {([8, 12, 16] as const).map(d => (
                        <button key={d} onClick={() => newGame(d)} style={{
                            padding: '0.5rem 1rem', borderRadius: '0.6rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                            background: difficulty === d ? 'var(--color-secondary)' : 'var(--color-bg)',
                            color: difficulty === d ? '#fff' : 'var(--color-text-primary)',
                            border: `1px solid ${difficulty === d ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                            transition: 'all 0.2s',
                        }}>{d === 8 ? 'Easy' : d === 12 ? 'Medium' : 'Hard'}</button>
                    ))}
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{moves}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Moves</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'monospace' }}>{String(Math.floor(timeElapsed / 60)).padStart(2, '0')}:{String(timeElapsed % 60).padStart(2, '0')}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Time</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{matches}/{difficulty / 2}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Pairs</div>
                    </div>
                </div>
            </div>

            {/* Win Banner */}
            {won && (
                <div style={{ textAlign: 'center', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.15))', borderRadius: '1rem', border: '2px solid rgba(16,185,129,0.4)', marginBottom: '1.5rem', animation: 'winPop 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🎉</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#10b981' }}>You Won!</div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{moves} moves • {timeElapsed}s</div>
                    <button onClick={() => newGame(difficulty)} className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.6rem 1.5rem' }}>Play Again</button>
                </div>
            )}

            {/* Card Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '0.6rem', marginBottom: '2rem' }}>
                {cards.map(card => (
                    <div key={card.id} onClick={() => handleFlip(card.id)} style={{
                        aspectRatio: '1', borderRadius: '0.75rem', cursor: card.isMatched || card.isFlipped ? 'default' : 'pointer',
                        perspective: '400px',
                    }}>
                        <div style={{
                            width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d',
                            transition: 'transform 0.4s ease',
                            transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}>
                            {/* Back */}
                            <div style={{
                                position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '0.75rem',
                                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            }}>🎴</div>
                            {/* Front */}
                            <div style={{
                                position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '0.75rem',
                                transform: 'rotateY(180deg)',
                                background: card.isMatched ? 'rgba(16,185,129,0.15)' : 'var(--color-surface)',
                                border: `2px solid ${card.isMatched ? '#10b981' : 'var(--color-border)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem',
                            }}>{card.emoji}</div>
                        </div>
                    </div>
                ))}
            </div>

            <FAQSection items={faqs} />
            <EliteSEOCards
                toolName="Memory Card Match"
                howToUse="To start playing Memory Card Match, first select your desired difficulty level—Easy, Medium, or Hard—from the controls at the top to determine the number of cards in the grid. Click on any card to flip it over and reveal its unique emoji, then try to find its matching twin by clicking a second card. If the two emojis match, they will stay face-up and glow green; if they don't, they will flip back after a brief moment so you can try again. The game continues until you have successfully matched all pairs, with your total moves and time elapsed tracked in the dashboard. Once you win, you can instantly start a fresh game by clicking 'Play Again' to test your memory again. This reliable tool ensures a fun and accurate way to sharpen your focus without any physical cards or setup."
                whyUse="Using an online Memory Card Match offers a convenient and engaging way to boost your cognitive health and memory retention with a modern, 'elite' user interface. Unlike physical card games, our digital version provides automated tracking of your moves and time, allowing you to measure your improvement over multiple sessions. It is perfectly accessible on both mobile and desktop devices, making it a portable mental workout you can enjoy anywhere, from your commute to a quick break. The high-fidelity design features smooth 'glassmorphic' animations and responsive hover effects that transform a simple exercise into a premium gaming experience. Whether you're looking to keep your mind sharp or simply want a relaxing challenge, this online memory game provides a stable and reliable platform for players of all ages. It's a time-saving, eco-friendly solution that brings a classic brain-teaser into the digital age with total precision and high-performance gameplay."
            />
            <style jsx>{`
                @keyframes winPop {
                    from { transform: scale(0.8); opacity: 0; }
                    to   { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
