import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Send, ShieldCheck, HeartHandshake, PhoneCall, CheckCircle2 } from 'lucide-react';

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
    <footer className="footer" id="footer">
      {/* Decorative Auspicious Header Ribbon */}
      <div className="footer-top-ornament">
        <div className="footer-ornament-line"></div>
        <div className="footer-ornament-symbol">✦ ॐ नमः शिवाय ✦</div>
        <div className="footer-ornament-line"></div>
      </div>

      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand & Lineage Narrative */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="navbar-brand footer-logo">
              <div className="brand-symbol">
                <span>सु</span>
              </div>
              <div className="brand-text">
                <span className="brand-name">SUGIYOG</span>
                <span className="brand-subtext">Sacred Nadi Shastra</span>
              </div>
            </Link>
            <p className="footer-brand-desc">
              Sugiyog brings ancient Vedic Nadi Shastra to seekers worldwide.
              Preserving original palm leaves (Olai Chuvadi) inscribed by Maharishi Agasthiyar,
              Pujya Swami Ji provides genuine karmic insights, live video readings, and sanctified remedies.
            </p>
            <div className="footer-credentials">
              <div className="credential-item">
                <CheckCircle2 size={16} />
                <span>100% Authentic Vaitheeswaran Koil Manuscripts</span>
              </div>
              <div className="credential-item">
                <ShieldCheck size={16} />
                <span>Confidential & Revered Vedic Secretariat</span>
              </div>
              <div className="credential-item">
                <Sparkles size={16} />
                <span>Over 100,000+ Destinies Inscribed & Guided</span>
              </div>
            </div>
          </div>

          {/* Sacred Consultations */}
          <div className="footer-col">
            <h4 className="footer-heading">Devotional Services</h4>
            <div className="footer-links">
              <Link to="/book">Book Nadi Consultation</Link>
              <Link to="/services">All Consultation Formats</Link>
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
              <Link to="/nadi-shastra#kandams">16 Sacred Life Chapters</Link>
              <Link to="/testimonials">Devotee Testimonials</Link>
              <Link to="/events">Discourses & Events</Link>
              <Link to="/gallery">Darshan Gallery</Link>
              <Link to="/faq">Seeker FAQs</Link>
              <Link to="/admin/login">Admin Secretariat</Link>
            </div>
          </div>

          {/* Darshan Alerts & Secretariat */}
          <div className="footer-col footer-col-newsletter">
            <h4 className="footer-heading">Global Secretariat & Darshan</h4>
            <p className="footer-subtext">
              Receive updates on Swami Ji’s worldwide city visits, auspicious festivals, and Nadi reading slots.
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
                <PhoneCall size={16} />
                <span>+91 98765 43210 (Toll-Free Devotee Helpline)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Shanti Blessing Banner */}
        <div className="footer-shanti-banner">
          <p className="footer-shanti-verse">
            ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥
          </p>
          <span className="footer-shanti-translation">
            May all beings be happy and peaceful. May all be free from illness and suffering.
          </span>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} SUGIYOG • Ancient Nadi Shastra Heritage Foundation. All sacred rights reserved.</p>
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
