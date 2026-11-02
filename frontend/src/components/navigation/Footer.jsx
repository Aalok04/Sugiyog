import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Send, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <footer className="footer">
      {/* Decorative Gold Header Border */}
      <div className="footer-top-ornament">
        <div className="footer-ornament-line"></div>
        <div className="footer-ornament-symbol">ॐ</div>
        <div className="footer-ornament-line"></div>
      </div>

      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand & Lineage Narrative */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="navbar-brand">
              <div className="brand-symbol">
                <span>सु</span>
              </div>
              <div className="brand-text">
                <span className="brand-name">SUGIYOG</span>
                <span className="brand-subtext">Sacred Nadi Shastra</span>
              </div>
            </Link>
            <p className="footer-brand-desc">
              Dedicated to preserving and illuminating the sacred palm leaf manuscripts (Olai Chuvadi)
              inscribed by Sage Agasthiyar and the Sapta Rishis. Guided by Pujya Swami Ji, connecting
              seekers across the globe with genuine karmic clarity and compassionate Vedic wisdom.
            </p>
            <div className="footer-credentials">
              <div className="credential-item">
                <ShieldCheck size={16} />
                <span>Vaitheeswaran Koil Generational Lineage</span>
              </div>
              <div className="credential-item">
                <Sparkles size={16} />
                <span>100% Confidential & Sacred Discourses</span>
              </div>
            </div>
          </div>

          {/* Sacred Consultations */}
          <div className="footer-col">
            <h4 className="footer-heading">Consultations</h4>
            <div className="footer-links">
              <Link to="/book">Book an Appointment</Link>
              <Link to="/services">All 6 Consultation Formats</Link>
              <Link to="/services/online-nadi-reading">Online Video Reading</Link>
              <Link to="/services/palm-leaf-identification">Thumbprint Identification</Link>
              <Link to="/services/spiritual-remedies">Shanti & Pariharam Remedies</Link>
              <Link to="/upcoming-visits">Global Tour Itinerary</Link>
            </div>
          </div>

          {/* Sacred Lore & Guidance */}
          <div className="footer-col">
            <h4 className="footer-heading">Sacred Knowledge</h4>
            <div className="footer-links">
              <Link to="/about">About Pujya Swami Ji</Link>
              <Link to="/nadi-shastra">Understanding Nadi Shastra</Link>
              <Link to="/nadi-shastra#kandams">The 16 Sacred Kandams</Link>
              <Link to="/testimonials">Seeker Testimonials & Video</Link>
              <Link to="/events">Discourses & Events</Link>
              <Link to="/gallery">Sacred Palm Leaf Gallery</Link>
              <Link to="/faq">Seeker FAQ</Link>
              <Link to="/admin/login">Admin Secretariat Portal</Link>
            </div>
          </div>

          {/* Darshan Alerts & Secretariat */}
          <div className="footer-col footer-col-newsletter">
            <h4 className="footer-heading">Global Darshan Updates</h4>
            <p className="footer-subtext">
              Subscribe to receive notifications when Swami Ji announces spiritual visits and consultation tours in your country.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe to Darshan updates">
                  <Send size={16} />
                </button>
              </div>
              {newsletterSuccess && (
                <p className="newsletter-success-msg">
                  Namaste. You will receive Swami Ji's global visit notifications.
                </p>
              )}
            </form>

            <div className="footer-contact-info">
              <div className="contact-row">
                <MapPin size={16} />
                <span>Sugiyog Ashram & Research Centre, Vaitheeswaran Koil / New Delhi</span>
              </div>
              <div className="contact-row">
                <Mail size={16} />
                <a href="mailto:contact@sugiyog.org">contact@sugiyog.org</a>
              </div>
              <div className="contact-row">
                <Phone size={16} />
                <span>+91 11 2345 6789 / +91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} SUGIYOG. Ancient Nadi Shastra Heritage Foundation. All sacred rights reserved.</p>
          <div className="footer-legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="dot-divider">•</span>
            <Link to="/terms">Terms of Consultation</Link>
            <span className="dot-divider">•</span>
            <Link to="/cancellation">Cancellation & Rescheduling</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
