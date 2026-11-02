import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Sparkles, Globe } from 'lucide-react';
import api from '../../services/api';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/events')
      .then((res) => {
        if (res.success) setEvents(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Spiritual Gatherings</span>
          <h1 className="section-title">Events, Satsangs & Discourses</h1>
          <p className="section-subtitle">
            Join Swami Ji for enlightening satsangs, sacred sound chanting, meditation retreats, and Vedic discourses worldwide.
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading events...</p>
        ) : events.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-8)' }}>
            {events.map((evt) => (
              <div
                key={evt.id}
                style={{
                  background: 'var(--color-surface-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--color-secondary-dark)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
                  {evt.isOnline ? <Globe size={14} /> : <MapPin size={14} />}
                  <span>{evt.isOnline ? 'Online Global Webinar' : `${evt.city}, ${evt.country}`}</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>{evt.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', flexGrow: 1, marginBottom: 'var(--space-4)' }}>
                  {evt.description}
                </p>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
                    <Calendar size={16} color="var(--color-primary)" />
                    <span>{new Date(evt.eventDate).toLocaleDateString()}</span>
                  </div>
                  {evt.registrationLink && (
                    <a href={evt.registrationLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Register
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', background: 'var(--color-surface-card)', borderRadius: 'var(--radius-lg)' }}>
            <Sparkles size={40} color="var(--color-secondary)" style={{ margin: '0 auto var(--space-4) auto' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--space-2)' }}>Upcoming Events Schedule in Preparation</h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 500, margin: '0 auto' }}>
              Special seasonal pujas, planetary remedies (Navagraha Shanti), and global discourses will be announced here soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
