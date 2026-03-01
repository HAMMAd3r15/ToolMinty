import { Metadata } from 'next';
import { calculators } from '@/utils/calculators';
import BMIForm from './BMIForm';

export async function generateMetadata(): Promise<Metadata> {
    const calcInfo = calculators.find(c => c.href === '/bmi-calculator');

    if (!calcInfo) return {};

    return {
        title: calcInfo.title,
        description: calcInfo.description,
        keywords: calcInfo.keywords,
        alternates: {
            canonical: calcInfo.href,
        },
        openGraph: {
            title: `${calcInfo.title} | ToolDex`,
            description: calcInfo.description,
            url: `https://tooldex.com${calcInfo.href}`,
            type: 'website',
        },
    };
}

export default function BMICalculatorPage() {
    return <BMIForm />;
}
