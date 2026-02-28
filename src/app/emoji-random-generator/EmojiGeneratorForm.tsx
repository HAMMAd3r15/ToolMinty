'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const EMOJI_SETS = {
    faces: ['😀', '😂', '😍', '🤔', '😎', '🤯', '🥳', '😴', '🤮', '😇', '🥺', '🤩', '🤫', '🫠', '🤡', '🤖'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🦁', '🐯', '🦒', '🐘', '🦘', '🐧'],
    food: ['🍕', '🍔', '🍟', '🌭', '🥪', '🌮', '🌯', '🥗', '🥘', '🍜', '🍣', '🍦', '🍩', '🍪', '🍫', '🥑'],
    weather: ['☀️', '☁️', '🌧️', '⛈️', '🌩️', '❄️', '🌬️', '🌪️', '🌈', '🔥', '🌊', '🌋', '🌌', '🌠', '🪐', '🌙'],
    activities: ['⚽', '🏀', '🏈', '🎾', '🏐', '🎮', '🕹️', '🎨', '🎬', '🎹', '🎸', '🎻', '🎤', '🎧', '🛹', '🚲'],
    travel: ['🚗', '🚕', '🚌', '🏎️', '🚆', '✈️', '🚀', '🛸', '🚢', '⚓', '🗺️', '🏰', '🗽', '🗼', '🏔️', '🏝️'],
    objects: ['📱', '💻', '⌚', '📷', '💡', '🔦', '📖', '💰', '💎', '🎁', '🎈', '🎉', '🎊', '🎀', '🪄', '🔮']
};

export default function EmojiGeneratorForm() {
    const calc = calculators.find(c => c.href === '/emoji-random-generator');
    const [result, setResult] = useState('');

    const generateCombo = () => {
        const categories = Object.keys(EMOJI_SETS) as Array<keyof typeof EMOJI_SETS>;
        let combo = '';
        for (let i = 0; i < 5; i++) {
            const cat = categories[Math.floor(Math.random() * categories.length)];
            const set = EMOJI_SETS[cat];
            combo += set[Math.floor(Math.random() * set.length)];
        }
        setResult(combo);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Emoji Fun Generator'}
                description={calc?.description || 'Generate random emoji combinations for fun, social media, or projects.'}
            />

            <div className="card" style={{ textAlign: 'center', padding: '3rem', marginBottom: '3rem' }}>
                <div style={{ fontSize: '4rem', minHeight: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', background: 'rgba(0,0,0,0.1)', borderRadius: '1rem' }}>
                    {result || '✨✨✨'}
                </div>

                <button
                    onClick={generateCombo}
                    className="button button-primary"
                    style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
                >
                    Generate Magic
                </button>

                {result && (
                    <button
                        onClick={() => navigator.clipboard.writeText(result)}
                        style={{ display: 'block', margin: '1.5rem auto 0', background: 'transparent', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Copy to Clipboard
                    </button>
                )}
            </div>

            <FAQSection items={[
                {
                    question: "Can I use these emojis anywhere?",
                    answer: "Yes! These are standard Unicode emojis and will work on any modern device, social media platform, or messaging app."
                },
                {
                    question: "How many combinations are possible?",
                    answer: "With 8 categories and over 120 unique emojis, there are millions of possible 5-emoji sequences you can generate!"
                },
                {
                    question: "What can I use these for?",
                    answer: "Use them for creative social media bios, quick mood updates, fun project placeholders, or just purely for entertainment."
                }
            ]} />

            <EliteSEOCards
                toolName="Emoji Random Generator"
                howToUse="Simply click the 'Generate Magic' button to instantly create a unique sequence of 5 random emojis. You can also copy the resulting combination to your clipboard with a single click for use in bios, messages, or social media posts."
                whyUse="An online random emoji generator is perfect for creative inspiration when you're stuck for ideas. Whether you need a unique social media bio, fun Discord status, or just want to explore the expressive world of emojis, this tool provides endless variety instantly."
            />
        </div>
    );
}
