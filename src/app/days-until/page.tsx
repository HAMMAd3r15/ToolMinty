import { Metadata } from 'next';
import DaysUntilCalculator from './DaysUntilCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export const metadata: Metadata = {
    title: 'Days Until Calculator - Count Days Remaining',
    description: 'Calculate exactly how many days are left until a future date or how many days have passed since a past event. Perfect for countdowns and anniversaries.',
};

export default function DaysUntilPage() {
    const faqs = [
        {
            question: "Can I use this for countdowns?",
            answer: "Yes! Enter any future date—like a vacation, wedding, or holiday—to see exactly how many days are remaining."
        },
        {
            question: "Does it calculate days since a past event?",
            answer: "Absolutely. If you enter a past date, the tool will flip to show you how many days have elapsed since that event, making it great for tracking sobriety, anniversaries, or project milestones."
        },
        {
            question: "Is the calculation inclusive of today?",
            answer: "The calculation counts the full days between today and the target date. It does not typically include the target date itself in the 'days remaining' count, similar to how you would say 'tomorrow is 1 day away'."
        }
    ];

    const calc = calculators.find(c => c.href === '/days-until');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Days Until / Since'}
                description={calc?.description || 'Count exactly how many days are left until a future date or passed since an event.'}
            />

            <DaysUntilCalculator />

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Days Until Event"
                howToUse="To use the Days Until Event, start by entering your target date into the input field at the top of the interface. You can select any future date for an exciting countdown or a past date to see how many days have elapsed since a life event. Once your date is chosen, click the 'Calculate Days' button to instantly receive your results. The tool will immediately display the exact count in a clear, high-contrast result card that highlights the most important numbers for your planning. This reliable Days Until Event ensures results are perfectly accurate and generated in real-time without any lag. Whether you are tracking a wedding, a milestone, or a professional deadline, this simple tool makes the process effortless and helpful."
                whyUse="Using an online Days Until Event offers unparalleled convenience and accuracy for monitoring important dates with total precision. Instead of manually counting days on a paper calendar, this digital tool provides reliable, time-saving benefits for your busy schedule. It is fully accessible on any device, allowing you to check your countdowns or durations whenever you need them most. The accessibility ensures a stable way to manage event planning tasks without any complex software or long account setups. In real-world scenarios, the Days Until Event serves as an essential resource for school projects, business deadlines, and legal timelines. Its versatility makes it the premier solution for tracking everything from anniversaries to critical professional project milestones."
            />
        </div>
    );
}
