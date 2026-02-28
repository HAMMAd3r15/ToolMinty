'use client';

import { useState, useCallback } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const WORD_CATEGORIES = {
    'Technology': ['PLANET', 'ROCKET', 'GALAXY', 'BINARY', 'SYNTAX', 'VECTOR', 'MEMORY', 'KEYBOARD', 'COMPUTER', 'ALGORITHM', 'NETWORK', 'WEBSITE', 'DATABASE', 'INTERFACE', 'PIXELS', 'HACKER'],
    'Nature': ['FOREST', 'JUNGLE', 'CANYON', 'DESERT', 'GARDEN', 'VALLEY', 'RIVER', 'CLOUD', 'OCEANS', 'NATURE', 'FLOWER', 'CACTUS', 'LIZARD', 'SPIDER', 'FALCON', 'PARROT'],
    'Objects': ['GUITAR', 'PENCIL', 'CANDLE', 'BOTTLE', 'HAMMER', 'KETTLE', 'MAGNET', 'WINDOW', 'BASKET', 'CAMERA', 'FRIDGE', 'JACKET', 'BUTTON', 'ARROWS', 'ANCHOR', 'YACHTS'],
    'Food': ['TOMATO', 'BUTTER', 'ORANGE', 'WALNUT', 'OYSTER', 'BREAD', 'APPLE', 'CHESTNUT', 'POTATO', 'GINGER', 'HONEY', 'CHEESE', 'PASTA', 'PIZZA', 'BANANA', 'MANGO'],
    'Fantasy': ['CASTLE', 'DRAGON', 'KNIGHT', 'LEGEND', 'TEMPLE', 'WIZARD', 'MATRIX', 'ZODIAC', 'ZEPHYR', 'HEROES', 'MYSTER', 'GIANTS', 'SWORDS', 'SHIELD', 'POTION', 'SPELLS']
};

const CATEGORIES = Object.keys(WORD_CATEGORIES) as (keyof typeof WORD_CATEGORIES)[];
const MAX_WRONG = 6;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function pickWord() {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const words = WORD_CATEGORIES[category];
    return {
        word: words[Math.floor(Math.random() * words.length)],
        category
    };
}

function HangmanSVG({ wrong }: { wrong: number }) {
    return (
        <svg viewBox="0 0 200 220" width="200" height="220" style={{ display: 'block', margin: '0 auto' }}>
            {/* Gallows */}
            <line x1="20" y1="210" x2="180" y2="210" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="210" x2="60" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="20" x2="130" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <line x1="130" y1="20" x2="130" y2="45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* Head */}
            {wrong >= 1 && <circle cx="130" cy="60" r="16" stroke="#ef4444" strokeWidth="3" fill="none" />}
            {/* Body */}
            {wrong >= 2 && <line x1="130" y1="76" x2="130" y2="130" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
            {/* Left arm */}
            {wrong >= 3 && <line x1="130" y1="90" x2="105" y2="115" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
            {/* Right arm */}
            {wrong >= 4 && <line x1="130" y1="90" x2="155" y2="115" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
            {/* Left leg */}
            {wrong >= 5 && <line x1="130" y1="130" x2="105" y2="165" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
            {/* Right leg */}
            {wrong >= 6 && <line x1="130" y1="130" x2="155" y2="165" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
        </svg>
    );
}

export default function Hangman() {
    const [gameState, setGameState] = useState(pickWord);
    const [guessed, setGuessed] = useState<Set<string>>(new Set());
    const [score, setScore] = useState({ wins: 0, losses: 0 });

    const { word, category } = gameState;

    const wrong = [...guessed].filter(l => !word.includes(l)).length;
    const isWon = word.split('').every(l => guessed.has(l));
    const isLost = wrong >= MAX_WRONG;
    const isOver = isWon || isLost;

    const guess = useCallback((letter: string) => {
        if (isOver || guessed.has(letter)) return;
        const next = new Set(guessed).add(letter);
        setGuessed(next);
        const wonNow = word.split('').every(l => next.has(l));
        const wrongNow = [...next].filter(l => !word.includes(l)).length;
        if (wonNow) setScore(s => ({ ...s, wins: s.wins + 1 }));
        else if (wrongNow >= MAX_WRONG) setScore(s => ({ ...s, losses: s.losses + 1 }));
    }, [guessed, isOver, word]);

    const newGame = () => {
        setGameState(pickWord());
        setGuessed(new Set());
    };

    const calc = calculators.find(c => c.href === '/hangman');
    const faqs = [
        { question: "How does Hangman work?", answer: "Guess letters one by one to figure out the hidden word. Each wrong guess adds a body part to the hangman. You lose after 6 wrong guesses." },
        { question: "What are the categories?", answer: "We have multiple categories including Technology, Nature, Objects, Food, and Fantasy. The category is displayed to help you narrow down the word!" },
        { question: "Can I play again after losing?", answer: "Yes! Click the 'Play Again' button to get a fresh word from a random category and try to beat your previous score." },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Hangman'} description={calc?.description || ''} />

            {/* Score */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981' }}>{score.wins}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Wins</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ef4444' }}>{score.losses}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Losses</div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                {/* Hangman Drawing */}
                <div style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                    <HangmanSVG wrong={wrong} />
                </div>

                {/* Category & Attempts */}
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-secondary)', marginBottom: '0.25rem' }}>
                        Category: {category}
                    </div>
                    <div style={{ color: wrong >= 4 ? '#ef4444' : 'var(--color-text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>
                        {MAX_WRONG - wrong} attempt{MAX_WRONG - wrong !== 1 ? 's' : ''} remaining
                    </div>
                </div>

                {/* Word Display */}
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {word.split('').map((letter, i) => (
                        <div key={i} style={{
                            width: '44px', height: '54px', borderBottom: `3px solid ${isLost && !guessed.has(letter) ? '#ef4444' : 'var(--color-secondary)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.6rem', fontWeight: 900,
                            color: isLost && !guessed.has(letter) ? '#ef4444' : 'var(--color-text-primary)',
                            animation: guessed.has(letter) && word.includes(letter) ? 'letterReveal 0.3s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                        }}>
                            {guessed.has(letter) || (isLost && !guessed.has(letter)) ? letter : ''}
                        </div>
                    ))}
                </div>

                {/* Result Banner */}
                {isOver && (
                    <div style={{ padding: '1rem', borderRadius: '0.75rem', marginBottom: '1rem', background: isWon ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: `2px solid ${isWon ? '#10b981' : '#ef4444'}`, animation: 'resultBanner 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: isWon ? '#10b981' : '#ef4444' }}>{isWon ? '🎉 You got it!' : `😔 The word was "${word}"`}</div>
                    </div>
                )}

                <button onClick={newGame} className={`btn ${isOver ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.7rem 2rem' }}>
                    {isOver ? '🎮 Play Again' : '🔀 New Word'}
                </button>
            </div>

            {/* Keyboard */}
            {!isOver && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                        {ALPHABET.map(letter => {
                            const isGuessed = guessed.has(letter);
                            const isCorrect = isGuessed && word.includes(letter);
                            const isWrong = isGuessed && !word.includes(letter);
                            return (
                                <button key={letter} onClick={() => guess(letter)} disabled={isGuessed} style={{
                                    width: '40px', height: '40px', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.95rem', cursor: isGuessed ? 'default' : 'pointer',
                                    background: isCorrect ? 'rgba(16,185,129,0.2)' : isWrong ? 'rgba(239,68,68,0.15)' : 'var(--color-bg)',
                                    color: isCorrect ? '#10b981' : isWrong ? '#ef4444' : 'var(--color-text-primary)',
                                    border: `1px solid ${isCorrect ? '#10b981' : isWrong ? '#ef4444' : 'var(--color-border)'}`,
                                    opacity: isGuessed ? 0.6 : 1, transition: 'all 0.15s',
                                }}>{letter}</button>
                            );
                        })}
                    </div>
                </div>
            )}

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Hangman Game"
                howToUse="To play Hangman, start by selecting a letter from the virtual keyboard at the bottom of the screen to guess the hidden word. Each correct guess fills in the blanks, while each incorrect guess adds a part to the hangman drawing and reduces your remaining attempts. Pay close attention to the word category displayed above the blanks, as it provides a crucial hint to help you narrow down the possibilities. Once you've successfully guessed all the letters or ran out of attempts, the game will reveal the full word and update your win-loss score instantly. Simply click the 'Play Again' button to start a fresh round with a completely new word from our extensive dictionary. This intuitive interface makes it easy for players of all ages to enjoy a classic word-guessing challenge without any physical setup."
                whyUse="Using an online Hangman Game offers a modern, accessible, and high-tech way to enjoy one of the most beloved classic word puzzles. Unlike traditional paper-and-pencil versions, our digital tool provides instant feedback, automated scoring, and a vast library of words across diverse categories like Science, Nature, and Fantasy. It is built with a sleek, high-fidelity design that ensures the game is both visually engaging and easy to navigate on any mobile or desktop device. Players benefit from a fair and consistent gaming experience, with perfectly randomized word selection and accurate attempt tracking every time you play. It's an excellent way to improve your vocabulary, enhance your spelling skills, and keep your brain sharp during a quick break or a long commute. The reliability and convenience of this online version make it a premier choice for word game enthusiasts looking for a quick and fun mental workout."
            />

            <style jsx>{`
                @keyframes letterReveal {
                    from { transform: scale(0.5) translateY(-10px); opacity: 0; }
                    to   { transform: scale(1) translateY(0); opacity: 1; }
                }
                @keyframes resultBanner {
                    from { transform: scale(0.9); opacity: 0; }
                    to   { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
