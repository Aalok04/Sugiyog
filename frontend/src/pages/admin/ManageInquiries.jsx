import React, { useEffect, useState } from 'react';
import { MessageSquare, Mail, Phone, CheckCircle } from 'lucide-react';
import api from '../../services/api';

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInquiries = () => {
    setLoading(true);
    api
      .get('/inquiries/admin/all')
      .then((res) => {
        if (res.success) setInquiries(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/inquiries/admin/${id}`, { status });
      loadInquiries();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Manage Seeker Inquiries</h1>
          <p>
            Contact form submissions and travel tour notices submitted by public seekers.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Seeker Name</th>
              <th>Contact Info</th>
              <th>Subject & Message</th>
              <th>Status</th>
              <th>Received</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading inquiries...</td>
              </tr>
            ) : inquiries.length > 0 ? (
              inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td><strong>{inq.fullName}</strong></td>
                  <td>
                    <div>{inq.email}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{inq.phone}</div>
                  </td>
                  <td style={{ maxWidth: 320 }}>
                    <strong>{inq.subject}</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{inq.message}</p>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        inq.status === 'NEW'
                          ? 'badge-warning'
                          : inq.status === 'RESOLVED'
                          ? 'badge-success'
                          : 'badge-info'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {inq.status !== 'RESOLVED' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(inq.id, 'RESOLVED')}
                          className="btn btn-primary btn-sm"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No seeker inquiries received.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
