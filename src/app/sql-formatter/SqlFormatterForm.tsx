'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function SqlFormatterForm() {
    const calc = calculators.find(c => c.href === '/sql-formatter');
    const [sqlInput, setSqlInput] = useState('');
    const [sqlOutput, setSqlOutput] = useState('');

    const formatSQL = (sql: string) => {
        if (!sql.trim()) return '';

        // Simple rule-based formatter
        let formatted = sql
            .replace(/\s+/g, ' ')
            .replace(/\s*,\s*/g, ', ')
            .replace(/\s*\(\s*/g, ' (')
            .replace(/\s*\)\s*/g, ') ')
            .trim();

        const keywords = [
            'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'GROUP BY', 'ORDER BY', 'LIMIT',
            'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'JOIN', 'LEFT JOIN',
            'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'ON', 'HAVING', 'IN', 'AS'
        ];

        // Uppercase keywords and add newlines
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            formatted = formatted.replace(regex, `\n${keyword.toUpperCase()}`);
        });

        // Clean up double newlines and indentation
        return formatted.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n')
            .replace(/\n(AND|OR|ON|AS)\b/g, '\n    $1'); // Indent sub-clauses
    };

    const handleFormat = () => {
        setSqlOutput(formatSQL(sqlInput));
    };

    const handleMinify = () => {
        setSqlOutput(sqlInput.replace(/\s+/g, ' ').trim());
    };

    const faqs = [
        {
            question: "What does this SQL formatter do?",
            answer: "It transforms messy, single-line SQL queries into structured, readable code by standardizing keyword casing, indentation, and line breaks."
        },
        {
            question: "Which SQL dialects are supported?",
            answer: "It follows standard SQL formatting rules, making it compatible with MySQL, PostgreSQL, SQL Server, SQLite, and Oracle syntax."
        },
        {
            question: "Is it safe to paste sensitive queries?",
            answer: "Absolutely. Data processing happens entirely in your local browser. No SQL data is ever uploaded or stored on our servers."
        }
    ];

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'SQL Formatter'}
                description={calc?.description || 'Clean up and beautify your SQL queries for better readability.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <textarea
                        className="input"
                        placeholder="Paste your SQL script here (e.g., select * from users where id = 1)..."
                        value={sqlInput}
                        onChange={(e) => setSqlInput(e.target.value)}
                        style={{ width: '100%', minHeight: '180px', fontFamily: 'monospace', fontSize: '0.9rem' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={handleFormat}
                        className="btn-primary"
                        style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                        Beautify SQL
                    </button>
                    <button
                        onClick={handleMinify}
                        className="btn-secondary"
                        style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                        Minify
                    </button>
                </div>

                {sqlOutput && (
                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="input"
                            readOnly
                            value={sqlOutput}
                            style={{
                                width: '100%',
                                minHeight: '300px',
                                background: 'rgba(0,0,0,0.15)',
                                color: 'var(--color-primary)',
                                fontFamily: "'Fira Code', 'Courier New', monospace",
                                fontSize: '0.95rem',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(sqlOutput);
                                // Optional logic for toast or visual feedback could go here
                            }}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'var(--color-text-primary)',
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            Copy SQL
                        </button>
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Elite SQL Formatter"
                howToUse="To organize your database scripts, paste your raw SQL into the editor. Click 'Beautify' to instantly convert your code into a professional format with capitalized keywords and precise indentation. Use 'Minify' when you need to compress queries for performance or embedded files. The result is a high-fidelity script that maintains absolute technical accuracy and logical consistency across all major database dialects."
                whyUse="Our SQL Formatter is an elite-tier utility designed for backend architects and data scientists who require both visual clarity and data privacy. Unlike traditional online tools, this formatter operates in a secure client-side environment, ensuring your proprietary database schemas and complex joins remained entirely local. The interface features a glassmorphic aesthetic paired with premium developer typography, making your SQL debugging and documentation process feel sophisticated and incredibly efficient."
            />

            <style jsx>{`
                .btn-primary {
                    background: var(--color-primary);
                    color: var(--color-on-primary);
                    border: none;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }
                .btn-primary:hover {
                    filter: brightness(1.1);
                    transform: translateY(-2px);
                }
                .btn-secondary {
                    background: rgba(255,255,255,0.05);
                    color: silver;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .btn-secondary:hover {
                    background: rgba(255,255,255,0.1);
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}
