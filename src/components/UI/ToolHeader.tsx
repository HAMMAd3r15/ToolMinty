'use client';

import React from 'react';

interface ToolHeaderProps {
    title: string;
    description: string;
}

export default function ToolHeader({ title, description }: ToolHeaderProps) {
    return (
        <div className="tool-header no-print">
            <h1 className="title">
                {title}
            </h1>
            <p className="description">
                {description}
            </p>
            <style jsx>{`
                .tool-header {
                    text-align: center;
                    margin-bottom: 4rem;
                    max-width: 900px;
                    margin: 0 auto 4rem;
                }
                .title {
                    font-size: 3rem;
                    font-weight: 900;
                    margin-bottom: 1.5rem;
                    color: #ffffff;
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                }
                .description {
                    text-align: center;
                    color: #ffffff;
                    margin-bottom: 0;
                    font-size: 1.2rem;
                    line-height: 1.8;
                    opacity: 0.9;
                    max-width: 800px;
                    margin: 0 auto;
                }

                @media (max-width: 768px) {
                    .tool-header {
                        margin-bottom: 3rem;
                    }
                    .title {
                        font-size: 2.25rem;
                        margin-bottom: 1rem;
                    }
                    .description {
                        font-size: 1.1rem;
                        line-height: 1.6;
                    }
                }

                @media (max-width: 480px) {
                    .tool-header {
                        margin-bottom: 2.5rem;
                    }
                    .title {
                        font-size: 1.75rem;
                    }
                    .description {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
