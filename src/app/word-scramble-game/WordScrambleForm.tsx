'use client';

import { useState, useEffect } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const WORDS = [
    'SHOE', 'RAIN', 'STAR', 'BIRD', 'ROAD', 'HAND', 'FACE', 'HOME', 'FOOD', 'CAKE',
    'PLAY', 'SHIP', 'LEAF', 'SAND', 'SNOW', 'WIND', 'APPLE', 'TABLE', 'HOUSE', 'WATER',
    'BREAD', 'CHAIR', 'PLANT', 'PHONE', 'CLOCK', 'MUSIC', 'LIGHT', 'PAPER', 'MOUSE', 'GLASS',
    'SHIRT', 'TRAIN', 'RIVER', 'CLOUD', 'STONE', 'GREEN', 'PUZZLE', 'OXYGEN', 'WIZARD', 'MATRIX',
    'BINARY', 'SYNTAX', 'VECTOR', 'MEMORY', 'SCRAMBLE', 'REACTION', 'KEYBOARD', 'TRIANGLE', 'COMPUTER', 'ALGORITHM', 'CHALLENGE'
];

export default function WordScrambleGame() {
    const calc = calculators.find(c => c.href === '/word-scramble-game');
    const [word, setWord] = useState('');
    const [scrambled, setScrambled] = useState('');
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);

    const scramble = (w: string) => {
        return w.split('').sort(() => Math.random() - 0.5).join('');
    };

    const nextWord = () => {
        const newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        setWord(newWord);
        setScrambled(scramble(newWord));
        setGuess('');
        setMessage('');
    };

    useEffect(() => {
        nextWord();
    }, []);

    const handleCheck = () => {
        if (guess.toUpperCase() === word) {
            setMessage('✅ Correct! Well done.');
            setScore(prev => prev + 1);
            setTimeout(nextWord, 1500);
        } else {
            setMessage('❌ Not quite. Try again!');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Word Scramble'}
                description={calc?.description || 'Unscramble the letters to find the hidden word!'}
            />

            <div className="card" style={{ textAlign: 'center', padding: '3rem', marginBottom: '3rem' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>Score: <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{score}</span></div>

                <div style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '0.2em', marginBottom: '2rem', color: 'var(--color-primary)' }}>
                    {scrambled}
                </div>

                <input
                    type="text"
                    className="input"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Your guess..."
                    style={{ width: '100%', maxWidth: '300px', textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.2rem' }}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                />

                <div style={{ minHeight: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>{message}</div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={handleCheck} className="button button-primary">Check Word</button>
                    <button onClick={nextWord} className="button" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)' }}>Skip</button>
                </div>
            </div>

            <FAQSection items={[
                {
                    question: "What is the Word Scramble Game?",
                    answer: "The Word Scramble Game challenges you to rearrange mixed-up letters to form a correct word. Each round presents a scrambled word, and your goal is to solve it as quickly as possible. The game helps improve vocabulary, spelling, and mental agility. It’s suitable for all ages and skill levels."
                },
                {
                    question: "How do I play the Word Scramble Game?",
                    answer: "You’ll see a word with its letters shuffled randomly on the screen. Type or select the letters in the correct order to form a valid word."
                },
                {
                    question: "Is the Word Scramble Game free to play?",
                    answer: "Yes, the Word Scramble Game is completely free to play. No account, sign-up, or downloads are required. You can play directly in your browser on any device. Just start the game and enjoy unlimited rounds."
                }
            ]} />

            <EliteSEOCards
                toolName="Word Scramble Game"
                howToUse="Examine the scrambled letters on the screen and type your guess into the input box. Press 'Check Word' or hit Enter to see if you're right. If you're stuck, use the 'Skip' button to move to a new word and keep your scoring streak alive."
                whyUse="Playing an online word scramble is a fantastic way to sharpen your mind and improve your spelling skills in an entertaining way. It serves as an excellent educational tool for students or a fun mental break for anyone looking to test their quick-thinking abilities."
            />
        </div>
    );
}
