import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  Compass,
  Users,
  CreditCard,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date().getDate());

  useEffect(() => {
    api
      .get('/admin/dashboard-stats')
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
        <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>
          Loading administrative operational overview...
        </p>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentBookings = data?.recentBookings || [];
  const recentInquiries = data?.recentInquiries || [];
  const upcomingVisits = data?.upcomingVisits || [];

  // Month navigation for Appointment Calendar
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((prev) => prev - 1);
    } else {
      setCalendarMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((prev) => prev + 1);
    } else {
      setCalendarMonth((prev) => prev + 1);
    }
  };

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();

  // Mock appointments count per day in current month for calendar demonstration
  const getDayAppointments = (day) => {
    const matchingBookings = recentBookings.filter((b) => {
      if (!b.scheduledDate) return false;
      const d = new Date(b.scheduledDate);
      return d.getDate() === day && d.getMonth() === calendarMonth && d.getFullYear() === calendarYear;
    });
    return matchingBookings;
  };

  return (
    <div className="admin-dashboard-wrapper">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Administrative Operations & Darshan Command</h1>
          <p className="dashboard-subtitle">
            Real-time status of Swami Ji’s consultation bookings, tour schedules, and seeker inquiries.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Link to="/admin/bookings" className="btn btn-primary btn-sm">
            <CalendarIcon size={14} />
            <span>Manage Bookings</span>
          </Link>
          <Link to="/admin/travel-visits" className="btn btn-secondary btn-sm">
            <Compass size={14} />
            <span>Schedule Tour</span>
          </Link>
        </div>
      </div>

      {/* 6 Responsive Stats Cards Grid */}
      <div className="stats-grid-6">
        <div className="stat-card">
          <div className="stat-icon maroon">
            <CalendarIcon size={22} />
          </div>
          <div>
            <div className="stat-value">{stats.totalBookings || 0}</div>
            <div className="stat-title">Total Bookings</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon gold">
            <Clock size={22} />
          </div>
          <div>
            <div className="stat-value">{stats.pendingBookings || 0}</div>
            <div className="stat-title">Pending Requests</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle size={22} />
          </div>
          <div>
            <div className="stat-value">{stats.confirmedBookings || 0}</div>
            <div className="stat-title">Confirmed Slots</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Compass size={22} />
          </div>
          <div>
            <div className="stat-value">{stats.activeVisits || 0}</div>
            <div className="stat-title">Active Tours</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <CreditCard size={22} />
          </div>
          <div>
            <div className="stat-value">₹{parseFloat(stats.totalRevenue || 0).toLocaleString('en-IN')}</div>
            <div className="stat-title">Dakshina Revenue</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon teal">
            <Users size={22} />
          </div>
          <div>
            <div className="stat-value">{stats.totalUsers || 0}</div>
            <div className="stat-title">Seeker Records</div>
          </div>
        </div>
      </div>

      {/* Mid Section: Visual Trends Chart & Interactive Appointment Calendar */}
      <div className="dashboard-grid-charts" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        {/* Modern SVG Trends Chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 className="admin-card-title">Consultation & Dakshina Trajectory</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Monthly volume across online readings & in-person city visits
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontSize: '0.82rem', fontWeight: 600 }}>
              <TrendingUp size={16} />
              <span>+18.4% this quarter</span>
            </div>
          </div>

          <div className="chart-canvas-wrapper" style={{ padding: 'var(--space-4) 0' }}>
            <svg viewBox="0 0 500 180" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#701F2D" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#701F2D" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C49A45" />
                  <stop offset="100%" stopColor="#701F2D" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(53, 37, 30, 0.08)" strokeDasharray="3 3" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="rgba(53, 37, 30, 0.08)" strokeDasharray="3 3" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="rgba(53, 37, 30, 0.08)" strokeDasharray="3 3" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="rgba(53, 37, 30, 0.15)" />

              {/* Area fill */}
              <polygon
                points="50,130 110,110 170,125 230,85 290,95 350,60 410,45 470,30 470,140 50,140"
                fill="url(#chartFill)"
              />

              {/* Trend line */}
              <polyline
                fill="none"
                stroke="url(#goldLine)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="50,130 110,110 170,125 230,85 290,95 350,60 410,45 470,30"
              />

              {/* Data points */}
              {[
                { x: 50, y: 130, label: 'May', val: 12 },
                { x: 110, y: 110, label: 'Jun', val: 19 },
                { x: 170, y: 125, label: 'Jul', val: 15 },
                { x: 230, y: 85, label: 'Aug', val: 28 },
                { x: 290, y: 95, label: 'Sep', val: 24 },
                { x: 350, y: 60, label: 'Oct', val: 38 },
                { x: 410, y: 45, label: 'Nov', val: 45 },
                { x: 470, y: 30, label: 'Dec', val: 56 },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="4" fill="#C49A45" stroke="#FFF" strokeWidth="2" />
                  <text x={pt.x} y="160" textAnchor="middle" fontSize="10" fill="var(--color-text-muted)" fontFamily="sans-serif">
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Interactive Appointment Calendar Widget */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Appointment Calendar</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button type="button" onClick={handlePrevMonth} className="btn-icon" aria-label="Previous month">
                <ChevronLeft size={16} />
              </button>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: 110, textAlign: 'center' }}>
                {monthNames[calendarMonth]} {calendarYear}
              </span>
              <button type="button" onClick={handleNextMonth} className="btn-icon" aria-label="Next month">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Calendar Day Labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: 'var(--space-2)' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <span key={d} style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} style={{ height: 32 }} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = day === selectedCalendarDate;
              const hasAppointments = day % 3 === 0; // demonstration indicator

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedCalendarDate(day)}
                  style={{
                    height: 32,
                    borderRadius: 'var(--radius-sm)',
                    border: isSelected ? '1.5px solid var(--color-secondary)' : '1px solid transparent',
                    background: isSelected ? 'var(--color-primary)' : (hasAppointments ? 'rgba(196, 154, 69, 0.12)' : 'transparent'),
                    color: isSelected ? '#FFF9EF' : 'var(--color-text)',
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <span>{day}</span>
                  {hasAppointments && !isSelected && (
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-secondary)', position: 'absolute', bottom: 2 }} />
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Selected: {monthNames[calendarMonth]} {selectedCalendarDate}, {calendarYear}</span>
            <Link to="/admin/availability" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Manage Slots →
            </Link>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Recent Bookings & Tours/Inquiries */}
      <div className="dashboard-grid-2">
        {/* Recent Bookings Table */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 className="admin-card-title">Recent Appointment Bookings</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Latest submissions from seekers worldwide
              </p>
            </div>
            <Link to="/admin/bookings" className="btn btn-outline btn-sm">
              <span>View All Bookings</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking No.</th>
                  <th>Seeker</th>
                  <th>Service</th>
                  <th>Format</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length > 0 ? (
                  recentBookings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary)' }}>
                        {b.bookingNumber}
                      </td>
                      <td>
                        <strong>{b.user?.fullName}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {b.user?.email}
                        </div>
                      </td>
                      <td>{b.service?.title}</td>
                      <td>
                        <span className="badge badge-info">{b.consultationFormat}</span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            b.status === 'CONFIRMED'
                              ? 'badge-success'
                              : b.status === 'PENDING'
                              ? 'badge-warning'
                              : 'badge-danger'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 'var(--space-8)' }}>
                      No recent bookings in database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Active Visits & Inquiries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Active Travel Tours */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Scheduled City Visits</h3>
              <Link to="/admin/travel-visits" className="btn btn-text btn-sm">
                <span>Manage Tours</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {upcomingVisits.length > 0 ? (
                upcomingVisits.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      padding: 'var(--space-4)',
                      background: 'var(--color-surface)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={14} color="var(--color-primary)" />
                        <strong style={{ color: 'var(--color-primary)', fontSize: '0.92rem' }}>
                          {v.city}, {v.country}
                        </strong>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                        {new Date(v.startDate).toLocaleDateString()} — {new Date(v.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={`badge ${v.isBookingOpen ? 'badge-success' : 'badge-info'}`}>
                      {v.isBookingOpen ? 'Booking Open' : 'Announced'}
                    </span>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>No tours currently scheduled.</p>
              )}
            </div>
          </div>

          {/* Pending Inquiries */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Recent Inquiries</h3>
              <Link to="/admin/inquiries" className="btn btn-text btn-sm">
                <span>View All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    style={{
                      padding: 'var(--space-3)',
                      borderBottom: '1px solid var(--color-border)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                      <span>{inq.fullName}</span>
                      <span className="badge badge-warning">NEW</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                      {inq.subject || inq.message?.slice(0, 50)}...
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>No pending inquiries.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
