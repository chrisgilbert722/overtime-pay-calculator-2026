import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This overtime pay calculator provides estimates based on simplified state rules using the
                federal default of 1.5x pay for hours worked beyond 40 per week. These figures are
                estimates only and actual pay may vary based on your employer's policies, job classification,
                and applicable state labor laws. Some states have additional daily overtime rules not reflected
                here. This calculator is for informational purposes only and does not constitute legal advice.
            </p>
        </div>
    );
};
