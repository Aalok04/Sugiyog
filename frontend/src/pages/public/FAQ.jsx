import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';

const faqs = [
  {
    q: 'Why is the right thumb impression used for men and the left thumb for women?',
    a: 'In ancient Vedic physiology and Nadi Shastra, masculine energy operates primarily through the Pingala (solar) nadi on the right side of the body, whereas feminine energy operates through the Ida (lunar) nadi on the left side. The Sapta Rishis calibrated their 108 palm leaf classification indexes accordingly.',
  },
  {
    q: 'Do I need to disclose my birth date, parents’ names, or horoscope before the search?',
    a: 'No. You must not disclose any personal or birth details beforehand! During the index search, the reader recites sacred Tamil lines from candidate leaves. You only answer "Yes" or "No". When the authentic leaf is found, it will spontaneously recite your exact name, your parents’ names, your current profession, and your astrological chart with complete precision.',
  },
  {
    q: 'What if my thumb impression does not yield my leaf bundle in the initial search?',
    a: 'Nadi palm leaves are sacred manuscripts that require patient seeking. If your leaf bundle is not found in the initial archive batch, our archival team in Tamil Nadu searches secondary repositories. Authentic Nadi astrology never fabricates a reading—if a leaf is not destined to be uncovered in this lifetime, you will be notified with total honesty.',
  },
  {
    q: 'How does an Online Nadi Reading work for seekers outside India?',
    a: 'You submit a clean photograph of your thumbprint along with your preferred language. Once candidate leaf bundles are retrieved from the archives in Tamil Nadu, a private video conference session is scheduled with Swami Ji. The ancient Tamil verses are chanted directly from the palm leaf and translated sentence by sentence into your chosen language (English, Hindi, etc.).',
  },
  {
    q: 'Which of the 16 Kandams should I choose first?',
    a: 'Every seeker begins with Chapter 1 (General Kaanda Kandam). This foundational chapter confirms your identity, outlines your birth horoscope, and summarizes your overall life path across all 12 astrological houses. From there, you may choose specialized chapters such as Matrimony (7), Career (10), Children (5), or Spiritual Remedies (13).',
  },
  {
    q: 'Are the recommended spiritual remedies (Shanti & Pariharam) mandatory?',
    a: 'No, remedies are entirely voluntary. Sage Agasthiya provided remedies to help dissolve karmic blockages accumulated from past lives. Common remedies include visiting sacred energy temples (such as Vaitheeswaran Koil), feeding the poor (Anna-daan), supporting cows (Go-seva), chanting protective mantras, or wearing an energized copper/silver talisman (Raksha).',
  },
  {
    q: 'In which languages are consultations conducted?',
    a: 'The palm leaves are chanted in their original classical poetic Tamil. Swami Ji and our experienced translators provide fluent, clear simultaneous translation into English, Hindi, Tamil, Telugu, Kannada, Malayalam, Gujarati, and Marathi.',
  },
  {
    q: 'Can I ask specific urgent questions regarding career, legal issues, or marriage delays?',
    a: 'Yes. In addition to full life readings, Swami Ji offers Prashna Nadi (Reading for Specific Questions), which provides direct answers from the Rishis regarding current dilemmas, imminent business decisions, pending court cases, or matrimonial obstacles.',
  },
  {
    q: 'Can I meet Swami Ji in person during his upcoming city tours?',
    a: 'Yes. Swami Ji undertakes scheduled darshan visits to various major cities and international destinations. You can check his published schedule on the "Upcoming Visits" page and reserve a confirmed personal appointment slot in advance.',
  },
  {
    q: 'Is my personal consultation kept strictly confidential?',
    a: 'Yes, 100%. All consultations, thumb impressions, audio/video recordings, and remedial counsel are handled with absolute sanctity and privacy in accordance with Swami Ji’s strict spiritual code.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-subtitle">
            Everything you need to know about thumb impression indexing, the Yes/No verification process, online readings, and sacred remedies.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-card ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp size={20} color="var(--color-secondary)" />
                  ) : (
                    <ChevronDown size={20} color="var(--color-text-muted)" />
                  )}
                </button>
                {isOpen && (
                  <div className="faq-answer-panel">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Help Box */}
          <div className="faq-help-box">
            <HelpCircle size={32} color="var(--color-primary)" />
            <h3>Have a Specific Question About Your Reading?</h3>
            <p>
              Swami Ji’s secretariat is available on WhatsApp to guide you through taking your thumbprint, scheduling your session, or answering any inquiries.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
              <a
                href="https://wa.me/919876543210?text=Hari%20Om%20Swami%20Ji%2C%20I%20have%20a%20question%20regarding%20Nadi%20Shastra%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>
              <Link to="/contact" className="btn btn-outline">
                <span>Contact Secretariat</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
