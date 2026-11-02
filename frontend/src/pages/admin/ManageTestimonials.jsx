import React, { useEffect, useState } from 'react';
import { Star, CheckCircle, XCircle } from 'lucide-react';
import api from '../../services/api';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    api
      .get('/testimonials/admin/all')
      .then((res) => {
        if (res.success) setTestimonials(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleApprove = async (t) => {
    try {
      await api.put(`/testimonials/admin/${t.id}`, {
        isApproved: !t.isApproved,
      });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to update approval');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>Manage Testimonials</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Review, approve, and curate seeker reflections for public display.
        </p>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Seeker Name</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Quote</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading testimonials...</td>
              </tr>
            ) : testimonials.length > 0 ? (
              testimonials.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.clientName}</strong></td>
                  <td>{t.clientLocation}</td>
                  <td>{t.rating} / 5</td>
                  <td style={{ maxWidth: 300, fontStyle: 'italic' }}>"{t.quote}"</td>
                  <td>
                    <span className={`badge ${t.isApproved ? 'badge-success' : 'badge-warning'}`}>
                      {t.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleToggleApprove(t)}
                      className={`btn btn-sm ${t.isApproved ? 'btn-outline' : 'btn-primary'}`}
                    >
                      {t.isApproved ? 'Unapprove' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No testimonials submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
