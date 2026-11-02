import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, MapPin, Globe2, Sparkles, ShieldCheck, Clock, ArrowRight, HeartHandshake } from 'lucide-react';
import api from '../../services/api';
import ServiceCard from '../../components/cards/ServiceCard';
import ConsultationFormatCard from '../../components/cards/ConsultationFormatCard';
import { FALLBACK_SERVICES } from '../../services/fallbackData';

export default function Services() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get('/services')
      .then((res) => {
        if (res.success && res.data?.length) setServices(res.data);
      })
      .catch((err) => console.error('Error fetching services:', err));
  }, []);

  return (
    <div className="section" style={{ paddingTop: 'var(--space-12)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto var(--space-12) auto' }}>
          <span className="section-eyebrow">
            <Sparkles size={14} />
            <span>Sacred Consultations</span>
          </span>
          <h1 className="section-title">Nadi Shastra Consultation Offerings</h1>
          <p className="section-subtitle">
            Illuminated by Sage Agasthiyar’s ancient palm leaves and interpreted by Pujya Swami Ji.
            Available via live high-definition video worldwide or in-person during scheduled global city tours.
          </p>
        </div>

        {/* 3 Core Consultation Formats */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto var(--space-8) auto' }}>
            <span className="section-eyebrow">Primary Formats</span>
            <h2 className="section-title">Choose How You Wish to Meet Swami Ji</h2>
          </div>

          <div className="format-cards-grid">
            <ConsultationFormatCard
              formatType="ONLINE"
              title="Online Video Consultation"
              tagline="Global Seekers"
              description="Live 1-on-1 reading via HD video with multi-lingual scholars and dedicated translation."
              benefits={[
                'HD video session & lifetime audio recording',
                'Multi-lingual live translation assistance',
                'Personalized Shanti Pariharam remedies',
              ]}
              duration="45-60 Mins"
              bookingLink="/book?format=ONLINE"
              popular={true}
            />

            <ConsultationFormatCard
              formatType="IN_PERSON"
              title="In-Person City Tour"
              tagline="Direct Darshan"
              description="Direct presence and personal blessings during Swami Ji’s scheduled national and global tours."
              benefits={[
                'Direct darshan & personal blessings',
                'Physical verification of original palm leaves',
                'Family members welcome to attend',
              ]}
              duration="60 Mins"
              bookingLink="/upcoming-visits"
              popular={false}
            />

            <ConsultationFormatCard
              formatType="INTERNATIONAL"
              title="International Private Reading"
              tagline="Deep Life Kandam"
              description="Multi-chapter comprehensive reading covering life destiny, family lineage, and sanctified remedies."
              benefits={[
                'Full General Kandam + 3 life chapters',
                'Lineage karma & compatibility analysis',
                'Priority scheduling & blessed yantra initiation',
              ]}
              duration="90 Mins"
              bookingLink="/book?format=INTERNATIONAL"
              popular={false}
            />
          </div>
        </div>

        {/* Specialized Chapters List from API */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto var(--space-8) auto' }}>
            <span className="section-eyebrow">Chapter Inquests</span>
            <h2 className="section-title">Specialized Consultation Offerings</h2>
            <p className="section-subtitle">
              Every consultation addresses specific life questions through the relevant sacred Kandam.
            </p>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading consultation services...</p>
          ) : (
            <div className="services-grid">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>

        {/* Preparation & Lineage Assurance Banner */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-secondary)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-10)', marginTop: 'var(--space-12)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div>
              <span className="section-eyebrow" style={{ color: 'var(--color-secondary-dark)' }}>
                Vedic Protocol
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
                Preparing for Your Reading
              </h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                Prior to your appointment, ensure you have taken a clear impression of your thumb on white paper.
                Approach the consultation in a quiet, serene space with an open and receptive mind.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <Link to="/nadi-shastra" className="btn btn-outline">
                  <span>How Nadi Reading Works</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/book" className="btn btn-primary">
                  <span>Book Consultation</span>
                </Link>
              </div>
            </div>

            <div style={{ background: '#FFFDF8', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)', color: 'var(--color-primary)', fontWeight: 700 }}>
                <ShieldCheck size={20} color="var(--color-secondary)" />
                <span>Sugiyog Authenticity Assurance</span>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <li>✓ Genuine Vaitheeswaran Koil palm leaf lineage</li>
                <li>✓ Strict "Yes or No" verification with zero prior prompting</li>
                <li>✓ Absolute confidentiality of your karmic destiny record</li>
                <li>✓ Non-commercial, compassionate spiritual guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
