'use client';

import React, { useState, useEffect } from 'react';

interface DateInputProps {
    label: string;
    value: string; // Internal format: "YYYY-MM-DD"
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    style?: React.CSSProperties;
    variant?: 'dark' | 'light';
}

function toDisplay(isoDate: string): string {
    if (!isoDate) return '';
    const [y, m, d] = isoDate.split('-');
    if (!y || !m || !d) return '';
    return `${d}/${m}/${y}`;
}

function toISO(display: string): string {
    const parts = display.replace(/[^0-9/]/g, '').split('/');
    if (parts.length !== 3) return '';
    const [d, m, y] = parts;
    if (d?.length !== 2 || m?.length !== 2 || y?.length !== 4) return '';
    return `${y}-${m}-${d}`;
}

function isValidDate(display: string): boolean {
    const parts = display.split('/');
    if (parts.length !== 3) return false;
    const [d, m, y] = parts.map(Number);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    if (y < 1 || y > 9999) return false;
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

export default function DateInput({ label, value, onChange, id, style, variant = 'dark' }: DateInputProps) {
    const inputId = id || `date-input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const [display, setDisplay] = useState(() => toDisplay(value));
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setDisplay(toDisplay(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let raw = e.target.value;
        raw = raw.replace(/[^0-9/]/g, '');

        if (raw.length === 2 && !raw.includes('/') && display.length < 3) {
            raw = raw + '/';
        } else if (raw.length === 5 && raw.split('/').length === 2 && display.length < 6) {
            raw = raw + '/';
        }

        if (raw.length > 10) return;
        setDisplay(raw);

        if (raw.length === 10) {
            if (isValidDate(raw)) {
                setError('');
                const iso = toISO(raw);
                if (iso) {
                    const syntheticEvent = { target: { value: iso } } as React.ChangeEvent<HTMLInputElement>;
                    onChange(syntheticEvent);
                }
            } else {
                setError('Invalid date — please check day/month/year');
            }
        } else {
            setError('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') {
            e.preventDefault();
            const parts = display.split('/');

            if (parts.length === 1) { // Day section
                const d = parts[0].replace(/[^0-9]/g, '');
                if (d.length > 0) {
                    const paddedD = d.padStart(2, '0');
                    setDisplay(paddedD + '/');
                }
            } else if (parts.length === 2) { // Month section
                const d = parts[0];
                const m = parts[1].replace(/[^0-9]/g, '');
                if (m.length > 0) {
                    const paddedM = m.padStart(2, '0');
                    setDisplay(`${d}/${paddedM}/`);
                }
            }
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (display.length > 0 && display.length < 10) {
            setError('Please complete the date in dd/mm/yyyy format');
        }
    };

    const isValid = display.length === 10 && isValidDate(display);

    // Derived border/glow color
    const borderColor = error
        ? 'rgba(239,68,68,0.55)'
        : isValid
            ? 'rgba(34,197,94,0.5)'
            : isFocused
                ? (variant === 'light' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(99,102,241,0.7)')
                : (variant === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)');

    const glowColor = error
        ? '0 0 0 3px rgba(239,68,68,0.1), 0 0 16px rgba(239,68,68,0.08)'
        : isValid
            ? '0 0 0 3px rgba(34,197,94,0.1), 0 0 16px rgba(34,197,94,0.06)'
            : isFocused
                ? '0 0 0 3px rgba(99,102,241,0.15), 0 0 20px rgba(99,102,241,0.1)'
                : 'none';

    const iconColor = error
        ? 'rgba(239,68,68,0.7)'
        : isValid
            ? 'rgba(34,197,94,0.8)'
            : isFocused
                ? (variant === 'light' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(99,102,241,0.9)')
                : (variant === 'light' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)');

    return (
        <div style={{ marginBottom: '1.5rem', ...style }}>
            {/* Label */}
            <label
                htmlFor={inputId}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isFocused
                        ? (variant === 'light' ? 'rgba(16, 185, 129, 1)' : 'rgba(129,140,248,1)')
                        : (variant === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)'),
                    marginBottom: '0.6rem',
                    transition: 'color 0.2s ease',
                    cursor: 'pointer',
                    userSelect: 'none',
                }}
            >
                {/* Small calendar dot accent */}
                <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: error
                        ? 'rgba(239,68,68,0.8)'
                        : isValid
                            ? 'rgba(34,197,94,0.8)'
                            : isFocused
                                ? (variant === 'light' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(129,140,248,0.9)')
                                : (variant === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'),
                    transition: 'background-color 0.2s ease',
                    flexShrink: 0,
                }} />
                {label}
            </label>

            {/* Input wrapper */}
            <div style={{ position: 'relative' }}>
                <input
                    id={inputId}
                    type="text"
                    inputMode="numeric"
                    value={display}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    placeholder="dd / mm / yyyy"
                    maxLength={10}
                    autoComplete="off"
                    style={{
                        width: '100%',
                        height: '3.25rem',
                        padding: '0 3rem 0 1.1rem',
                        background: isFocused
                            ? 'rgba(255,255,255,0.05)'
                            : 'rgba(255,255,255,0.03)',
                        border: `1.5px solid ${borderColor}`,
                        borderRadius: '0.75rem',
                        color: isValid
                            ? (variant === 'light' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)')
                            : (variant === 'light' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)'),
                        fontSize: '1rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        outline: 'none',
                        boxSizing: 'border-box',
                        boxShadow: glowColor,
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
                        backdropFilter: 'blur(8px)',
                        fontFamily: 'inherit',
                    }}
                />

                {/* Calendar icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={iconColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        transition: 'stroke 0.2s ease',
                    }}
                >
                    <rect x="3" y="4" width="18" height="18" rx="2.5" ry="2.5" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            </div>

            {/* Error message */}
            {error && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    marginTop: '0.5rem',
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(239,68,68,0.85)" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p style={{
                        margin: 0,
                        fontSize: '0.78rem',
                        color: 'rgba(239,68,68,0.85)',
                        fontWeight: 500,
                    }}>
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}
