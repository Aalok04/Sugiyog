import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Award, 
  Heart, 
  Globe, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle 
} from 'lucide-react';

export default function AboutSwamiJi() {
  return (
    <div className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">The Master & Custodian</span>
          <h1 className="section-title">About Pujya Swami Ji</h1>
          <p className="section-subtitle">
            A life devoted to Vedic spiritual knowledge, ancient palm leaf preservation, and compassionate guidance to seekers worldwide.
          </p>
        </div>

        <div style={{ maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
          {/* Main Hero Card with Real Photo */}
          <div className="about-hero-card">
            <div className="about-hero-grid">
              <div className="about-portrait-card">
                <img
                  src="/images/swamiji.jpg"
                  alt="Pujya Swami Ji"
                />
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0 }}>Pujya Swami Ji</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary-dark)', fontWeight: 600, margin: '0.2rem 0 0' }}>
                    Vedic Seer & Custodian of Agasthiya Nadi Shastra
                  </p>
                </div>
              </div>

              <div>
                <span className="hero-badge" style={{ marginBottom: 'var(--space-4)' }}>
                  Sacred Vaitheeswaran Koil Lineage
                </span>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.2rem', color: 'var(--color-primary)', lineHeight: 1.25 }}>
                  Preserving the Timeless Voice of the Sapta Rishis
                </h2>
                <p style={{ lineHeight: 1.8, marginBottom: '1rem', color: 'var(--color-text)' }}>
                  Pujya Swami Ji has dedicated over 25 years of rigorous tapasya and sadhana to the preservation, translation, and dissemination of traditional Nadi Shastra manuscripts. Rooted in the sacred lineage of <strong>Vaitheeswaran Koil, Tamil Nadu</strong>, he bridges the esoteric poetic verses of Maharishi Agasthiya with the spiritual, emotional, and practical dilemmas faced by modern seekers.
                </p>
                <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
                  Through meticulous adherence to ancient protocol—including authentic thumbprint indexing across 108 classical classifications and strict "Yes/No" leaf verification—Swami Ji ensures that seekers receive unaltered divine truth without prior disclosures or commercial distortion.
                </p>

                <div className="about-cta-row">
                  <Link to="/book" className="btn btn-primary">
                    <Calendar size={16} />
                    <span>Book Darshan / Consultation</span>
                  </Link>
                  <a
                    href="https://wa.me/919876543210?text=Hari%20Om%20Swami%20Ji%2C%20I%20seek%20your%20spiritual%20blessings%20and%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Secretariat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars of Swami Ji's Mission */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', 
            gap: 'var(--space-6)' 
          }}>
            <div style={{ 
              background: 'var(--color-white)', 
              padding: 'var(--space-6)', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)'
            }}>
              <Compass size={28} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Manuscript Preservation</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Overseeing active conservation efforts to treat, catalog, and preserve fragile palm leaves (*Ola Suvadi*) using sacred herbal extracts, peacock oil, and climate-controlled storage in Tamil Nadu.
              </p>
            </div>

            <div style={{ 
              background: 'var(--color-white)', 
              padding: 'var(--space-6)', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)'
            }}>
              <Globe size={28} color="var(--color-secondary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Global Darshan Tours</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Conducting spiritual discourses, group satsangs, and personal one-on-one Nadi consultations across 18+ nations including India, the United States, the UK, the UAE, Singapore, and Europe.
              </p>
            </div>

            <div style={{ 
              background: 'var(--color-white)', 
              padding: 'var(--space-6)', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)'
            }}>
              <Heart size={28} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Compassionate Remedies</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Guiding seekers toward ethical, dharmic pariharams: feeding the underprivileged (Anna-daan), cow protection (Go-seva), temple energy alignments, and sacred mantra initiation.
              </p>
            </div>
          </div>

          {/* Vaitheeswaran Koil Heritage Connection */}
          <div className="sacred-heritage-card" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-3)' }}>The Sanctity of Vaitheeswaran Koil</h2>
            <p style={{ maxWidth: 780, margin: '0 auto var(--space-4)', fontSize: '1rem', lineHeight: 1.7 }}>
              Vaitheeswaran Koil is the traditional cradle of Nadi Astrology. The presiding deity, Lord Vaidyanatha Swamy (the Supreme Physician), dissolves karmic ailments and suffering. Swami Ji’s consultation lineage traces directly to the hereditary palm leaf readers of this holy shrine, maintaining absolute authenticity for seekers across the globe.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/understanding-nadi" className="btn btn-secondary">
                <BookOpen size={16} />
                <span>Learn How Nadi Works</span>
              </Link>
              <Link to="/upcoming-visits" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-secondary)' }}>
                <Calendar size={16} />
                <span>View Swami Ji’s Tour Schedule</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
