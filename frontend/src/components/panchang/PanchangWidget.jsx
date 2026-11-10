import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Clock, Calendar, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PanchangWidget() {
  const [currentDate, setCurrentDate] = useState('');
  const [dayName, setDayName] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-US', options));
    setDayName(today.toLocaleDateString('hi-IN', { weekday: 'long' }) || 'शुभ वार');
  }, []);

  return (
    <section className="panchang-widget-section">
      <div className="container">
        <div className="panchang-widget-card">
          {/* Header Bar */}
          <div className="panchang-header">
            <div className="panchang-header-left">
              <div className="panchang-sun-badge">
                <Sun size={24} />
              </div>
              <div>
                <div className="panchang-sub-title">
                  <span className="live-dot"></span>
                  <span>Daily Vedic Calendar • आज का पंचांग</span>
                </div>
                <h3 className="panchang-main-title">
                  Today's Auspicious Timings & Shubh Muhurat
                </h3>
              </div>
            </div>

            <div className="panchang-header-right">
              <div className="panchang-date-box">
                <Calendar size={16} />
                <span>{currentDate || 'Vedic Panchang Today'}</span>
              </div>
              <span className="panchang-hindu-day">{dayName}</span>
            </div>
          </div>

          {/* 4 Core Vedic Dimensions */}
          <div className="panchang-grid">
            {/* 1. Tithi */}
            <div className="panchang-item">
              <div className="panchang-item-top">
                <div className="panchang-icon-circle icon-tithi">
                  <Moon size={18} />
                </div>
                <span className="panchang-item-tag tag-shubh">Shubh Tithi</span>
              </div>
              <div className="panchang-item-label">Current Tithi</div>
              <div className="panchang-item-value">Shukla Paksha Ekadashi</div>
              <div className="panchang-item-desc">
                Highly auspicious for ancestral karma clearing & Nadi readings.
              </div>
            </div>

            {/* 2. Shubh Muhurat (Abhijit) */}
            <div className="panchang-item panchang-highlight-item">
              <div className="panchang-item-top">
                <div className="panchang-icon-circle icon-muhurat">
                  <Sparkles size={18} />
                </div>
                <span className="panchang-item-tag tag-best">Most Auspicious</span>
              </div>
              <div className="panchang-item-label">Abhijit Muhurat (शुभ काल)</div>
              <div className="panchang-item-value highlight-time">11:48 AM – 12:38 PM</div>
              <div className="panchang-item-desc">
                Ideal celestial window for initiating consultations & new endeavors.
              </div>
            </div>

            {/* 3. Rahu Kaal */}
            <div className="panchang-item">
              <div className="panchang-item-top">
                <div className="panchang-icon-circle icon-rahu">
                  <Clock size={18} />
                </div>
                <span className="panchang-item-tag tag-caution">Varjyam Window</span>
              </div>
              <div className="panchang-item-label">Rahu Kaal (राहु काल)</div>
              <div className="panchang-item-value">04:30 PM – 06:00 PM</div>
              <div className="panchang-item-desc">
                Traditional caution period; prayer and mantra japa recommended.
              </div>
            </div>

            {/* 4. Nakshatra & Deity */}
            <div className="panchang-item">
              <div className="panchang-item-top">
                <div className="panchang-icon-circle icon-nakshatra">
                  <Sun size={18} />
                </div>
                <span className="panchang-item-tag tag-celestial">Nakshatra</span>
              </div>
              <div className="panchang-item-label">Uttara Ashadha • Preeti Yoga</div>
              <div className="panchang-item-value">Presiding Deity: Agasthiyar</div>
              <div className="panchang-item-desc">
                Awakens clarity, truth revelation, and removes past obstacles.
              </div>
            </div>
          </div>

          {/* Footer Bar with Sacred Rishi Quote & CTA */}
          <div className="panchang-footer">
            <div className="panchang-rishi-verse">
              <span className="rishi-symbol">ॐ</span>
              <p className="rishi-text">
                "Sage Agasthiyar inscribed each palm leaf when stars aligned in supreme harmony. 
                Discover your soul's appointed time."
              </p>
            </div>

            <div className="panchang-cta-cluster">
              <Link to="/book" className="btn btn-primary btn-sm">
                <span>Book Reading in Shubh Muhurat</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
