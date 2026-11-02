import React, { useEffect, useState } from 'react';
import { Star, Quote, Sparkles, Video, Play, MessageCircle, HeartHandshake } from 'lucide-react';
import api from '../../services/api';
import TestimonialCarousel from '../../components/testimonials/TestimonialCarousel';

const APPROVED_FALLBACK_TESTIMONIALS = [
  {
    id: 't-1',
    clientName: 'Dr. Anand Ramanathan',
    clientLocation: 'London, United Kingdom',
    consultationType: 'Online Video Darshan & General Kandam',
    quote: 'Swami Ji verified details about my parents’ exact names and my surgical profession that were impossible for anyone to guess. The remedy (Pariharam) prescribed at Vaitheeswaran Koil brought immense inner peace during a turbulent hospital tenure.',
    rating: 5,
    hasVideo: true,
  },
  {
    id: 't-2',
    clientName: 'Meenakshi Sundaram & Family',
    clientLocation: 'Singapore',
    consultationType: 'In-Person City Tour & Matrimonial Kandam',
    quote: 'We attended Swami Ji’s consultation during the Singapore tour. Finding our daughter’s destined leaf took nearly an hour of leaf identification, but when it matched, every planetary configuration was spot on. Highly recommended for authentic spiritual seekers.',
    rating: 5,
    hasVideo: false,
  },
  {
    id: 't-3',
    clientName: 'Vikramaditya Shah',
    clientLocation: 'San Francisco, USA',
    consultationType: 'International Executive Consultation',
    quote: 'As an engineer in Silicon Valley, I was initially sceptical. The precision with which Sage Agasthiyar’s verses outlined my technological ventures and karmic shifts in my 40th year left me speechless. Swami Ji’s humility is profoundly moving.',
    rating: 5,
    hasVideo: true,
  },
  {
    id: 't-4',
    clientName: 'Lakshmi Narayana Rao',
    clientLocation: 'Bengaluru, India',
    consultationType: 'Career & Business Kandam',
    quote: 'I consulted Swami Ji before entering a major renewable energy joint venture. The palm leaf accurately foretold delays up to Karthigai month followed by sudden expansion. The spiritual havan performed brought clarity and renewed focus.',
    rating: 5,
    hasVideo: false,
  },
  {
    id: 't-5',
    clientName: 'Sarah Jenkins',
    clientLocation: 'Sydney, Australia',
    consultationType: 'Online Video Darshan',
    quote: 'The reading was conducted via video call with an English translator. It felt deeply sacred. The insights into my soul lessons and past-life karma answered lifelong existential questions I had carried since childhood.',
    rating: 5,
    hasVideo: true,
  },
  {
    id: 't-6',
    clientName: 'Rajesh & Kavita Sharma',
    clientLocation: 'Dubai, UAE',
    consultationType: 'Puthira (Progeny) Kandam',
    quote: 'After 7 years of medical attempts, Swami Ji’s reading gave us spiritual solace and guided us to specific prayers and charity. Our twin daughters were born auspiciously just as the leaf predicted.',
    rating: 5,
    hasVideo: false,
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/testimonials')
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setTestimonials(res.data);
        } else {
          setTestimonials(APPROVED_FALLBACK_TESTIMONIALS);
        }
      })
      .catch(() => setTestimonials(APPROVED_FALLBACK_TESTIMONIALS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section" style={{ paddingTop: 'var(--space-12)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto var(--space-10) auto' }}>
          <span className="section-eyebrow">
            <Sparkles size={14} />
            <span>Seeker Reflections</span>
          </span>
          <h1 className="section-title">Experiences & Testimonials</h1>
          <p className="section-subtitle">
            Words of gratitude and transformation from seekers across the globe whose lives were illuminated
            by the sacred palm leaves inscribed by Sage Agasthiyar and interpreted by Pujya Swami Ji.
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <TestimonialCarousel testimonials={testimonials} />
        </div>

        {/* Complete Seeker Reflections Grid */}
        <div style={{ marginTop: 'var(--space-12)' }}>
          <div className="section-header" style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto var(--space-8) auto' }}>
            <span className="section-eyebrow">Verified Reviews</span>
            <h2 className="section-title">All Seeker Testimonials</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)' }}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  background: 'var(--color-surface-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-8)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', gap: 3, color: 'var(--color-secondary)' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="#C49A45" color="#C49A45" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-secondary-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Verified Seeker
                  </span>
                </div>

                <blockquote style={{ fontStyle: 'italic', color: 'var(--color-text)', fontSize: '0.98rem', lineHeight: 1.65, flexGrow: 1, marginBottom: 'var(--space-6)', fontFamily: 'var(--font-display)' }}>
                  "{t.quote}"
                </blockquote>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                  <strong style={{ display: 'block', color: 'var(--color-primary)', fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>
                    {t.clientName}
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    {t.clientLocation} {t.consultationType ? `• ${t.consultationType}` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
