'use client';

import { useState, useEffect } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

interface CityTime {
    name: string;
    timezone: string;
    offset: number;
}

export default function WorldClockForm() {
    const calc = calculators.find(c => c.href === '/world-clock');
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [mounted, setMounted] = useState(false);


    const defaultCities: CityTime[] = [
        { name: 'London', timezone: 'GMT', offset: 0 },
        { name: 'New York', timezone: 'EST', offset: -5 },
        { name: 'Tokyo', timezone: 'JST', offset: 9 },
        { name: 'Dubai', timezone: 'GST', offset: 4 },
        { name: 'Paris', timezone: 'CET', offset: 1 },
        { name: 'Sydney', timezone: 'AEDT', offset: 11 },
    ];

    const [cities, setCities] = useState<CityTime[]>(defaultCities);

    useEffect(() => {
        setMounted(true);
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);


    const formatTime = (date: Date, offset: number) => {
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const cityDate = new Date(utc + (3600000 * offset));
        return cityDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const formatDate = (date: Date, offset: number) => {
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const cityDate = new Date(utc + (3600000 * offset));
        return cityDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const faqs = [
        {
            question: "How accurate are these times?",
            answer: "The times are calculated based on your system clock and fixed timezone offsets. They do not account for dynamic Daylight Saving Time changes automatically if they differ from standard offsets."
        },
        {
            question: "Can I add custom cities?",
            answer: "Currently, this version displays a curated list of global business hubs. Custom city addition is a feature planned for future updates."
        }
    ];

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'World Clock'}
                description={calc?.description || 'Display and compare current times across multiple world locations.'}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {cities.map((city) => (
                    <div key={city.name} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{city.name}</h3>
                        <div suppressHydrationWarning style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                            {mounted && currentTime ? formatTime(currentTime, city.offset) : '--:--:--'}
                        </div>
                        <p suppressHydrationWarning style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>
                            {mounted && currentTime ? formatDate(currentTime, city.offset) : '---'}
                        </p>

                        <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{city.timezone} (UTC {city.offset >= 0 ? '+' : ''}{city.offset})</p>
                    </div>
                ))}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="World Clock"
                howToUse="To check global times, simply browse the city cards displayed on the dashboard. Each card is updated in real-time, showing the current state of major business hubs across different timezones. You can see the formatted time, current date, and UTC offset for each location at a glance. The interface is completely automated and requires no manual refresh, ensuring you always have the most accurate global information. This streamlined view is designed to help you coordinate meetings and stay connected with international teams effortlessly."
                whyUse="Our World Clock provides a premium, high-fidelity way to monitor time across the globe without the clutter of traditional clock apps. By using fixed timezone offsets and real-time syncing, it offers a stable and reliable reference for anyone working in an international environment. The 'elite' design features glassmorphic cards and optimized typography that make global timetracking feel professional and modern. It is a completely free, mobile-responsive tool that puts the world's major timezones in your pocket. Whether you're a traveler, a remote worker, or a business leader, this tool delivers the clarity and performance needed to manage across borders with confidence."
            />
        </div>
    );
}
