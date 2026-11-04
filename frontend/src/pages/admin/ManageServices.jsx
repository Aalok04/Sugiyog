import React, { useEffect, useState } from 'react';
import { Plus, Layers, Edit, Trash2 } from 'lucide-react';
import api from '../../services/api';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    durationMinutes: 45,
    price: 3500,
    currency: 'INR',
    isOnlineSupported: true,
    isInPersonSupported: true,
    displayOrder: 1,
  });

  const loadServices = () => {
    setLoading(true);
    api
      .get('/services/admin/all')
      .then((res) => {
        if (res.success) setServices(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services/admin', newService);
      setShowModal(false);
      loadServices();
    } catch (err) {
      alert(err.message || 'Failed to create service');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Manage Consultation Offerings</h1>
          <p>
            Configure Nadi Shastra reading chapters, duration times, and dakshina fees.
          </p>
        </div>
        <button type="button" onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} />
          <span>Add Consultation Service</span>
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title & Slug</th>
              <th>Duration</th>
              <th>Fee / Dakshina</th>
              <th>Supported Modes</th>
              <th>Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>Loading services...</td>
              </tr>
            ) : services.length > 0 ? (
              services.map((svc) => (
                <tr key={svc.id}>
                  <td>
                    <strong>{svc.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>/{svc.slug}</div>
                  </td>
                  <td>{svc.durationMinutes} mins</td>
                  <td>
                    <strong>₹{parseFloat(svc.price).toLocaleString('en-IN')}</strong> {svc.currency}
                  </td>
                  <td>
                    {svc.isOnlineSupported && <span className="badge badge-info" style={{ marginRight: 4 }}>Online</span>}
                    {svc.isInPersonSupported && <span className="badge badge-warning">In-Person</span>}
                  </td>
                  <td>{svc.displayOrder}</td>
                  <td>
                    <span className={`badge ${svc.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {svc.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No consultation services listed.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 580, padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>New Consultation Chapter</h2>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Service Title *</label>
                <input
                  type="text"
                  className="form-input"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">URL Slug *</label>
                <input
                  type="text"
                  className="form-input"
                  value={newService.slug}
                  onChange={(e) => setNewService({ ...newService, slug: e.target.value })}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Fee Amount (₹) *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Duration (Minutes) *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newService.durationMinutes}
                    onChange={(e) => setNewService({ ...newService, durationMinutes: parseInt(e.target.value, 10) })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Summary</label>
                <input
                  type="text"
                  className="form-input"
                  value={newService.shortDescription}
                  onChange={(e) => setNewService({ ...newService, shortDescription: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
