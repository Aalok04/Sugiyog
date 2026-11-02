import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/navigation/AdminSidebar';
import AdminHeader from '../components/navigation/AdminHeader';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout({ title }) {
  const { adminUser, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#FFF9EF' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary)' }}>
          Verifying security credentials...
        </p>
      </div>
    );
  }

  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-wrapper">
        <AdminHeader title={title} />
        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
