'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const TRUTHS = [
    "What’s your biggest fear?",
    "Who was your first crush?",
    "What’s your most embarrassing moment?",
    "What’s your guilty pleasure?",
    "Have you ever lied to get out of trouble?",
    "What’s your biggest insecurity?",
    "What’s your worst habit?",
    "Who do you admire the most?",
    "What’s your dream job?",
    "Have you ever had a crush on a friend?",
    "What’s something you regret?",
    "What’s the most childish thing you still do?",
    "What’s your biggest pet peeve?",
    "What’s a secret talent you have?",
    "Have you ever faked being sick?",
    "What’s the weirdest dream you’ve had?",
    "What’s something you wish you were better at?",
    "Who do you text the most?",
    "What’s your most awkward moment?",
    "What’s a bad habit you’re trying to fix?",
    "Have you ever blamed someone else for something you did?",
    "What’s the most trouble you’ve been in?",
    "What’s your biggest goal right now?",
    "What’s the most embarrassing song you like?",
    "Have you ever ghosted someone?",
    "What’s your most used emoji?",
    "What’s something you’ve never told your parents?",
    "What’s your biggest motivation?",
    "Who here do you trust the most?",
    "If you could change one thing about yourself, what would it be?",
    "Who here would you date if you had to choose?",
    "What’s the biggest lie you’ve ever told?",
    "Have you ever had a crush on someone in this room?",
    "What’s your biggest turn-on?",
    "What’s your biggest turn-off?",
    "Who was your most recent crush?",
    "Have you ever stalked someone online?",
    "What’s the most selfish thing you’ve done?",
    "What’s the most childish argument you’ve had?",
    "Who do you secretly envy?",
    "Have you ever flirted to get something?",
    "What’s your biggest relationship mistake?",
    "What’s something you’ve done that you’d never post online?",
    "Who was your worst heartbreak?",
    "What’s your biggest insecurity in relationships?",
    "Have you ever had feelings for two people at once?",
    "What’s the meanest thing you’ve said to someone?",
    "What’s a secret you hope never comes out?",
    "Have you ever liked someone your friend liked?",
    "What’s your most toxic trait?",
    "Have you ever been jealous for no reason?",
    "What’s your biggest red flag?",
    "Who was your most awkward crush?",
    "Have you ever pretended to like someone?",
    "What’s the most dramatic thing you’ve done for attention?",
    "Have you ever broken someone’s heart?",
    "What’s the worst rumor you’ve spread?",
    "Who do you think likes you but you don’t like back?",
    "What’s your biggest fear in love?",
    "If your ex described you in one word, what would it be?"
];

const DARES = [
    "Sing your favorite song out loud.",
    "Do 15 push-ups.",
    "Dance without music for 30 seconds.",
    "Talk in a funny accent for 2 minutes.",
    "Tell a joke.",
    "Spin around 10 times and walk straight.",
    "Do your best animal impression.",
    "Make a funny face and hold it for 30 seconds.",
    "Speak only in questions for 1 minute.",
    "Pretend to be a robot.",
    "Do a plank for 30 seconds.",
    "Act like a news reporter.",
    "Recite a poem dramatically.",
    "Do your best villain laugh.",
    "Try to whistle a full song.",
    "Pretend the floor is lava for 30 seconds.",
    "Walk like a model across the room.",
    "Imitate someone in the room.",
    "Do 20 jumping jacks.",
    "Act like a baby for 1 minute.",
    "Say the alphabet backwards.",
    "Create a new handshake with someone.",
    "Talk like a pirate for 1 minute.",
    "Do your best superhero pose.",
    "Tell everyone a compliment.",
    "Balance on one leg for 1 minute.",
    "Make up a short rap about someone here.",
    "Attempt a magic trick.",
    "Act like you just won an award.",
    "End with a dramatic bow.",
    "Text your crush “I have something to tell you…” and don’t reply for 10 minutes.",
    "Let someone post a random emoji on your story.",
    "Call a friend and sing them a song.",
    "Do your best seductive walk across the room.",
    "Swap phones with someone for 2 minutes.",
    "Send the last photo in your gallery to someone random.",
    "Let someone change your profile picture for 24 hours.",
    "Act like you’re proposing to someone in the room.",
    "Read your last 5 search history items out loud.",
    "Let someone send a message from your phone.",
    "Do 30 squats while counting loudly.",
    "Talk in slow motion for 2 minutes.",
    "Attempt your most dramatic movie scene.",
    "Let someone draw something on your hand.",
    "Share your most embarrassing photo (if you have one).",
    "Do your best flirty line to someone.",
    "Pretend you’re crying over a soap opera scene.",
    "Let the group choose your Instagram bio for 24 hours.",
    "Try to do a handstand (or attempt it).",
    "Say something bold about your biggest crush.",
    "Do a funny runway walk like a celebrity.",
    "Call someone and tell them you miss them.",
    "Attempt a TikTok-style dance.",
    "Reveal your most recent screenshot.",
    "Speak in rhymes for 3 minutes.",
    "Let someone style your hair however they want.",
    "Tell the person to your left what you really think about them.",
    "Do your best evil mastermind speech.",
    "Act like you’re confessing love in a dramatic movie.",
    "Do a 60-second freestyle rap."
];

export default function TruthOrDareForm() {
    const calc = calculators.find(c => c.href === '/truth-or-dare');
    const [choice, setChoice] = useState<'Truth' | 'Dare' | null>(null);
    const [prompt, setPrompt] = useState('');

    const getTruth = () => {
        setChoice('Truth');
        setPrompt(TRUTHS[Math.floor(Math.random() * TRUTHS.length)]);
    };

    const getDare = () => {
        setChoice('Dare');
        setPrompt(DARES[Math.floor(Math.random() * DARES.length)]);
    };

    const reset = () => {
        setChoice(null);
        setPrompt('');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <ToolHeader
                title={calc?.title || 'Truth or Dare'}
                description={calc?.description || 'Generate fun and engaging prompts for the classic party game instantly.'}
            />

            {/* Premium Game Container */}
            <div className="game-container" style={{
                position: 'relative',
                padding: '3rem',
                marginBottom: '3rem',
                borderRadius: '2.5rem',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden',
                textAlign: 'center',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {/* Animated Background Blobs */}
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>

                {!choice ? (
                    <div className="selection-screen" style={{ position: 'relative', zIndex: 10, animation: 'fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem', background: 'linear-gradient(135deg, #fff 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Choose Your Fate
                        </h2>
                        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button onClick={getTruth} className="elite-btn truth-btn">
                                <span className="btn-icon">💡</span>
                                <span className="btn-text">Truth</span>
                                <span className="btn-blur"></span>
                            </button>
                            <button onClick={getDare} className="elite-btn dare-btn">
                                <span className="btn-icon">🔥</span>
                                <span className="btn-text">Dare</span>
                                <span className="btn-blur"></span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="prompt-display" style={{ position: 'relative', zIndex: 10, width: '100%', animation: 'revealPrompt 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '0.6rem 2rem',
                            borderRadius: '2rem',
                            background: choice === 'Truth' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(236, 72, 153, 0.2)',
                            border: `1px solid ${choice === 'Truth' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(236, 72, 153, 0.4)'}`,
                            color: choice === 'Truth' ? '#818CF8' : '#F472B6',
                            fontSize: '0.9rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            marginBottom: '2rem'
                        }}>
                            Your {choice} is:
                        </div>
                        <h2 className="prompt-text" style={{
                            fontSize: '2.8rem',
                            fontWeight: 850,
                            lineHeight: 1.2,
                            color: '#fff',
                            marginBottom: '3rem',
                            padding: '0 1rem'
                        }}>
                            {prompt}
                        </h2>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={choice === 'Truth' ? getTruth : getDare} className="action-btn next-btn">
                                🎲 Another {choice}
                            </button>
                            <button onClick={reset} className="action-btn reset-btn">
                                ↩️ Go Back
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <FAQSection items={[
                {
                    question: "What is Truth or Dare?",
                    answer: "Truth or Dare is a classic party game where players choose between answering a truth question honestly or performing a dare. It's a great way to break the ice and learn fun things about your friends."
                },
                {
                    question: "Can I play this game online with friends?",
                    answer: "Absolutely! You can use this tool during a video call or in person. Just click the buttons to generate prompts and share them with the group. It's perfectly synced across devices if you share your screen."
                },
                {
                    question: "Are the prompts suitable for all ages?",
                    answer: "The prompts in this tool are designed to be lighthearted and 'party-standard' (generally PG to PG-13). However, you should always use your discretion based on the comfort level of your group."
                }
            ]} />

            <EliteSEOCards
                toolName="Truth or Dare Generator"
                howToUse="To start, choose your fate by selecting either 'Truth' or 'Dare'. The generator will instantly provide a creative prompt for you to answer or perform. Click 'Another' to keep the game going or 'Go Back' to switch categories at any time."
                whyUse="An online Truth or Dare generator takes the pressure off coming up with questions on the spot. It ensures a diverse range of fun, unpredictable, and engaging prompts, making it the perfect companion for parties, virtual hangouts, or just passing time with friends."
            />

            <style jsx>{`
                .game-container::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%);
                    pointer-events: none;
                }

                .blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.15;
                    z-index: 1;
                    animation: float 20s infinite alternate ease-in-out;
                }

                .blob-1 {
                    width: 300px;
                    height: 300px;
                    background: #6366f1;
                    top: -100px;
                    left: -100px;
                }

                .blob-2 {
                    width: 400px;
                    height: 400px;
                    background: #ec4899;
                    bottom: -150px;
                    right: -150px;
                    animation-delay: -5s;
                }

                .blob-3 {
                    width: 250px;
                    height: 250px;
                    background: #a855f7;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation-delay: -10s;
                }

                @keyframes float {
                    0% { transform: translate(0, 0) scale(1.1); }
                    100% { transform: translate(50px, 50px) scale(0.9); }
                }

                .elite-btn {
                    position: relative;
                    width: 180px;
                    height: 180px;
                    border-radius: 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    background: rgba(255, 255, 255, 0.05);
                }

                .btn-icon { font-size: 3rem; transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
                .btn-text { font-size: 1.2rem; font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: 0.1em; }

                .truth-btn:hover { background: rgba(99, 102, 241, 0.1); border-color: #6366f1; transform: translateY(-10px); }
                .dare-btn:hover { background: rgba(236, 72, 153, 0.1); border-color: #ec4899; transform: translateY(-10px); }

                .elite-btn:hover .btn-icon { transform: scale(1.2); }

                .action-btn {
                    padding: 1rem 2.5rem;
                    border-radius: 1.5rem;
                    font-weight: 700;
                    font-size: 1rem;
                    transition: all 0.2s ease;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .next-btn {
                    background: var(--color-secondary);
                    color: #fff;
                }

                .next-btn:hover {
                    background: var(--color-secondary-hover);
                    transform: scale(1.05);
                    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
                }

                .reset-btn {
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--color-text-secondary);
                }

                .reset-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes revealPrompt {
                    0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                .prompt-text {
                    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                }

                @media (max-width: 640px) {
                    .prompt-text { font-size: 2rem !important; }
                    .elite-btn { width: 140px; height: 140px; }
                    .btn-icon { font-size: 2.5rem; }
                    .game-container { padding: 2rem 1rem; }
                }
            `}</style>
        </div>
    );
}
