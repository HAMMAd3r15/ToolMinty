'use client';

import { useState, useEffect } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function WorkoutRestTimerForm() {
    const calc = calculators.find(c => c.href === '/workout-rest-timer');
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    const presets = [30, 60, 90, 120, 180];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Optional: alert or sound
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const startTimer = () => {
        setTimeLeft(seconds);
        setIsActive(true);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(seconds);
    };

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const faqs = [
        {
            question: "How long should I rest between sets?",
            answer: "For strength (1-5 reps), rest 3-5 minutes. For hypertrophy (6-12 reps), rest 60-90 seconds. For endurance (15+ reps), rest 30-60 seconds."
        },
        {
            question: "Can I customize the time?",
            answer: "Yes, you can select a preset or adjust the countdown before starting."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Workout Rest Timer'}
                description={calc?.description || 'Manage your exercise rest periods efficiently.'}
            />

            <div className="card" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', fontWeight: 800, fontFamily: 'monospace', marginBottom: '2rem', color: timeLeft > 10 ? 'var(--color-text-primary)' : '#ff4d4d' }}>
                    {formatTime(timeLeft)}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    {!isActive ? (
                        <button onClick={startTimer} style={{ padding: '1rem 3rem', borderRadius: '3rem', background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: 'none', fontWeight: 700, fontSize: '1.2rem', cursor: 'pointer' }}>START</button>
                    ) : (
                        <button onClick={() => setIsActive(false)} style={{ padding: '1rem 3rem', borderRadius: '3rem', background: '#ff4d4d', color: '#fff', border: 'none', fontWeight: 700, fontSize: '1.2rem', cursor: 'pointer' }}>PAUSE</button>
                    )}
                    <button onClick={resetTimer} style={{ padding: '1rem 2rem', borderRadius: '3rem', background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', fontWeight: 600, cursor: 'pointer' }}>RESET</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {presets.map((p) => (
                        <button
                            key={p}
                            onClick={() => { setSeconds(p); setTimeLeft(p); setIsActive(false); }}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: seconds === p ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                background: seconds === p ? 'var(--color-primary-transparent)' : 'transparent',
                                cursor: 'pointer'
                            }}
                        >
                            {p}s
                        </button>
                    ))}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Workout Rest Timer"
                howToUse="To manage your recovery, select one of the high-fidelity presets (30s, 60s, etc.) or manually set your desired rest duration. Click 'START' to begin the countdown, which features a premium, responsive display that changes color as time runs out. Use 'PAUSE' or 'RESET' to adjust on the fly. This automated process ensures you maintain absolute consistency between sets for maximum physiological results."
                whyUse="Our Workout Rest Timer is an 'elite' training utility designed for athletes who understand that recovery is just as important as the lift itself. It provides a stable and reliable way to track rest periods without the distractions of a standard phone timer. The premium user interface features glassmorphim and high-fidelity typography that makes high-intensity training feel sophisticated and controlled. It is a free, privacy-focused tool that runs entirely in your browser, keeping your workout data secure and private."
            />
        </div>
    );
}
