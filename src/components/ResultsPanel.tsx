import React from 'react';
import type { OvertimeResult } from '../logic/overtimeCalculations';

interface ResultsPanelProps {
    result: OvertimeResult;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    return (
        <div className="card" style={{ background: 'linear-gradient(to bottom, #F0F9FF, #E8F4FD)', borderColor: '#93C5FD', boxShadow: '0 2px 8px -2px rgba(14, 165, 233, 0.15)' }}>
            <div className="text-center">
                <h2 style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Estimated Overtime Pay (Simplified State Rules)
                </h2>
                <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#0C4A6E', lineHeight: 1, letterSpacing: '-0.025em' }}>
                    {formatCurrency(result.overtimePay + result.doubleTimePay)}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    per week
                </div>
            </div>

            <hr style={{ margin: 'var(--space-6) 0', border: 'none', borderTop: '1px solid #93C5FD' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>REGULAR PAY</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{formatCurrency(result.regularPay)}</div>
                </div>
                <div style={{ borderLeft: '1px solid #93C5FD', borderRight: '1px solid #93C5FD' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL GROSS</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: '#166534' }}>{formatCurrency(result.totalGrossPay)}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>EFF. HOURLY</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {formatCurrency(result.effectiveHourlyRate)}
                    </div>
                </div>
            </div>

            {result.stateHasSpecialRules && (
                <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: '#FEF3C7', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.8125rem', color: '#92400E' }}>
                        {result.stateRuleNote}
                    </span>
                </div>
            )}
        </div>
    );
};
