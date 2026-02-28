import { Metadata } from 'next';
import BirthdayInfoCalculator from './BirthdayInfoCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export const metadata: Metadata = {
    title: 'Birthday Information Calculator - Zodiac & Day Born',
    description: 'Discover fun facts about your birth date. Find out the day you were born, your zodiac sign, and days until your next birthday.',
};

export default function BirthdayInfoPage() {
    const faqs = [
        {
            question: "What information will this show me?",
            answer: "It reveals the specific day of the week you were born on, your Western Zodiac sign, and a live countdown of days remaining until your next birthday."
        },
        {
            question: "Is the Zodiac sign accurate?",
            answer: "Yes, it determines your Zodiac sign based on standard tropical astrology dates."
        },
        {
            question: "Is this data private?",
            answer: "Completely. We do not store your birth date. All calculations happen right here in your browser."
        }
    ];

    const calc = calculators.find(c => c.href === '/birthday-info');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Birthday Information'}
                description={calc?.description || 'Discover fun facts and countdowns for your special day.'}
            />

            <BirthdayInfoCalculator />

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Birthday Information Calculator"
                howToUse="To discover fun facts about your birth date, simply enter your 'Date of Birth' into the input field and click the 'Get Birthday Info' button. The tool will instantly generate a detailed report showing the day of the week you were born, your Western Zodiac sign, and a live countdown to your next celebration. All results are presented in high-fidelity cards with smooth animations, making your personal history feel interactive and engaging. This simple process provides a delightful summary of your special day in seconds."
                whyUse="Using our Birthday Information Calculator is a fun and modern way to connect with your personal history and look ahead to future celebrations. Combining multiple data points—like astrology and calendar tracking—into one premium interface, it removes the need for multiple searches. The 'elite' design includes vibrant color palettes and responsive layouts that look stunning on any device, from smartphones to desktop monitors. It is a completely free, privacy-focused resource that ensures your personal data stays on your device. Whether you're curious about your zodiac or want an exact countdown for your next party, this tool provides the stable and entertaining insights you need."
            />
        </div>
    );
}
