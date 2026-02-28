'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const QUESTIONS = [
    "Would you rather know how you’ll die or when you’ll die?",
    "Would you rather be feared or deeply respected?",
    "Would you rather forget your worst memory or never forget your best one?",
    "Would you rather always say what you think or never speak again?",
    "Would you rather live one perfect year repeatedly or live a long unpredictable life?",
    "Would you rather lose all ambition or never feel satisfied?",
    "Would you rather always be alone or never have privacy?",
    "Would you rather relive your past mistakes or never remember your successes?",
    "Would you rather be a genius nobody listens to or average and influential?",
    "Would you rather feel everything deeply or feel nothing at all?",
    "Would you rather be rich and bored or poor and passionate?",
    "Would you rather earn money doing something you hate or struggle doing what you love?",
    "Would you rather have unlimited money but no free time or average money with total freedom?",
    "Would you rather lose your phone or your wallet forever?",
    "Would you rather retire at 30 with a simple life or work until 70 living luxuriously?",
    "Would you rather never worry about money or never worry about health?",
    "Would you rather double your salary or double your free time?",
    "Would you rather live debt-free but paycheck to paycheck or wealthy with constant stress?",
    "Would you rather lose all savings or all memories of earning them?",
    "Would you rather control time or control money?",
    "Would you rather be loved more than you love or love more than you’re loved?",
    "Would you rather be brutally honest or comfortably lied to?",
    "Would you rather your partner read your mind or never know your thoughts?",
    "Would you rather lose your best friend or your romantic partner?",
    "Would you rather always win arguments or always keep peace?",
    "Would you rather forgive someone who hurt you or never forget what they did?",
    "Would you rather be famous and lonely or unknown and fulfilled?",
    "Would you rather have many shallow friendships or one deep connection?",
    "Would you rather never argue again or never apologize again?",
    "Would you rather fall in love once forever or many times briefly?",
    "Would you rather live without music or without movies?",
    "Would you rather never sleep or never eat?",
    "Would you rather survive the apocalypse alone or with people you hate?",
    "Would you rather lose the ability to lie or always know when others lie?",
    "Would you rather be stuck in a horror movie or a survival game?",
    "Would you rather teleport randomly once a day or fly slowly forever?",
    "Would you rather relive one day forever or skip ten years instantly?",
    "Would you rather be invisible or able to read minds?",
    "Would you rather control fire or control water?",
    "Would you rather explore space or the deep ocean?",
    "Would you rather always trip when entering rooms or always spill drinks?",
    "Would you rather laugh at the wrong moments or cry at random times?",
    "Would you rather fight one horse-sized duck or a hundred duck-sized horses?",
    "Would you rather have hiccups for life or sneeze uncontrollably once a day?",
    "Would you rather speak only in rhymes or sing everything you say?",
    "Would you rather wear the same outfit forever or never repeat clothes?",
    "Would you rather your thoughts appear above your head or your search history be public?",
    "Would you rather be famous for something embarrassing or unknown for something great?",
    "Would you rather eat the same meal forever or never eat your favorite food again?",
    "Would you rather have permanent bed hair or permanent morning voice?",
    "Would you rather be trained by Batman or mentored by Iron Man?",
    "Would you rather have the powers of Spider-Man or the strength of Superman?",
    "Would you rather be a hero with Doctor Strange’s knowledge or The Flash’s speed?",
    "Would you rather fight alongside Wonder Woman or Captain America?",
    "Would you rather outsmart Loki or outfight Thanos?",
    "Would you rather live in Gotham or New York during a superhero crisis?",
    "Would you rather lose powers permanently or risk becoming a villain?",
    "Would you rather be a famous hero hated by the public or an unknown hero saving lives?",
    "Would you rather fight crime at night or save the world once?",
    "Would you rather be part of the Justice League or the Avengers?",
    "Would you rather train under Naruto Uzumaki or fight alongside Goku?",
    "Would you rather master chakra or ki?",
    "Would you rather wield a sword like Zoro or fight hand-to-hand like Levi Ackerman?",
    "Would you rather live in the world of pirates or ninja?",
    "Would you rather have infinite stamina or infinite strength?",
    "Would you rather be the strongest but lonely or average with loyal friends?",
    "Would you rather lose a battle or lose your pride?",
    "Would you rather be reincarnated with memories or start fresh?",
    "Would you rather fight one unbeatable enemy or endless weak enemies?",
    "Would you rather sacrifice yourself or the mission?",
    "Would you rather always be early or always be late?",
    "Would you rather never feel fear or never feel anger?",
    "Would you rather have answers to everything or questions that never end?",
    "Would you rather live fast and die young or live long and quietly?",
    "Would you rather win without effort or struggle and lose?",
    "Would you rather trust everyone or trust no one?",
    "Would you rather be remembered forever or live happily unnoticed?",
    "Would you rather control your dreams or never dream again?",
    "Would you rather always succeed alone or fail together?",
    "Would you rather rewrite history or predict the future?",
    "Would you rather change one mistake or relive one success?",
    "Would you rather always be right or always be kind?",
    "Would you rather lose your ambition or your comfort?",
    "Would you rather have certainty or hope?",
    "Would you rather be needed or wanted?",
    "Would you rather end a war or prevent one birth?",
    "Would you rather save one person you love or ten strangers?",
    "Would you rather live with regret or uncertainty?",
    "Would you rather be powerful or peaceful?",
    "Would you rather control others or control yourself?",
    "Would you rather lose internet forever or lose friends forever?",
    "Would you rather never use social media again or never stream content again?",
    "Would you rather always have low battery or slow internet?",
    "Would you rather accidentally text the wrong person or send the wrong screenshot?",
    "Would you rather go viral for the wrong reason or never be noticed?",
    "Would you rather forget passwords daily or remember everyone’s secrets?",
    "Would you rather work your dream job under a bad boss or a boring job with freedom?",
    "Would you rather always be busy or always be bored?",
    "Would you rather live without notifications or without silence?",
    "Would you rather always be watched or always be ignored?",
    "Would you rather know the truth even if it hurts or live happily ignorant?",
    "Would you rather sacrifice comfort or sacrifice growth?",
    "Would you rather lead and fail or follow and succeed?",
    "Would you rather live without purpose or die for one?",
    "Would you rather be a legend or a mystery?",
    "Would you rather lose today or lose tomorrow?",
    "Would you rather fight fate or accept it?",
    "Would you rather be remembered incorrectly or forgotten completely?",
    "Would you rather change yourself or change the world?",
    "Would you rather be unstoppable or untouchable?",
    "Would you rather always get second chances or never need one?",
    "Would you rather be brave once or careful forever?",
    "Would you rather live without rules or without freedom?",
    "Would you rather be loved briefly or respected eternally?",
    "Would you rather hear compliments or feel understood?",
    "Would you rather chase dreams or build stability?",
    "Would you rather win silently or lose loudly?",
    "Would you rather be feared by enemies or doubted by allies?",
    "Would you rather forgive yourself or be forgiven by others?",
    "Would you rather matter to one person or influence millions?",
    "Would you rather be unforgettable for one thing or remembered for many small things?",
    "Would you rather never feel pain or never feel fear?",
    "Would you rather speak every language or understand every emotion?",
    "Would you rather control your past or protect your future?",
    "Would you rather be broken and honest or whole and fake?",
    "Would you rather lose hope or lose certainty?",
    "Would you rather chase perfection or accept imperfection?",
    "Would you rather live truthfully or comfortably?",
    "Would you rather be needed today or remembered tomorrow?",
    "Would you rather be strong alone or weak together?",
    "Would you rather know your limits or never find them?",
    "Would you rather live one meaningful year or many empty ones?",
    "Would you rather risk everything once or play safe forever?",
    "Would you rather be the hero of your story or the lesson?",
    "Would you rather be honest and misunderstood or fake and loved?",
    "Would you rather lose control or lose identity?",
    "Would you rather fight alone or surrender together?",
    "Would you rather build something great or destroy something evil?",
    "Would you rather be free and uncertain or safe and trapped?",
    "Would you rather change your ending or your beginning?",
    "Would you rather never be wrong or never be alone?",
    "Would you rather feel deeply or think clearly?",
    "Would you rather be remembered for courage or kindness?",
    "Would you rather fail trying or succeed accidentally?",
    "Would you rather rewrite one moment or relive one feeling?",
    "Would you rather lead change or adapt to it?",
    "Would you rather lose control once or slowly over time?",
    "Would you rather stand out or belong?",
    "Would you rather burn bright briefly or glow softly forever?",
    "Would you rather choose your fate or let it surprise you?"
];

export default function WouldYouRatherForm() {
    const calc = calculators.find(c => c.href === '/would-you-rather');
    const [question, setQuestion] = useState(QUESTIONS[0]);

    const nextQuestion = () => {
        const next = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setQuestion(next);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Would You Rather?'}
                description={calc?.description || 'Explore fun dilemmas and make tough choices with this random question generator.'}
            />

            <div className="card" style={{ textAlign: 'center', padding: '3rem', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', background: 'var(--color-primary)', opacity: 0.1, borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '150px', height: '150px', background: 'var(--color-secondary)', opacity: 0.1, borderRadius: '50%' }}></div>

                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem', lineHeight: 1.4, minHeight: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {question}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                    <button onClick={nextQuestion} style={{ padding: '1.5rem', borderRadius: '1rem', border: '2px solid var(--color-primary)', background: 'transparent', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', fontSize: '1.1rem' }}>
                        Option A
                    </button>
                    <button onClick={nextQuestion} style={{ padding: '1.5rem', borderRadius: '1rem', border: '2px solid var(--color-secondary)', background: 'transparent', color: 'var(--color-secondary)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', fontSize: '1.1rem' }}>
                        Option B
                    </button>
                </div>

                <button
                    onClick={nextQuestion}
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '0.75rem 2rem', borderRadius: '2rem', color: 'var(--color-text-secondary)', fontWeight: 600, cursor: 'pointer' }}
                >
                    Next Question ➔
                </button>
            </div>

            <FAQSection items={[
                {
                    question: "What is the Would You Rather Game?",
                    answer: "The Would You Rather Game is a fun question-based game where players must choose between two interesting or challenging options. Each question presents a dilemma, and there is no right or wrong answer. The game is designed to spark conversation, laughter, and creative thinking. It’s popular for parties, classrooms, and casual online play."
                },
                {
                    question: "How do you play the Would You Rather Game online?",
                    answer: "To play the Would You Rather Game online, simply start the game and read the two options shown on the screen. Choose the option you prefer and move on to the next question. You can play alone or with friends by comparing answers. No setup, login, or downloads are required."
                },
                {
                    question: "Is the Would You Rather Game free and suitable for all ages?",
                    answer: "Yes, this Would You Rather Game is completely free to play. The questions are designed to be family-friendly and suitable for most age groups. Players can enjoy the game on any device, including phones and tablets. It’s a safe and entertaining way to pass time or start conversations."
                }
            ]} />

            <EliteSEOCards
                toolName="Would You Rather? Generator"
                howToUse="Read the two options presented on the screen and choose the one you prefer. Click 'Option A' or 'Option B' to select, and use the 'Next Question' button to get a new dilemma instantly. You can play solo or use it as a conversation starter with friends to see where everyone stands on tough choices."
                whyUse="An online Would You Rather generator is the ultimate icebreaker for any social setting. It provides a consistent stream of thought-provoking, humorous, and sometimes difficult choices that reveal a lot about your friends and family. With a huge variety of pre-loaded questions, you'll never run out of things to talk about or debate."
            />
        </div>
    );
}
