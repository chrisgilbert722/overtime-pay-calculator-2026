import React from 'react';
import type { OvertimeResult } from '../logic/overtimeCalculations';

interface BreakdownTableProps {
    result: OvertimeResult;
    includeDoubleTime: boolean;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result, includeDoubleTime }) => {
    const payRows = [
        { label: 'Estimated Regular Hours Pay', value: formatMoney(result.regularPay), isTotal: false },
        { label: `Estimated Overtime Pay (${result.overtimeRate > 0 ? formatMoney(result.overtimeRate) : '1.5x'}/hr)`, value: formatMoney(result.overtimePay), isTotal: false },
        ...(includeDoubleTime ? [{ label: `Estimated Double-Time Pay (${formatMoney(result.doubleTimeRate)}/hr)`, value: formatMoney(result.doubleTimePay), isTotal: false }] : []),
        { label: 'Estimated Total Gross Weekly Pay', value: formatMoney(result.totalGrossPay), isTotal: true },
    ];

    const rateRows = [
        { label: 'Regular Hourly Rate', value: formatMoney(result.totalGrossPay > 0 ? result.regularPay / (result.totalHours - (result.overtimePay / result.overtimeRate) - (result.doubleTimePay / result.doubleTimeRate)) || 0 : 0), isTotal: false },
        { label: 'Overtime Rate (1.5x)', value: formatMoney(result.overtimeRate), isTotal: false },
        ...(includeDoubleTime ? [{ label: 'Double-Time Rate (2x)', value: formatMoney(result.doubleTimeRate), isTotal: false }] : []),
        { label: 'Effective Hourly Rate', value: formatMoney(result.effectiveHourlyRate), isTotal: true },
    ];

    const hoursRows = [
        { label: 'Regular Hours', value: `${(result.regularPay / (result.overtimeRate / 1.5)).toFixed(1)} hrs`, isTotal: false },
        { label: 'Overtime Hours', value: `${(result.overtimePay / result.overtimeRate).toFixed(1)} hrs`, isTotal: false },
        ...(includeDoubleTime ? [{ label: 'Double-Time Hours', value: `${(result.doubleTimePay / result.doubleTimeRate).toFixed(1)} hrs`, isTotal: false }] : []),
        { label: 'Total Hours Worked', value: `${result.totalHours.toFixed(1)} hrs`, isTotal: true },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? 'var(--color-primary)' : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Pay Breakdown Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Weekly Pay Breakdown</h3>
            </div>
            {renderTable(payRows)}

            {/* Rate Info Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem' }}>Hourly Rates</h3>
            </div>
            {renderTable(rateRows)}

            {/* Hours Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0FDF4' }}>
                <h3 style={{ fontSize: '1rem', color: '#166534' }}>Hours Worked</h3>
            </div>
            {renderTable(hoursRows)}

            {/* Disclaimer */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border)', background: '#FEF3C7' }}>
                <p style={{ fontSize: '0.75rem', color: '#92400E', margin: 0, lineHeight: 1.5 }}>
                    <strong>Note:</strong> This calculation uses simplified state rules (federal default: 1.5x after 40 hours/week). Actual pay may vary based on your employer's policies, applicable state laws, and specific job classification. This is not legal advice.
                </p>
            </div>
        </div>
    );
};
