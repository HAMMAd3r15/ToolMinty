import { Metadata } from 'next';
import AgeAtDateCalculator from './AgeAtDateCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export const metadata: Metadata = {
    title: 'Age on Specific Date Calculator - Past or Future Age',
    description: 'Find out exactly how old you were or will be on any specific date. Perfect for historical events, future milestones, and planning.',
};

export default function AgeAtDatePage() {
    const faqs = [
        {
            question: "How do I find out how old I was on a specific date?",
            answer: "Simply enter your date of birth and the target date (past or future). Our calculator will determine exactly how old you were (or will be) on that specific day."
        },
        {
            question: "Can I calculate my age for a future date?",
            answer: "Yes! This tool is perfect for planning. You can see exactly how old you will be for an upcoming wedding, graduation, or retirement date."
        },
        {
            question: "Does it account for leap years?",
            answer: "Yes, our algorithm fully accounts for leap years and the specific number of days in each month to ensure complete accuracy."
        }
    ];

    const calc = calculators.find(c => c.href === '/age-at-date');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Age on Specific Date'}
                description={calc?.description || 'Find out exactly how old you were or will be on any specific date.'}
            />

            <AgeAtDateCalculator />

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Age on Specific Date Calculator"
                howToUse="To find out how old you were or will be, start by entering your 'Date of Birth' and then select the 'Target Date' you want to check. Once both are set, click 'Calculate Age' to instantly receive a detailed breakdown. The tool will display your exact age on that specific date in years, months, and days. This is perfect for verifying age eligibility for historical events or planning for future milestones. The process is completely automated and provides results in a premium, easy-to-read result card."
                whyUse="Our Age on Specific Date Calculator is the premier tool for historical research and future planning with absolute calendar precision. Instead of guessing how many leap years have passed between two dates, our advanced algorithm handle all the complex time calculations for you in milliseconds. The 'elite' design ensures a crystal-clear display on any device, making it easy to manage age-related questions for school, work, or personal curiosity. It is a stable, reliable, and completely free resource that respects your privacy. Whether you're researching a family tree or looking ahead to retirement, this tool delivers the professional insights you need."
            />
        </div>
    );
}
