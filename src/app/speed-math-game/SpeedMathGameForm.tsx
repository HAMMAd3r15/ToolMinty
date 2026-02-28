'use client';

import { useState, useEffect, useRef } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

type GameState = 'idle' | 'playing' | 'ended';

export default function SpeedMathGame() {
    const calc = calculators.find(c => c.href === '/speed-math-game');
    const [gameState, setGameState] = useState<GameState>('idle');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [question, setQuestion] = useState({ a: 0, b: 0, op: '+', answer: 0 });
    const [userInput, setUserInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const generateQuestion = () => {
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a, b, answer;

        if (op === '+') {
            a = Math.floor(Math.random() * 50) + 1;
            b = Math.floor(Math.random() * 50) + 1;
            answer = a + b;
        } else if (op === '-') {
            a = Math.floor(Math.random() * 50) + 1;
            b = Math.floor(Math.random() * a) + 1;
            answer = a - b;
        } else {
            a = Math.floor(Math.random() * 12) + 1;
            b = Math.floor(Math.random() * 12) + 1;
            answer = a * b;
        }

        setQuestion({ a, b, op, answer });
        setUserInput('');
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameState('playing');
        generateQuestion();
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'playing' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setGameState('ended');
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    useEffect(() => {
        if (gameState === 'playing' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [gameState]);

    const handleInput = (val: string) => {
        setUserInput(val);
        if (parseInt(val) === question.answer) {
            setScore(prev => prev + 1);
            generateQuestion();
        }
    };

    const faqs = [
        {
            question: "How long is each round?",
            answer: "Each round lasts 30 seconds. Your objective is to solve as many math problems as possible before the timer hits zero. Speed and accuracy are both key!"
        },
        {
            question: "What mathematical operations are included?",
            answer: "The game features a mix of Addition, Subtraction, and Multiplication. Addition and subtraction use numbers up to 50, while multiplication covers the standard 1-12 times tables."
        },
        {
            question: "Does the difficulty increase as I play?",
            answer: "Currently, the difficulty remains consistent throughout the round to provide a stable baseline for measuring your mental math speed. You can challenge yourself by trying to beat your previous high score!"
        },
        {
            question: "Are there penalties for wrong answers?",
            answer: "There are no point penalties for incorrect answers, but spending time on a wrong answer will slow you down. Focus on getting the correct answer quickly to maximize your score."
        }
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Speed Math Game'}
                description={calc?.description || 'Test your mental math skills against the clock!'}
            />

            <div className="card" style={{ textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '3rem' }}>
                {gameState === 'idle' && (
                    <div>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧮</div>
                        <h2 style={{ marginBottom: '2rem' }}>Ready to test your brain?</h2>
                        <button
                            onClick={startGame}
                            className="button button-primary"
                            style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Score: <span style={{ color: 'var(--color-primary)' }}>{score}</span></div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: timeLeft < 10 ? '#ff4d4d' : 'var(--color-text-primary)' }}>Time: {timeLeft}s</div>
                        </div>

                        <div style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '2rem' }}>
                            {question.a} {question.op === '*' ? '×' : question.op} {question.b} = ?
                        </div>

                        <input
                            ref={inputRef}
                            type="number"
                            className="input"
                            value={userInput}
                            onChange={(e) => handleInput(e.target.value)}
                            placeholder="Type answer..."
                            style={{ fontSize: '2rem', textAlign: 'center', width: '200px', padding: '1rem' }}
                        />
                    </div>
                )}

                {gameState === 'ended' && (
                    <div>
                        <h2 style={{ marginBottom: '1rem' }}>Times Up!</h2>
                        <div style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You scored <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '3rem' }}>{score}</span> points!</div>
                        <button
                            onClick={startGame}
                            className="button button-primary"
                            style={{ padding: '1rem 3rem' }}
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Speed Math Game"
                howToUse="To begin your challenge, click the 'Start Game' button to initiate the 30-second countdown. A series of randomized mathematical equations—covering addition, subtraction, and multiplication—will appear one at a time. Type your answer directly into the input field; the game uses automated verification to instantly move you to the next problem as soon as you provide the correct result. Aim for maximum speed and accuracy to boost your score before the time expires. Once the round ends, your final score will be displayed with a high-fidelity result card, allowing you to instantly play again and beat your personal best. This fluid and interactive gameplay ensures a fast-paced environment that keeps your brain engaged and reactive."
                whyUse="An online Speed Math Game is a powerful and fun tool for improving your mental arithmetic, focus, and cognitive processing speed. By practicing simple calculations under time pressure, you build stronger neural pathways for math, which translates to better problem-solving skills in everyday life—from splitting bills to making quick financial estimates. Our 'elite' version provides a distraction-free, premium interface with smooth transitions and responsive controls that let you focus entirely on the numbers. Unlike static worksheets, the dynamic timer and score tracking provide instant feedback and motivation to improve. It's a completely free, mobile-friendly resource that turns essential brain training into an entertaining daily habit. Whether you're a student looking to sharpen your skills or an adult aiming to keep your mind sharp, this game offers a polished and effective way to elevate your mental performance."
            />
        </div>
    );
}
