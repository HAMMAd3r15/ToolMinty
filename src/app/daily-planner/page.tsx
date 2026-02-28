'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';


const HOURS = [
    '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
    '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'
];

export default function DailyPlanner() {
    const calc = calculators.find(c => c.href === '/daily-planner');
    const [date, setDate] = useState({ d: '', m: '', y: '' });
    const [activeDay, setActiveDay] = useState(0);
    const [weather, setWeather] = useState(0);
    const [schedule, setSchedule] = useState(Array(HOURS.length).fill(''));
    const [checks, setChecks] = useState(Array(HOURS.length).fill(false));
    const [goals, setGoals] = useState(['', '', '', '']);
    const [todos, setTodos] = useState(Array(10).fill(''));
    const [notes, setNotes] = useState('');

    const faqs = [
        {
            question: "Why should I plan my day on paper?",
            answer: "Physical writing increases cognitive engagement and helps you commit to your tasks. It also reduces digital distractions."
        },
        {
            question: "What should I put in 'Priorities'?",
            answer: "These are your 'Big Rocks'—the 2 or 3 most important tasks that, if completed, would make the day feel like a success."
        },
        {
            question: "How do I save it as a PDF?",
            answer: "Click the 'Print / Save PDF' button. In the print dialog, select 'Save as PDF' from the destination list."
        }
    ];

    const printPlanner = () => window.print();

    // Theme Colors
    const COLORS = {
        bg: '#fbf7ef',
        accent: '#5e8474',
        accentLight: 'rgba(94, 132, 116, 0.15)',
        text: '#000000',
        border: '#d6dfd0',
        white: '#ffffff',
        yellow: '#f4c542'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
            {/* Standard Tool Header - Hidden during print */}
            <div className="no-print">
                <ToolHeader
                    title={calc?.title || 'Daily Planner'}
                    description={calc?.description || 'Design and print your own custom daily schedule.'}
                />
            </div>

            {/* Control Bar - Keep the Print button near the canvas */}
            <div className="no-print" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <button onClick={printPlanner} className="btn-primary" style={{
                    padding: '1rem 3.5rem',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                    transition: 'all 0.3s'
                }}>
                    Download & Print
                </button>
            </div>

            {/* Planner Sheet - STRICT A4 Constraint */}
            <div className="planner-container">
                <div className="planner-canvas">
                    {/* Header Section */}
                    <div className="planner-header">
                        <div>
                            <div className="planner-title">
                                Daily<br />Planner
                            </div>
                        </div>

                        <div className="planner-meta">
                            {/* Date Input */}
                            <div className="date-input">
                                <span className="label">date:</span>
                                <div className="date-fields">
                                    <input type="text" maxLength={2} value={date.d} onChange={e => setDate({ ...date, d: e.target.value })} className="date-input-field" placeholder="/" />
                                    <span className="separator">/</span>
                                    <input type="text" maxLength={2} value={date.m} onChange={e => setDate({ ...date, m: e.target.value })} className="date-input-field" placeholder="/" />
                                    <span className="separator">/</span>
                                    <input type="text" maxLength={4} value={date.y} onChange={e => setDate({ ...date, y: e.target.value })} className="date-input-year" placeholder="202X" />
                                </div>
                            </div>

                            {/* Day Scroller */}
                            <div className="day-scroller">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveDay(i)}
                                        className={`day-node ${activeDay === i ? 'active' : ''}`}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Weather Row */}
                            <div className="weather-row">
                                {['☀️', '🌤️', '🌧️', '⛈️', '❄️', '🌬️', '🌨️'].map((w, i) => (
                                    <span
                                        key={i}
                                        onClick={() => setWeather(i)}
                                        className="weather-icon"
                                        style={{
                                            opacity: weather === i ? 1 : 0.2,
                                            transform: weather === i ? 'scale(1.1)' : 'scale(1)',
                                        }}
                                    >
                                        {w}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="planner-content">
                        {/* Schedule Table */}
                        <div className="schedule-section">
                            <div className="schedule-header">
                                <div className="header-node time">Time</div>
                                <div className="header-node check">✓</div>
                                <div className="header-node activity">Activity</div>
                            </div>

                            <div className="schedule-body">
                                {HOURS.map((hour, i) => (
                                    <div key={i} className="hour-row">
                                        <div className="hour-label">
                                            {hour}
                                        </div>
                                        <div className="check-box-cell">
                                            <div
                                                onClick={() => {
                                                    const n = [...checks];
                                                    n[i] = !n[i];
                                                    setChecks(n);
                                                }}
                                                className={`check-box ${checks[i] ? 'checked' : ''}`}
                                            />
                                        </div>
                                        <div className="activity-cell">
                                            <input
                                                type="text"
                                                value={schedule[i]}
                                                onChange={e => {
                                                    const n = [...schedule];
                                                    n[i] = e.target.value;
                                                    setSchedule(n);
                                                }}
                                                className="activity-input"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="sidebar-section">
                            {/* Today's Goal */}
                            <div>
                                <div className="section-header">Today's Goal</div>
                                <div className="goals-card">
                                    {goals.map((goal, i) => (
                                        <div key={i} className="goal-row">
                                            <div className="goal-bullet" />
                                            <input
                                                type="text"
                                                value={goal}
                                                onChange={e => {
                                                    const n = [...goals];
                                                    n[i] = e.target.value;
                                                    setGoals(n);
                                                }}
                                                className="goal-input"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* To-Do Lists */}
                            <div>
                                <div className="section-header">To-Do Lists</div>
                                <div className="todos-container">
                                    {todos.map((todo, i) => (
                                        <div key={i} className="todo-row">
                                            <div className="todo-check" />
                                            <input
                                                type="text"
                                                value={todo}
                                                onChange={e => {
                                                    const n = [...todos];
                                                    n[i] = e.target.value;
                                                    setTodos(n);
                                                }}
                                                className="todo-input"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notes Section */}
                            <div className="notes-card">
                                <div className="notes-header">Notes</div>
                                <textarea
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    className="notes-textarea"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="no-print" style={{ marginTop: '3rem' }}>
                <FAQSection items={faqs} />
            </div>

            <div className="no-print">
                <EliteSEOCards
                    toolName="Daily Planner"
                    howToUse="To design your perfect day, use the interactive grid to list your 'Goals', 'To-Do' items, and 'Notes'. Map out your schedule hour-by-hour from 4 AM to 10 PM. You can toggle the 'Weather' and 'Day' selectors for a customized look. Once your plan is ready, click 'Download & Print' to generate a high-fidelity A4-sized PDF that you can use on paper or keep digitally."
                    whyUse="Our Daily Planner is an 'elite' productivity utility designed for individuals who value the cognitive benefits of physical planning. It provides a stable and aesthetically pleasing framework for intentional living, free from digital distractions. The premium 'Fredoka' and 'Quicksand' typography, combined with the a soft, eye-friendly color palette, makes organizing your life a sophisticated experience. It is a completely free, privacy-focused resource where all your schedules remain entirely local and secure."
                />
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
                
                .planner-container {
                    width: 100%;
                    overflow-x: auto;
                    padding-bottom: 2rem;
                    -webkit-overflow-scrolling: touch;
                }

                .planner-canvas {
                    background: ${COLORS.bg};
                    color: ${COLORS.text};
                    padding: 2rem 2.5rem;
                    border-radius: 0;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                    width: 595px;
                    height: 842px;
                    margin: 0 auto;
                    font-family: 'Quicksand', 'Fredoka', sans-serif;
                    position: relative;
                    overflow: hidden;
                    box-sizing: border-box;
                }

                .planner-header {
                    display: grid;
                    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .planner-title {
                    font-size: 3.5rem;
                    line-height: 0.9;
                    font-weight: 900;
                    color: ${COLORS.accent};
                    letter-spacing: -1.5px;
                }

                .planner-meta {
                    display: grid;
                    gap: 0.8rem;
                    align-content: start;
                }

                .date-input {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    justify-content: flex-end;
                    font-size: 1.2rem;
                    font-weight: 700;
                }

                .date-input .label {
                    color: ${COLORS.accent};
                    opacity: 0.8;
                }

                .date-fields {
                    display: flex;
                    gap: 0.2rem;
                    border-bottom: 1.5px solid ${COLORS.accent};
                }

                .date-input-field {
                    width: 25px;
                    border: none;
                    background: transparent;
                    text-align: center;
                    outline: none;
                    font-size: 1.1rem;
                    color: ${COLORS.text};
                }

                .date-input-year {
                    width: 50px;
                    border: none;
                    background: transparent;
                    text-align: center;
                    outline: none;
                    font-size: 1.1rem;
                    color: ${COLORS.text};
                }

                .separator {
                    color: ${COLORS.accent};
                }

                .day-scroller {
                    background: ${COLORS.accent};
                    border-radius: 50px;
                    padding: 0.15rem 0.6rem;
                    display: flex;
                    justify-content: space-between;
                    color: #fff;
                    font-size: 0.75rem;
                    font-weight: 700;
                    box-shadow: 0 3px 6px rgba(0,0,0,0.1);
                }

                .day-node {
                    width: 22px;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .day-node.active {
                    background: rgba(255,255,255,0.3);
                }

                .weather-row {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.4rem;
                    font-size: 1.2rem;
                }

                .weather-icon {
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .planner-content {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: 1.5rem;
                    height: calc(100% - 150px);
                }

                .schedule-section {
                    display: flex;
                    flex-direction: column;
                }

                .schedule-header {
                    display: grid;
                    grid-template-columns: 70px 40px 1fr;
                    gap: 0.3rem;
                    margin-bottom: 0.8rem;
                }

                .header-node {
                    background: ${COLORS.accent};
                    color: #fff;
                    text-align: center;
                    padding: 0.3rem;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 0.65rem;
                    text-transform: uppercase;
                }

                .header-node.check {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                }

                .schedule-body {
                    border: 1.2px solid ${COLORS.border};
                    border-radius: 8px;
                    overflow: hidden;
                    flex-grow: 1;
                }

                .hour-row {
                    display: grid;
                    grid-template-columns: 70px 40px 1fr;
                    border-bottom: 1.2px solid ${COLORS.border};
                    align-items: center;
                    height: calc(100% / 19);
                }

                .hour-row:last-child {
                    border-bottom: none;
                }

                .hour-label {
                    padding: 0.2rem;
                    text-align: center;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: ${COLORS.accent};
                    border-right: 1.2px solid ${COLORS.border};
                }

                .check-box-cell {
                    padding: 0.2rem;
                    display: flex;
                    justify-content: center;
                    border-right: 1.2px solid ${COLORS.border};
                }

                .check-box {
                    width: 14px;
                    height: 14px;
                    border: 1.5px solid ${COLORS.accent};
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .check-box.checked {
                    background: ${COLORS.accent};
                }

                .activity-cell {
                    padding: 0.2rem 0.5rem;
                }

                .activity-input {
                    border: none;
                    background: transparent;
                    width: 100%;
                    outline: none;
                    font-size: 0.85rem;
                    color: ${COLORS.text};
                }

                .sidebar-section {
                    display: grid;
                    grid-template-rows: auto auto 1fr;
                    gap: 1.2rem;
                    height: 100%;
                }

                .section-header {
                    background: ${COLORS.accent};
                    color: #fff;
                    text-align: center;
                    padding: 0.5rem;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    margin-bottom: 0.8rem;
                    width: 70%;
                    margin: 0 auto 0.8rem;
                }

                .goals-card {
                    border: 2px solid ${COLORS.accent};
                    border-radius: 20px;
                    padding: 0.8rem;
                    display: grid;
                    gap: 0.6rem;
                }

                .goal-row {
                    display: flex;
                    gap: 0.6rem;
                    align-items: center;
                }

                .goal-bullet {
                    width: 10px;
                    height: 10px;
                    background: ${COLORS.yellow};
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .goal-input {
                    border: none;
                    border-bottom: 1.2px solid ${COLORS.border};
                    width: 100%;
                    background: transparent;
                    outline: none;
                    font-size: 0.85rem;
                    color: ${COLORS.text};
                }

                .todos-container {
                    display: grid;
                    gap: 0.5rem;
                }

                .todo-row {
                    display: flex;
                    gap: 0.6rem;
                    align-items: center;
                }

                .todo-check {
                    width: 14px;
                    height: 14px;
                    border: 1.8px solid ${COLORS.accent};
                    border-radius: 3px;
                    flex-shrink: 0;
                }

                .todo-input {
                    border: none;
                    border-bottom: 1.2px solid ${COLORS.border};
                    width: 100%;
                    background: transparent;
                    outline: none;
                    font-size: 0.85rem;
                    color: ${COLORS.text};
                }

                .notes-card {
                    background: ${COLORS.accent};
                    border-radius: 20px;
                    padding: 1.2rem;
                    display: flex;
                    flex-direction: column;
                    color: #000;
                    min-height: 150px;
                }

                .notes-header {
                    background: #fff;
                    color: ${COLORS.accent};
                    text-align: center;
                    padding: 0.2rem 1.2rem;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    align-self: center;
                    margin-bottom: 0.8rem;
                }

                .notes-textarea {
                    flex-grow: 1;
                    background: transparent;
                    border: none;
                    color: #000;
                    outline: none;
                    resize: none;
                    font-size: 0.85rem;
                    line-height: 1.8;
                    background-image: linear-gradient(transparent, transparent calc(1.8em - 1px), rgba(255,255,255,0.15) calc(1.8em - 1px), rgba(255,255,255,0.15) 1.8em);
                    background-size: 100% 1.8em;
                }

                @media print {
                    .no-print, header, footer, nav { display: none !important; }
                    body { background: white !important; padding: 0 !important; margin: 0 !important; }
                    main { padding: 0 !important; margin: 0 !important; }
                    .planner-container { padding: 0 !important; overflow: visible !important; }
                    .planner-canvas { 
                        box-shadow: none !important; 
                        margin: 0 !important; 
                        width: 595px !important;
                        height: 842px !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        page-break-after: avoid;
                        page-break-before: avoid;
                    }
                }
                
                input::placeholder { color: rgba(94, 132, 116, 0.3) !important; }
                
                .btn-primary {
                    background: #2563eb;
                    color: white;
                    border: none;
                    transition: all 0.2s;
                }
                .btn-primary:hover {
                    background: #1d4ed8;
                    transform: translateY(-2px);
                }

                @media (max-width: 650px) {
                    .planner-container {
                        justify-content: flex-start;
                    }
                    .planner-canvas {
                        margin-left: 0;
                    }
                }
            `}</style>
        </div>
    );
}
