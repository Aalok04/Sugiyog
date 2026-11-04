import React, { useEffect, useState } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';
import api from '../../services/api';

export default function AdminSettings() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api
      .get('/settings/admin/all')
      .then((res) => {
        if (res.success) setSettings(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (key, val) => {
    try {
      await api.post('/settings/admin', { key, value: val });
      setSuccess(`Setting '${key}' saved.`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      alert(err.message || 'Failed to update setting');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Platform Configuration & Settings</h1>
          <p>
            Site metadata, official contact details, and booking policies.
          </p>
        </div>
      </div>

      {success && (
        <div style={{ padding: '0.75rem', background: 'var(--color-success-bg)', color: 'var(--color-success)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {loading ? (
          <p>Loading settings...</p>
        ) : settings.length > 0 ? (
          settings.map((s) => (
            <div key={s.id} className="admin-card">
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: 4 }}>{s.key}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>{s.description}</p>
              <textarea
                className="form-textarea"
                defaultValue={s.value}
                id={`setting-${s.key}`}
                style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
              />
              <div style={{ marginTop: 'var(--space-3)', textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`setting-${s.key}`);
                    if (el) handleUpdate(s.key, el.value);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Save size={14} />
                  <span>Update {s.key}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No settings configured.</p>
        )}
      </div>
    </div>
  );
}
