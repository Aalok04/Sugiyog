import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, adminUser } = useAuth();

  const [email, setEmail] = useState('superadmin@sugiyog.org');
  const [password, setPassword] = useState('SugiyogAdmin@2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (adminUser) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid administrative credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #F4E8D4 0%, #FFF9EF 70%)', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 440, background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', padding: 'var(--space-8)', boxShadow: '0 12px 32px rgba(53, 37, 30, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div className="brand-symbol" style={{ margin: '0 auto var(--space-3) auto', width: 48, height: 48, fontSize: '1.5rem' }}>
            सु
          </div>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary)' }}>Admin & Assistant Portal</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Sign in to manage Swami Ji’s schedule & bookings</p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', background: 'var(--color-danger-bg)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <Mail size={16} /> Official Email
            </label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={16} /> Password
            </label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
            style={{ marginTop: 'var(--space-4)' }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: 4 }}>Development Seed Accounts:</strong>
          <div>• <strong>Super Admin:</strong> superadmin@sugiyog.org / SugiyogAdmin@2026</div>
          <div>• <strong>Swami Ji Assistant:</strong> assistant@sugiyog.org / AssistantSugiyog@2026</div>
        </div>
      </div>
    </div>
  );
}
