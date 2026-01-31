import React from 'react';
import type { OvertimeInput } from '../logic/overtimeCalculations';
import { US_STATES } from '../logic/overtimeCalculations';

interface InputCardProps {
    values: OvertimeInput;
    onChange: (field: keyof OvertimeInput, value: number | boolean | string) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Hourly Rate */}
                <div>
                    <label htmlFor="hourlyRate">Hourly Pay Rate ($)</label>
                    <input
                        type="number"
                        id="hourlyRate"
                        value={values.hourlyRate}
                        onChange={(e) => onChange('hourlyRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.50"
                    />
                </div>

                {/* Regular Hours */}
                <div>
                    <label htmlFor="regularHours">Regular Hours (per week)</label>
                    <input
                        type="number"
                        id="regularHours"
                        value={values.regularHours}
                        onChange={(e) => onChange('regularHours', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="168"
                        step="1"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Standard threshold is 40 hours/week
                    </span>
                </div>

                {/* Overtime Hours */}
                <div>
                    <label htmlFor="overtimeHours">Overtime Hours (per week)</label>
                    <input
                        type="number"
                        id="overtimeHours"
                        value={values.overtimeHours}
                        onChange={(e) => onChange('overtimeHours', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="128"
                        step="1"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Hours worked beyond regular hours (typically at 1.5x rate)
                    </span>
                </div>

                {/* State */}
                <div>
                    <label htmlFor="state">State</label>
                    <select
                        id="state"
                        value={values.state}
                        onChange={(e) => onChange('state', e.target.value)}
                    >
                        {US_STATES.map((st) => (
                            <option key={st.value} value={st.value}>{st.label}</option>
                        ))}
                    </select>
                </div>

                {/* Overtime Multiplier */}
                <div>
                    <label htmlFor="overtimeMultiplier">Overtime Multiplier</label>
                    <select
                        id="overtimeMultiplier"
                        value={values.overtimeMultiplier}
                        onChange={(e) => onChange('overtimeMultiplier', parseFloat(e.target.value))}
                    >
                        <option value={1.5}>1.5x (Time and a Half)</option>
                        <option value={1.25}>1.25x</option>
                        <option value={2}>2x (Double Time)</option>
                    </select>
                </div>

                {/* Double Time Toggle */}
                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={values.includeDoubleTime}
                            onChange={(e) => onChange('includeDoubleTime', e.target.checked)}
                        />
                        <span>Include Double-Time Hours (2x rate)</span>
                    </label>
                </div>

                {/* Double Time Hours (if enabled) */}
                {values.includeDoubleTime && (
                    <div>
                        <label htmlFor="doubleTimeHours">Double-Time Hours (per week)</label>
                        <input
                            type="number"
                            id="doubleTimeHours"
                            value={values.doubleTimeHours}
                            onChange={(e) => onChange('doubleTimeHours', parseFloat(e.target.value) || 0)}
                            min="0"
                            max="128"
                            step="1"
                        />
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            Hours paid at 2x rate (separate from overtime hours)
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
