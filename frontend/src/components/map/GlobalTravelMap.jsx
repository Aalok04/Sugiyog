import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, ArrowRight, X, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

// Classical world city coordinates database for high-precision projection
const CITY_COORDINATES = {
  'new delhi': { lat: 28.6139, lon: 77.2090, country: 'India' },
  'mumbai': { lat: 19.0760, lon: 72.8777, country: 'India' },
  'bengaluru': { lat: 12.9716, lon: 77.5946, country: 'India' },
  'bangalore': { lat: 12.9716, lon: 77.5946, country: 'India' },
  'chennai': { lat: 13.0827, lon: 80.2707, country: 'India' },
  'vaitheeswaran koil': { lat: 11.2018, lon: 79.7126, country: 'India' },
  'kolkata': { lat: 22.5726, lon: 88.3639, country: 'India' },
  'hyderabad': { lat: 17.3850, lon: 78.4867, country: 'India' },
  'haridwar': { lat: 29.9457, lon: 78.1642, country: 'India' },
  'london': { lat: 51.5074, lon: -0.1278, country: 'United Kingdom' },
  'new york': { lat: 40.7128, lon: -74.0060, country: 'United States' },
  'san francisco': { lat: 37.7749, lon: -122.4194, country: 'United States' },
  'toronto': { lat: 43.6532, lon: -79.3832, country: 'Canada' },
  'dubai': { lat: 25.2048, lon: 55.2708, country: 'United Arab Emirates' },
  'singapore': { lat: 1.3521, lon: 103.8198, country: 'Singapore' },
  'sydney': { lat: -33.8688, lon: 151.2093, country: 'Australia' },
  'melbourne': { lat: -37.8136, lon: 144.9631, country: 'Australia' },
  'kuala lumpur': { lat: 3.1390, lon: 101.6869, country: 'Malaysia' },
  'paris': { lat: 48.8566, lon: 2.3522, country: 'France' },
  'berlin': { lat: 52.5200, lon: 13.4050, country: 'Germany' },
  'zurich': { lat: 47.3769, lon: 8.5417, country: 'Switzerland' },
  'tokyo': { lat: 35.6762, lon: 139.6503, country: 'Japan' },
};

// Equirectangular projection coordinates conversion
function projectCoordinates(lat, lon, width = 1000, height = 500) {
  const x = ((lon + 180) * (width / 360));
  const y = (((-1 * lat) + 90) * (height / 180));
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

export default function GlobalTravelMap({ visits = [], loading = false }) {
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, UPCOMING, OPEN_ONLY

  // Normalize visits with geographical coordinates
  const mappedVisits = useMemo(() => {
    return visits.map((visit) => {
      const cityKey = (visit.city || '').toLowerCase().trim();
      const coords = CITY_COORDINATES[cityKey] || { lat: 20.5937, lon: 78.9629 };
      const { x, y } = projectCoordinates(coords.lat, coords.lon);

      const isUpcoming = new Date(visit.endDate || visit.startDate) >= new Date();

      return {
        ...visit,
        coords,
        svgX: x,
        svgY: y,
        isUpcoming,
      };
    });
  }, [visits]);

  // Filtered visits
  const filteredVisits = useMemo(() => {
    return mappedVisits.filter((v) => {
      const matchesSearch =
        searchQuery === '' ||
        (v.city && v.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (v.country && v.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (v.title && v.title.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesStatus = true;
      if (statusFilter === 'UPCOMING') matchesStatus = v.isUpcoming;
      if (statusFilter === 'OPEN_ONLY') matchesStatus = v.isBookingOpen;

      return matchesSearch && matchesStatus;
    });
  }, [mappedVisits, searchQuery, statusFilter]);

  // If initial visits exist, auto-select the first one for preview
  useEffect(() => {
    if (filteredVisits.length > 0 && !selectedVisit) {
      setSelectedVisit(filteredVisits[0]);
    }
  }, [filteredVisits, selectedVisit]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="global-map-component">
      {/* Search and Filter Controls */}
      <div className="map-toolbar">
        <div className="map-search-box">
          <Search size={18} className="map-search-icon" />
          <input
            type="text"
            className="map-search-input"
            placeholder="Search by city, country or tour..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search travel cities"
          />
          {searchQuery && (
            <button
              type="button"
              className="map-clear-search"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="map-filter-pills">
          <button
            type="button"
            className={`map-filter-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setStatusFilter('ALL')}
          >
            All Destinations ({mappedVisits.length})
          </button>
          <button
            type="button"
            className={`map-filter-btn ${statusFilter === 'UPCOMING' ? 'active' : ''}`}
            onClick={() => setStatusFilter('UPCOMING')}
          >
            Upcoming Tours ({mappedVisits.filter((v) => v.isUpcoming).length})
          </button>
          <button
            type="button"
            className={`map-filter-btn ${statusFilter === 'OPEN_ONLY' ? 'active' : ''}`}
            onClick={() => setStatusFilter('OPEN_ONLY')}
          >
            Open for Booking ({mappedVisits.filter((v) => v.isBookingOpen).length})
          </button>
        </div>
      </div>

      {/* Main Map Canvas & Card Container */}
      <div className="map-visual-container">
        {/* SVG World Background Canvas */}
        <div className="map-svg-wrapper">
          <svg
            viewBox="0 0 1000 500"
            className="world-map-svg"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Interactive world map of Swami Ji's consultation tours"
          >
            <defs>
              <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2A0B12" />
                <stop offset="100%" stopColor="#1B060B" />
              </radialGradient>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(196, 154, 69, 0.07)" strokeWidth="0.5" />
              </pattern>
              {/* Gold beacon pulse filter */}
              <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ocean background */}
            <rect width="1000" height="500" fill="url(#oceanGlow)" />
            <rect width="1000" height="500" fill="url(#gridPattern)" />

            {/* Stylized Minimal Continental Outlines (Sacred Parchment Gold Silhouette) */}
            <g className="world-continents" fill="rgba(227, 204, 154, 0.12)" stroke="rgba(196, 154, 69, 0.35)" strokeWidth="0.8">
              {/* North America */}
              <path d="M 120 70 Q 180 50 250 80 Q 290 120 270 170 Q 240 210 200 240 Q 150 230 110 180 Q 80 120 120 70 Z" />
              <path d="M 200 240 Q 220 270 230 310 Q 190 300 170 260 Z" />
              {/* South America */}
              <path d="M 230 300 Q 290 310 320 360 Q 300 450 260 480 Q 220 440 210 370 Q 210 330 230 300 Z" />
              {/* Europe */}
              <path d="M 460 70 Q 530 60 560 110 Q 530 160 480 170 Q 440 140 450 100 Z" />
              {/* Africa */}
              <path d="M 460 180 Q 540 170 560 230 Q 560 320 520 390 Q 470 380 440 300 Q 420 230 460 180 Z" />
              {/* Asia & India Heartland */}
              <path d="M 560 70 Q 750 50 860 120 Q 870 220 800 280 Q 720 270 680 220 Q 640 260 610 230 Q 570 170 560 70 Z" />
              {/* India Subcontinent Focus */}
              <path d="M 670 190 Q 720 210 710 280 Q 680 320 670 300 Q 650 250 670 190 Z" fill="rgba(196, 154, 69, 0.22)" stroke="var(--color-secondary)" strokeWidth="1.2" />
              {/* Australia */}
              <path d="M 800 340 Q 890 330 910 380 Q 890 440 820 430 Q 780 390 800 340 Z" />
            </g>

            {/* Travel Flight Paths Connecting Sacred Heartland (India) to Global Cities */}
            <g className="map-travel-routes" stroke="rgba(196, 154, 69, 0.4)" strokeWidth="1" strokeDasharray="3 3">
              {filteredVisits.map((v, i) => {
                // Sacred center (India / Vaitheeswaran Koil ~ 715, 260)
                const centerPoint = { x: 715, y: 260 };
                const midX = (centerPoint.x + v.svgX) / 2;
                const midY = (centerPoint.y + v.svgY) / 2 - 35; // arc curve
                return (
                  <path
                    key={`route-${v.id || i}`}
                    d={`M ${centerPoint.x} ${centerPoint.y} Q ${midX} ${midY} ${v.svgX} ${v.svgY}`}
                    fill="none"
                    opacity="0.6"
                  />
                );
              })}
            </g>

            {/* Sacred Heartland Sanctum Marker */}
            <g transform="translate(715, 260)">
              <circle r="14" fill="rgba(196, 154, 69, 0.25)" className="pulse-aura" />
              <circle r="7" fill="var(--color-secondary)" filter="url(#goldGlow)" />
              <circle r="2" fill="#FFF9EF" />
              <text y="-14" textAnchor="middle" fill="var(--color-accent)" fontSize="9" fontWeight="700" letterSpacing="0.05em">
                Vaitheeswaran Koil (Sacred Archive)
              </text>
            </g>

            {/* Interactive City Visit Markers */}
            {filteredVisits.map((v) => {
              const isSelected = selectedVisit && selectedVisit.id === v.id;
              return (
                <g
                  key={v.id}
                  transform={`translate(${v.svgX}, ${v.svgY})`}
                  className={`map-city-marker ${isSelected ? 'marker-selected' : ''}`}
                  onClick={() => setSelectedVisit(v)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer pulsing ring for upcoming/active tours */}
                  {v.isUpcoming && (
                    <circle
                      r="16"
                      fill="none"
                      stroke={v.isBookingOpen ? '#C49A45' : '#E3CC9A'}
                      strokeWidth="1.2"
                      className="city-pulse-ring"
                    />
                  )}

                  {/* Core marker circle */}
                  <circle
                    r={isSelected ? 9 : 6}
                    fill={isSelected ? '#C49A45' : (v.isUpcoming ? '#E3CC9A' : 'rgba(227, 204, 154, 0.6)')}
                    stroke="#521520"
                    strokeWidth="2"
                    filter="url(#goldGlow)"
                  />

                  <circle r="2.5" fill="#521520" />

                  {/* City label */}
                  <text
                    y="18"
                    textAnchor="middle"
                    fill={isSelected ? '#FFF9EF' : 'rgba(255, 249, 239, 0.9)'}
                    fontSize={isSelected ? '10' : '8.5'}
                    fontWeight={isSelected ? '700' : '500'}
                    fontFamily="var(--font-sans)"
                    className="map-marker-text"
                  >
                    {v.city}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Overlay Badge */}
          <div className="map-badge-overlay">
            <Sparkles size={14} />
            <span>Swami Ji Global Darshan Route</span>
          </div>
        </div>

        {/* Selected City Visit Detail Popover / Card */}
        <div className="map-detail-panel">
          {selectedVisit ? (
            <div className="visit-preview-card">
              <div className="preview-header">
                <span className="preview-location-badge">
                  <MapPin size={14} />
                  <span>{selectedVisit.city}, {selectedVisit.country}</span>
                </span>
                {selectedVisit.isBookingOpen ? (
                  <span className="status-badge open">
                    <CheckCircle2 size={12} />
                    <span>Booking Open</span>
                  </span>
                ) : (
                  <span className="status-badge full">
                    <span>Inquiry Only</span>
                  </span>
                )}
              </div>

              <h3 className="preview-title">{selectedVisit.title}</h3>

              <div className="preview-meta-list">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>
                    {formatDate(selectedVisit.startDate)} — {formatDate(selectedVisit.endDate)}
                  </span>
                </div>
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{selectedVisit.venueName || 'Sacred Private Sanctuary'}</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>Timezone: {selectedVisit.timezone || 'Asia/Kolkata'}</span>
                </div>
              </div>

              {selectedVisit.notes && (
                <p className="preview-notes">
                  "{selectedVisit.notes}"
                </p>
              )}

              <div className="preview-availability-box">
                <div className="avail-count">
                  {selectedVisit.availableSlotsCount !== undefined && selectedVisit.availableSlotsCount > 0 ? (
                    <span className="avail-slots-badge">
                      {selectedVisit.availableSlotsCount} Slot(s) Currently Available
                    </span>
                  ) : (
                    <span className="avail-request-badge">
                      Request-based Darshan Appointments
                    </span>
                  )}
                </div>
              </div>

              <div className="preview-actions">
                <Link
                  to={`/book?visit=${selectedVisit.id}`}
                  className="btn btn-luxury btn-block"
                >
                  <Calendar size={16} />
                  <span>Book Appointment in {selectedVisit.city}</span>
                </Link>
                <Link
                  to={`/upcoming-visits/${selectedVisit.id}`}
                  className="btn btn-outline-gold btn-block"
                >
                  <span>View Full Tour Details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="map-empty-selection">
              <MapPin size={32} color="var(--color-secondary)" />
              <h4>Select a City on the Map</h4>
              <p>Click on any pulsing golden marker to inspect Swami Ji’s schedule, venue details, and appointment openings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
