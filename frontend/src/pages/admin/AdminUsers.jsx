import React, { useEffect, useState } from 'react';
import { Users, Shield, UserCheck } from 'lucide-react';
import api from '../../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/admin/users').catch(() => ({ data: [] })),
      api.get('/admin/roles').catch(() => ({ data: [] })),
    ])
      .then(([uRes, rRes]) => {
        if (uRes.success) setUsers(uRes.data || []);
        if (rRes.success) setRoles(rRes.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Administrative Users & Role-Based Access (RBAC)</h1>
          <p>
            Configured administrative accounts and assigned operational authorities.
          </p>
        </div>
      </div>

      <div className="table-container" style={{ marginBottom: 'var(--space-10)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Assigned Role</th>
              <th>Status</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</td>
              </tr>
            ) : users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td><strong>{u.fullName}</strong></td>
                  <td>{u.email}</td>
                  <td>
                    <span className="badge badge-info">{u.role?.displayName || u.role?.name}</span>
                  </td>
                  <td>
                    <span className={`badge ${u.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {u.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td>{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never logged in'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: '1.35rem', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>Configured System Roles</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
        {roles.map((r) => (
          <div key={r.id} style={{ background: 'var(--color-white)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Shield size={18} color="var(--color-secondary-dark)" />
              <strong style={{ color: 'var(--color-primary)' }}>{r.displayName}</strong>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{r.name}</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '8px 0 0 0' }}>{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
