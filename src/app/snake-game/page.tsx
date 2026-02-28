'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = 'UP';

export default function SnakeGame() {
    const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Point>({ x: 5, y: 5 });
    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [speed, setSpeed] = useState(150);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    const generateFood = useCallback((currentSnake: Point[]) => {
        let newFood: Point;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
                break;
            }
        }
        return newFood;
    }, []);

    const moveSnake = useCallback(() => {
        if (gameOver || isPaused) return;

        setSnake(prevSnake => {
            const head = { ...prevSnake[0] };
            switch (direction) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
            }

            // Wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true);
                setIsPaused(true);
                return prevSnake;
            }

            // Self collision
            if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                setIsPaused(true);
                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];

            // Food collision
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10);
                setFood(generateFood(newSnake));
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver, isPaused, generateFood]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
                case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
                case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
                case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
            }
            if (isPaused && !gameOver && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                setIsPaused(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, isPaused, gameOver]);

    useEffect(() => {
        if (!isPaused && !gameOver) {
            gameLoopRef.current = setInterval(moveSnake, speed);
        } else {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [isPaused, gameOver, moveSnake, speed]);

    useEffect(() => {
        if (score > highScore) setHighScore(score);
    }, [score, highScore]);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood({ x: 5, y: 5 });
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
    };

    const calc = calculators.find(c => c.href === '/snake-game');
    const faqs = [
        { question: "How record high weights/scores?", answer: "Your high score is tracked during your current session. If you refresh the page, the high score will reset, so try to reach your peak in one go!" },
        { question: "What are the controls for the Snake Game?", answer: "On a computer, use the Arrow Keys to change direction. On mobile or touch devices, use the directional buttons located directly below the game board." },
        { question: "How do I increase my score?", answer: "Each piece of red food your snake eats adds 10 points to your score and makes the snake longer. The challenge is navigating the board as you grow!" },
        { question: "Can I change the game speed?", answer: "Yes! You can choose between 'Normal' and 'Fast' speeds. Fast mode is for experienced players who want a real test of their reflexes." },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Snake Game'} description={calc?.description || ''} />

            <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 700 }}>
                    <div style={{ color: 'var(--color-secondary)' }}>Score: {score}</div>
                    <div style={{ color: 'var(--color-text-secondary)' }}>High Score: {highScore}</div>
                </div>

                <div style={{
                    position: 'relative',
                    width: '300px',
                    height: '300px',
                    margin: '0 auto',
                    background: 'var(--color-bg)',
                    border: '4px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                }}>
                    {/* Grid */}
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                        const x = i % GRID_SIZE;
                        const y = Math.floor(i / GRID_SIZE);
                        const isSnake = snake.some(s => s.x === x && s.y === y);
                        const isHead = snake[0].x === x && snake[0].y === y;
                        const isFood = food.x === x && food.y === y;

                        return (
                            <div key={i} style={{
                                position: 'absolute',
                                left: `${(x / GRID_SIZE) * 100}%`,
                                top: `${((y / GRID_SIZE) * 100)}%`,
                                width: `${(1 / GRID_SIZE) * 100}%`,
                                height: `${(1 / GRID_SIZE) * 100}%`,
                                background: isHead ? '#6366f1' : isSnake ? '#818cf8' : isFood ? '#ef4444' : 'transparent',
                                borderRadius: isFood ? '50%' : '2px',
                                transition: 'background 0.1s',
                                zIndex: isSnake || isFood ? 1 : 0,
                            }} />
                        );
                    })}

                    {isPaused && !gameOver && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 10 }}>
                            <button onClick={() => setIsPaused(false)} className="btn btn-primary">Start Game</button>
                        </div>
                    )}

                    {gameOver && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 10 }}>
                            <h2 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Game Over</h2>
                            <p style={{ marginBottom: '1rem' }}>Final Score: {score}</p>
                            <button onClick={resetGame} className="btn btn-primary">Try Again</button>
                        </div>
                    )}
                </div>

                {/* Speed Selector */}
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <button onClick={() => setSpeed(150)} className={`btn ${speed === 150 ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Normal</button>
                    <button onClick={() => setSpeed(80)} className={`btn ${speed === 80 ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Fast</button>
                </div>
            </div>

            {/* Mobile Controls */}
            <div className="card" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => direction !== 'DOWN' && setDirection('UP')} className="btn btn-secondary" style={{ width: '60px', height: '50px' }}>↑</button>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => direction !== 'RIGHT' && setDirection('LEFT')} className="btn btn-secondary" style={{ width: '60px', height: '50px' }}>←</button>
                    <button onClick={() => direction !== 'UP' && setDirection('DOWN')} className="btn btn-secondary" style={{ width: '60px', height: '50px' }}>↓</button>
                    <button onClick={() => direction !== 'LEFT' && setDirection('RIGHT')} className="btn btn-secondary" style={{ width: '60px', height: '50px' }}>→</button>
                </div>
            </div>

            <FAQSection items={faqs} />
            <EliteSEOCards
                toolName="Snake Game"
                howToUse="To start playing the Snake Game, click the 'Start Game' button to activate the game board and begin the snake's movement. You can control the snake's direction using the arrow keys on your keyboard or the on-screen directional buttons if you are playing on a mobile device. Your goal is to navigate the snake to eat the red food pellets, which increases your score by 10 points and makes the snake longer. Be careful to avoid colliding with the walls or the snake's own tail, as this will result in a 'Game Over' and end your current run. You can customize your experience by switching between 'Normal' and 'Fast' speeds at any time to match your skill level. Once a game ends, simply click 'Try Again' to reset the board and attempt to beat your high score with instant feedback."
                whyUse="Playing the Snake Game online provides a nostalgic yet modern gaming experience that is perfect for improving your hand-eye coordination and reflexes with total precision. Our 'elite' version features a sleek, high-response interface that works flawlessly across all devices, ensuring you have the reliability needed for high-stakes record-breaking. Unlike older versions, our digital simulator includes a session-high score tracker and customizable speed settings, allowing you to tailor the challenge to your liking. The minimalist, dark-themed design reduces eye strain during long play sessions, making it a comfortable and time-saving way to take a quick mental break. It is a stable and accessible tool that requires no installation, offering a premium way to enjoy a classic arcade favorite with modern performance. Whether you are a casual player or a dedicated high-score chaser, this online Snake Game offers a polished and professional platform for endless entertainment."
            />
        </div>
    );
}
