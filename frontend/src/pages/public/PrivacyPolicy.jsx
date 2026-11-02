import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 840 }}>
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Privacy Policy</h1>
        <div style={{ background: 'var(--color-surface-card)', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', lineHeight: 1.8 }}>
          <p><strong>Effective Date:</strong> January 1, 2026</p>
          <p>
            At <strong>Sugiyog</strong>, we hold the privacy and sacred confidentiality of every seeker in highest reverence.
            This policy outlines how your personal information, thumb impressions, and spiritual consultation recordings are handled.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>1. Data Collection & Thumb Impressions</h3>
          <p>
            We collect your full name, email address, contact numbers, and thumb impressions exclusively for the purpose of
            searching, identifying, and indexing your corresponding Nadi palm leaves.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>2. Confidentiality of Readings</h3>
          <p>
            All consultations, personal life readings, past karmic accounts, and discussions with Swami Ji remain strictly confidential.
            We do not sell, rent, or share seeker data with third parties or advertising brokers.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>3. Secure Payments</h3>
          <p>
            All financial transactions are conducted via encrypted, PCI-DSS compliant payment gateways. We never store credit/debit
            card numbers or sensitive bank credentials on our servers.
          </p>
        </div>
      </div>
    </div>
  );
}
