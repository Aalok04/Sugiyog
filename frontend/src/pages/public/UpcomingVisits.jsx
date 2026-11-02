import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Filter, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import VisitCard from '../../components/cards/VisitCard';
import GlobalTravelMap from '../../components/map/GlobalTravelMap';
import { FALLBACK_VISITS } from '../../services/fallbackData';

export default function UpcomingVisits() {
  const [visits, setVisits] = useState(FALLBACK_VISITS);
  const [loading, setLoading] = useState(false);

  // Filters
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('2026');

  const fetchVisits = () => {
    setLoading(true);
    const params = {};
    if (country) params.country = country;
    if (city) params.city = city;
    if (month && year) {
      params.month = month;
      params.year = year;
    }

    api
      .get('/travel-visits', { params })
      .then((res) => {
        if (res.success) setVisits(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchVisits();
  };

  const handleReset = () => {
    setCountry('');
    setCity('');
    setMonth('');
    setYear('2026');
    setTimeout(() => {
      api.get('/travel-visits').then((res) => {
        if (res.success) setVisits(res.data || []);
      });
    }, 50);
  };

  return (
    <div className="section" style={{ paddingTop: 'var(--space-12)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto var(--space-10) auto' }}>
          <h1 className="section-title">Upcoming City Visits & Global Darshan</h1>
          <p className="section-subtitle">
            Pujya Swami Ji journeys to major international and domestic cities to grant personal Nadi Shastra consultations,
            satsang discourses, and spiritual blessings. Explore tour schedules and reserve your in-person reading slot.
          </p>
        </div>

        {/* 1. Interactive World Map Section */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <GlobalTravelMap visits={visits} loading={loading} />
        </div>

        {/* 2. Detailed Filter Bar */}
        <div className="visits-filter-card" style={{ marginBottom: 'var(--space-10)' }}>
          <form onSubmit={handleFilterSubmit} className="visits-filter-grid">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Search Country</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. India, USA, UK"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Search City</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. New Delhi, London, New York"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Filter by Month</label>
              <select className="form-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">All Months</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button type="submit" className="btn btn-primary">
                <Search size={16} />
                <span>Filter Tours</span>
              </button>
              <button type="button" onClick={handleReset} className="btn btn-outline">
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* 3. Results List */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading scheduled tours...</p>
        ) : visits.length > 0 ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: '1.45rem', margin: 0, fontFamily: 'var(--font-serif)' }}>
                Scheduled Tours ({visits.length})
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Strict capacity limits apply per city
              </span>
            </div>
            <div className="visits-list-grid">
              {visits.map((visit) => (
                <VisitCard key={visit.id} visit={visit} />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', background: 'var(--color-surface-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <MapPin size={40} color="var(--color-secondary)" style={{ margin: '0 auto var(--space-4) auto' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--space-2)' }}>No Scheduled Visits Match Your Criteria</h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: 520, margin: '0 auto var(--space-6) auto' }}>
              We regularly announce new international and domestic tour legs. You can submit a request for Swami Ji to visit your city or arrange an Online Video Consultation.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" onClick={handleReset} className="btn btn-secondary">
                View All Upcoming Tours
              </button>
              <Link to="/book?format=ONLINE" className="btn btn-primary">
                Book Online Video Consultation
              </Link>
            </div>
          </div>
        )}

        {/* Request a City Visit CTA */}
        <div style={{ marginTop: 'var(--space-16)', background: 'radial-gradient(circle at 50% 30%, #521520 0%, #2A0910 100%)', padding: 'var(--space-10)', borderRadius: 'var(--radius-lg)', border: '2px solid var(--color-secondary)', textAlign: 'center', color: '#FFF9EF' }}>
          <Sparkles size={24} color="var(--color-secondary)" style={{ margin: '0 auto var(--space-3) auto' }} />
          <h3 style={{ color: '#FFF9EF', fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: 'var(--space-2)' }}>
            Would You Like Swami Ji to Visit Your City?
          </h3>
          <p style={{ color: 'rgba(255, 249, 239, 0.85)', maxWidth: 600, margin: '0 auto var(--space-6) auto' }}>
            If you represent a spiritual community, cultural foundation, or group of seekers desiring an in-person tour leg in your country, our secretariat welcomes formal invitations.
          </p>
          <Link to="/contact" className="btn btn-luxury">
            Submit City Visit Request to Secretariat
          </Link>
        </div>
      </div>
    </div>
  );
}
