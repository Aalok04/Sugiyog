import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '../../services/api';

export default function CityVisitDetails() {
  const { id } = useParams();
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/travel-visits/${id}`)
      .then((res) => {
        if (res.success) setVisit(res.data);
      })
      .catch((err) => setError(err.message || 'Visit not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="section container" style={{ textAlign: 'center' }}>
        <p>Loading tour visit details...</p>
      </div>
    );
  }

  if (error || !visit) {
    return (
      <div className="section container" style={{ textAlign: 'center' }}>
        <h2>Tour Visit Not Available</h2>
        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>This visit may be a draft, completed, or closed to public viewing.</p>
        <Link to="/upcoming-visits" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          Back to Upcoming Visits
        </Link>
      </div>
    );
  }

  const startDateStr = new Date(visit.startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const endDateStr = new Date(visit.endDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <Link to="/upcoming-visits" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: '2rem', color: 'var(--color-primary)', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to All Upcoming Visits
        </Link>

        <div style={{ background: 'var(--color-surface-card)', padding: 'var(--space-10)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span className="visit-location-badge">
              <MapPin size={14} /> {visit.city}, {visit.country}
            </span>
            <span className={`visit-status-tag ${visit.isBookingOpen ? 'visit-status-open' : 'visit-status-announced'}`}>
              {visit.isBookingOpen ? 'Appointments Open' : 'Tour Announced'}
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{visit.title}</h1>

          <div className="responsive-two-col" style={{ background: 'var(--color-white)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', margin: '1.5rem 0' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 600, marginBottom: 4 }}>
                <Calendar size={18} />
                <span>Tour Dates</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{startDateStr} – {endDateStr}</p>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Local Timezone: {visit.timezone}</span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 600, marginBottom: 4 }}>
                <MapPin size={18} />
                <span>Venue Details</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{visit.venueName}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{visit.venueAddress}</p>
              {visit.venueMapsUrl && (
                <a href={visit.venueMapsUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--color-secondary-dark)', textDecoration: 'underline', marginTop: 4, display: 'inline-block' }}>
                  View on Google Maps
                </a>
              )}
            </div>
          </div>

          {visit.notes && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Special Instructions for Seekers</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{visit.notes}</p>
            </div>
          )}

          {/* Slots if booking is open */}
          {visit.isBookingOpen && visit.slots && visit.slots.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Available Appointment Slots for This Visit</h3>
              <div className="slots-selection-grid">
                {visit.slots.map((slot) => {
                  const dateStr = new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  const timeStr = new Date(slot.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                  return (
                    <div key={slot.id} className="slot-pill" style={{ background: 'var(--color-white)' }}>
                      <div><strong>{dateStr}</strong></div>
                      <div>{timeStr}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 600 }}>Available</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {visit.isBookingOpen ? (
              <Link to={`/book?visit=${visit.id}`} className="btn btn-primary btn-lg">
                <span>Book In-Person Appointment in {visit.city}</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <Link to={`/contact?subject=Travel%20Inquiry%20${visit.city}`} className="btn btn-secondary btn-lg">
                <span>Request Notification When Bookings Open</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
