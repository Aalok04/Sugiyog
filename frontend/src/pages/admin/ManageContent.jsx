import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Sparkles, Image, FileText } from 'lucide-react';

export default function ManageContent() {
  return (
    <div>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>Manage Website Content</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Central navigation hub for website textual content, consultation chapters, events, and multimedia.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
        <Link to="/admin/services" className="admin-card" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <Layers size={24} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0 }}>Consultation Services</h3>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Manage Nadi Shastra reading chapters, duration times, and dakshina fees.
          </p>
        </Link>

        <Link to="/admin/events" className="admin-card" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <Sparkles size={24} color="var(--color-secondary-dark)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0 }}>Events & Satsangs</h3>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Announce spiritual retreats, sacred pujas, and global webinars.
          </p>
        </Link>

        <Link to="/admin/testimonials" className="admin-card" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <FileText size={24} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0 }}>Testimonials</h3>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Review, approve, and showcase seeker reflections on palm leaf readings.
          </p>
        </Link>

        <Link to="/admin/gallery" className="admin-card" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <Image size={24} color="var(--color-secondary-dark)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0 }}>Sacred Gallery</h3>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Curate photographs of palm leaves, darshan visits, and holy venues.
          </p>
        </Link>
      </div>
    </div>
  );
}
