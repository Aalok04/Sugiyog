import React, { useEffect, useState } from 'react';
import { Plus, Clock, MapPin, Globe, Trash2, ShieldAlert } from 'lucide-react';
import api from '../../services/api';

export default function ManageAvailability() {
  const [slots, setSlots] = useState([]);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [newSlot, setNewSlot] = useState({
    slotType: 'ONLINE',
    travelVisitId: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: 1,
    notes: '',
  });

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.get('/availability/admin/all').catch(() => ({ data: [] })),
      api.get('/travel-visits/admin/all').catch(() => ({ data: [] })),
    ])
      .then(([sRes, vRes]) => {
        if (sRes.success) setSlots(sRes.data || []);
        if (vRes.success) setVisits(vRes.data || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    try {
      // Build ISO Date strings for Start and End time
      const startDateTime = new Date(`${newSlot.date}T${newSlot.startTime}`);
      const endDateTime = new Date(`${newSlot.date}T${newSlot.endTime}`);

      const payload = {
        slotType: newSlot.slotType,
        travelVisitId: newSlot.slotType === 'IN_PERSON' ? newSlot.travelVisitId : null,
        date: new Date(newSlot.date),
        startTime: startDateTime,
        endTime: endDateTime,
        capacity: parseInt(newSlot.capacity, 10) || 1,
        notes: newSlot.notes,
      };

      const res = await api.post('/availability/admin', payload);
      if (res.success) {
        setShowModal(false);
        loadData();
      }
    } catch (err) {
      alert(err.message || 'Failed to create slot');
    }
  };

  const handleToggleBlock = async (slot) => {
    try {
      await api.put(`/availability/admin/${slot.id}`, {
        isBlocked: !slot.isBlocked,
        status: !slot.isBlocked ? 'BLOCKED' : 'AVAILABLE',
      });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to update slot');
    }
  };

  const handleDeleteSlot = async (id) => {
    if (!window.confirm('Delete this availability slot?')) return;
    try {
      await api.delete(`/availability/admin/${id}`);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to delete slot');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>Manage Appointment Availability Slots</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Control Swami Ji’s consultation hours, slot capacities, and blackout periods.
          </p>
        </div>
        <button type="button" onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} />
          <span>Add Availability Slot</span>
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time Window</th>
              <th>Type</th>
              <th>City Visit Association</th>
              <th>Capacity / Booked</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading slots...</td>
              </tr>
            ) : slots.length > 0 ? (
              slots.map((s) => (
                <tr key={s.id}>
                  <td><strong>{new Date(s.date).toLocaleDateString()}</strong></td>
                  <td>
                    {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
                    {new Date(s.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    <span className={`badge ${s.slotType === 'ONLINE' ? 'badge-info' : 'badge-warning'}`}>
                      {s.slotType}
                    </span>
                  </td>
                  <td>{s.travelVisit ? `${s.travelVisit.city} (${s.travelVisit.title})` : 'Standalone (Online)'}</td>
                  <td>
                    <strong>{s.bookedCount}</strong> / {s.capacity}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        s.isBlocked
                          ? 'badge-danger'
                          : s.status === 'AVAILABLE'
                          ? 'badge-success'
                          : 'badge-warning'
                      }`}
                    >
                      {s.isBlocked ? 'BLOCKED' : s.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => handleToggleBlock(s)}
                        className={`btn btn-sm ${s.isBlocked ? 'btn-secondary' : 'btn-outline'}`}
                      >
                        {s.isBlocked ? 'Unblock' : 'Block Slot'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSlot(s.id)}
                        className="btn btn-text btn-sm"
                        style={{ color: 'var(--color-danger)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No slots configured yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Slot Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 540, padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>Create Appointment Slot</h2>
            <form onSubmit={handleCreateSlot}>
              <div className="form-group">
                <label className="form-label">Slot Type *</label>
                <select
                  className="form-select"
                  value={newSlot.slotType}
                  onChange={(e) => setNewSlot({ ...newSlot, slotType: e.target.value })}
                >
                  <option value="ONLINE">Online Global Video</option>
                  <option value="IN_PERSON">In-Person City Visit</option>
                </select>
              </div>

              {newSlot.slotType === 'IN_PERSON' && (
                <div className="form-group">
                  <label className="form-label">Associate with Tour Visit *</label>
                  <select
                    className="form-select"
                    value={newSlot.travelVisitId}
                    onChange={(e) => setNewSlot({ ...newSlot, travelVisitId: e.target.value })}
                    required
                  >
                    <option value="">-- Select Visit --</option>
                    {visits.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.city}, {v.country} ({v.title})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={newSlot.date}
                  onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Start Time *</label>
                  <input
                    type="time"
                    className="form-input"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Time *</label>
                  <input
                    type="time"
                    className="form-input"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Capacity (Number of Seekers)</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={newSlot.capacity}
                  onChange={(e) => setNewSlot({ ...newSlot, capacity: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
