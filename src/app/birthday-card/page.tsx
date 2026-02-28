'use client';

import { useState, useRef } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import Button from '@/components/UI/Button';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import { toPng, toBlob } from 'html-to-image';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const DESIGNS = [
    {
        name: 'Royal Elite',
        bg: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        accent: '#FCD34D',
        secondary: '#F59E0B',
        text: '#FFFFFF',
        subtext: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(252, 211, 77, 0.2)',
        decor: '✨',
        pattern: 'radial-gradient(circle at 2px 2px, rgba(252, 211, 77, 0.05) 1px, transparent 0)',
        patternSize: '24px 24px'
    },
    {
        name: 'Vibrant Pulse',
        bg: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        accent: '#FFFFFF',
        secondary: '#C084FC',
        text: '#FFFFFF',
        subtext: 'rgba(255,255,255,0.8)',
        border: '1px solid rgba(255,255,255,0.1)',
        decor: '🔥',
        pattern: 'linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.03) 75%, transparent 75%, transparent)',
        patternSize: '40px 40px'
    },
    {
        name: 'Soft Rose',
        bg: 'linear-gradient(135deg, #FFF1F2 0%, #FCE7F3 100%)',
        accent: '#BE185D',
        secondary: '#DB2777',
        text: '#1F2937',
        subtext: 'rgba(31, 41, 55, 0.6)',
        border: '1px solid rgba(190, 24, 93, 0.1)',
        decor: '🌸',
        pattern: 'radial-gradient(circle at 10px 10px, rgba(190, 24, 93, 0.03) 2px, transparent 0)',
        patternSize: '30px 30px'
    },
    {
        name: 'Midnight Neon',
        bg: '#000000',
        accent: '#22D3EE',
        secondary: '#818CF8',
        text: '#FFFFFF',
        subtext: 'rgba(255,255,255,0.5)',
        border: '1px solid rgba(34, 211, 238, 0.3)',
        decor: '⚡',
        pattern: 'linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)',
        patternSize: '20px 20px'
    },
    {
        name: 'Emerald Luxe',
        bg: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
        accent: '#6EE7B7',
        secondary: '#34D399',
        text: '#FFFFFF',
        subtext: 'rgba(255,255,255,0.7)',
        border: '1px solid rgba(110, 231, 183, 0.2)',
        decor: '🍃',
        pattern: 'radial-gradient(circle at 2px 2px, rgba(110, 231, 183, 0.05) 1px, transparent 0)',
        patternSize: '15px 15px'
    }
];

export default function BirthdayCardGenerator() {
    const [name, setName] = useState('Alex');
    const [message, setMessage] = useState('Hope your day is as amazing as you are!');
    const [designIndex, setDesignIndex] = useState(0);
    const [isExporting, setIsExporting] = useState(false);
    const [copied, setCopied] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const currentDesign = DESIGNS[designIndex];

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setIsExporting(true);
        try {
            const dataUrl = await toPng(cardRef.current, { quality: 1, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `card-${name.toLowerCase()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Download failed', err);
        } finally {
            setIsExporting(false);
        }
    };

    const handleCopy = async () => {
        if (!cardRef.current) return;
        setIsExporting(true);
        try {
            const blob = await toBlob(cardRef.current, { quality: 1, pixelRatio: 2 });
            if (blob) {
                await navigator.clipboard.write([
                    new ClipboardItem({ [blob.type]: blob })
                ]);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Copy failed', err);
        } finally {
            setIsExporting(false);
        }
    };

    const faqs = [
        {
            question: "How do I send my elite birthday card?",
            answer: "Simply use the 'Download High-Res PNG' or 'Copy to Clipboard' buttons below your design. You can then paste it directly into WhatsApp, Email, or share it on social media for a premium impact."
        },
        {
            question: "Are these cards suitable for printing?",
            answer: "Yes! Our generator exports at 2x pixel density (high-res), ensuring sharp results whether you share them digitally or print them as keepsakes."
        },
        {
            question: "Can I customize the text further?",
            answer: "Currently, you can personalize the name and the main message. Each elite theme carries its own unique typography and decorative style to ensure a professional look automatically."
        }
    ];

    const calc = calculators.find(c => c.href === '/birthday-card');

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
            <ToolHeader
                title={calc?.title || 'Elite Birthday Card Generator'}
                description={calc?.description || 'Design and export premium, high-quality birthday cards instantly for your loved ones.'}
            />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '3rem',
                alignItems: 'start'
            }}>
                {/* Controls */}
                <div className="card" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Recipient Name</label>
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => {
                                    const val = e.target.value.slice(0, 50);
                                    if (!/<script|javascript:|on\w+=/i.test(val)) {
                                        setName(val);
                                    }
                                }}
                                placeholder="e.g. Alex"
                                style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                                maxLength={50}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Custom Message</label>
                            <textarea
                                className="input"
                                value={message}
                                onChange={(e) => {
                                    const val = e.target.value.slice(0, 200);
                                    if (!/<script|javascript:|on\w+=/i.test(val)) {
                                        setMessage(val);
                                    }
                                }}
                                style={{ width: '100%', height: '120px', resize: 'none', fontSize: '1rem', padding: '1rem', lineHeight: '1.6' }}
                                placeholder="Write something special..."
                                maxLength={200}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>Select Elite Theme</label>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {DESIGNS.map((d, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setDesignIndex(i)}
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            background: d.bg,
                                            border: designIndex === i ? `3px solid var(--color-primary)` : '1px solid rgba(255,255,255,0.1)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            transform: designIndex === i ? 'scale(1.1)' : 'scale(1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem',
                                            boxShadow: designIndex === i ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                                        }}
                                        title={d.name}
                                    >
                                        {d.decor}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                            <Button onClick={handleDownload} disabled={isExporting} style={{ padding: '1.25rem' }}>
                                {isExporting ? '...' : 'Download PNG'}
                            </Button>
                            <Button onClick={handleCopy} variant="secondary" disabled={isExporting} style={{ padding: '1.25rem' }}>
                                {copied ? 'Copied ✅' : 'Copy Card'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Preview Container */}
                <div style={{ position: 'sticky', top: '2rem' }}>
                    <div
                        ref={cardRef}
                        className="preview-card"
                        style={{
                            width: '100%',
                            aspectRatio: '1.2 / 1.4',
                            background: currentDesign.bg,
                            color: currentDesign.text,
                            border: currentDesign.border,
                            borderRadius: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '3rem',
                            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.7)',
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundImage: currentDesign.pattern,
                            backgroundSize: currentDesign.patternSize,
                        }}
                    >
                        {/* Mesh Gradients Decoration */}
                        <div style={{ position: 'absolute', top: '-15%', left: '-15%', width: '50%', height: '50%', background: currentDesign.secondary, opacity: 0.2, borderRadius: '50%', filter: 'blur(80px)' }}></div>
                        <div style={{ position: 'absolute', bottom: '-15%', right: '-15%', width: '50%', height: '50%', background: currentDesign.accent, opacity: 0.15, borderRadius: '50%', filter: 'blur(80px)' }}></div>

                        {/* Top Accent */}
                        <div style={{
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.6em',
                            marginBottom: '2rem',
                            fontWeight: 900,
                            color: currentDesign.accent,
                            opacity: 0.9,
                            animation: 'fadeInSlideDown 0.8s ease-out forwards'
                        }}>
                            Celebrating
                        </div>

                        {/* Birthday Header */}
                        <div style={{
                            fontSize: '1rem',
                            fontWeight: 800,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            opacity: 0.5,
                            marginBottom: '0.5rem'
                        }}>
                            Happy Birthday
                        </div>

                        {/* Hero Name */}
                        <div style={{
                            fontSize: '5rem',
                            fontWeight: 900,
                            marginBottom: '1.5rem',
                            lineHeight: 1.1,
                            letterSpacing: '-0.05em',
                            textShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            backgroundImage: designIndex === 2 ? 'none' : `linear-gradient(to bottom, ${currentDesign.accent}, #fff)`,
                            WebkitBackgroundClip: designIndex === 2 ? 'none' : 'text',
                            backgroundClip: designIndex === 2 ? 'none' : 'text',
                            WebkitTextFillColor: designIndex === 2 ? currentDesign.accent : 'transparent',
                            color: currentDesign.accent, // Fallback
                            maxWidth: '100%',
                            wordBreak: 'break-word',
                            display: 'inline-block'
                        }}>
                            {name || 'Alex'}
                        </div>

                        {/* Separator Line */}
                        <div style={{ width: '60px', height: '4px', background: currentDesign.accent, borderRadius: '2px', marginBottom: '2.5rem', opacity: 0.6 }}></div>

                        {/* Dedicated Message */}
                        <div style={{
                            fontSize: '1.5rem',
                            maxWidth: '100%',
                            lineHeight: 1.4,
                            fontWeight: 600,
                            color: currentDesign.text,
                            opacity: 0.9,
                            fontStyle: 'italic',
                            padding: '0 1rem'
                        }}>
                            "{message}"
                        </div>

                        {/* Static Floating Objects (will be captured in export) */}
                        <div style={{ position: 'absolute', top: '10%', right: '10%', fontSize: '4rem', opacity: 0.2, transform: 'rotate(15deg)' }}>🎈</div>
                        <div style={{ position: 'absolute', bottom: '10%', left: '10%', fontSize: '4rem', opacity: 0.2, transform: 'rotate(-15deg)' }}>🎊</div>
                        <div style={{ position: 'absolute', top: '50%', left: '5%', fontSize: '1.5rem', opacity: 0.1, transform: 'translateY(-50%) skewX(10deg)' }}>✨</div>
                        <div style={{ position: 'absolute', top: '50%', right: '5%', fontSize: '1.5rem', opacity: 0.1, transform: 'translateY(-50%) skewX(-10deg)' }}>✨</div>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
                        Preview (2x High-Res Export Path)
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInSlideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 0.9; transform: translateY(0); }
                }
                @keyframes bounceIn {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); opacity: 1; }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                .preview-card:hover {
                    transform: translateY(-5px);
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>

            <div style={{ marginTop: '6rem' }}>
                <FAQSection items={faqs} />
            </div>

            <EliteSEOCards
                toolName="Birthday Card Generator"
                howToUse="To design your custom birthday card, start by entering the recipient's name and your personal message in the controls panel. Browse through our premium themes—from 'Royal Midnight' to 'Rose Blossom'—to find the perfect aesthetic. You can see your changes reflected instantly in the high-fidelity 2x resolution preview. Once satisfied, use the 'Download PNG' button to save the high-res image or 'Copy PNG' to share it directly via social apps. This seamless process allows you to create and send professional-grade digital cards in under a minute."
                whyUse="Our Birthday Card Generator is an 'elite' design utility that combines high-end aesthetics with technical precision to help you send meaningful greetings instantly. Instead of using generic templates or expensive design software, this tool provides curated, glassmorphic themes and high-density exports that look stunning on any high-resolution screen. The responsive interface ensures a stable and premium experience whether you're designing on a desktop or a mobile device. It is a completely free resource that empowers you to maintain personal connections with a professional touch, all while ensuring your data remains private and local to your browser."
            />
        </div>
    );
}
