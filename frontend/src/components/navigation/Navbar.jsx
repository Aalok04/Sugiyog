import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, MessageCircle, ChevronRight, PhoneCall, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isTransparent = isHomePage && !isScrolled;

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'Swami Ji' },
    { to: '/services', label: 'Consultations' },
    { to: '/upcoming-visits', label: 'Global Tours' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Auspicious Ribbon (Sri Mandir Style) */}
      <div className="navbar-top-ribbon">
        <div className="navbar-top-container">
          <div className="top-ribbon-left">
            <span className="top-ribbon-badge">🚩 ॐ नमः शिवाय</span>
            <span className="top-ribbon-text">
              Certified Ancient Nadi Shastra Platform • 108 Sacred Classifications
            </span>
          </div>
          <div className="top-ribbon-right">
            <a
              href="tel:+919876543210"
              className="top-ribbon-link"
              title="Call Devotee Helpline"
            >
              <PhoneCall size={12} />
              <span>Helpline: +91 98765 43210</span>
            </a>
            <span className="top-ribbon-sep">•</span>
            <span className="top-ribbon-hours">Daily 09:00 AM - 08:00 PM IST</span>
          </div>
        </div>
      </div>

      <header className={`navbar ${isTransparent ? 'navbar-transparent' : 'navbar-scrolled'}`}>
        <div className="navbar-container">
          {/* Brand Logo - Sri Mandir Inspired Saffron Emblem */}
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            <div className="brand-symbol">
              <span>सु</span>
            </div>
            <div className="brand-text">
              <span className="brand-name">SUGIYOG</span>
              <span className="brand-subtext">Sacred Nadi Shastra</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="navbar-links" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar-actions">
            <a
              href="https://wa.me/919876543210?text=Namaste%20Swami%20Ji%2C%20I%20would%20like%20to%20inquire%20about%20Nadi%20Shastra%20Consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="nav-whatsapp-link"
              title="Instant WhatsApp Consultation"
              aria-label="Instant WhatsApp Consultation"
            >
              <MessageCircle size={17} />
              <span className="nav-whatsapp-text">WhatsApp</span>
            </a>

            {location.pathname !== '/book' && (
              <Link to="/book" className="btn btn-luxury btn-sm nav-booking-btn">
                <Calendar size={14} />
                <span className="booking-btn-text-full">Book Consultation</span>
                <span className="booking-btn-text-short">Book</span>
              </Link>
            )}

            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Portal attached to body */}
      {mobileMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="mobile-drawer-overlay open"
            onClick={closeMobileMenu}
            role="presentation"
          >
            <div
              className="mobile-drawer-content"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              {/* Drawer Header */}
              <div className="mobile-drawer-header">
                <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
                  <div className="brand-symbol">
                    <span>सु</span>
                  </div>
                  <div className="brand-text">
                    <span className="brand-name">SUGIYOG</span>
                    <span className="brand-subtext">Sacred Nadi Shastra</span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={closeMobileMenu}
                  aria-label="Close navigation menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Helpline Bar */}
              <div className="drawer-helpline-box">
                <span className="helpline-title">Devotee Support & Inquiries</span>
                <a href="tel:+919876543210" className="helpline-number">
                  <PhoneCall size={14} />
                  <span>+91 98765 43210</span>
                </a>
              </div>

              {/* Drawer Links List */}
              <nav className="mobile-nav-links" aria-label="Mobile Navigation Links">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} className="mobile-nav-chevron" />
                  </NavLink>
                ))}
              </nav>

              {/* Drawer CTAs */}
              <div className="mobile-drawer-cta">
                <Link
                  to="/book"
                  className="btn btn-luxury btn-block mobile-drawer-booking"
                  onClick={closeMobileMenu}
                >
                  <Calendar size={16} />
                  <span>Book a Consultation</span>
                </Link>
                <a
                  href="https://wa.me/919876543210?text=Namaste%20Swami%20Ji%2C%20I%20would%20like%20to%20inquire%20about%20Nadi%20Shastra."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-gold btn-block mobile-drawer-wa"
                  onClick={closeMobileMenu}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Instant Consult</span>
                </a>
                <div className="mobile-drawer-footer-note">
                  <span>Vaitheeswaran Koil Lineage • Sage Agasthiyar Tradition</span>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
