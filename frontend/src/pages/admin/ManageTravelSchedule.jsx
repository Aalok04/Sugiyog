import React, { useEffect, useState } from 'react';
import { Plus, Compass, MapPin, Calendar, Check, X, Edit, Trash2 } from 'lucide-react';
import api from '../../services/api';

export default function ManageTravelSchedule() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newVisit, setNewVisit] = useState({
    title: '',
    country: 'India',
    city: '',
    venueName: '',
    venueAddress: '',
    venueMapsUrl: '',
    isVenuePrivate: false,
    startDate: '',
    endDate: '',
    timezone: 'Asia/Kolkata',
    status: 'DRAFT',
    isPublic: false,
    isBookingOpen: false,
    maxCapacity: 50,
    notes: '',
  });

  const loadVisits = () => {
    setLoading(true);
    api
      .get('/travel-visits/admin/all')
      .then((res) => {
        if (res.success) setVisits(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadVisits();
  }, []);

  const handleCreateVisit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/travel-visits/admin', newVisit);
      if (res.success) {
        setShowModal(false);
        loadVisits();
      }
    } catch (err) {
      alert(err.message || 'Failed to create travel visit');
    }
  };

  const handleToggleBooking = async (visit) => {
    try {
      await api.put(`/travel-visits/admin/${visit.id}`, {
        isBookingOpen: !visit.isBookingOpen,
      });
      loadVisits();
    } catch (err) {
      alert(err.message || 'Failed to update visit status');
    }
  };

  const handleTogglePublish = async (visit) => {
    try {
      await api.put(`/travel-visits/admin/${visit.id}`, {
        isPublic: !visit.isPublic,
        status: !visit.isPublic ? 'PUBLISHED' : 'DRAFT',
      });
      loadVisits();
    } catch (err) {
      alert(err.message || 'Failed to update visibility');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Manage Travel Schedule & City Visits</h1>
          <p>
            Swami Ji's Assistant secretariat controls for itineraries, city stops, and appointment capacity.
          </p>
        </div>
        <button type="button" onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} />
          <span>Add New City Visit</span>
        </button>
      </div>

      {/* Visits Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tour City & Title</th>
              <th>Country</th>
              <th>Dates</th>
              <th>Venue Privacy</th>
              <th>Status</th>
              <th>Public Visibility</th>
              <th>Bookings Open</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>Loading visits...</td>
              </tr>
            ) : visits.length > 0 ? (
              visits.map((v) => (
                <tr key={v.id}>
                  <td>
                    <strong>{v.city}</strong> — {v.title}
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{v.venueName || 'Venue pending'}</div>
                  </td>
                  <td>{v.country}</td>
                  <td>
                    {new Date(v.startDate).toLocaleDateString()} – {new Date(v.endDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`badge ${v.isVenuePrivate ? 'badge-warning' : 'badge-info'}`}>
                      {v.isVenuePrivate ? 'Private' : 'Disclosed'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${v.status === 'PUBLISHED' ? 'badge-success' : 'badge-warning'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(v)}
                      className={`btn btn-sm ${v.isPublic ? 'btn-secondary' : 'btn-outline'}`}
                    >
                      {v.isPublic ? 'Published' : 'Hidden / Draft'}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleToggleBooking(v)}
                      className={`btn btn-sm ${v.isBookingOpen ? 'btn-primary' : 'btn-outline'}`}
                    >
                      {v.isBookingOpen ? 'Open' : 'Closed'}
                    </button>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {v._count?.slots || 0} Slots
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No travel visits created yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for creating a new visit */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 640, padding: 'var(--space-8)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>Create New Travel Visit</h2>
            <form onSubmit={handleCreateVisit}>
              <div className="form-group">
                <label className="form-label">Tour Title / Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Swami Ji Spiritual Tour - Mumbai"
                  value={newVisit.title}
                  onChange={(e) => setNewVisit({ ...newVisit, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Country *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newVisit.country}
                    onChange={(e) => setNewVisit({ ...newVisit, country: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newVisit.city}
                    onChange={(e) => setNewVisit({ ...newVisit, city: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Arrival Date *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newVisit.startDate}
                    onChange={(e) => setNewVisit({ ...newVisit, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Departure Date *</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newVisit.endDate}
                    onChange={(e) => setNewVisit({ ...newVisit, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Venue Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Radisson Blu Convention Centre"
                  value={newVisit.venueName}
                  onChange={(e) => setNewVisit({ ...newVisit, venueName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Venue Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={newVisit.venueAddress}
                  onChange={(e) => setNewVisit({ ...newVisit, venueAddress: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newVisit.isVenuePrivate}
                    onChange={(e) => setNewVisit({ ...newVisit, isVenuePrivate: e.target.checked })}
                  />
                  <span>Private Venue (Hide full address until booking is confirmed)</span>
                </label>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newVisit.isPublic}
                    onChange={(e) => setNewVisit({ ...newVisit, isPublic: e.target.checked, status: e.target.checked ? 'PUBLISHED' : 'DRAFT' })}
                  />
                  <span>Publish to Public Website Immediately</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save City Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
