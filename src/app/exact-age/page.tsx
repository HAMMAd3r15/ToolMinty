import { Metadata } from 'next';
import ExactAgeCalculator from './ExactAgeCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function ExactAgePage() {
    const faqs = [
        {
            question: "How does the Exact Age Calculator work?",
            answer: "Our calculator takes your date of birth and compares it to the current date (or a specific date you choose). It accounts for leap years and the varying number of days in each month to give you a precise answer in years, months, and days."
        },
        {
            question: "Is this age calculator accurate?",
            answer: "Yes, this tool is designed to be 100% accurate. It uses precise calendar logic to ensure that leap days and specific month lengths are correctly factored into your total age."
        },
        {
            question: "Can I calculate someone else's age?",
            answer: "Absolutely. You can enter any date of birth to find out the exact age of a friend, family member, or historical figure."
        },
        {
            question: "Does this calculator store my birth date?",
            answer: "No. We respect your privacy. All calculations are performed instantly on your device, and no personal data is ever stored or sent to a server."
        }
    ];

    const calc = calculators.find(c => c.href === '/exact-age');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Exact Age Calculator'}
                description={calc?.description || 'Calculate your precise age in years, months, and days.'}
            />

            <ExactAgeCalculator />

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Exact Age Calculator"
                howToUse="To find your precise age, start by entering your 'Date of Birth' into the input field provided at the top of the interface. Once your date is selected, click the 'Calculate Age' button to trigger the analysis. The tool instantly processes your input against the current calendar date, accounting for every leap year and month variance. You will see your results displayed in a high-fidelity card, showing your total age in years, months, and days for total precision. This simple and fast process ensures you have a detailed breakdown of your life milestones in seconds."
                whyUse="Using an online Exact Age Calculator is the most reliable way to determine chronological milestones with absolute accuracy. Instead of manual counting which often misses leap days or month-length variations, our tool uses high-performance algorithms to deliver a perfect result every time. The 'elite' user interface offers a clean, distraction-free environment that makes life-tracking feel professional and premium. It is a completely free, cross-platform resource that respects your privacy by performing all calculations locally in your browser. Whether you're checking for eligibility, celebrating a birthday, or just curious about your personal history, this tool provides the stable and detailed insights you need."
            />
        </div>
    );
}
