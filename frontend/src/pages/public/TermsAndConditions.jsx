import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 840 }}>
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Terms and Conditions</h1>
        <div style={{ background: 'var(--color-surface-card)', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', lineHeight: 1.8 }}>
          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p>
            Welcome to <strong>Sugiyog</strong>. By accessing this platform, booking a consultation with Swami Ji,
            or submitting an inquiry, you agree to adhere to these terms and conditions.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>1. Nature of Nadi Shastra Readings</h3>
          <p>
            Nadi Shastra is an ancient spiritual science of predictive insights and remedial guidance based on classical palm leaf inscriptions.
            Consultations are offered for spiritual guidance, self-discovery, and dharmic life direction. They do not constitute certified legal, medical, or financial advice.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>2. Appointment Availability & Punctuality</h3>
          <p>
            Seekers are expected to join the video session or arrive at the venue 15 minutes prior to their scheduled slot.
            Late arrival may result in a shortened session to prevent delay for subsequent scheduled seekers.
          </p>
        </div>
      </div>
    </div>
  );
}
