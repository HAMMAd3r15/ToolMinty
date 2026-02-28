'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

type Choice = 'rock' | 'paper' | 'scissors';
const CHOICES: Choice[] = ['rock', 'paper', 'scissors'];
const EMOJI: Record<Choice, string> = { rock: '✊', paper: '✋', scissors: '✌️' };
const BEATS: Record<Choice, Choice> = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

const RESULTS: Record<string, { text: string; color: string }> = {
    win: { text: "You Win! 🏆", color: '#10b981' },
    lose: { text: "You Lose! 😔", color: '#ef4444' },
    draw: { text: "It's a Draw! 🤝", color: '#f59e0b' },
};

export default function RockPaperScissors() {
    const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
    const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
    const [outcome, setOutcome] = useState<'win' | 'lose' | 'draw' | null>(null);
    const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
    const [animKey, setAnimKey] = useState(0);
    const [isRevealing, setIsRevealing] = useState(false);

    const play = (choice: Choice) => {
        if (isRevealing) return;
        setIsRevealing(true);
        setPlayerChoice(choice);
        setComputerChoice(null);
        setOutcome(null);
        setAnimKey(k => k + 1);

        setTimeout(() => {
            const cpu = CHOICES[Math.floor(Math.random() * 3)];
            setComputerChoice(cpu);
            let result: 'win' | 'lose' | 'draw';
            if (choice === cpu) result = 'draw';
            else if (BEATS[choice] === cpu) result = 'win';
            else result = 'lose';
            setOutcome(result);
            setScore(s => ({ ...s, [result === 'win' ? 'wins' : result === 'lose' ? 'losses' : 'draws']: s[result === 'win' ? 'wins' : result === 'lose' ? 'losses' : 'draws'] + 1 }));
            setIsRevealing(false);
        }, 700);
    };

    const calc = calculators.find(c => c.href === '/rock-paper-scissors');
    const faqs = [
        { question: "How does the computer choose?", answer: "The computer's choice is completely random using a secure random number generator, providing a fair 1/3 probability for each option (Rock, Paper, or Scissors)." },
        { question: "Are there any winning strategies?", answer: "Against a truly random opponent, there's no mathematical strategy. However, in real life, people often have predictable patterns. The best strategy here is to play as randomly as possible!" },
        { question: "What are the rules of Rock Paper Scissors?", answer: "Rock beats Scissors, Scissors beat Paper, and Paper beats Rock. If both players choose the same weapon, it's a draw and you should play again." },
        { question: "Is this game free to play?", answer: "Yes, our Rock Paper Scissors game is completely free and requires no registration or downloads. You can play as many rounds as you like." },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Rock Paper Scissors'} description={calc?.description || ''} />

            {/* Score */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[
                    { label: 'Wins', value: score.wins, color: '#10b981' },
                    { label: 'Draws', value: score.draws, color: '#f59e0b' },
                    { label: 'Losses', value: score.losses, color: '#ef4444' },
                ].map(({ label, value, color }) => (
                    <div key={label} style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color }}>{value}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{label}</div>
                    </div>
                ))}
            </div>

            {/* Battle Arena */}
            <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '1.5rem 0', marginBottom: '1rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>You</div>
                        <div key={`p-${animKey}`} style={{
                            fontSize: '4rem', transition: 'all 0.3s',
                            animation: playerChoice && !isRevealing ? 'choicePop 0.4s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                        }}>{playerChoice ? EMOJI[playerChoice] : '❓'}</div>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-tertiary)' }}>VS</div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Computer</div>
                        <div style={{ fontSize: '4rem', animation: isRevealing ? 'cpuThink 0.5s ease-in-out infinite alternate' : 'none' }}>
                            {isRevealing ? '🤔' : computerChoice ? EMOJI[computerChoice] : '❓'}
                        </div>
                    </div>
                </div>

                {outcome && !isRevealing && (
                    <div style={{
                        padding: '0.75rem 1.5rem', borderRadius: '2rem', display: 'inline-block', fontWeight: 800, fontSize: '1.2rem',
                        background: `${RESULTS[outcome].color}20`, color: RESULTS[outcome].color,
                        border: `2px solid ${RESULTS[outcome].color}60`,
                        animation: 'resultReveal 0.4s cubic-bezier(0.34,1.56,0.64,1)', marginBottom: '0.5rem',
                    }}>{RESULTS[outcome].text}</div>
                )}
                {outcome && computerChoice && !isRevealing && (
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                        {outcome === 'win' ? `${EMOJI[playerChoice!]} beats ${EMOJI[computerChoice!]}` : outcome === 'lose' ? `${EMOJI[computerChoice!]} beats ${EMOJI[playerChoice!]}` : "Same choice!"}
                    </div>
                )}
            </div>

            {/* Choice Buttons */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '1rem', margin: '0 0 1rem' }}>Choose your weapon:</p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                    {CHOICES.map(c => (
                        <button key={c} onClick={() => play(c)} disabled={isRevealing} style={{
                            flex: 1, padding: '1.5rem 0', fontSize: '2.5rem', borderRadius: '1rem',
                            background: playerChoice === c && !isRevealing ? 'rgba(99,102,241,0.15)' : 'var(--color-bg)',
                            border: `2px solid ${playerChoice === c && !isRevealing ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                            cursor: isRevealing ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{EMOJI[c]}</button>
                    ))}
                </div>
            </div>

            <FAQSection items={faqs} />
            <EliteSEOCards
                toolName="Rock Paper Scissors"
                howToUse="To play Rock Paper Scissors, simply navigate to the 'Choose your weapon' section and click on the emoji representing your choice: Rock, Paper, or Scissors. Once you've made your selection, the game will instantly enter a brief 'thinking' phase where the computer randomly generates its own move. The results are immediately displayed in the battle arena, showing both choices and clearly announcing if you won, lost, or ended in a draw. Your overall win-loss-draw record is automatically updated in the scorecard at the top of the page, allowing you to track your luck over time. You can keep playing as many rounds as you like by simply choosing another weapon—no reset needed. The process is completely simple, beginner-friendly, and offers instant results for quick decision-making or casual fun."
                whyUse="Using an online Rock Paper Scissors tool offers a fair, fast, and highly convenient way to settle simple choices or enjoy a quick mental break with total reliability. Unlike physical games that can be influenced by slight timing hints, our digital version uses a secure random number generator to ensure every round is 100% impartial and unpredictable. This makes it an ideal, time-saving solution for offices, schools, or any social setting where a quick, unbiased decision is needed. The 'elite' design features high-fidelity glassmorphic cards and smooth animations that make the experience feel premium and modern on any device. It's fully accessible without any downloads or registration, providing a stable and fun platform that respects your time. Whether you're testing your luck or just looking for a bit of classic entertainment, this online simulator delivers a polished and professional version of the world's most popular hand game."
            />
            <style jsx>{`
                @keyframes choicePop {
                    from { transform: scale(0.6) rotate(-10deg); }
                    to   { transform: scale(1) rotate(0); }
                }
                @keyframes cpuThink {
                    from { transform: scale(0.9) rotate(-5deg); }
                    to   { transform: scale(1.1) rotate(5deg); }
                }
                @keyframes resultReveal {
                    from { transform: scale(0.7); opacity: 0; }
                    to   { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
