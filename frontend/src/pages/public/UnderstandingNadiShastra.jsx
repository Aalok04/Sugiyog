import React, { useState, useMemo } from 'react';
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
  MessageCircle,
  Coins,
  Users,
  Home,
  Baby,
  ShieldAlert,
  Heart,
  Activity,
  Crown,
  Briefcase,
  TrendingUp,
  Globe,
  Leaf,
  Clock,
  Search,
  X,
  CheckCircle2,
  Sun,
  Moon,
  Landmark,
  Languages
} from 'lucide-react';

const KANDAMS_DATA = [
  {
    id: 1,
    number: 'Kandam 1',
    numeral: '01',
    tamilName: 'பொதுக் காண்டம் • Kaanda Kandam',
    title: 'General Overview & Life Blueprint',
    category: 'core',
    categoryLabel: 'Core Life Destiny',
    badge: '★ Foundational Chapter',
    icon: Compass,
    description: 'The master life blueprint revealing the seeker’s exact name, parents’ names, current planetary positions, overall lifespan, and a comprehensive reading across all 12 astrological houses.',
    topics: ['Name & Lineage Verification', '12 Astrological Houses', 'Destiny Milestones', 'General Lifespan Overview']
  },
  {
    id: 2,
    number: 'Kandam 2',
    numeral: '02',
    tamilName: 'குடும்பம் & தனம் • Kudumbam & Dhanam',
    title: 'Wealth, Family & Speech Eloquence',
    category: 'wealth',
    categoryLabel: 'Wealth & Prosperity',
    badge: '💰 Financial & Domestic Harmony',
    icon: Coins,
    description: 'Illuminates family heritage, wealth accumulation, sources of income, financial stability, domestic harmony, higher learning, speech faculties, and eyesight well-being.',
    topics: ['Financial Prosperity', 'Ancestral Wealth', 'Domestic Harmony', 'Speech & Education']
  },
  {
    id: 3,
    number: 'Kandam 3',
    numeral: '03',
    tamilName: 'சகோதர காண்டம் • Sahodara Kandam',
    title: 'Brothers, Sisters & Sibling Bonds',
    category: 'family',
    categoryLabel: 'Kinship & Courage',
    badge: '🤝 Sibling Unity',
    icon: Users,
    description: 'Details relationships with brothers and sisters, mutual unity, number of siblings, shared ancestral enterprises, courage, and communication faculties.',
    topics: ['Sibling Affection', 'Number of Brothers & Sisters', 'Joint Enterprises', 'Courage & Resolution']
  },
  {
    id: 4,
    number: 'Kandam 4',
    numeral: '04',
    tamilName: 'மாதுர் & வாகனம் • Mathur & Vahanam',
    title: 'Mother, Ancestral Land & Assets',
    category: 'family',
    categoryLabel: 'Assets & Comforts',
    badge: '🏡 Land & Vehicles',
    icon: Home,
    description: 'Examines maternal health, ancestral real estate acquisitions, own residential properties, vehicles, luxury conveyances, and lifelong household peace.',
    topics: ['Maternal Well-being', 'Property Ownership', 'Luxury Conveyances', 'Ancestral Land Heritage']
  },
  {
    id: 5,
    number: 'Kandam 5',
    numeral: '05',
    tamilName: 'புத்திர காண்டம் • Puthira Kandam',
    title: 'Children, Progeny & Lineage Blessings',
    category: 'family',
    categoryLabel: 'Progeny & Future',
    badge: '👶 Lineage Continuity',
    icon: Baby,
    description: 'Analyzes conception timings, reasons for childbearing delays, remedies for progeny blessings, and the future career, virtues, and renown of your children.',
    topics: ['Conception Timings', 'Progeny Obstacle Remedies', 'Child Renown & Achievements', 'Family Lineage Blessings']
  },
  {
    id: 6,
    number: 'Kandam 6',
    numeral: '06',
    tamilName: 'ருண, ரோக & சத்ரு • Runa, Roga & Sathru',
    title: 'Debts, Diseases & Adversary Protection',
    category: 'remedies',
    categoryLabel: 'Protection & Health',
    badge: '🛡️ Relief & Clearance',
    icon: ShieldAlert,
    description: 'Diagnoses chronic physical ailments, financial liabilities, litigation, court disputes, and sacred Vedic remedial ways to triumph over visible and invisible obstacles.',
    topics: ['Chronic Health Reversal', 'Debt Clearance Pathways', 'Legal & Court Disputes', 'Adversary Protection']
  },
  {
    id: 7,
    number: 'Kandam 7',
    numeral: '07',
    tamilName: 'விவாகம் & களத்திரம் • Vivaham & Kalathiram',
    title: 'Matrimony & Destined Soulmate',
    category: 'family',
    categoryLabel: 'Sacred Alliance',
    badge: '💍 Soulmate & Marriage',
    icon: Heart,
    description: 'Predicts auspicious marriage timing, direction of arrival of the destined spouse, physical & planetary attributes, reasons for marital delays, and life harmony.',
    topics: ['Auspicious Marriage Timing', 'Soulmate Attributes', 'Direction of Partner Arrival', 'Marital Harmony']
  },
  {
    id: 8,
    number: 'Kandam 8',
    numeral: '08',
    tamilName: 'ஆயுர் காண்டம் • Ayur Kandam',
    title: 'Longevity, Vitality & Danger Mitigation',
    category: 'remedies',
    categoryLabel: 'Vital Life Force',
    badge: '⚡ Lifespan & Vitality',
    icon: Activity,
    description: 'Calculates lifespan, critical planetary transit windows (Maraka periods), safeguarding vital energies, and practices to mitigate severe accidents.',
    topics: ['Lifespan Calculations', 'Maraka Transit Periods', 'Accident Mitigation', 'Vital Pranic Preservation']
  },
  {
    id: 9,
    number: 'Kandam 9',
    numeral: '09',
    tamilName: 'பித்ரு & பாக்யம் • Pithru & Bhagyam',
    title: 'Father, Spiritual Guru & Divine Fortune',
    category: 'family',
    categoryLabel: 'Dharma & Heritage',
    badge: '✨ Divine Grace & Fortune',
    icon: Crown,
    description: 'Focuses on paternal welfare, ancestral karmic heritage, blessings from enlightened gurus, high-energy temple pilgrimages, and sudden turns of divine fortune.',
    topics: ['Father’s Health & Fortune', 'Ancestral Pithru Karma', 'Guru Diksha & Guidance', 'Sacred Temple Journeys']
  },
  {
    id: 10,
    number: 'Kandam 10',
    numeral: '10',
    tamilName: 'தொழில் & கர்மா • Thozhil & Karma',
    title: 'Profession, Business & Career Elevation',
    category: 'wealth',
    categoryLabel: 'Vocation & Enterprise',
    badge: '💼 Professional Breakthrough',
    icon: Briefcase,
    description: 'Provides exact forecasts regarding ideal career vocations, enterprise ventures, job transitions, promotions, social repute, and professional zenith.',
    topics: ['Ideal Vocational Path', 'Enterprise Breakthroughs', 'Job Transitions & Promotions', 'Social Status & Repute']
  },
  {
    id: 11,
    number: 'Kandam 11',
    numeral: '11',
    tamilName: 'லாப காண்டம் • Labha Kandam',
    title: 'Gains, Speculative Profits & Secondary Income',
    category: 'wealth',
    categoryLabel: 'Profits & Alliances',
    badge: '📈 Windfalls & Profits',
    icon: TrendingUp,
    description: 'Illuminates secondary income sources, business alliances, windfalls, asset appreciation, and indicators of second marriages or secondary partnerships where destined.',
    topics: ['Secondary Income Streams', 'Speculative Windfalls', 'Commercial Alliances', 'Material Prosperity']
  },
  {
    id: 12,
    number: 'Kandam 12',
    numeral: '12',
    tamilName: 'விரயம் & மோக்ஷம் • Vrayam & Moksha',
    title: 'Expenditure, Foreign Settlement & Salvation',
    category: 'core',
    categoryLabel: 'Liberation & Journeys',
    badge: '🌍 Foreign Land & Moksha',
    icon: Globe,
    description: 'Examines international relocation, foreign settlement, financial outlays, next incarnation forecast, and spiritual practices leading toward ultimate soul liberation (Moksha).',
    topics: ['Foreign Relocation & Settlement', 'Expenditure Patterns', 'Next Incarnation Forecast', 'Moksha & Spiritual Liberation']
  },
  {
    id: 13,
    number: 'Kandam 13',
    numeral: '13',
    tamilName: 'சாந்தி & பரிகாரம் • Shanti & Pariharam',
    title: 'Past-Life Karma & Sacred Remedies',
    category: 'remedies',
    categoryLabel: 'Karmic Resolution',
    badge: '🔥 Sanchita Karma Dissolution',
    icon: Flame,
    description: 'Inscribes the specific actions committed in prior births (Purva Janma Sanchita Karma) causing current obstacles, prescribing consecrated temple rituals and benevolent charity (Daan).',
    topics: ['Past-Birth Karma Identification', 'Consecrated Temple Poojas', 'Navagraha Pariharams', 'Anna-Daan & Cow Seva']
  },
  {
    id: 14,
    number: 'Kandam 14',
    numeral: '14',
    tamilName: 'தீக்ஷை காண்டம் • Deekshai Kandam',
    title: 'Sacred Mantra Initiation & Raksha Talisman',
    category: 'remedies',
    categoryLabel: 'Energetic Shielding',
    badge: '🛡️ Divine Mantra Initiation',
    icon: ShieldCheck,
    description: 'Prescribes consecrated Vedic mantras, diksha initiation, and energized copper/silver talismans (Raksha) to permanently neutralize negative energies and the evil eye.',
    topics: ['Sacred Mantra Diksha', 'Energized Raksha Talisman', 'Aura Shielding', 'Drishti / Evil Eye Neutralization']
  },
  {
    id: 15,
    number: 'Kandam 15',
    numeral: '15',
    tamilName: 'ஔஷத காண்டம் • Aushadha Kandam',
    title: 'Siddha Herbal Formulations & Healing',
    category: 'remedies',
    categoryLabel: 'Vedic Healing',
    badge: '🌿 Ancient Siddha Medicine',
    icon: Leaf,
    description: 'Discloses traditional Siddha and Ayurvedic herbal formulations and healing dietary regimens prescribed by Maharishi Agasthiyar and Dhanvantari for chronic ailments.',
    topics: ['Siddha Herbal Regimens', 'Dietary Healing Guidelines', 'Chronic Ailment Reversal', 'Pranic Vitality Restoration']
  },
  {
    id: 16,
    number: 'Kandam 16',
    numeral: '16',
    tamilName: 'தசா புத்தி காண்டம் • Dasa Bhukthi Kandam',
    title: 'Planetary Periods & Celestial Timings',
    category: 'core',
    categoryLabel: 'Celestial Periods',
    badge: '⏳ Planetary Mahadasa Mapping',
    icon: Clock,
    description: 'Maps granular, chronological predictions aligned with your active Mahadasa and Antardasa, identifying exact celestial windows for action, caution, and spiritual elevation.',
    topics: ['Active Mahadasa & Antardasa', 'Planetary Transit Timings', 'Favorable Action Windows', 'Chronological Destiny Cycles']
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All 16 Kandams', icon: Sparkles },
  { id: 'core', label: 'Core Destiny & Soul', icon: Compass },
  { id: 'wealth', label: 'Wealth & Career', icon: Briefcase },
  { id: 'family', label: 'Marriage & Family', icon: Heart },
  { id: 'remedies', label: 'Remedies & Healing', icon: Flame },
];

export default function UnderstandingNadiShastra() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredKandams = useMemo(() => {
    return KANDAMS_DATA.filter((kandam) => {
      // Category check
      const matchesCategory = activeCategory === 'all' || kandam.category === activeCategory;

      // Search query check
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = kandam.title.toLowerCase().includes(q);
      const matchDesc = kandam.description.toLowerCase().includes(q);
      const matchTamil = kandam.tamilName.toLowerCase().includes(q);
      const matchNum = kandam.number.toLowerCase().includes(q);
      const matchTopics = kandam.topics.some((t) => t.toLowerCase().includes(q));

      return matchTitle || matchDesc || matchTamil || matchNum || matchTopics;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>🚩 Maharishi Agasthiyar Tradition • 108 Sacred Classifications</span>
          </div>
          <h1 className="section-title">Understanding Ancient Nadi Shastra</h1>
          <p className="section-subtitle">
            The extraordinary science of human destiny inscribed on preserved palm leaves (Olai Chuvadi)
            by Maharishi Agasthiyar and the Sapta Rishis over 2,000 years ago in Tamil Nadu.
          </p>
        </div>

        <div className="nadi-guide-container">
          {/* 1. Sacred Heritage Banner */}
          <div className="sacred-heritage-card">
            <h2>The Sacred Legacy of Vaitheeswaran Koil & Sage Agasthiyar</h2>
            <p>
              Nadi Shastra has its sacred home in <strong>Vaitheeswaran Koil, Tamil Nadu</strong>, the holy shrine of Lord Vaidyanatha Swamy—the celestial divine healer who dissolves past karmic afflictions.
            </p>
            <p>
              Thousands of years ago, the revered Siddha Purusha <strong>Maharishi Agasthiyar</strong>, endowed with divine clairvoyance (*Divya Drishti*), foresaw the individual souls who would seek guidance in the modern era. With supreme compassion, he inscribed their horoscopes, karmic blueprints, and exact Pariharam remedies onto treated palm leaves using ancient Tamil poetic script (*Vatta Ezhuthu*).
            </p>
            <p>
              Preserved across generations through hereditary custodians and royal patronage, these leaves await their destined seekers at the celestial hour of their seeking.
            </p>
          </div>

          {/* 2. The Science of Thumbprint Matching */}
          <div className="nadi-story-card">
            <h2>The Sacred Science of Thumbprint Matching</h2>
            <p>
              Unlike conventional astrology which requires prior disclosure of birth dates and times, Nadi Shastra relies entirely on your <strong>unique thumb impression</strong> as the master celestial index key.
            </p>

            <div className="thumbprint-rules-grid">
              <div className="thumbprint-rule-card">
                <div className="thumbprint-rule-icon">
                  <Sun size={26} />
                </div>
                <div className="thumbprint-rule-content">
                  <h3>Right Thumb for Men</h3>
                  <p>
                    Men provide their right thumb impression on plain white paper. The solar (<strong>Pingala Surya Nadi</strong>) energetic meridian governs masculine destiny pathways.
                  </p>
                </div>
              </div>

              <div className="thumbprint-rule-card">
                <div className="thumbprint-rule-icon">
                  <Moon size={26} />
                </div>
                <div className="thumbprint-rule-content">
                  <h3>Left Thumb for Women</h3>
                  <p>
                    Women provide their left thumb impression on plain white paper. The lunar (<strong>Ida Chandra Nadi</strong>) energetic meridian governs feminine destiny pathways.
                  </p>
                </div>
              </div>
            </div>

            <p style={{ margin: 0 }}>
              The ancient Rishis classified all human thumb impressions into <strong>108 distinct classical whorl patterns</strong> (such as <em>Chakra</em>, <em>Shankha</em>, and <em>Dhanus</em>). Each pattern points directly to specific archived bundles containing candidate palm leaves.
            </p>
          </div>

          {/* 3. The Yes/No Leaf Verification Process */}
          <div className="nadi-story-card">
            <h2>The Index Verification: The Sacred Mystery of "Yes or No"</h2>
            <p>
              Finding your destined palm leaf is an authentic, sacred process of elimination. Once the bundles matching your thumbprint classification are retrieved from the archives, Swami Ji recites verifying index verses:
            </p>

            <div className="verification-box">
              <div className="verification-box-header">
                <span className="verification-badge">Sacred Rule</span>
                <h3>Answer Only "Yes" or "No"</h3>
              </div>
              <p>
                During the search, index verses are recited (e.g. <em>"Your father’s name has 4 syllables related to Lord Shiva"</em>, <em>"You have one elder brother and one sister"</em>, <em>"You work in international trade or technology"</em>).
              </p>
              <p>
                <strong>You disclose zero personal information upfront!</strong> You only reply with a clear "Yes" or "No". If any statement does not match your life, that leaf is set aside and the next leaf is checked.
              </p>
              <p style={{ margin: 0 }}>
                When your destined leaf appears, <strong>every single statement matches with 100% precision</strong>—verifying your name, your parents' names, your spouse's name, your exact birth planetary alignments, and the precise questions you carry today.
              </p>
            </div>
          </div>

          {/* 4. The 16 Sacred Kandams Section (Elevated UI/UX) */}
          <div id="kandams">
            <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
              <div className="section-eyebrow">
                <span>The 16 Life Chapters</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--color-text)', marginBottom: 'var(--space-3)' }}>
                The 16 Sacred Kandams (Life Chapters)
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>
                Nadi Shastra partitions human experience into 16 distinct life chapters inscribed by Sage Agasthiyar.
                Chapter 1 is the foundational general reading, followed by specialized chapters chosen according to your life priorities.
              </p>
            </div>

            {/* Filter & Live Search Toolbar */}
            <div className="kandams-toolbar">
              <div className="kandams-search-row">
                <div className="kandams-search-box">
                  <Search size={18} className="kandams-search-icon" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic (e.g. marriage, career, debts, children, remedies, health)..."
                    className="kandams-search-input"
                    aria-label="Search Kandams by topic"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="kandams-clear-btn"
                      aria-label="Clear search query"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="kandams-count-pill">
                  <span>Showing {filteredKandams.length} of 16 Chapters</span>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="kandams-categories-row" role="tablist" aria-label="Kandam categories">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`category-filter-btn ${isActive ? 'active' : ''}`}
                      role="tab"
                      aria-selected={isActive}
                    >
                      <Icon size={14} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Kandams Grid */}
            <div className="kandams-full-grid">
              {filteredKandams.length > 0 ? (
                filteredKandams.map((kandam) => {
                  const Icon = kandam.icon;
                  return (
                    <div key={kandam.id} className="kandam-card-v2">
                      {/* Top Saffron Accent Bar */}
                      <div className="kandam-card-accent-bar"></div>
                      
                      {/* Watermark Numeral */}
                      <div className="kandam-watermark-num">{kandam.numeral}</div>

                      {/* Header Ribbon & Tamil Inscription */}
                      <div className="kandam-top-meta">
                        <div className="kandam-badge-cluster">
                          <span className="kandam-tag-pill">{kandam.number}</span>
                          <span className={`kandam-status-ribbon ribbon-${kandam.category}`}>
                            {kandam.badge}
                          </span>
                        </div>
                        <span className="kandam-tamil-script">{kandam.tamilName}</span>
                      </div>

                      {/* Title & Icon Header */}
                      <div className="kandam-title-row">
                        <div className="kandam-icon-box" aria-hidden="true">
                          <Icon size={24} />
                        </div>
                        <div>
                          <h3 className="kandam-title-v2">{kandam.title}</h3>
                          <span className="kandam-category-label">{kandam.categoryLabel}</span>
                        </div>
                      </div>

                      {/* Narrative Description */}
                      <p className="kandam-desc-v2">{kandam.description}</p>

                      {/* Key Aspects Tag Cloud */}
                      <div className="kandam-aspects-section">
                        <span className="kandam-aspects-heading">Key Life Dimensions Inscribed:</span>
                        <div className="kandam-pills-wrap">
                          {kandam.topics.map((topic, i) => (
                            <span key={i} className="aspect-pill">
                              <Sparkles size={11} className="aspect-sparkle" />
                              <span>{topic}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer Action */}
                      <div className="kandam-card-footer">
                        <Link
                          to={`/book?kandam=${kandam.id}`}
                          className="btn btn-outline btn-sm kandam-consult-btn"
                        >
                          <span>Consult for {kandam.number}</span>
                          <ArrowRight size={14} className="kandam-btn-arrow" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="kandams-empty-state">
                  <div className="empty-state-icon">
                    <Search size={28} />
                  </div>
                  <h3>No matching life chapters found</h3>
                  <p>
                    We couldn't find any Kandam matching "<strong>{searchQuery}</strong>". Try clearing your search or switching categories.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    View All 16 Sacred Kandams
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 5. Spiritual Remedies (Shanti & Pariharam) */}
          <div className="nadi-story-card">
            <h2>Spiritual Remedies (Shanti & Pariharam)</h2>
            <p>
              Nadi Shastra is never fatalistic. Sage Agasthiyar emphasizes that while past karmic debts (*Prarabdha Karma*) create present trials, sincere, ethical spiritual remedies (*Pariharams*) can soften, neutralize, or dissolve them entirely.
            </p>
            <p>
              Remedies prescribed in Chapter 13 are ethical, compassionate, and deeply rooted in Vedic dharma:
            </p>

            <div className="remedies-grid-4">
              <div className="remedy-card">
                <div className="remedy-icon-circle">
                  <Landmark size={24} />
                </div>
                <h3 className="remedy-card-title">Temple Energy Vortexes</h3>
                <p className="remedy-card-desc">
                  Performing sankalpam and poojas at consecrated temples such as Vaitheeswaran Koil (healing), Thirunallar (Saturn relief), or Sri Kalahasti (Rahu-Ketu peace).
                </p>
              </div>

              <div className="remedy-card">
                <div className="remedy-icon-circle">
                  <HeartHandshake size={24} />
                </div>
                <h3 className="remedy-card-title">Charity & Seva (Daan)</h3>
                <p className="remedy-card-desc">
                  Sacred acts of feeding the underprivileged (Anna-Daan), venerating holy cows (Go-Seva), and supporting orphanages and Vedic students.
                </p>
              </div>

              <div className="remedy-card">
                <div className="remedy-icon-circle">
                  <Sparkles size={24} />
                </div>
                <h3 className="remedy-card-title">Sacred Mantra Japa</h3>
                <p className="remedy-card-desc">
                  Chanting specific seed frequencies (Beeja Mantras) inscribed on your leaf to shield your aura from unfavorable planetary transit windows.
                </p>
              </div>

              <div className="remedy-card">
                <div className="remedy-icon-circle">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="remedy-card-title">Energized Raksha</h3>
                <p className="remedy-card-desc">
                  Consecrated yantras and silver/copper talismans energized with your planetary alignment to maintain lasting mental serenity and protection.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Languages Supported */}
          <div className="nadi-story-card" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: 'var(--space-2)' }}>Consultations Available in Multiple Languages</h2>
            <p style={{ maxWidth: 660, margin: '0 auto var(--space-5)', color: 'var(--color-text-muted)' }}>
              While the original palm leaves are chanted in 2,000-year-old classical Tamil poetic verses, Pujya Swami Ji provides fluent, compassionate line-by-line explanations with live translation in:
            </p>
            <div className="lang-pills-cluster">
              {['English', 'Hindi (हिंदी)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Kannada (ಕನ್ನಡ)', 'Malayalam (മലയാളം)', 'Gujarati (ગુજરાતી)', 'Marathi (मराठी)'].map((lang) => (
                <span key={lang} className="lang-pill">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* 7. Bottom CTA Banner */}
          <div className="nadi-cta-banner">
            <h2>Ready to Discover Your Destined Palm Leaf?</h2>
            <p>
              Connect with Pujya Swami Ji through a live online video consultation from anywhere in the world, or reserve an appointment during his upcoming city tours.
            </p>
            <div className="cta-actions">
              <Link to="/book" className="btn btn-luxury btn-lg">
                <FileText size={18} />
                <span>Book a Consultation</span>
              </Link>
              <a 
                href="https://wa.me/919876543210?text=Hari%20Om%20Swami%20Ji%2C%20I%20would%20like%20to%20learn%20more%20about%20my%20Nadi%20Shastra%20reading%20and%20submit%20my%20thumbprint."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-gold btn-lg"
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
