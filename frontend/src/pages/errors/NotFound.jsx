import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section" style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: 540 }}>
        <div className="brand-symbol" style={{ margin: '0 auto var(--space-4) auto', width: 64, height: 64, fontSize: '2rem' }}>
          ४०४
        </div>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>404 — Sacred Path Not Found</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: 'var(--space-8)' }}>
          The page or manuscript you are seeking does not exist or has been relocated to another sanctuary.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
