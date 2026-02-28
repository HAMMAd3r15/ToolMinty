'use client';

import React from 'react';

interface ResultCardProps {
    title: string;
    value?: string | number | React.ReactNode;
    results?: { label: string; value: string | number }[];
    subtitle?: string;
    highlight?: boolean;
    color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

export default function ResultCard({
    title,
    value,
    results,
    subtitle,
    highlight = false,
    color = 'primary'
}: ResultCardProps) {
    const getColorValue = (colorName: string) => {
        switch (colorName) {
            case 'primary': return 'var(--color-primary)';
            case 'secondary': return 'var(--color-secondary)';
            case 'accent': return 'var(--color-accent)';
            case 'success': return '#10b981';
            case 'warning': return '#f59e0b';
            case 'error': return '#ef4444';
            default: return 'var(--color-primary)';
        }
    };

    const activeColor = getColorValue(color);

    return (
        <div
            className="result-card"
        >
            {/* Glossy Overlay */}
            <div className="glossy-overlay" />

            <h3 className="card-title">
                {title}
            </h3>

            {value !== undefined && (
                <div className="card-value">
                    {value}
                </div>
            )}

            {results && results.length > 0 && (
                <div className="results-container">
                    {results.map((res, index) => (
                        <div key={index} className="result-row" style={{ paddingBottom: index < results.length - 1 ? '0.5rem' : '0', borderBottom: index < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                            <span className="result-label">{res.label}</span>
                            <span className="result-value" style={{ color: activeColor }}>{res.value}</span>
                        </div>
                    ))}
                </div>
            )}

            {subtitle && (
                <p className="card-subtitle">
                    {subtitle}
                </p>
            )}

            {/* Accent light */}
            {highlight && (
                <div className="accent-light" style={{ background: activeColor }} />
            )}

            <style jsx>{`
                .result-card {
                    background: ${highlight
                    ? `linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(30, 41, 59, 0.4) 100%)`
                    : 'rgba(30, 41, 59, 0.4)'};
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: ${highlight
                    ? `1px solid rgba(37, 99, 235, 0.3)`
                    : '1px solid rgba(255, 255, 255, 0.08)'};
                    border-radius: 1.25rem;
                    padding: 1.75rem;
                    margin-bottom: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: ${highlight
                    ? '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px -5px rgba(37, 99, 235, 0.2)'
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.3)'};
                    cursor: default;
                }
                .glossy-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                }
                .card-title {
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: ${highlight ? '#60a5fa' : 'var(--color-text-secondary)'};
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin: 0;
                    opacity: 0.8;
                }
                .card-value {
                    font-size: ${highlight ? '2.75rem' : '2.25rem'};
                    font-weight: 900;
                    color: ${activeColor};
                    line-height: 1;
                    letter-spacing: -0.04em;
                    margin: 0.25rem 0;
                    text-shadow: ${highlight ? `0 0 30px ${activeColor}40` : 'none'};
                }
                .results-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-top: ${value !== undefined ? '0.5rem' : '0'};
                }
                .result-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .result-label {
                    font-size: 0.85rem;
                    opacity: 0.6;
                }
                .result-value {
                    font-size: 1rem;
                    font-weight: 600;
                }
                .card-subtitle {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.5);
                    margin: 0;
                    font-weight: 500;
                    line-height: 1.4;
                }
                .accent-light {
                    position: absolute;
                    bottom: -20%;
                    right: -10%;
                    width: 100px;
                    height: 100px;
                    filter: blur(60px);
                    opacity: 0.15;
                    pointer-events: none;
                }

                @media (max-width: 640px) {
                    .result-card {
                        padding: 1.25rem;
                    }
                    .card-value {
                        font-size: ${highlight ? '2.25rem' : '1.75rem'};
                    }
                    .result-label {
                        font-size: 0.8rem;
                    }
                    .result-value {
                        font-size: 0.9rem;
                    }
                }

                @media (max-width: 480px) {
                    .card-value {
                        font-size: ${highlight ? '1.75rem' : '1.5rem'};
                    }
                }
            `}</style>
        </div>
    );
}
