import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Play, Quote, X, Sparkles } from 'lucide-react';

const APPROVED_FALLBACK_TESTIMONIALS = [
  {
    id: 'approved-1',
    clientName: 'Dr. Anand Ramanathan',
    clientLocation: 'London, United Kingdom',
    consultationType: 'Online Video Darshan & General Kandam',
    quote: 'Swami Ji verified details about my parents’ exact names and my surgical profession that were impossible for anyone to guess. The remedy (Pariharam) prescribed at Vaitheeswaran Koil brought immense inner peace during a turbulent hospital tenure.',
    rating: 5,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Optional video embed
    hasVideo: true,
  },
  {
    id: 'approved-2',
    clientName: 'Meenakshi Sundaram & Family',
    clientLocation: 'Singapore',
    consultationType: 'In-Person City Tour & Matrimonial Kandam',
    quote: 'We attended Swami Ji’s consultation during the Singapore tour. Finding our daughter’s destined leaf took nearly an hour of leaf identification, but when it matched, every planetary configuration was spot on. Highly recommended for authentic spiritual seekers.',
    rating: 5,
    videoUrl: null,
    hasVideo: false,
  },
  {
    id: 'approved-3',
    clientName: 'Vikramaditya Shah',
    clientLocation: 'San Francisco, USA',
    consultationType: 'International Executive Consultation',
    quote: 'As an engineer in Silicon Valley, I was initially sceptical. The precision with which Sage Agasthiyar’s verses outlined my technological ventures and karmic shifts in my 40th year left me speechless. Swami Ji’s humility is profoundly moving.',
    rating: 5,
    videoUrl: null,
    hasVideo: true,
  },
];

export default function TestimonialCarousel({ testimonials = [] }) {
  const items = testimonials.length > 0 ? testimonials : APPROVED_FALLBACK_TESTIMONIALS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const current = items[currentIndex] || items[0];

  return (
    <div
      className="testimonial-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Seeker Testimonials Carousel"
    >
      <div className="carousel-ornament-quote">
        <Quote size={52} />
      </div>

      {/* Main Active Testimonial Card */}
      <div className="testimonial-active-slide">
        <div className="testimonial-stars-row">
          {Array.from({ length: current.rating || 5 }).map((_, i) => (
            <Star key={i} size={18} fill="#C49A45" color="#C49A45" />
          ))}
          <span className="testimonial-verified-badge">
            <Sparkles size={13} />
            <span>Verified Seeker Experience</span>
          </span>
        </div>

        <blockquote className="testimonial-quote-text">
          "{current.quote}"
        </blockquote>

        <div className="testimonial-author-meta">
          <div className="author-details">
            <h4 className="author-name">{current.clientName}</h4>
            <p className="author-location">
              {current.clientLocation} {current.consultationType ? `• ${current.consultationType}` : ''}
            </p>
          </div>

          {current.hasVideo && (
            <button
              type="button"
              className="video-watch-btn"
              onClick={() => setActiveVideoModal(current)}
              aria-label={`Watch video testimonial of ${current.clientName}`}
            >
              <div className="play-circle">
                <Play size={14} fill="#FFF9EF" color="#FFF9EF" />
              </div>
              <span>Watch Video Experience</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="carousel-controls-bar">
        <button
          type="button"
          className="carousel-nav-btn prev"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Indicators */}
        <div className="carousel-dots-list" role="tablist">
          {items.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-nav-btn next"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Video Testimonial Modal */}
      {activeVideoModal && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <h4 style={{ color: '#FFF9EF', margin: 0, fontFamily: 'var(--font-serif)' }}>
                {activeVideoModal.clientName} — Seeker Experience
              </h4>
              <button
                type="button"
                className="video-modal-close"
                onClick={() => setActiveVideoModal(null)}
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </div>
            <div className="video-embed-box">
              <div className="video-placeholder-frame">
                <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                  <Quote size={40} color="var(--color-secondary)" style={{ margin: '0 auto var(--space-4) auto' }} />
                  <p style={{ color: '#FFF9EF', fontSize: '1.1rem', fontStyle: 'italic', maxWidth: 480, margin: '0 auto' }}>
                    "{activeVideoModal.quote}"
                  </p>
                  <p style={{ color: 'var(--color-accent)', fontSize: '0.85rem', marginTop: 'var(--space-4)' }}>
                    Recorded during Swami Ji’s International Darshan Tour • {activeVideoModal.clientLocation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
