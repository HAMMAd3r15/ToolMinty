'use client';

import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link href="/" className="logo">
                        ToolMinty
                    </Link>
                </div>

                <div className="nav-container">
                    <nav className="nav" aria-label="Main Navigation">
                        <Link href="/#tools" className="nav-link">Tools</Link>
                        <Link href="/about" className="nav-link">About</Link>
                        <Link href="/contact" className="nav-link">Contact</Link>
                    </nav>
                </div>
            </div>
            <style jsx>{`
                .header {
                    height: var(--header-height);
                    border-bottom: 1px solid var(--color-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: sticky;
                    top: 0;
                    background-color: var(--color-bg);
                    z-index: 100;
                    transition: background-color 0.2s, border-color 0.2s;
                }
                .header-container {
                    width: 100%;
                    max-width: var(--max-width);
                    padding: 0 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: var(--color-text-primary);
                    white-space: nowrap;
                    letter-spacing: -0.04em;
                    text-decoration: none;
                }
                .nav-container {
                    display: flex;
                    align-items: center;
                    gap: 2.5rem;
                }
                .nav {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }
                .nav-link {
                    color: rgba(248, 250, 252, 0.8);
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 600;
                }
                
                @media (max-width: 768px) {
                    .nav {
                        gap: 1.25rem;
                    }
                    .nav-container {
                        gap: 1rem;
                    }
                }

                @media (max-width: 640px) {
                    .header-container {
                        padding: 0 1rem;
                    }
                    .logo {
                        font-size: 1.25rem;
                    }
                    .nav {
                        gap: 1rem;
                    }
                    .nav-link {
                        font-size: 0.9rem;
                    }
                }

                @media (max-width: 480px) {
                    .nav {
                        gap: 0.75rem;
                    }
                    .nav-link {
                        font-size: 0.85rem;
                    }
                    .logo {
                        font-size: 1.15rem;
                    }
                }
            `}</style>
        </header>
    );
}
