import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await api.post('/inquiries', formData);
      if (res.success) {
        setSuccessMessage('Thank you. Your inquiry has been sent to Swami Ji’s secretariat. We will respond promptly.');
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Unable to submit your message. Please try again or call our helpline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 960 }}>
        <div className="section-header">
          <h1 className="section-title">Contact Us & Inquiries</h1>
          <p className="section-subtitle">
            Have questions regarding thumb impression verification, travel visit appointments, or online consultations?
            Reach out to Swami Ji's secretariat.
          </p>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-box">
            {successMessage && (
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-success-bg)', color: 'var(--color-success)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={20} />
                <span>{successMessage}</span>
              </div>
            )}
            {errorMessage && (
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-danger-bg)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name <span className="form-required">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Email Address <span className="form-required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="e.g. Inquiry regarding New Delhi visit appointments"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message <span className="form-required">*</span></label>
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Please describe your inquiry in detail..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                <Send size={16} />
                <span>{loading ? 'Transmitting...' : 'Send Message to Secretariat'}</span>
              </button>
            </form>
          </div>

          {/* Contact Details Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="contact-details-box">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>Ashram Secretariat</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <MapPin size={20} color="var(--color-secondary)" />
                  <div>
                    <strong>Main Office:</strong>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Sugiyog Ashram & Research Centre, Haridwar / New Delhi, India</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <Mail size={20} color="var(--color-secondary)" />
                  <div>
                    <strong>Official Email:</strong>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>contact@sugiyog.org</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <Phone size={20} color="var(--color-secondary)" />
                  <div>
                    <strong>Direct Helplines:</strong>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>+91 11 2345 6789<br />+91 98765 43210 (WhatsApp Available)</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--color-white)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: 8 }}>Secretariat Operating Hours</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Monday to Saturday: 09:00 AM – 06:00 PM IST<br />
                Sunday: Reserved for meditation & ashram prayers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
