'use client';

import React from 'react';

interface EliteSEOCardsProps {
    toolName: string;
    howToUse: string;
    whyUse: string;
}

export default function EliteSEOCards({ toolName, howToUse, whyUse }: EliteSEOCardsProps) {
    return (
        <>
            <section className="elite-seo-section">
                <div className="elite-seo-card">
                    <h2 className="elite-card-title">How to Use the {toolName}</h2>
                    <p className="elite-card-text">{howToUse}</p>
                </div>

                <div className="elite-seo-card">
                    <h2 className="elite-card-title">Why Use an Online {toolName}?</h2>
                    <p className="elite-card-text">{whyUse}</p>
                </div>
            </section>

            <style jsx>{`
                .elite-seo-section {
                    margin-top: 5rem;
                    padding-bottom: 5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .elite-seo-card {
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 2.5rem;
                    padding: 4rem 3rem;
                    text-align: center;
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    overflow: hidden;
                    cursor: default;
                }

                .elite-seo-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, var(--color-secondary) 0%, transparent 80%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 0;
                }

                .elite-seo-card:hover {
                    transform: translateY(-10px) scale(1.01);
                    border-color: var(--color-secondary);
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.2);
                }

                .elite-seo-card:hover::before {
                    opacity: 0.1;
                }

                .elite-card-title {
                    color: #fff;
                    font-size: 2rem;
                    font-weight: 850;
                    margin-bottom: 2rem;
                    position: relative;
                    z-index: 1;
                    background: linear-gradient(135deg, #fff 0%, var(--color-secondary) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .elite-card-text {
                    color: var(--color-text-secondary);
                    line-height: 1.8;
                    font-size: 1.05rem;
                    position: relative;
                    z-index: 1;
                    max-width: 650px;
                    margin: 0 auto;
                    display: -webkit-box;
                    -webkit-line-clamp: 6;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                @media (max-width: 640px) {
                    .elite-seo-card {
                        padding: 3rem 1.5rem;
                    }
                    .elite-card-title {
                        font-size: 1.5rem;
                    }
                    .elite-card-text {
                        -webkit-line-clamp: initial;
                    }
                }
            `}</style>
        </>
    );
}
