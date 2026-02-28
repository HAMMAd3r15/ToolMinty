'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label?: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
}

export default function CustomSelect({
    label,
    options,
    value,
    onChange,
    style,
    containerStyle
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSelect = (val: string) => {
        onChange(val);
        setIsOpen(false);
    };

    return (
        <div
            ref={containerRef}
            className="select-container"
            style={containerStyle}
        >
            {label && (
                <label className="select-label">
                    {label}
                </label>
            )}

            <div
                onClick={toggleOpen}
                className={`select-trigger ${isOpen ? 'open' : ''}`}
                style={style}
            >
                <span className="selected-text">
                    {selectedOption?.label}
                </span>

                <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    className="arrow-icon"
                >
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {isOpen && (
                <div className="options-dropdown">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`option ${option.value === value ? 'selected' : ''}`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                .select-container {
                    position: relative;
                    width: 100%;
                }
                .select-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: var(--color-text-secondary);
                }
                .select-trigger {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.75rem 1.25rem;
                    background-color: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 0.75rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .select-trigger.open {
                    border-color: rgba(37, 99, 235, 0.5);
                    box-shadow: 0 0 15px -5px rgba(37, 99, 235, 0.3);
                }
                .selected-text {
                    color: var(--color-text-primary);
                    font-size: 0.95rem;
                    font-weight: 500;
                }
                .arrow-icon {
                    transition: transform 0.3s ease;
                    transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
                    opacity: 0.7;
                }
                .options-dropdown {
                    position: absolute;
                    top: calc(100% + 0.5rem);
                    left: 0;
                    right: 0;
                    background-color: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 0.75rem;
                    z-index: 1000;
                    overflow: hidden;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
                    animation: select-fade-in 0.2s ease-out;
                }
                .option {
                    padding: 0.85rem 1.25rem;
                    color: rgba(255, 255, 255, 0.8);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 0.9rem;
                }
                .option:hover {
                    background-color: rgba(255, 255, 255, 0.08);
                    color: #fff;
                }
                .option.selected {
                    background-color: #2563eb;
                    color: #fff;
                    font-weight: 600;
                }

                @keyframes select-fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 640px) {
                    .select-trigger {
                        padding: 0.65rem 1rem;
                    }
                    .selected-text {
                        font-size: 0.9rem;
                    }
                    .option {
                        padding: 0.75rem 1rem;
                        font-size: 0.85rem;
                    }
                }
            `}</style>
        </div>
    );
}
