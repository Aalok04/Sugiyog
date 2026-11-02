import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, ArrowRight, BookOpen, Clock } from 'lucide-react';
import api from '../../services/api';

export default function ConsultationFees() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/services')
      .then((res) => {
        if (res.success) setServices(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="section-header">
          <h1 className="section-title">Nadi Shastra Consultation Chapters</h1>
          <p className="section-subtitle">
            Explore focused readings guided by Swami Ji. Consultations are available via encrypted online video
            or in-person during scheduled city tours.
          </p>
        </div>

        <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: 'var(--space-10)' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Consultation Chapter</th>
                <th>Available Format</th>
                <th>Session Duration</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id}>
                  <td>
                    <strong>{svc.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{svc.shortDescription}</div>
                  </td>
                  <td>{svc.isOnlineSupported && svc.isInPersonSupported ? 'Online & In-Person' : svc.isOnlineSupported ? 'Online' : 'In-Person'}</td>
                  <td>{svc.durationMinutes} Mins</td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to={`/book?service=${svc.slug}`} className="btn btn-primary btn-sm">
                      Book Session
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-accent)' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={20} color="var(--color-secondary)" />
            Sacred Tradition & Secretariat Assistance
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Consultation guidelines and details are communicated directly by Swami Ji's secretariat upon reviewing your thumb impression and appointment booking.
          </p>
        </div>
      </div>
    </div>
  );
}
