import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MessageCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Compass,
  Heart,
  Globe,
  ShieldCheck,
  Sparkles,
  Scroll,
  Sun,
  Flame,
  Award,
  ArrowRight,
} from 'lucide-react';
import '../../styles/pages/About.css';

// High-resolution ceremonial and darshan photographs uploaded for Swamiji's hero slideshow
const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: '/images/about/hero-procession-lead.jpg',
    quote: 'Discover the wisdom that awakens the soul and illuminates the eternal path of truth.',
    subtitle: 'A Life of Tapasya, Lineage & Divine Stewardship',
  },
  {
    id: 'slide-2',
    image: '/images/about/hero-sadhus-tridents.jpg',
    quote: 'Walk the path of peace, self-realization, and karmic clarity with the blessings of the Rishis.',
    subtitle: 'Rooted in the Generational Sanctity of Vaitheeswaran Koil',
  },
  {
    id: 'slide-3',
    image: '/images/about/hero-silver-palanquin.jpg',
    quote: 'Destiny is inscribed upon sacred palm leaves, but through prayer and righteous action, every soul finds liberation.',
    subtitle: 'Preserving Ancient Olai Chuvadi for Destined Seekers',
  },
  {
    id: 'slide-4',
    image: '/images/about/hero-kumbh-assembly.jpg',
    quote: 'True spiritual guidance does not foster fear; it awakens inner divinity, courage, and unconditional compassion.',
    subtitle: 'Guiding Seekers Across Five Continents for Over 25 Years',
  },
];

// Core spiritual philosophy & teachings rooted in authentic Nadi Shastra hermeneutics
const PHILOSOPHY_TEACHINGS = [
  {
    id: 'phil-1',
    title: 'Karma & Free Will (Prarabdha & Purushartha)',
    description:
      'Past actions shape present inclinations, yet conscious awareness, sincere prayer, and ethical free will (Purushartha) possess divine potency to transcend planetary afflictions.',
    icon: Flame,
  },
  {
    id: 'phil-2',
    title: 'Non-Fatalistic Guidance',
    description:
      'Nadi Shastra is not an instrument of dread or rigid fatalism. It is a luminous spiritual compass revealing karmic root causes so seekers make enlightened life choices.',
    icon: Compass,
  },
  {
    id: 'phil-3',
    title: 'Sacred Pariharam (Targeted Remedial Grace)',
    description:
      'Karmic knots dissolve through specific consecrated remedies: sacred temple rituals, mantra japa, and planetary energy alignment guided by ancient Vedic protocols.',
    icon: Sun,
  },
  {
    id: 'phil-4',
    title: 'Nishkama Seva (Compassionate Charity)',
    description:
      'Swami Ji teaches that feeding the hungry (Anna-daan), sheltering vulnerable animals (Go-seva), and educating children cleanse more negative karma than mere ritualistic acts.',
    icon: Heart,
  },
  {
    id: 'phil-5',
    title: 'Sacred Neutrality & Pure Truth',
    description:
      'The reader remains an unbiased instrument. Readings proceed strictly via 108 classical thumbprint whorls and binary verification without prior inquiry or commercial bias.',
    icon: ShieldCheck,
  },
  {
    id: 'phil-6',
    title: 'Dhyana (Inner Stillness & Meditation)',
    description:
      'Beyond outward remedies lies the quiet sanctuary of the heart. Daily contemplation, breath regulation, and surrender to the Supreme Divine restore eternal peace.',
    icon: Sparkles,
  },
];

// Chronological milestones of Swami Ji's lifelong spiritual journey
const SPIRITUAL_MILESTONES = [
  {
    epoch: 'Early Foundations',
    title: 'Vedic Immersion & Monastic Vows',
    description:
      'Drawn early to solitary contemplative sadhana and scriptural studies; initiated into ascetic vows under venerable traditional Gurus in holy South Indian river sanctuaries.',
  },
  {
    epoch: 'Heritage Custodianship',
    title: 'The Archives of Vaitheeswaran Koil',
    description:
      'Entrusted with hereditary palm leaf bundles (Olai Chuvadi); spent decades deciphering archaic Tamil poetic script (Vatta Ezhuthu) and establishing organic herbal conservation methods.',
  },
  {
    epoch: 'Humanitarian Mission',
    title: 'Social Upliftment & Anna-Daan',
    description:
      'Established charitable feeding initiatives, cow protection sanctuaries (Gaushalas), and spiritual education centers serving thousands of destitute families across pilgrim circuits.',
  },
  {
    epoch: 'Global Illumination',
    title: 'International Darshan & Digital Sanctum',
    description:
      'Expanded access to destined seekers across 18+ nations through international city tours and secure high-definition video consultations with multi-lingual scholars.',
  },
];

export default function AboutSwamiJi() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideTimerRef = useRef(null);

  // Autoplay slideshow with smooth crossfade
  useEffect(() => {
    if (isPaused) return;

    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(slideTimerRef.current);
  }, [isPaused]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="about-page-wrapper">
      {/* ====================================================================
          1. Hero Section – Full-Screen Image Slideshow
          ==================================================================== */}
      <section
        className="about-hero-slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Swamiji Life and Journey Hero Slideshow"
      >
        {/* Background Slides Track */}
        <div className="about-slideshow-track">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`about-hero-slide ${isActive ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
                aria-hidden={!isActive}
              />
            );
          })}
        </div>

        {/* Elegant Dark Vignette & Radial Overlay */}
        <div className="about-hero-overlay" />

        {/* Hero Central Typography & Quote */}
        <div className="about-hero-content">
          <span className="about-hero-label">A Journey of Wisdom & Enlightenment</span>

          <blockquote className="about-hero-quote">
            "{HERO_SLIDES[currentSlide].quote}"
          </blockquote>

          <div className="about-hero-author">Pujya Swami Ji • Vedic Seer & Nadi Custodian</div>

          <div className="about-hero-actions">
            <a href="#biography" className="btn btn-luxury btn-lg">
              <Scroll size={17} />
              <span>Explore Life & Teachings</span>
            </a>
            <Link to="/book" className="btn btn-outline-gold btn-lg">
              <Calendar size={17} />
              <span>Request Consultation</span>
            </Link>
          </div>
        </div>

        {/* Previous & Next Control Arrows */}
        <button
          type="button"
          className="about-slideshow-arrow about-slideshow-prev"
          onClick={handlePrevSlide}
          aria-label="Previous image"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="about-slideshow-arrow about-slideshow-next"
          onClick={handleNextSlide}
          aria-label="Next image"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slideshow Dots */}
        <div className="about-slideshow-dots">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`about-slide-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll-down prompt linking to Biography */}
        <a href="#biography" className="about-hero-scroll-prompt">
          <span>Scroll to Discover</span>
          <ChevronDown size={14} className="scroll-prompt-icon" />
        </a>
      </section>

      {/* ====================================================================
          2. Swamiji Introduction Section – Two-Column Biography
          ==================================================================== */}
      <section id="biography" className="about-bio-section">
        <div className="container">
          <div className="about-bio-grid">
            {/* Left Column: Biography Narrative */}
            <div className="about-bio-content">
              <h1 className="about-bio-title">About Pujya Swami Ji</h1>
              <p className="about-bio-tagline">
                A life consecrated to Vedic contemplation, palm leaf preservation, and compassionate guidance to seekers worldwide.
              </p>

              <p className="about-bio-paragraph">
                Pujya Swami Ji has dedicated over <strong>25 years of rigorous tapasya and sadhana</strong> to the preservation,
                translation, and spiritual stewardship of traditional Nadi Shastra manuscripts. Rooted in the hereditary sanctuary
                lineage of <strong>Vaitheeswaran Koil, Tamil Nadu</strong>, he bridges the archaic poetic verses inscribed by Maharishi
                Agasthiyar with the emotional, spiritual, and vocational dilemmas of our modern era.
              </p>

              <p className="about-bio-paragraph">
                Trained from an early age in classical Jyotish and the sacred hermeneutics of archaic Tamil meters (<em>Vatta Ezhuthu</em>),
                Swami Ji approaches every seeker not as a commercial fortune-teller, but as an enlightened custodian deciphering divine
                records to illuminate the soul's karmic trajectory.
              </p>

              <p className="about-bio-paragraph">
                Through uncompromising adherence to ancient protocol—indexing solely via <strong>108 classical thumbprint whorls</strong> and
                maintaining strict binary verification without prior biographical disclosure—Swami Ji ensures every seeker receives unaltered,
                authentic divine insight.
              </p>

              {/* Verified Credentials Bar */}
              <div className="about-credentials-bar">
                <div className="about-credential-box">
                  <span className="about-credential-num">25+</span>
                  <span className="about-credential-label">Years Tapasya</span>
                </div>
                <div className="about-credential-box">
                  <span className="about-credential-num">18+</span>
                  <span className="about-credential-label">Nations Guided</span>
                </div>
                <div className="about-credential-box">
                  <span className="about-credential-num">108</span>
                  <span className="about-credential-label">Thumbprint Classes</span>
                </div>
                <div className="about-credential-box">
                  <span className="about-credential-num">100%</span>
                  <span className="about-credential-label">Vedic Protocol</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="about-bio-actions">
                <Link to="/book" className="btn btn-primary btn-lg">
                  <Calendar size={17} />
                  <span>Schedule Consultation</span>
                </Link>
                <a
                  href="https://wa.me/919876543210?text=Hari%20Om%20Swami%20Ji%2C%20I%20seek%20your%20spiritual%20guidance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg"
                >
                  <MessageCircle size={17} />
                  <span>WhatsApp Secretariat</span>
                </a>
              </div>
            </div>

            {/* Right Column: Refined Portrait Presentation */}
            <div className="about-portrait-wrap">
              <div className="about-portrait-card-luxury">
                <div className="about-portrait-inner-frame">
                  <img
                    src="/images/swamiji.jpg"
                    alt="Pujya Swami Ji - Revered Vedic Seer and Nadi Custodian"
                    className="about-portrait-img"
                  />
                </div>
                <div className="about-portrait-caption-box">
                  <h3 className="about-portrait-name">Pujya Swami Ji</h3>
                  <p className="about-portrait-role">Vedic Seer & Custodian</p>
                  <p className="about-portrait-lineage">Hereditary Vaitheeswaran Koil Nadi Shastra Lineage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. Spiritual Philosophy & Core Teachings Section
          ==================================================================== */}
      <section className="about-teachings-section">
        <div className="container">
          <div className="about-teachings-header">
            <h2 className="section-title">The Spiritual Philosophy of Swami Ji</h2>
            <p className="section-subtitle">
              Universal principles bridging sacred Vedic metaphysics with compassionate everyday living.
            </p>
          </div>

          <div className="about-teachings-grid">
            {PHILOSOPHY_TEACHINGS.map((teaching) => {
              const IconComponent = teaching.icon;
              return (
                <div key={teaching.id} className="about-teaching-card">
                  <div className="teaching-icon-wrap">
                    <IconComponent size={26} />
                  </div>
                  <h3 className="teaching-title">{teaching.title}</h3>
                  <p className="teaching-desc">{teaching.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. Chronological Spiritual Journey & Milestones Section
          ==================================================================== */}
      <section className="about-journey-section">
        <div className="container">
          <div className="about-journey-header">
            <h2 className="section-title">A Lifetime of Service & Devotion</h2>
            <p className="section-subtitle">
              Milestones in the lifelong preservation of ancient Vedic wisdom and humanitarian guidance.
            </p>
          </div>

          <div className="about-journey-grid">
            {SPIRITUAL_MILESTONES.map((item, idx) => (
              <div key={idx} className="about-milestone-card">
                <span className="milestone-epoch-badge">{item.epoch}</span>
                <h3 className="milestone-title">{item.title}</h3>
                <p className="milestone-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. Vaitheeswaran Koil Heritage Connection Grand Banner
          ==================================================================== */}
      <section className="about-heritage-section">
        <div className="container">
          <div className="about-heritage-card-grand">
            <h2 className="heritage-grand-title">The Sanctity of Vaitheeswaran Koil</h2>
            <p className="heritage-grand-desc">
              Vaitheeswaran Koil is the traditional cradle of Nadi Astrology in Tamil Nadu. The presiding deity,
              <strong> Lord Vaidyanatha Swamy</strong> (the Supreme Divine Physician), dissolves past-life karmic afflictions and suffering.
              Swami Ji’s lineage traces directly to the hereditary palm leaf custodians of this sacred temple sanctuary,
              preserving authentic palm leaves with medicinal peacock oil and neem extracts for destined souls across the earth.
            </p>
            <div className="heritage-grand-actions">
              <Link to="/understanding-nadi" className="btn btn-secondary btn-lg">
                <BookOpen size={17} />
                <span>Learn How Nadi Shastra Works</span>
              </Link>
              <Link to="/upcoming-visits" className="btn btn-outline-gold btn-lg">
                <Globe size={17} />
                <span>View Worldwide Tour Schedule</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
