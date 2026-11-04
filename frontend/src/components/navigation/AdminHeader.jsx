import React from 'react';
import { LogOut, ExternalLink, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminHeader({ title, sidebarOpen, onToggleSidebar }) {
  const { adminUser, logout } = useAuth();

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <button
          type="button"
          className="admin-mobile-toggle-btn"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h2 className="admin-topbar-title">{title || 'Administration'}</h2>
      </div>

      <div className="admin-topbar-user">
        <Link to="/" target="_blank" className="btn btn-outline btn-sm admin-topbar-site-link" title="View live public site">
          <ExternalLink size={14} />
          <span>View Site</span>
        </Link>

        <div className="admin-user-info">
          <span className="admin-user-name">{adminUser?.fullName || 'Administrator'}</span>
          <span className="admin-user-role">{adminUser?.roleDisplayName || adminUser?.role}</span>
        </div>

        <button type="button" onClick={logout} className="btn btn-outline btn-sm admin-topbar-logout-btn" title="Sign out">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
