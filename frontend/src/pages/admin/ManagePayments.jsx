import React, { useEffect, useState } from 'react';
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';
import api from '../../services/api';

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/payments/admin/all')
      .then((res) => {
        if (res.success) setPayments(res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Manage Payments & Dakshina Ledger</h1>
          <p>
            Consultation fees collected via online gateways and offline cash / temple accounts.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Payment Reference</th>
              <th>Booking Number</th>
              <th>Seeker</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Loading payments...</td>
              </tr>
            ) : payments.length > 0 ? (
              payments.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.paymentReference}</td>
                  <td style={{ fontFamily: 'monospace' }}>{p.booking?.bookingNumber}</td>
                  <td>{p.booking?.user?.fullName}</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    ₹{parseFloat(p.amount).toLocaleString('en-IN')} {p.currency}
                  </td>
                  <td>{p.paymentMethod}</td>
                  <td>
                    <span className={`badge ${p.status === 'PAID' ? 'badge-success' : 'badge-warning'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No payment transactions recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
