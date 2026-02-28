import { Metadata } from 'next';
import DateDiffCalculator from './DateDiffCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export const metadata: Metadata = {
    title: 'Date Difference Calculator - Days Between Two Dates',
    description: 'Calculate the specific time duration between two dates. Find out the number of years, months, and days between any two points in time.',
};

export default function DateDiffPage() {
    const faqs = [
        {
            question: "What does the Date Difference Calculator do?",
            answer: "It calculates the total duration between a start date and an end date, breaking it down into years, months, and days, as well as the total count of days."
        },
        {
            question: "Are the end dates included in the calculation?",
            answer: "By default, this calculator measures the duration *between* the days. It effectively counts the full 24-hour periods that have elapsed."
        },
        {
            question: "Can I calculate time between historical dates?",
            answer: "Yes, you can check the time elapsed between any two dates in history, making it useful for historians, students, or genealogists."
        }
    ];

    const calc = calculators.find(c => c.href === '/date-diff');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Date Difference Calculator'}
                description={calc?.description || 'Calculate the specific time duration between two dates.'}
            />

            <DateDiffCalculator />

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Date Difference Calculator"
                howToUse="To measure the time between two specific points, enter your 'Start Date' and 'End Date' into the calendar inputs above. Click the 'Calculate Difference' button to instantly see the duration broken down into years, months, and days. You'll also receive the total count of elapsed days for comprehensive tracking. This automated process accounts for leap years and varying month lengths, providing a perfect result every time. It's the most efficient way to track durations for projects, anniversaries, or legal timelines."
                whyUse="Using our Date Difference Calculator removes the risk of human error when counting time across complex calendar cycles. Whether you're a student working on a history project or a professional managing business deadlines, this tool provides the absolute precision you require in seconds. The 'elite' interface is designed for maximum readability, featuring glassmorphic elements and high-fidelity typography that look stunning on both mobile and desktop screens. It is a completely free, privacy-focused utility that delivers stable performance without requiring any personal data. By choosing this digital assistant, you ensure your time-based calculations are always professional and accurate."
            />
        </div>
    );
}
