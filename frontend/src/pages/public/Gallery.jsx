import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Image as ImageIcon, Camera, Sparkles, X, Eye } from 'lucide-react';
import api from '../../services/api';

const CURATED_GALLERY_COLLECTION = [
  {
    id: 'curated-1',
    title: 'Pujya Swami Ji on Sacred Singhasan',
    category: 'DARSHAN',
    imageUrl: '/images/gallery-swamiji-singhasan.jpg',
    description: 'Pujya Swami Ji graciously seated in divine poise upon the sacred silver throne adorned with traditional marigold malas.',
  },
  {
    id: 'curated-2',
    title: 'Seeker Darshan & Divine Ashirwad',
    category: 'DARSHAN',
    imageUrl: '/images/gallery-devotee-blessing.jpg',
    description: 'Devotee receiving personal Vedic blessings, soul guidance, and spiritual clarity directly from Swami Ji.',
  },
  {
    id: 'curated-3',
    title: 'Holy Assembly with Sanyasis & Sadhus',
    category: 'HOLY SANCTUARY',
    imageUrl: '/images/gallery-darshan-sadhus.jpg',
    description: 'Spiritual congregation of revered sanyasis, sadhus, and Vedic custodians during ceremonial satsang.',
  },
  {
    id: 'curated-4',
    title: 'Maha Kumbh Shobha Yatra Procession',
    category: 'GLOBAL TOURS',
    imageUrl: '/images/gallery-sacred-procession.jpg',
    description: 'Grand sacred festival procession with sadhus in joyous devotion with ceremonial garlands, tridents, and flags.',
  },
  {
    id: 'curated-5',
    title: 'Ceremonial Vedic Assembly & Insignias',
    category: 'SACRED REMEDIES',
    imageUrl: '/images/gallery-ceremonial-gathering.jpg',
    description: 'Ancient ceremonial gathering of holy saints bearing sacred golden emblems and spiritual standards.',
  },
  {
    id: 'curated-6',
    title: 'Pujya Swami Ji - Vaitheeswaran Koil Custodian',
    category: 'SACRED ARCHIVES',
    imageUrl: '/images/swamiji.jpg',
    description: 'Pujya Swami Ji in contemplation, upholding the centuries-old Vaitheeswaran Koil palm leaf (Olai Chuvadi) lineage.',
  },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    api
      .get('/gallery')
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setItems(res.data);
        } else {
          setItems(CURATED_GALLERY_COLLECTION);
        }
      })
      .catch(() => setItems(CURATED_GALLERY_COLLECTION))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  const categories = ['ALL', 'DARSHAN', 'SACRED ARCHIVES', 'GLOBAL TOURS', 'HOLY SANCTUARY', 'SACRED REMEDIES'];

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return (item.category || '').toUpperCase() === activeCategory;
  });

  return (
    <div className="section" style={{ paddingTop: 'var(--space-12)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto var(--space-8) auto' }}>
          <span className="section-eyebrow">
            <Sparkles size={14} />
            <span>Visual Darshan</span>
          </span>
          <h1 className="section-title">Sacred Gallery & Archival Moments</h1>
          <p className="section-subtitle">
            Glimpses into ancient palm leaf repositories (Olai Chuvadi), ashram sadhana, international darshan tours,
            and ceremonial Vedic gatherings under Pujya Swami Ji’s stewardship.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`map-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'ALL' ? 'All Moments' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'var(--space-6)' }}>
          {filteredItems.map((item) => {
            const imgSrc = item.media?.fileUrl || item.imageUrl || '/images/swamiji.jpg';
            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--color-surface-card)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setLightboxImage({ ...item, imgSrc })}
              >
                <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                  <img
                    src={imgSrc}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: item.objectPosition || (imgSrc.includes('swamiji.jpg') ? 'top center' : 'center 20%'),
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(42, 9, 16, 0.85) 100%)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      background: 'rgba(82, 21, 32, 0.85)',
                      border: '1px solid var(--color-secondary)',
                      color: 'var(--color-secondary-light)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.category}
                  </span>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--color-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1a0e05',
                    }}
                  >
                    <Eye size={16} />
                  </div>
                </div>

                <div style={{ padding: 'var(--space-5)' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: 4 }}>
                    {item.title}
                  </h4>
                  {item.description && (
                    <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal (Rendered via React Portal) */}
        {lightboxImage && typeof document !== 'undefined' &&
          createPortal(
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(25, 5, 10, 0.92)',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              onClick={() => setLightboxImage(null)}
              role="dialog"
              aria-modal="true"
            >
              <div
                style={{
                  maxWidth: 800,
                  width: '100%',
                  background: '#2A0910',
                  border: '2px solid var(--color-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.7)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid rgba(196, 154, 69, 0.3)' }}>
                  <h4 style={{ color: '#FFF9EF', margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>{lightboxImage.title}</h4>
                  <button
                    type="button"
                    onClick={() => setLightboxImage(null)}
                    style={{ background: 'rgba(196, 154, 69, 0.15)', border: '1px solid var(--color-secondary)', color: 'var(--color-accent)', cursor: 'pointer', width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Close image preview"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div style={{ maxHeight: '68vh', overflow: 'hidden', background: '#19050A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={lightboxImage.imgSrc} alt={lightboxImage.title} style={{ width: '100%', maxHeight: '68vh', objectFit: 'contain', display: 'block' }} />
                </div>
                {lightboxImage.description && (
                  <div style={{ padding: 'var(--space-4) var(--space-6)', color: 'rgba(255, 249, 239, 0.9)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    <p style={{ margin: 0 }}>{lightboxImage.description}</p>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )
        }
      </div>
    </div>
  );
}
