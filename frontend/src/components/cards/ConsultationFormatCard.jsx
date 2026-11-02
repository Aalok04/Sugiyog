import React from 'react';
import { Link } from 'react-router-dom';
import { Video, MapPin, Globe2, ArrowRight, Clock, CheckCircle2, Sparkles } from 'lucide-react';

export default function ConsultationFormatCard({
  formatType, // 'ONLINE' | 'IN_PERSON' | 'INTERNATIONAL'
  title,
  tagline,
  description,
  benefits = [],
  duration,
  bookingLink,
  popular = false,
}) {
  const getFormatIcon = () => {
    switch (formatType) {
      case 'ONLINE':
        return <Video size={24} />;
      case 'INTERNATIONAL':
        return <Globe2 size={24} />;
      default:
        return <MapPin size={24} />;
    }
  };

  return (
    <div className={`format-card ${popular ? 'format-card-featured' : ''}`}>
      {popular && (
        <div className="format-popular-ribbon">
          <Sparkles size={12} />
          <span>Most Requested Worldwide</span>
        </div>
      )}

      {/* Header: Icon Badge + Tagline & Duration */}
      <div className="format-card-header">
        <div className="format-icon-badge" aria-hidden="true">
          {getFormatIcon()}
        </div>
        <div className="format-header-meta">
          {tagline && <span className="format-tagline-badge">{tagline}</span>}
          {duration && (
            <span className="format-duration-pill">
              <Clock size={12} />
              <span>{duration}</span>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="format-card-body">
        <h3 className="format-card-title">{title}</h3>
        <p className="format-card-desc">{description}</p>

        {/* Concise Benefits Checklist */}
        {benefits.length > 0 && (
          <div className="format-benefits-list">
            {benefits.map((b, idx) => (
              <div key={idx} className="format-benefit-item">
                <CheckCircle2 size={15} className="format-benefit-icon" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="format-card-footer">
          <Link to={bookingLink || '/book'} className={`btn ${popular ? 'btn-luxury' : 'btn-primary'} btn-block`}>
            <span>Reserve Consultation</span>
            <ArrowRight size={15} className="format-btn-arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}
