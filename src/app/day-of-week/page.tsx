import { Metadata } from 'next';
import DayOfWeekCalculator from './DayOfWeekCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export const metadata: Metadata = {
    title: 'Day of the Week Calculator - What Day Was It?',
    description: 'Find out the day of the week for any date in history or the future. Was it a Monday or a Saturday? Get the answer instantly.',
};

export default function DayOfWeekPage() {
    const faqs = [
        {
            question: "How far back can I calculate?",
            answer: "You can calculate the day of the week for virtually any date in common history. Our tool uses the Gregorian calendar system for accurate results."
        },
        {
            question: "Can I check a future date?",
            answer: "Yes. You can find out what day of the week a future holiday or birthday will fall on, helping you plan ahead."
        },
        {
            question: "Is this useful for finding my birth day?",
            answer: "Definetely. Many people know their birth date but not the day of the week they were born. This tool solves that mystery instantly."
        }
    ];

    const calc = calculators.find(c => c.href === '/day-of-week');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Day of the Week'}
                description={calc?.description || 'Find out exactly what day of the week any date falls on.'}
            />

            <DayOfWeekCalculator />

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Day of the Week Calculator"
                howToUse="To find out what day any date falls on, simply select the date in the calendar input above. The tool instantly processes your selection and displays the day of the week (Monday through Sunday) in a premium result card. You can check any date in history or the future, making it an essential utility for planning birthdays, holidays, or researching historical events. It is a completely automated process that provides absolute certainty in a single click."
                whyUse="Our Day of the Week Calculator is the most reliable way to solve mysteries about the calendar for any date in time. Instead of trying to calculate complex leap year patterns in your head, this digital tool uses high-performance algorithms to provide a 100% accurate result in milliseconds. The 'elite' design features a focused, distraction-free interface with glassmorphic elements that make the experience feel professional and premium. It is a mobile-responsive, free resource that helps students, historians, and event planners manage their schedules with total confidence. By using this tool, you guarantee your date-related information is always stable and correct."
            />
        </div>
    );
}
