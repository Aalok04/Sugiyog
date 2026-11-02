import React from 'react';

export default function CancellationPolicy() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 840 }}>
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Cancellation & Rescheduling Policy</h1>
        <div style={{ background: 'var(--color-surface-card)', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', lineHeight: 1.8 }}>
          <p>
            We recognize that unforeseen events and travel constraints may require adjustments to your consultation schedule.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>1. Rescheduling Guidelines</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Seekers may reschedule their appointment up to <strong>48 hours</strong> prior to the session at no additional charge.</li>
            <li>A maximum of 2 rescheduling requests are permitted per booking.</li>
          </ul>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>2. Cancellation & Refunds</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Cancellations requested at least 48 hours in advance will receive a 100% refund of the consultation fee.</li>
            <li>Cancellations made within 24 to 48 hours of the appointment will receive a 50% refund.</li>
            <li>No refunds are issued for cancellations requested less than 24 hours prior to the session or for no-shows.</li>
            <li>If a seeker's palm leaf bundle cannot be traced in the archives after exhaustive search, 100% of the Dakshina is refunded without deduction.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
