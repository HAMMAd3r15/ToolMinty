'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function RandomDecisionMaker() {
    const [options, setOptions] = useState<string[]>(['Option 1', 'Option 2']);
    const [result, setResult] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const addOption = () => setOptions([...options, `Option ${options.length + 1}`]);
    const updateOption = (i: number, val: string) => {
        const next = [...options];
        next[i] = val;
        setOptions(next);
    };
    const removeOption = (i: number) => setOptions(options.filter((_, idx) => idx !== i));

    const pickRandom = () => {
        setIsSpinning(true);
        setResult(null);
        setTimeout(() => {
            const picked = options[Math.floor(Math.random() * options.length)];
            setResult(picked);
            setIsSpinning(false);
        }, 800);
    };

    const faqs = [
        {
            question: "Why use a random decision maker?",
            answer: "Decision fatigue is real. For minor choices like what to eat or what movie to watch, let randomness take over to save your mental energy for important tasks."
        },
        {
            question: "Is this truly random?",
            answer: "We use JavaScript's `Math.random()`, which provides a high-quality pseudorandom result perfect for casual decision-making."
        },
        {
            question: "How many options can I add?",
            answer: "You can add as many as you like! The interface will adjust to show all your potential choices."
        }
    ];

    const calc = calculators.find(c => c.href === '/random-decision');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Random Decision Maker'}
                description={calc?.description || 'End the indecision. Let the algorithm choose for you.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {options.map((opt, i) => (
                            <div key={i} style={{ display: 'flex', gap: '0.75rem' }}>
                                <input className="input" value={opt} onChange={(e) => updateOption(i, e.target.value)} style={{ flex: 1 }} />
                                {options.length > 2 && <button onClick={() => removeOption(i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>}
                            </div>
                        ))}
                    </div>
                    <button onClick={addOption} className="btn-secondary">+ Add Option</button>
                    <button onClick={pickRandom} className="btn btn-primary" disabled={isSpinning} style={{ padding: '1rem' }}>
                        {isSpinning ? 'Deciding...' : 'Pick for Me!'}
                    </button>

                    {result && (
                        <div style={{
                            marginTop: '2rem',
                            textAlign: 'center',
                            padding: '2rem',
                            background: 'rgba(37, 99, 235, 0.1)',
                            borderRadius: '1.5rem',
                            border: '2px solid var(--color-primary)',
                            animation: 'scaleIn 0.3s ease-out forwards'
                        }}>
                            <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.5rem' }}>The Choice is Made:</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>{result}</div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Random Decision Maker"
                howToUse="To start, enter your potential choices into the input fields provided—simply click '+ Add Option' to include as many as you need. Once your list is ready, click the 'Pick for Me!' button. The tool uses a fair randomization algorithm to cycle through your possibilities before highlighting the winner in a premium, high-fidelity result card. You can easily remove options by clicking the '×' button or update them instantly by editing the text. This friction-free process is designed to eliminate indecision in seconds, providing a clear path forward for any casual choice."
                whyUse="Our Random Decision Maker is the ultimate digital solution for overcoming 'analysis paralysis' during your daily routine. Whether you're choosing what to eat, which movie to watch, or settling a friendly debate, this tool provides a 100% unbiased and fair outcome based on standard pseudo-random algorithms. The 'elite' design features a clean, glassmorphic UI with smooth animations that make the decision process feel interactive and decisive rather than just functional. It is fully responsive and free to use, allowing you to settle dilemmas on any device without the need for physical draws or complicated coin flips. By delegating minor choices to the algorithm, you save your mental energy for more important tasks while adding a touch of fun to your day."
            />
            <style jsx>{`
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .btn-secondary {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
