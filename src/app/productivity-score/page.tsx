'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ResultCard from '@/components/UI/ResultCard';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


export default function ProductivityScore() {
    const [totalTasks, setTotalTasks] = useState<number>(10);
    const [completedTasks, setCompletedTasks] = useState<number>(7);
    const [deepWorkHours, setDeepWorkHours] = useState<number>(2);

    const score = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Weighted score example: (Completion % * 0.7) + (Deep Work / 8 * 0.3)
    const weightedScore = (score * 0.7) + (Math.min(deepWorkHours / 4, 1) * 30);

    const getGrade = (s: number) => {
        if (s >= 90) return { label: 'Elite', color: '#10b981' };
        if (s >= 75) return { label: 'Very Good', color: '#2563eb' };
        if (s >= 50) return { label: 'Productive', color: '#f59e0b' };
        return { label: 'Needs Focus', color: '#ef4444' };
    };

    const grade = getGrade(weightedScore);

    const faqs = [
        {
            question: "How is the score calculated?",
            answer: "Your score is based 70% on your task completion rate and 30% on your 'deep work' hours (uninterrupted focus time)."
        },
        {
            question: "What is considered a 'Deep Work' hour?",
            answer: "Deep work is a term popularized by Cal Newport. It refers to professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit."
        },
        {
            question: "Why didn't I get 100%?",
            answer: "100% represents a perfect day with high volume and high focus. Most productive people aim for a consistent 'Very Good' range rather than occasional 'Elite' days."
        }
    ];

    const calc = calculators.find(c => c.href === '/productivity-score');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Productivity Score Calculator'}
                description={calc?.description || 'Measure your daily efficiency based on task completion.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Total Tasks Planned</label>
                            <input type="number" className="input" value={totalTasks} onChange={(e) => setTotalTasks(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Tasks Completed</label>
                            <input type="number" className="input" value={completedTasks} onChange={(e) => setCompletedTasks(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Deep Work Hours (Focus Time)</label>
                        <input
                            type="range"
                            min="0"
                            max="12"
                            step="0.5"
                            value={deepWorkHours}
                            onChange={(e) => setDeepWorkHours(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                        />
                        <div style={{ textAlign: 'center', marginTop: '0.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{deepWorkHours} Hours</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                        <ResultCard
                            title="Daily Score"
                            value={`${Math.round(weightedScore)}%`}
                            highlight
                            color="primary"
                        />
                        <div style={{
                            background: 'rgba(30, 41, 59, 0.4)',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Performance Level</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: grade.color }}>{grade.label}</div>
                        </div>
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Productivity Score Calculator"
                howToUse="To measure your efficiency, enter the total number of tasks you planned and the number you successfully completed. Use the slider to add your 'Deep Work' hours—the time spent in uninterrupted focus. The tool calculates a weighted productivity percentage and provides a high-fidelity 'Performance Level' grade. This automated evaluation helps you track consistent trends and optimize your daily workflow with absolute precision."
                whyUse="Our Productivity Score Calculator is an 'elite' performance utility designed for professionals, students, and creators who demand more from their day. Unlike simple checklists, it provides a stable and scientifically-influenced score that prioritizes high-value focus time over mere task volume. The premium interface features glassmorphism and responsive design elements that make self-reflection a sophisticated and rewarding experience. It is a free, privacy-focused resource that processes your daily metrics entirely in your browser."
            />
        </div>
    );
}
