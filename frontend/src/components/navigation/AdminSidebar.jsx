import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Compass,
  FileText,
  CreditCard,
  MessageSquare,
  Sparkles,
  Users,
  Settings,
  ShieldAlert,
  Image,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar() {
  const { adminUser } = useAuth();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="brand-symbol">सु</div>
        <div>
          <div className="admin-sidebar-logo">SUGIYOG</div>
          <div className="admin-sidebar-role">{adminUser?.roleDisplayName || 'Admin Portal'}</div>
        </div>
      </div>

      <nav className="admin-nav">
        <div className="admin-nav-section-title">Operations</div>
        <NavLink to="/admin/dashboard" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/travel-visits" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <Compass size={18} />
          <span>City Visits & Tours</span>
        </NavLink>
        <NavLink to="/admin/availability" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <Clock size={18} />
          <span>Availability Slots</span>
        </NavLink>
        <NavLink to="/admin/bookings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <Calendar size={18} />
          <span>Bookings & Requests</span>
        </NavLink>
        <NavLink to="/admin/inquiries" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <MessageSquare size={18} />
          <span>Inquiries</span>
        </NavLink>

        <div className="admin-nav-section-title">Content & Services</div>
        <NavLink to="/admin/services" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <Layers size={18} />
          <span>Services</span>
        </NavLink>
        <NavLink to="/admin/payments" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <CreditCard size={18} />
          <span>Payments</span>
        </NavLink>
        <NavLink to="/admin/events" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <Sparkles size={18} />
          <span>Events</span>
        </NavLink>
        <NavLink to="/admin/testimonials" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <FileText size={18} />
          <span>Testimonials</span>
        </NavLink>
        <NavLink to="/admin/gallery" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <Image size={18} />
          <span>Gallery</span>
        </NavLink>

        <div className="admin-nav-section-title">Administration</div>
        <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <Users size={18} />
          <span>Admin Users & Roles</span>
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/admin/audit-logs" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
          <ShieldAlert size={18} />
          <span>Audit Logs</span>
        </NavLink>
      </nav>
    </aside>
  );
}
