import { Metadata } from 'next';
import RetirementCalculator from './RetirementCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export const metadata: Metadata = {
    title: 'Retirement Age Calculator - Calculate Your Retirement Date',
    description: 'Find out exactly when you can retire. Calculate your retirement date, see the time remaining until your retirement, and estimate your total working years.',
};

export default function RetirementAgePage() {
    const faqs = [
        {
            question: "How is the retirement date calculated?",
            answer: "The calculator simply adds your desired retirement age to your birth year and adjusts for the specific day and month you were born. This gives you a precise goal date for your retirement."
        },
        {
            question: "What are 'Total Working Years'?",
            answer: "Total working years in this calculator is an estimate of your career span, calculated by subtracting a standard starting age (22) from your desired retirement age. It represents the approximate time spent in the workforce."
        },
        {
            question: "Why should I use a retirement age calculator?",
            answer: "Knowing your exact retirement date helps with financial planning, career goal setting, and motivation as you see exactly how many days are left until you reach your milestone."
        },
        {
            question: "Is my data private?",
            answer: "Yes. Like all our tools, this calculator runs entirely in your browser. No personal information, birth dates, or retirement plans are ever sent to our servers or stored anywhere."
        }
    ];

    const calc = calculators.find(c => c.href === '/retirement-age');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Retirement Age Calculator'}
                description={calc?.description || 'Calculate your retirement date and plan your future timeline.'}
            />

            <RetirementCalculator />

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Retirement Age Calculator"
                howToUse="To plan your retirement timeline, start by entering your 'Date of Birth' and your 'Desired Retirement Age' into the input fields above. The tool instantly calculates the exact calendar date of your retirement and estimates the total working years remaining in your career. You'll see the results presented in a premium result card that highlights your milestone date and provides a motivational countdown. It's a simple and effective way to visualize your long-term goals and adjust your financial planning with total precision."
                whyUse="Using our Retirement Age Calculator offers a stable and reliable way to map out your future without the complexity of manual date math. Instead of guessing when you'll hit your target age, this tool provides a perfect calendar match that accounts for every leap year in your life span. The 'elite' interface is designed for clarity and focus, featuring glassmorphic elements and high-fidelity typography that look stunning on any device. It is a completely free, privacy-focused resource that ensures your retirement plans are calculated locally and securely. Whether you're just starting your career or nearing the finish line, this tool delivers the professional insights you need to stay on track."
            />
        </div>
    );
}
