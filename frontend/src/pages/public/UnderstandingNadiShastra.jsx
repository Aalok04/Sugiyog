import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  FileText, 
  Compass, 
  Flame, 
  HeartHandshake, 
  MessageCircle 
} from 'lucide-react';

const kandamsList = [
  {
    number: 'Kandam 1',
    tamilName: 'Kaanda Kandam',
    title: 'General Overview & Life Blueprint',
    description: 'Contains a complete life summary including the seeker’s name, parents’ names, current planetary positions, life span, and an overview of all 12 astrological houses.',
    topics: 'Name verification, Birth horoscope, General lifespan, Key destiny milestones'
  },
  {
    number: 'Kandam 2',
    tamilName: 'Kudumbam & Dhanam',
    title: 'Wealth, Family & Speech',
    description: 'Illuminates family harmony, accumulation of wealth, sources of income, domestic peace, education, speech eloquence, and eyesight health.',
    topics: 'Financial prosperity, Eyesight, Speech qualities, Family lineage'
  },
  {
    number: 'Kandam 3',
    tamilName: 'Sahodara Kandam',
    title: 'Brothers & Sisters',
    description: 'Details relationships with siblings, mutual affection, unity, support, number of brothers and sisters, and ancestral sibling bonds.',
    topics: 'Brothers & sisters, Sibling harmony, Joint endeavors'
  },
  {
    number: 'Kandam 4',
    tamilName: 'Mathur & Vahanam',
    title: 'Mother, Land & Assets',
    description: 'Examines the role and health of the mother, ancestral lands, real estate acquisitions, own houses, luxury conveyances, and material comforts.',
    topics: 'Maternal health, Property ownership, Vehicles, Real estate'
  },
  {
    number: 'Kandam 5',
    tamilName: 'Puthira Kandam',
    title: 'Children & Progeny',
    description: 'Analyzes childbirth timing, causes of delay or childlessness, spiritual pariharams for conceiving, and the future prosperity and achievements of offspring.',
    topics: 'Conception, Progeny delays, Child accomplishments, Remedial prayers'
  },
  {
    number: 'Kandam 6',
    tamilName: 'Runa, Roga & Sathru',
    title: 'Debts, Diseases & Enemies',
    description: 'Unveils physical ailments, chronic illnesses, debts, financial burdens, litigation, court disputes, and methods to triumph over visible and hidden adversaries.',
    topics: 'Chronic ailments, Debt clearance, Court cases, Enemy protection'
  },
  {
    number: 'Kandam 7',
    tamilName: 'Vivaham & Kalathiram',
    title: 'Matrimony & Life Partner',
    description: 'Predicts the ideal time of marriage, direction of arrival of the spouse, partner’s character, planetary compatibility, and reasons for marital delays.',
    topics: 'Marriage timing, Soulmate attributes, Compatibility, Marital stability'
  },
  {
    number: 'Kandam 8',
    tamilName: 'Ayur Kandam',
    title: 'Longevity & Vitality',
    description: 'Discusses lifespan, dangerous planetary transits (Maraka periods), mitigation of accidental injuries, and practices to sustain vitality and longevity.',
    topics: 'Longevity forecast, Critical ages, Accident mitigation, Health preservation'
  },
  {
    number: 'Kandam 9',
    tamilName: 'Pithru & Bhagyam',
    title: 'Father, Guru & Fortune',
    description: 'Focuses on paternal relationship, father’s lifespan and health, ancestral legacy, fortune, dharmic temple visits, and spiritual mentors (Gurus).',
    topics: 'Father’s welfare, Ancestral karma, Fortune, Pilgrimages'
  },
  {
    number: 'Kandam 10',
    tamilName: 'Thozhil & Karma',
    title: 'Profession, Business & Career',
    description: 'Offers precise forecasts regarding career growth, business ventures, job transitions, promotions, social status, and professional elevation.',
    topics: 'Ideal career path, Business expansions, Job shifts, Financial elevation'
  },
  {
    number: 'Kandam 11',
    tamilName: 'Labha Kandam',
    title: 'Gains, Windfalls & Second Marriage',
    description: 'Details secondary income sources, speculative profits, gifts, financial windfalls, and indicators of remarriage or second alliance where applicable.',
    topics: 'Secondary income, Speculative gains, Additional alliances'
  },
  {
    number: 'Kandam 12',
    tamilName: 'Vrayam & Moksha',
    title: 'Expenditure, Foreign Travel & Salvation',
    description: 'Examines expenditure patterns, international relocation or foreign travel, next incarnation, spiritual evolution, and the path to ultimate liberation (Moksha).',
    topics: 'Foreign settlement, Spiritual liberation, Next incarnation, Major expenses'
  },
  {
    number: 'Kandam 13',
    tamilName: 'Shanti & Pariharam',
    title: 'Past-Life Karma & Spiritual Remedies',
    description: 'Details the sins committed in prior births (Purva Janma Sanchita Karma) causing present suffering, and prescribes specific temple rituals, poojas, and charitable acts.',
    topics: 'Past-life sins, Temple poojas, Navagraha pariharams, Daan & Anna-daan'
  },
  {
    number: 'Kandam 14',
    tamilName: 'Deekshai Kandam',
    title: 'Sacred Mantra & Talisman (Raksha)',
    description: 'Prescribes potent sacred mantras, diksha initiation, and energized copper/silver talismans (Raksha) to ward off negative energetic forces and evil eye.',
    topics: 'Mantra japa, Raksha talisman, Spiritual shield, Energetic protection'
  },
  {
    number: 'Kandam 15',
    tamilName: 'Aushadha Kandam',
    title: 'Herbal Medicine & Healing',
    description: 'Reveals ancient Siddha and Ayurvedic herbal formulations and healing regimens prescribed by Sage Dhanvantari and Agasthiyar for chronic diseases.',
    topics: 'Siddha formulations, Herbal healing, Diet regimens, Chronic disease relief'
  },
  {
    number: 'Kandam 16',
    tamilName: 'Dasa Bhukthi Kandam',
    title: 'Planetary Major & Sub-Periods',
    description: 'Provides granular, chronological predictions aligned with your active Mahadasa and Antardasa, outlining favorable and unfavorable planetary windows.',
    topics: 'Planetary periods, Transit effects, Timing of events, Auspicious phases'
  }
];

export default function UnderstandingNadiShastra() {
  return (
    <div className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h1 className="section-title">Understanding Ancient Nadi Shastra</h1>
          <p className="section-subtitle">
            The extraordinary mystical science of destiny inscribed on sacred palm leaves (*Ola Suvadi*) by Maharishi Agasthiya and the Sapta Rishis.
          </p>
        </div>

        <div className="nadi-guide-container">
          {/* Sacred Heritage Banner */}
          <div className="sacred-heritage-card">
            <h2>The Legacy of Vaitheeswaran Koil & Sage Agasthiya</h2>
            <p>
              Nadi Shastra has its sacred heart in <strong>Vaitheeswaran Koil, Tamil Nadu</strong>, the holy shrine of Lord Vaidyanatha Swamy—the celestial divine healer who cures past karmic afflictions.
            </p>
            <p>
              Thousands of years ago, the great Siddha Purusha <strong>Maharishi Agasthiya</strong>, endowed with divine clairvoyance (*Divya Drishti*), foresaw the souls who would reincarnate in modern times seeking spiritual guidance. With deep compassion, he inscribed their horoscopes, life trajectories, past-birth karmas, and exact remedies onto treated palm leaves using ancient Tamil poetic script (*Vatta Ezhuthu*).
            </p>
            <p>
              Preserved across generations through royal patronage of the Chola Empire and hereditary custodians, these leaves await their destined seekers at the exact appointed hour.
            </p>
          </div>

          {/* How the Search Works */}
          <div className="nadi-story-card">
            <h2>The Sacred Science of Thumbprint Matching</h2>
            <p>
              Unlike conventional astrology which requires prior disclosure of your birth date and exact time, Nadi Shastra relies entirely on your <strong>unique thumb impression</strong> as the master celestial key.
            </p>

            <div className="thumbprint-rules-grid">
              <div className="thumbprint-rule-card">
                <div className="thumbprint-rule-icon">♂</div>
                <div className="thumbprint-rule-content">
                  <h3>Right Thumb for Men</h3>
                  <p>Men must provide their right thumb impression on plain white paper. The solar (Pingala) energetic nadi governs masculine destiny pathways.</p>
                </div>
              </div>

              <div className="thumbprint-rule-card">
                <div className="thumbprint-rule-icon">♀</div>
                <div className="thumbprint-rule-content">
                  <h3>Left Thumb for Women</h3>
                  <p>Women must provide their left thumb impression on plain white paper. The lunar (Ida) energetic nadi governs feminine destiny pathways.</p>
                </div>
              </div>
            </div>

            <p>
              The ancient Rishis classified all human thumb impressions into <strong>108 distinct patterns</strong>, such as <em>Chakra</em> (circle whorls), <em>Shankha</em> (conch formations), <em>Dhanus</em> (bow arches), and loops. Each pattern points to specific manuscript bundles containing the destined leaves.
            </p>
          </div>

          {/* The Yes/No Leaf Verification Process */}
          <div className="nadi-story-card">
            <h2>The Index Verification: The Mystery of "Yes or No"</h2>
            <p>
              Finding your exact leaf is a sacred process of elimination. Once the bundles matching your thumbprint pattern are fetched, the Nadi reader begins reading index lines in ancient poetic Tamil:
            </p>

            <div className="verification-box">
              <h3>Strict Rule: Answer Only "Yes" or "No"</h3>
              <p>
                During the search, the reader recites index statements from each candidate leaf (e.g. <em>"You are the eldest child"</em>, <em>"Your father’s name has 4 syllables related to Lord Shiva"</em>, <em>"You work in technology or international trade"</em>). 
              </p>
              <p>
                <strong>You must not reveal your name, family details, or horoscope beforehand!</strong> You only reply with "Yes" or "No". If a statement is incorrect, that leaf is turned over and the next leaf is checked.
              </p>
              <p>
                When your destined leaf appears, <strong>every single statement will match with 100% precision</strong>—verifying your exact name, your parents' names, your spouse's name, your date of birth, your astrological planetary positions, and the exact reasons you sought this consultation today.
              </p>
            </div>
          </div>

          {/* The 16 Kandams Overview */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--color-primary)' }}>The 16 Sacred Kandams (Chapters)</h2>
              <p style={{ maxWidth: 700, margin: '0 auto', color: 'var(--color-text-muted)' }}>
                Nadi Shastra divides human experience into 16 distinct life chapters. Chapter 1 (General Kaandam) is the foundational starting point, followed by specialized chapters chosen according to your life priorities.
              </p>
            </div>

            <div className="kandams-full-grid">
              {kandamsList.map((kandam, idx) => (
                <div key={idx} className="kandam-detailed-card">
                  <div className="kandam-header-row">
                    <span className="kandam-number-tag">{kandam.number}</span>
                    <span className="kandam-tamil-name">{kandam.tamilName}</span>
                  </div>
                  <h3 className="kandam-title">{kandam.title}</h3>
                  <p className="kandam-description">{kandam.description}</p>
                  <div className="kandam-topics">
                    <strong>Key Aspects:</strong> {kandam.topics}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spiritual Remedies (Shanti & Pariharam) */}
          <div className="nadi-story-card">
            <h2>Spiritual Remedies (Shanti & Pariharam)</h2>
            <p>
              Nadi Shastra is not fatalistic. Sage Agasthiya emphasizes that while past karmic debts (*Prarabdha Karma*) create obstacles, sincere spiritual remedies (*Pariharams*) can soften, neutralize, or completely resolve them.
            </p>
            <p>
              Remedies prescribed in Chapter 13 are ethical, sacred, and rooted in Sanatana Dharma:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: 'var(--color-text)', lineHeight: '1.8' }}>
              <li><strong>Temple Energy Vortexes:</strong> Performing poojas at consecrated temples such as Vaitheeswaran Koil (healing), Thirunallar (Saturn relief), or Kalahasti (Rahu-Ketu peace).</li>
              <li><strong>Charity & Seva (Anna-Daan):</strong> Feeding the underprivileged, cows (Go-Seva), or supporting orphanages and spiritual students.</li>
              <li><strong>Mantra Japa:</strong> Chanting specific sacred sound frequencies to shield your aura from negative planetary transits.</li>
              <li><strong>Energized Raksha:</strong> Wearing consecrated yantras to maintain mental peace and prosperity.</li>
            </ul>
          </div>

          {/* Languages Supported */}
          <div className="nadi-story-card" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>Consultations Available in Multiple Languages</h2>
            <p style={{ maxWidth: 640, margin: '0 auto var(--space-4)' }}>
              While the palm leaves are sung in their original 2,000-year-old classical Tamil poetic verses, Swami Ji provides fluent, compassionate explanations with live simultaneous translation into:
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Gujarati', 'Marathi'].map((lang) => (
                <span key={lang} className="lang-pill" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="nadi-cta-banner">
            <h2>Ready to Discover Your Destined Palm Leaf?</h2>
            <p>
              Connect with Swami Ji through a live online video consultation from anywhere in the world, or reserve an appointment during his upcoming city tours.
            </p>
            <div className="cta-actions">
              <Link to="/book" className="btn btn-primary btn-lg">
                <FileText size={18} />
                <span>Book a Consultation</span>
              </Link>
              <a 
                href="https://wa.me/919876543210?text=Hari%20Om%20Swami%20Ji%2C%20I%20would%20like%20to%20learn%20more%20about%20my%20Nadi%20Shastra%20reading%20and%20submit%20my%20thumbprint."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                <MessageCircle size={18} />
                <span>Submit Thumbprint on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
