'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const QUESTIONS = [
    "If you could instantly master any skill, what would it be?",
    "What’s the most interesting place you’ve ever visited?",
    "If you could live in any fictional world, which one would you choose?",
    "What’s one hobby you’ve always wanted to try?",
    "If your life had a theme song, what would it be?",
    "What’s your favorite way to spend a free weekend?",
    "If you could have dinner with any historical figure, who would it be?",
    "What’s a small thing that always makes your day better?",
    "Are you more of a morning person or night owl?",
    "What’s the best advice you’ve ever received?",
    "If you could travel anywhere right now, where would you go?",
    "What’s one food you could eat forever and never get tired of?",
    "If you won the lottery, what’s the first thing you’d do?",
    "What’s a movie or show you can rewatch anytime?",
    "Do you prefer mountains, beaches, or cities?",
    "What’s one goal you’re currently working toward?",
    "If you could switch lives with someone for a day, who would it be?",
    "What’s your favorite childhood memory?",
    "What’s one thing on your bucket list?",
    "If you had a time machine, would you go to the past or future?",
    "What’s your favorite season and why?",
    "If you could learn any language instantly, which one would it be?",
    "What’s your go-to comfort food?",
    "What’s one habit you’re proud of?",
    "Do you prefer texting or calling?",
    "What’s a random fun fact about you?",
    "If you could have any superpower, what would it be?",
    "What’s your dream job?",
    "What’s the best gift you’ve ever received?",
    "What’s one thing that always makes you laugh?",
    "If you could relive one day of your life, which would it be?",
    "What’s your favorite app on your phone?",
    "Do you prefer coffee or tea?",
    "What motivates you the most?",
    "If you had to describe yourself in three words, what would they be?",
    "What’s your favorite type of music?",
    "What’s a skill you think everyone should learn?",
    "What’s your favorite holiday and why?",
    "What’s something new you learned recently?",
    "If you could start a business, what would it be about?",
    "What’s your biggest pet peeve?",
    "If you could instantly visit space, would you go?",
    "What’s your favorite board game or video game?",
    "What’s a book that changed your perspective?",
    "Do you prefer working alone or in a team?",
    "What’s your favorite way to relax?",
    "If you could meet your future self, what would you ask?",
    "What’s your favorite dessert?",
    "What’s one thing you’re grateful for today?",
    "If you could try any extreme sport, what would it be?",
    "What’s your favorite social media platform?",
    "What’s the most spontaneous thing you’ve ever done?",
    "If you had a personal mascot, what would it be?",
    "What’s your favorite outdoor activity?",
    "What’s one movie that always makes you emotional?",
    "If you could live in any era, which would you choose?",
    "What’s your favorite quote?",
    "What’s a talent you wish you had?",
    "What’s your favorite way to celebrate achievements?",
    "What’s one thing you’d like to improve this year?",
    "If you could only use one app for a week, which would it be?",
    "What’s your favorite snack?",
    "What’s a dream destination on your travel list?",
    "If you had to teach something, what would it be?",
    "What’s your favorite way to stay productive?",
    "What’s one random skill you have?",
    "If you could redesign your room, what theme would you choose?",
    "What’s your favorite type of weather?",
    "What’s something that always inspires you?",
    "If you could make one positive change in the world, what would it be?",
    "If you could have dinner with anyone from history, who would it be?",
    "What is your most used emoji?",
    "What's the best piece of advice you've ever received?",
    "If you could have any superpower, what would it be?",
    "What is the first thing you'd buy if you won the lottery?",
    "What's your favorite way to spend a rainy afternoon?",
    "What is one thing you can't live without?",
    "If you could travel anywhere right now, where would you go?",
    "What's your go-to karaoke song?",
    "What's the most interesting thing you've learned recently?",
    "What’s the best concert you’ve ever been to?",
    "If you could be an animal for a day, which one would you be?",
    "What’s your favorite way to start the day?",
    "If you could host a talk show, who would be your first guest?",
    "What’s the most unusual food you’ve ever tried?",
    "What’s a goal you want to achieve in the next 5 years?",
    "If you could have any mythological creature as a pet, what would it be?",
    "What’s the best book you’ve read lately?",
    "If you could win an Olympic medal in any sport, what would it be?",
    "What’s your favorite way to wind down at night?",
    "If you could rename yourself, what name would you choose?",
    "What’s the most adventurous thing you’ve ever done?",
    "If you could go back and tell your 10-year-old self one thing, what would it be?",
    "What’s your favorite thing about your hometown?",
    "If you could be famous for one thing, what would it be?",
    "What’s a song that always gets you on the dance floor?",
    "If you could travel through time, would you go to the 1920s or the 2080s?",
    "What’s your favorite piece of technology?",
    "If you could be a character in any video game, who would you be?",
    "What’s the most thoughtful gift you’ve ever given someone?",
    "If you could live on any planet besides Earth, which one would it be?",
    "What’s your favorite way to spend a snow day?",
    "If you could be a master chef, what would be your signature dish?",
    "What’s the best compliment you’ve ever received?",
    "If you could have a conversation with a version of yourself from 10 years in the future, what would you ask?",
    "What’s your favorite documentary or educational show?",
    "If you could be an expert in any obscure subject, what would it be?",
    "What’s the most beautiful natural wonder you’ve ever seen?",
    "If you could have any artist paint your portrait, who would it be?",
    "What’s your favorite tradition in your family or friend group?",
    "If you could be the CEO of any company for a week, which would you choose?",
    "What’s your favorite way to learn new things?",
    "If you could have a secondary home anywhere, where would it be?",
    "What’s the most interesting hobby you’ve heard of?",
    "If you could solve one unsolved mystery, which would it be?",
    "What’s your favorite thing about the current season?",
    "If you could bring any historical fashion back into style, what would it be?",
    "What’s the most inspiring movie you’ve ever watched?",
    "If you could have a permanent discount at one store, which would it be?",
    "What’s your favorite way to give back to the community?",
    "If you could be a character from a book for a day, who would you choose?",
    "What’s your favorite item in your house?",
    "If you could spend a week in a high-tech smart house or a cozy cabin in the woods, which would you pick?",
    "What’s the most memorable dream you’ve ever had?",
    "If you could be a voice actor for any animated character, which one would it be?",
    "What’s your favorite type of architecture?",
    "If you could create a new holiday, what would it celebrate?",
    "What’s the most unique museum you’ve ever visited?",
    "If you could have a lifetime supply of any snack, what would it be?",
    "What’s your favorite thing about your current job or studies?",
    "If you could travel with any fictional character, who would it be?",
    "What’s the most interesting museum exhibit you’ve ever seen?",
    "If you could have the speed of a cheetah or the strength of an elephant, which would you choose?",
    "What’s your favorite way to celebrate someone else's achievement?",
    "If you could be any instrument in an orchestra, which would you be?",
    "What’s the most useful life hack you know?",
    "If you could spend a day in the life of any animal, which would pick?",
    "What’s your favorite childhood toy or game?",
    "If you could be a world-class athlete in any sport, what would it be?",
    "What’s your favorite type of garden (flower, vegetable, zen, etc.)?",
    "If you could have any plant grow in your room instantly, what would it be?",
    "What’s your favorite way to take a break from screens?",
    "If you could be a set designer for any movie, which movie would you choose?",
    "What’s your favorite myth or legend?",
    "If you could have a library full of any books, what genre would dominate?",
    "What’s the most interesting animal encounter you’ve ever had?",
    "If you could be a master of any craft (carpentry, pottery, weaving, etc.), what would it be?",
    "What’s your favorite way to spend a quiet morning?",
    "If you could have one piece of futuristic technology today, what would it be?",
    "What’s your favorite thing about yourself?",
    "If you could change the color of the sky, what color would you pick?",
    "What’s the best piece of advice you’d give to your younger self?",
    "If you could be any planet in the solar system, which would you be?",
    "What’s your favorite scent in the world?",
    "If you could have one superpower that only works for 10 minutes a day, what would it be?",
    "What’s your favorite way to use your creativity?",
    "If you could be a researcher on any scientific expedition, what would you study?",
    "What’s the best part of your daily routine?"
];

export default function IcebreakerGenerator() {
    const [index, setIndex] = useState(0);

    const nextQuestion = () => {
        let next;
        do {
            next = Math.floor(Math.random() * QUESTIONS.length);
        } while (next === index);
        setIndex(next);
    };

    const faqs = [
        {
            question: "When should I use these questions?",
            answer: "Icebreakers are perfect for the first 5 minutes of a meeting, a first date, or even during dinner with family to spark interesting conversations and meaningful connections."
        },
        {
            question: "What makes a good icebreaker?",
            answer: "A great icebreaker is open-ended, inclusive, and neutral enough that everyone feels comfortable answering, yet specific enough to reveal unique personality traits."
        },
        {
            question: "How do I handle silence after asking?",
            answer: "Don't be afraid! Silence means people are thinking. You can volunteer your own answer first to set a comfortable tone and provide an example of how deep to go."
        },
        {
            question: "Is this tool free to use?",
            answer: "Yes, our Random Icebreaker Generator is completely free. Use it as much as you like to keep your social and professional gatherings engaging."
        }
    ];

    const calc = calculators.find(c => c.href === '/icebreaker-generator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Random Icebreaker Questions'}
                description={calc?.description || 'Kill the awkward silence and spark connections.'}
            />

            <div className="card" style={{
                marginBottom: '3rem',
                textAlign: 'center',
                padding: '5rem 2rem',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '2.5rem',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{
                    fontSize: '1rem',
                    color: 'var(--color-secondary)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginBottom: '2.5rem',
                    letterSpacing: '0.4em',
                    opacity: 0.8
                }}>Your Question</div>

                <div key={index} style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: '#fff',
                    marginBottom: '4rem',
                    lineHeight: 1.3,
                    maxWidth: '600px',
                    animation: 'slideUpBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    textShadow: '0 10px 20px rgba(0,0,0,0.3)'
                }}>
                    {QUESTIONS[index]}
                </div>

                <button onClick={nextQuestion} className="btn-primary" style={{
                    padding: '1.25rem 4rem',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    borderRadius: '1.25rem',
                    boxShadow: '0 15px 30px rgba(79, 70, 229, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>Spark Conversation</button>
            </div>

            <FAQSection items={faqs} />
            <EliteSEOCards
                toolName="Random Icebreaker Questions"
                howToUse="To start sparking connections, simply navigate to the main dashboard of our Random Icebreaker Generator and click the prominent 'Spark Conversation' button. The tool will instantly select a unique, thought-provoking question from our massive database of over 160 prompts, displaying it in a high-fidelity, centered text card with smooth animations. Each time you click the button, a new icebreaker appears, ensuring the flow of conversation never goes stale or repetitive. You can use these questions in any social setting—from formal business meetings to casual first dates—by simply reading them aloud and encouraging open participation. The tool is designed for total ease of use, with no setup or configuration required for immediate results. Once your session is finished, you can simply refresh the page or keep clicking for an endless supply of conversation starters with instant feedback."
                whyUse="Using an online Random Icebreaker Generator provides a modern, stress-free way to eliminate awkward silences and build meaningful connections with total confidence. Our 'elite' version features a carefully curated list of open-ended questions that are designed to reveal unique personality traits while keeping the environment inclusive and comfortable for everyone. The premium glassmorphic interface and high-performance micro-animations transform a simple utility into an engaging experience that looks professional on any device. Unlike mental brainstorming, this digital simulator offers an unbiased and diverse range of topics, ensuring you always have a fresh and helpful 'in' for any social situation. It is perfectly optimized for mobile use, allowing you to carry a reliable conversation-starter in your pocket for any gathering. Whether you're a team leader looking to boost morale or a social butterfly wanting to spice up a party, this tool delivers a polished and state-of-the-art solution for effortless engagement."
            />
            <style jsx>{`
                @keyframes slideUpBounce {
                    0% { opacity: 0; transform: translateY(30px) scale(0.95); filter: blur(10px); }
                    60% { opacity: 1; transform: translateY(-10px) scale(1.02); filter: blur(0); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}
