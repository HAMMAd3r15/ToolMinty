import { calculators } from '@/utils/calculators';
import ToolGrid from '@/components/UI/ToolGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ToolMinty - Free Online Calculators & Tools',
  description: 'Fast, accurate, and completely free online calculators. From health to finance, find all the tools you need in one clean, modern platform.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <ToolGrid calculators={calculators} />;
}
