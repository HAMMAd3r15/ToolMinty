'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import DateInput from '@/components/UI/DateInput';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import EliteSEOCards from '@/components/UI/EliteSEOCards';

export default function SchoolAgeEligibilityCalculator() {
    const [dob, setDob] = useState<string>('');
    const [cutoffDate, setCutoffDate] = useState<string>(`${new Date().getFullYear()}-09-01`);
    const [minAge, setMinAge] = useState<string>('5');

    const calculateEligibility = () => {
        if (!dob || !cutoffDate) return null;

        const birth = new Date(dob);
        const cutoff = new Date(cutoffDate);
        const ageLimit = parseInt(minAge);

        if (isNaN(birth.getTime()) || isNaN(cutoff.getTime()) || isNaN(ageLimit)) return null;

        // Calculate age at cutoff date
        let ageAtCutoff = cutoff.getFullYear() - birth.getFullYear();
        const m = cutoff.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && cutoff.getDate() < birth.getDate())) {
            ageAtCutoff--;
        }

        const isEligible = ageAtCutoff >= ageLimit;

        return {
            ageAtCutoff,
            isEligible,
            yearsWait: ageLimit - ageAtCutoff
        };
    };

    const res = calculateEligibility();

    const faqs = [
        {
            question: "What is a 'cutoff date'?",
            answer: "The cutoff date is the date by which a child must have reached a certain age to be eligible for enrollment in a specific grade level. Common cutoff dates are September 1st or January 1st."
        },
        {
            question: "Does this apply to all schools?",
            answer: "No, eligibility rules vary significantly by country, state, and even individual school districts. Always check with your local education department for official requirements."
        },
        {
            question: "What if my child is just a few days short?",
            answer: "Some districts allow for 'early entry' assessments if a child's birthday is very close to the cutoff, but this usually requires specialized testing."
        }
    ];

    const calc = calculators.find(c => c.href === '/school-age-eligibility');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'School Age Eligibility Calculator'}
                description={calc?.description || 'Quickly check if your child meets the age requirements for school admission based on your local cutoff date.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <DateInput
                        label="Child's Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <DateInput
                            label="Cutoff Date"
                            value={cutoffDate}
                            onChange={(e) => setCutoffDate(e.target.value)}
                        />
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Required Age (Min)</label>
                            <input
                                type="number"
                                className="input"
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value)}
                                placeholder="e.g. 5"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Admission Status"
                                value={res.isEligible ? 'Eligible for Admission' : 'Not Yet Eligible'}
                                subtitle={`Age at cutoff: ${res.ageAtCutoff} years old`}
                                highlight
                                color={res.isEligible ? 'success' : 'error'}
                            />
                            {!res.isEligible && res.yearsWait > 0 && (
                                <div style={{
                                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                    padding: '1.25rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid rgba(239, 68, 68, 0.1)',
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-secondary)'
                                }}>
                                    <strong>Note:</strong> Your child will likely be eligible in <strong>{res.yearsWait} year{res.yearsWait > 1 ? 's' : ''}</strong> based on this cutoff.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <EliteSEOCards
                toolName="School Age Eligibility Calculator"
                howToUse="To determine if a child is ready for school enrollment, enter their 'Date of Birth', your local 'Cutoff Date' (usually September 1st), and the 'Minimum Required Age' (typically 5 for Kindergarten). The tool instantly calculates the child's exact age at the time of the cutoff and provides a clear 'Eligible' or 'Not Yet Eligible' status in a high-fidelity result card. You'll also receive an estimate of how many years are remaining until they meet the requirement if they aren't eligible yet. This streamlined process removes the stress of manual date math during the busy enrollment season."
                whyUse="Using our School Age Eligibility Calculator ensures you have the absolute precision needed for important educational decisions. Educational requirements are strict, and our tool accounts for the exact calendar day of both the birth and the cutoff, including leap year cycles, to provide a 100% accurate result. The 'elite' user interface is designed for maximum readability and ease of use, featuring clean input fields and responsive status indicators that look professional on any device. It is a completely free, privacy-focused utility that processes all sensitive birth information locally. By choosing this digital assistant, you guarantee your child's enrollment planning is based on stable and correct information."
            />
        </div>
    );
}
