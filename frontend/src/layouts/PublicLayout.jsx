import React, { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { MessageCircle, Calendar } from 'lucide-react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

export default function PublicLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="public-layout">
      <Navbar />
      <main className="public-main">
        <Outlet />
      </main>
      <Footer />

      {/* Floating Book Consultation Button (Mobile View Only) */}
      {pathname !== '/book' && (
        <Link
          to="/book"
          className="floating-book-btn"
          title="Book a Consultation"
          aria-label="Book a Consultation"
        >
          <Calendar size={22} />
          <span>Book Consultation</span>
        </Link>
      )}

      {/* Floating WhatsApp Quick Consultation Button (Reference standard) */}
      <a
        href="https://wa.me/919876543210?text=Namaste%20Swami%20Ji%2C%20I%20would%20like%20to%20consult%20regarding%20Nadi%20Shastra."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        title="Instant WhatsApp Consultation"
        aria-label="WhatsApp Quick Consult"
      >
        <MessageCircle size={22} />
        <span>WhatsApp Quick Consult</span>
      </a>
    </div>
  );
}
