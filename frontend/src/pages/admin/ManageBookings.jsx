import React, { useEffect, useState } from 'react';
import { Calendar, User, Phone, Mail, Clock, Check, X, Link as LinkIcon, Edit } from 'lucide-react';
import api from '../../services/api';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [activeBooking, setActiveBooking] = useState(null);

  const [editStatus, setEditStatus] = useState('CONFIRMED');
  const [meetingLink, setMeetingLink] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  const loadBookings = () => {
    setLoading(true);
    const params = {};
    if (filterStatus) params.status = filterStatus;

    api
      .get('/bookings/admin/all', { params })
      .then((res) => {
        if (res.success && res.data) setBookings(res.data.bookings || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, [filterStatus]);

  const handleOpenEdit = (b) => {
    setActiveBooking(b);
    setEditStatus(b.status);
    setMeetingLink(b.meetingLink || '');
    setInternalNotes(b.internalAdminNotes || '');
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/bookings/admin/${activeBooking.id}/status`, {
        status: editStatus,
        meetingLink,
        internalAdminNotes: internalNotes,
      });
      setActiveBooking(null);
      loadBookings();
    } catch (err) {
      alert(err.message || 'Failed to update booking status');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>Manage Bookings & Seeker Requests</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Review incoming requests, verify palm leaf requirements, issue meeting links, and confirm appointments.
          </p>
        </div>

        <div>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: 180 }}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="RESCHEDULED">RESCHEDULED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Booking Ref</th>
              <th>Seeker Info</th>
              <th>Service</th>
              <th>Format</th>
              <th>Date / Time</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading bookings...</td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {b.bookingNumber}
                  </td>
                  <td>
                    <strong>{b.user?.fullName}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{b.user?.email}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{b.user?.phone}</div>
                  </td>
                  <td>{b.service?.title}</td>
                  <td>
                    <span className={`badge ${b.consultationFormat === 'ONLINE' ? 'badge-info' : 'badge-warning'}`}>
                      {b.consultationFormat}
                    </span>
                  </td>
                  <td>
                    {b.scheduledDate ? (
                      <div>
                        <div>{new Date(b.scheduledDate).toLocaleDateString()}</div>
                        {b.scheduledStartTime && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            {new Date(b.scheduledStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        Requested: {b.preferredDates || 'Unscheduled'}
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{b.bookingType}</span>
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
                  <td>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(b)}
                      className="btn btn-outline btn-sm"
                    >
                      <Edit size={14} />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No bookings matching criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Booking Modal */}
      {activeBooking && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 580, padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: 4 }}>
              Booking: {activeBooking.bookingNumber}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
              Seeker: {activeBooking.user?.fullName} ({activeBooking.user?.email})
            </p>

            {activeBooking.clientNotes && (
              <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', fontSize: '0.85rem' }}>
                <strong>Seeker's Notes:</strong> {activeBooking.clientNotes}
              </div>
            )}

            <form onSubmit={handleSaveUpdate}>
              <div className="form-group">
                <label className="form-label">Update Booking Status *</label>
                <select
                  className="form-select"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="RESCHEDULED">RESCHEDULED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Online Video Meeting Link (Zoom / Meet)</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://meet.google.com/..."
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Internal Secretariat Notes</label>
                <textarea
                  className="form-textarea"
                  placeholder="Palm leaf bundle ID, translator assigned, notes..."
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button type="button" onClick={() => setActiveBooking(null)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
