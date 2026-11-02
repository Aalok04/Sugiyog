import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function VisitCard({ visit }) {
  const startDateStr = new Date(visit.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const endDateStr = new Date(visit.endDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="visit-card">
      <div className="visit-card-badge-row">
        <span className="visit-location-badge">
          <MapPin size={14} />
          {visit.city}, {visit.country}
        </span>
        <span
          className={`visit-status-tag ${
            visit.isBookingOpen ? 'visit-status-open' : 'visit-status-announced'
          }`}
        >
          {visit.isBookingOpen ? 'Appointments Open' : 'Tour Announced'}
        </span>
      </div>

      <h3 className="visit-title">{visit.title}</h3>

      <div className="visit-info-list">
        <div className="visit-info-item">
          <Calendar size={16} />
          <span>
            {startDateStr} – {endDateStr}
          </span>
        </div>
        <div className="visit-info-item">
          <MapPin size={16} />
          <span>{visit.venueName}</span>
        </div>
        {visit.availableSlotsCount !== undefined && visit.isBookingOpen && (
          <div className="visit-info-item">
            <Clock size={16} />
            <span>{visit.availableSlotsCount} Appointment Slots Available</span>
          </div>
        )}
      </div>

      <div className="visit-card-footer">
        <Link to={`/upcoming-visits/${visit.id}`} className="btn btn-outline btn-sm">
          <span>View Details</span>
        </Link>
        {visit.isBookingOpen ? (
          <Link to={`/book?visit=${visit.id}`} className="btn btn-primary btn-sm">
            <span>Book Visit Slot</span>
            <ArrowRight size={14} />
          </Link>
        ) : (
          <Link to={`/contact?subject=Travel%20Inquiry%20${visit.city}`} className="btn btn-secondary btn-sm">
            <span>Request Notice</span>
          </Link>
        )}
      </div>
    </div>
  );
}
