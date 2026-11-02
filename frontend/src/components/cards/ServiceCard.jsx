import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Globe, MapPin, ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-card-header">
        <span className="service-meta-badge">
          {service.isOnlineSupported && <Globe size={12} />}
          {service.isInPersonSupported && <MapPin size={12} />}
          {service.isOnlineSupported && service.isInPersonSupported
            ? 'Online & In-Person'
            : service.isOnlineSupported
            ? 'Online Consultation'
            : 'In-Person Consultation'}
        </span>
        <h3 className="service-title">{service.title}</h3>
      </div>

      <p className="service-description">{service.shortDescription || service.description}</p>

      <div className="service-details-row">
        <div className="service-duration">
          <Clock size={16} />
          <span>{service.durationMinutes} Minutes Session</span>
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-secondary-dark)', fontWeight: 600 }}>
          {service.isOnlineSupported && service.isInPersonSupported
            ? 'Video / In-Person'
            : service.isOnlineSupported
            ? 'Online Video'
            : 'In-Person Visit'}
        </div>
      </div>

      <div className="service-card-actions">
        <Link to={`/services/${service.slug}`} className="btn btn-outline btn-sm">
          <span>Learn More</span>
        </Link>
        <Link to={`/book?service=${service.slug}`} className="btn btn-primary btn-sm">
          <span>Book Now</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
