import React, { useEffect, useState } from 'react';
import { Plus, Calendar, Sparkles } from 'lucide-react';
import api from '../../services/api';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/events/admin/all')
      .then((res) => {
        if (res.success) setEvents(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Manage Spiritual Events & Satsangs</h1>
          <p>
            Announce spiritual retreats, sacred pujas, and global discourses.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading events...</td>
              </tr>
            ) : events.length > 0 ? (
              events.map((e) => (
                <tr key={e.id}>
                  <td><strong>{e.title}</strong></td>
                  <td>{new Date(e.eventDate).toLocaleDateString()}</td>
                  <td>{e.city}, {e.country}</td>
                  <td>{e.isOnline ? 'Online' : 'In-Person'}</td>
                  <td>
                    <span className={`badge ${e.isPublished ? 'badge-success' : 'badge-warning'}`}>
                      {e.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No events recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
