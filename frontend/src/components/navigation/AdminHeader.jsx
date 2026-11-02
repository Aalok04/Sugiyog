import React from 'react';
import { LogOut, User, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminHeader({ title }) {
  const { adminUser, logout } = useAuth();

  return (
    <header className="admin-topbar">
      <h2 className="admin-topbar-title">{title || 'Administration'}</h2>

      <div className="admin-topbar-user">
        <Link to="/" target="_blank" className="btn btn-outline btn-sm" title="View live public site">
          <ExternalLink size={14} />
          <span>View Site</span>
        </Link>

        <div className="admin-user-info">
          <span className="admin-user-name">{adminUser?.fullName || 'Administrator'}</span>
          <span className="admin-user-role">{adminUser?.roleDisplayName || adminUser?.role}</span>
        </div>

        <button type="button" onClick={logout} className="btn btn-outline btn-sm" title="Sign out">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
