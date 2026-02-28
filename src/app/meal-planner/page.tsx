'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

const MEALS = {
    Breakfast: ['Oatmeal with Berries', 'Avocado Toast', 'Greek Yogurt Parfait', 'Scrambled Eggs on Toast', 'Protein Smoothie'],
    Lunch: ['Chicken Quinoa Bowl', 'Tuna Salad Wrap', 'Lentil Soup', 'Turkey Sandwich', 'Roasted Veggie Salad'],
    Dinner: ['Grilled Salmon with Asparagus', 'Beef Stir-fry', 'Chickpea Curry', 'Baked Tofu with Broccoli', 'Pasta Primavera'],
    Snack: ['Apple with Almond Butter', 'Handful of Walnuts', 'Cottage Cheese', 'Carrot Sticks with Hummus']
};

export default function MealPlanner() {
    const [plan, setPlan] = useState<{ [key: string]: string[] }>({});

    const generatePlan = () => {
        const newPlan: { [key: string]: string[] } = {};
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
            newPlan[day] = [
                MEALS.Breakfast[Math.floor(Math.random() * MEALS.Breakfast.length)],
                MEALS.Lunch[Math.floor(Math.random() * MEALS.Lunch.length)],
                MEALS.Dinner[Math.floor(Math.random() * MEALS.Dinner.length)]
            ];
        });
        setPlan(newPlan);
    };

    const faqs = [
        {
            question: "Can I customize the meal database?",
            answer: "In this version, we provide a curated list of healthy and accessible meals. Future updates may allow you to save your own favorite recipes."
        },
        {
            question: "How do I use this for grocery shopping?",
            answer: "Generate your plan, then head over to our 'Grocery List Builder' to add the ingredients you'll need for these meals."
        },
        {
            question: "What if I have dietary restrictions?",
            answer: "The current list contains a mix of options. If a suggestion doesn't fit your diet, feel free to swap it with a similar meal you enjoy."
        }
    ];

    const calc = calculators.find(c => c.href === '/meal-planner');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Weekly Meal Planner'}
                description={calc?.description || "Stop stressing about 'what's for dinner'. Get a randomized, balanced meal plan for the week."}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <button onClick={generatePlan} className="btn btn-primary" style={{ padding: '1rem' }}>Generate Weekly Plan</button>

                    {Object.keys(plan).length > 0 && (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {Object.entries(plan).map(([day, meals]) => (
                                <div key={day} style={{
                                    background: 'rgba(30, 41, 59, 0.4)',
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(37, 99, 235, 0.3)', paddingBottom: '0.5rem' }}>
                                        {day}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>Breakfast</div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{meals[0]}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>Lunch</div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{meals[1]}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>Dinner</div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{meals[2]}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="Weekly Meal Planner"
                howToUse="To generate your week of meals, simply click the 'Generate Weekly Plan' button. The tool instantly creates a full 7-day plan spanning Monday through Sunday, each day featuring a randomly selected Breakfast, Lunch, and Dinner from a curated library of healthy, accessible meals. Each day is displayed in a structured grid for easy reference. Press 'Generate Weekly Plan' again at any time to get a completely fresh set of meal ideas."
                whyUse="Our Weekly Meal Planner eliminates the daily cognitive burden of deciding what to eat by giving you a complete, healthy week of meals in one click. Structured meal planning is proven to reduce food waste, lower grocery spending, and support healthier eating habits. The premium grid layout makes it easy to scan your entire week at a glance. It's completely free, works offline, and pairs perfectly with our Grocery List Builder to streamline your entire weekly food prep routine."
            />
        </div>
    );
}
