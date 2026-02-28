'use client';

import Link from 'next/link';
import { useState } from 'react';
import { calculators } from '@/utils/calculators';
import SearchBar from '@/components/UI/SearchBar';

export default function HomeClient() {
    const [activeCategory, setActiveCategory] = useState<'All' | 'Health' | 'Finance' | 'Fun' | 'Utility' | 'Chronology'>('All');

    const categories = ['All', 'Chronology', 'Finance', 'Health', 'Utility', 'Fun'];

    const filteredCalculators = activeCategory === 'All'
        ? calculators
        : calculators.filter(c => c.category === activeCategory);

    const popularTools = [
        { title: 'Loan EMI', href: '/loan-emi' },
        { title: 'BMI Calculator', href: '/bmi-calculator' },
        { title: 'Age Finder', href: '/exact-age' },
        { title: 'Compound Interest', href: '/compound-interest' },
    ];

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                {/* Heading */}
                <div style={{ maxWidth: '1000px' }}>
                    <h1 className="hero-title">
                        Calculators for <br />
                        <span className="hero-accent">everything.</span> Simple. Free.
                    </h1>
                </div>

                {/* Subheading */}
                <p className="hero-subtitle">
                    Fast, accurate, and completely free tools for your daily calculations. <br className="desktop-only" />
                    From mortgages to health metrics.
                </p>

                {/* Search Section */}
                <div style={{ width: '100%', maxWidth: '800px', marginTop: '1rem' }}>
                    <SearchBar />

                    {/* Popular Tags */}
                    <div className="popular-tags">
                        <span className="popular-label">Popular:</span>
                        {popularTools.map((tool) => (
                            <Link
                                key={tool.title}
                                href={tool.href}
                                className="popular-tag"
                            >
                                {tool.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <div id="tools" className="filter-section">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as any)}
                        className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid Section */}
            <div className="tool-grid">
                {filteredCalculators.map((calc) => (
                    <Link key={calc.href} href={calc.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <div
                            className="elite-tool-card"
                        >
                            {/* New Badge */}
                            {calc.isNew && (
                                <div className="new-badge">
                                    New
                                </div>
                            )}

                            {/* Icon Container */}
                            <div className="icon-container">
                                {calc.icon}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <h2 className="tool-title">
                                    {calc.title}
                                </h2>
                                <p className="tool-description">
                                    {calc.description}
                                </p>
                            </div>

                            {/* Arrow Decoration */}
                            <div className="card-arrow">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <style jsx>{`
                .home-container {
                    display: flex;
                    flex-direction: column;
                    gap: 4rem;
                }
                .hero {
                    text-align: center;
                    padding-top: 3rem;
                    padding-bottom: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }
                .hero-title {
                    font-size: min(5.5rem, 11vw);
                    font-weight: 900;
                    color: var(--color-text-primary);
                    letter-spacing: -0.05em;
                    line-height: 0.95;
                    margin: 0;
                }
                .hero-accent {
                    color: #2563eb;
                    text-shadow: 0 0 40px rgba(37, 99, 235, 0.5);
                    display: inline-block;
                }
                .hero-subtitle {
                    max-width: 800px;
                    line-height: 1.4;
                    color: var(--color-text-tertiary);
                    font-size: 1.25rem;
                    margin: 0;
                    font-weight: 500;
                    opacity: 0.9;
                }
                .popular-tags {
                    margin-top: 2.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.85rem;
                    flex-wrap: wrap;
                }
                .popular-label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: var(--color-text-tertiary);
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    margin-right: 0.25rem;
                    opacity: 0.7;
                }
                .popular-tag {
                    font-size: 0.8rem;
                    padding: 0.6rem 1.25rem;
                    background-color: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 2rem;
                    color: var(--color-text-primary);
                    text-decoration: none;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-weight: 600;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .popular-tag:hover {
                    color: var(--color-text-primary) !important;
                    border-color: rgba(37, 99, 235, 0.4) !important;
                    background-color: rgba(37, 99, 235, 0.05) !important;
                    transform: translateY(-1px);
                }
                .filter-section {
                    display: flex;
                    justify-content: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                    margin-bottom: 1rem;
                }
                .filter-btn {
                    padding: 0.5rem 1.25rem;
                    border-radius: 2rem;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background-color: rgba(30, 41, 59, 0.4);
                    color: var(--color-text-secondary);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .filter-btn.active {
                    background-color: #2563eb;
                    color: #fff;
                    border: 1px solid #2563eb;
                    box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
                }
                .tool-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    padding: 1rem 0;
                }
                .elite-tool-card {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    padding: 2rem;
                    background: rgba(30, 41, 59, 0.3);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 1.5rem;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                    overflow: hidden;
                }
                .elite-tool-card:hover {
                    transform: translateY(-10px) scale(1.02);
                    background: rgba(30, 41, 59, 0.5);
                    border-color: rgba(37, 99, 235, 0.4);
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 25px -5px rgba(37, 99, 235, 0.2);
                }
                .new-badge {
                    position: absolute;
                    top: 1.25rem;
                    right: 1.25rem;
                    background: linear-gradient(45deg, #2563eb, #6366f1);
                    color: #fff;
                    font-size: 0.65rem;
                    font-weight: 900;
                    padding: 0.2rem 0.6rem;
                    border-radius: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.4);
                    z-index: 2;
                }
                .icon-container {
                    font-size: 2.25rem;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(37, 99, 235, 0.1);
                    border-radius: 1rem;
                    border: 1px solid rgba(37, 99, 235, 0.2);
                }
                .tool-title {
                    font-size: 1.15rem;
                    font-weight: 700;
                    margin: 0;
                    color: #fff;
                    letter-spacing: -0.02em;
                }
                .tool-description {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.875rem;
                    line-height: 1.6;
                    margin: 0;
                    font-weight: 400;
                }
                .card-arrow {
                    position: absolute;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    opacity: 0;
                    transition: all 0.3s ease;
                    transform: translateX(-10px);
                }
                .elite-tool-card:hover .card-arrow {
                    opacity: 0.8;
                    transform: translateX(0);
                    color: #2563eb;
                }
                @media (max-width: 768px) {
                    .home-container {
                        gap: 2.5rem;
                    }
                    .hero {
                        padding-top: 2.5rem;
                        padding-bottom: 2rem;
                    }
                    .hero-title {
                        font-size: min(4.5rem, 12vw);
                    }
                    .hero-subtitle {
                        font-size: 1.1rem;
                    }
                }
                @media (max-width: 640px) {
                    .home-container {
                        gap: 2rem;
                    }
                    .hero {
                        padding-top: 2rem;
                        padding-bottom: 1.5rem;
                        gap: 1.25rem;
                    }
                    .hero-title {
                        font-size: 2.5rem;
                    }
                    .hero-subtitle {
                        font-size: 1rem;
                    }
                    .elite-tool-card {
                        padding: 1.5rem;
                    }
                    .popular-tags {
                        margin-top: 2rem;
                    }
                }

                @media (max-width: 480px) {
                    .hero-title {
                        font-size: 2.25rem;
                    }
                    .hero-subtitle {
                        font-size: 0.95rem;
                    }
                    .popular-tag {
                        padding: 0.5rem 1rem;
                        font-size: 0.75rem;
                    }
                    .tool-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
