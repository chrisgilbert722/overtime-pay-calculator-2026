import React from 'react';
import type { OvertimeInput } from '../logic/overtimeCalculations';

interface ScenarioControlsProps {
    values: OvertimeInput;
    onChange: (field: keyof OvertimeInput, value: number | boolean | string) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const overtimeOptions = [
        { label: '5 hrs', value: 5 },
        { label: '10 hrs', value: 10 },
        { label: '15 hrs', value: 15 },
        { label: '20 hrs', value: 20 },
    ];

    const rateOptions = [
        { label: '$15/hr', value: 15 },
        { label: '$25/hr', value: 25 },
        { label: '$35/hr', value: 35 },
        { label: '$50/hr', value: 50 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Overtime Hours Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Overtime Hours</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {overtimeOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('overtimeHours', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.overtimeHours === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.overtimeHours === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.overtimeHours === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hourly Rate Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Hourly Rate</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {rateOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('hourlyRate', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.hourlyRate === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.hourlyRate === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.hourlyRate === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
