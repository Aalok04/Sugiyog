import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Globe, MapPin, Calendar, ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react';
import api from '../../services/api';

export default function ServiceDetails() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/services/${slug}`)
      .then((res) => {
        if (res.success) setService(res.data);
      })
      .catch((err) => setError(err.message || 'Service not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="section container" style={{ textAlign: 'center' }}>
        <p>Loading service details...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="section container" style={{ textAlign: 'center' }}>
        <h2>Consultation Chapter Not Found</h2>
        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>The requested service could not be located.</p>
        <Link to="/services" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          Back to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: '2rem', color: 'var(--color-primary)', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Services
        </Link>

        <div style={{ background: 'var(--color-surface-card)', padding: 'var(--space-10)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <span className="service-meta-badge" style={{ marginBottom: '1rem' }}>
            {service.isOnlineSupported && 'Online • '}
            {service.isInPersonSupported && 'In-Person Consultation'}
          </span>

          <h1 style={{ fontSize: '2.4rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{service.title}</h1>

          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', padding: '1rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', margin: '1.5rem 0' }}>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Session Duration</span>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>{service.durationMinutes} Minutes</p>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Consultation Format</span>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-primary)', margin: 0 }}>
                {service.isOnlineSupported && service.isInPersonSupported
                  ? 'Online Video & In-Person Tour'
                  : service.isOnlineSupported
                  ? 'Online Encrypted Video'
                  : 'In-Person Tour Visit'}
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Overview & Scope</h3>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            {service.description || service.shortDescription}
          </p>

          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>What Is Required For This Reading</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={18} color="var(--color-secondary-dark)" />
              <span>Clear photo or scanned print of thumb impression (Right thumb for males, Left thumb for females).</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={18} color="var(--color-secondary-dark)" />
              <span>Approximate birth details (Date, place, and time if known; not mandatory for search).</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={18} color="var(--color-secondary-dark)" />
              <span>Quiet environment for live audio/video interaction with Swami Ji.</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to={`/book?service=${service.slug}`} className="btn btn-primary btn-lg">
              <Calendar size={18} />
              <span>Book Appointment for This Service</span>
            </Link>
            <a
              href={`https://wa.me/919876543210?text=Hari%20Om%20Swami%20Ji%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(service.title)}%20consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              <MessageCircle size={18} />
              <span>Inquire on WhatsApp</span>
            </a>
            <Link to="/faq" className="btn btn-outline btn-lg">
              <span>View FAQ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
