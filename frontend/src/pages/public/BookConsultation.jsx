import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Globe2,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Fingerprint,
  ShieldCheck,
  Check,
  User,
  Mail,
  Phone,
  FileText,
  Video,
  CreditCard,
  QrCode,
  DollarSign,
} from 'lucide-react';
import api from '../../services/api';

const STEPS = [
  { id: 1, title: 'Consultation Format' },
  { id: 2, title: 'Select Service' },
  { id: 3, title: 'Date & Schedule' },
  { id: 4, title: 'Personal Details' },
  { id: 5, title: 'Review & Confirm' },
];

export default function BookConsultation() {
  const [searchParams] = useSearchParams();
  const initialServiceSlug = searchParams.get('service');
  const initialVisitId = searchParams.get('visit');
  const initialFormat = searchParams.get('format') === 'INTERNATIONAL' ? 'ONLINE' : (initialVisitId ? 'IN_PERSON' : 'ONLINE');

  const [currentStep, setCurrentStep] = useState(1);
  const [format, setFormat] = useState(initialFormat); // 'ONLINE' or 'IN_PERSON'
  const [bookingMode, setBookingMode] = useState('INSTANT'); // 'INSTANT' or 'REQUEST_BASED'

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [visits, setVisits] = useState([]);
  const [selectedVisitId, setSelectedVisitId] = useState(initialVisitId || '');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');

  // Seeker Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    preferredLanguage: 'English',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    gender: 'Male',
    preferredDates: '',
    clientNotes: '',
    agreeTerms: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Payment Demonstration State
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [demoPaymentSuccess, setDemoPaymentSuccess] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI');

  const handleProcessDemoPayment = async () => {
    if (!successBooking?.id) return;
    setPaymentLoading(true);
    try {
      const res = await api.post('/payments/demo-process', {
        bookingId: successBooking.id,
        amount: successBooking.totalAmount,
        currency: successBooking.currency || 'INR',
        paymentMethod: selectedPaymentMethod,
      });

      if (res.success && res.data) {
        setDemoPaymentSuccess(res.data.payment);
        setSuccessBooking(res.data.booking);
      }
    } catch (err) {
      alert(err.message || 'Payment simulation failed');
    } finally {
      setPaymentLoading(false);
    }
  };

  // 1. Fetch Services & Published Visits
  useEffect(() => {
    Promise.all([
      api.get('/services').catch(() => ({ data: [] })),
      api.get('/travel-visits').catch(() => ({ data: [] })),
    ]).then(([sRes, vRes]) => {
      if (sRes.success && sRes.data) {
        setServices(sRes.data);
        if (initialServiceSlug) {
          const match = sRes.data.find((s) => s.slug === initialServiceSlug);
          if (match) setSelectedServiceId(match.id);
        } else if (sRes.data.length > 0) {
          setSelectedServiceId(sRes.data[0].id);
        }
      }
      if (vRes.success && vRes.data) {
        setVisits(vRes.data);
      }
    });
  }, [initialServiceSlug]);

  // 2. Fetch Availability Slots whenever format or selected visit changes
  useEffect(() => {
    if (bookingMode !== 'INSTANT') return;

    const queryParams = {
      slotType: format,
    };
    if (format === 'IN_PERSON' && selectedVisitId) {
      queryParams.travelVisitId = selectedVisitId;
    }

    api
      .get('/availability', { params: queryParams })
      .then((res) => {
        if (res.success && res.data) {
          setAvailableSlots(res.data);
          if (res.data.length > 0) {
            setSelectedSlotId(res.data[0].id);
          } else {
            setSelectedSlotId('');
          }
        }
      })
      .catch(() => setAvailableSlots([]));
  }, [format, selectedVisitId, bookingMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear validation error on change
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedVisit = visits.find((v) => v.id === selectedVisitId);
  const selectedSlot = availableSlots.find((s) => s.id === selectedSlotId);

  // Validation per step
  const validateStep = (stepNumber) => {
    const errors = {};
    if (stepNumber === 1) {
      if (!format) errors.format = 'Please select a consultation format.';
    }
    if (stepNumber === 2) {
      if (!selectedServiceId) errors.service = 'Please select a consultation service.';
    }
    if (stepNumber === 3) {
      if (format === 'IN_PERSON' && !selectedVisitId && visits.length > 0) {
        errors.visit = 'Please select an in-person city visit.';
      }
      if (bookingMode === 'INSTANT' && !selectedSlotId && availableSlots.length > 0) {
        errors.slot = 'Please select an available appointment slot, or switch to Booking Request mode.';
      }
    }
    if (stepNumber === 4) {
      if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'A valid email address is required.';
      }
      if (!formData.phone.trim() || formData.phone.length < 7) {
        errors.phone = 'Valid contact phone / WhatsApp number is required.';
      }
    }
    if (stepNumber === 5) {
      if (!formData.agreeTerms) {
        errors.terms = 'Please accept the consultation sanctity and cancellation terms.';
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(STEPS.length, prev + 1));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setLoading(true);
    setErrorMessage('');

    try {
      if (bookingMode === 'INSTANT' && selectedSlotId) {
        const payload = {
          serviceId: selectedServiceId,
          availabilitySlotId: selectedSlotId,
          consultationFormat: format,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          countryCode: formData.countryCode,
          preferredLanguage: formData.preferredLanguage,
          dateOfBirth: formData.dateOfBirth || null,
          timeOfBirth: formData.timeOfBirth || null,
          placeOfBirth: formData.placeOfBirth || null,
          gender: formData.gender,
          clientNotes: formData.clientNotes || '',
        };

        const res = await api.post('/bookings/instant', payload);
        if (res.success) {
          setSuccessBooking(res.data);
        } else {
          throw new Error(res.message || 'Unable to place instant booking.');
        }
      } else {
        // Request-based booking
        const payload = {
          serviceId: selectedServiceId,
          travelVisitId: format === 'IN_PERSON' ? selectedVisitId : null,
          consultationFormat: format,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          countryCode: formData.countryCode,
          preferredLanguage: formData.preferredLanguage,
          dateOfBirth: formData.dateOfBirth || null,
          timeOfBirth: formData.timeOfBirth || null,
          placeOfBirth: formData.placeOfBirth || null,
          gender: formData.gender,
          preferredDates: formData.preferredDates || 'As early as Swami Ji is available',
          clientNotes: formData.clientNotes || '',
        };

        const res = await api.post('/bookings/request', payload);
        if (res.success) {
          setSuccessBooking(res.data);
        } else {
          throw new Error(res.message || 'Unable to submit booking request.');
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Unable to place booking. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatSlotTime = (slot) => {
    try {
      const d = new Date(slot.date);
      const st = new Date(slot.startTime);
      const et = new Date(slot.endTime);
      return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • ${st.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${et.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      return 'Available Time Slot';
    }
  };

  // SUCCESS STATE
  if (successBooking) {
    const isConfirmed = successBooking.status === 'CONFIRMED';
    return (
      <div className="section booking-page-container">
        <div className="container" style={{ maxWidth: 700 }}>
          <div className="booking-success-box">
            <div className="success-badge-icon">
              <CheckCircle size={44} />
            </div>

            <div className="gold-flourish" style={{ marginBottom: 'var(--space-2)' }}>
              <span className="gold-flourish-symbol">✦ ॐ ✦</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
              {isConfirmed ? 'Consultation Confirmed & Reserved' : 'Booking Request Received'}
            </h1>

            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: 'var(--space-6)' }}>
              {isConfirmed
                ? 'Your appointment has been successfully locked in Swami Ji’s consultation calendar.'
                : 'Swami Ji’s secretariat has received your preferred timings and will review schedule availability.'}
            </p>

            <div style={{ background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', margin: 'var(--space-6) 0', textAlign: 'left', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-3)' }}>
                <span className="review-label">Booking Reference:</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                  {successBooking.bookingNumber}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span className="review-label">Consultation Offering:</span>
                <span style={{ fontWeight: 600 }}>{successBooking.service?.title || selectedService?.title}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span className="review-label">Format:</span>
                <span>{successBooking.consultationFormat === 'ONLINE' ? 'Online Video Darshan' : 'In-Person City Visit'}</span>
              </div>

              {successBooking.scheduledDate && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="review-label">Scheduled Date:</span>
                  <span>{new Date(successBooking.scheduledDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="review-label">Status:</span>
                <span style={{ color: isConfirmed ? 'var(--color-success)' : 'var(--color-secondary-dark)', fontWeight: 700 }}>
                  {isConfirmed ? 'CONFIRMED' : 'PENDING REVIEW'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px dashed var(--color-border)' }}>
                <span className="review-label">Consultation Dakshina:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                  ₹{parseFloat(successBooking.totalAmount || selectedService?.price || 2500).toLocaleString('en-IN')} {successBooking.currency || 'INR'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)' }}>
                <span className="review-label">Payment Status:</span>
                <span style={{ color: (successBooking.paymentStatus === 'PAID' || demoPaymentSuccess) ? 'var(--color-success)' : '#e67e22', fontWeight: 700 }}>
                  {(successBooking.paymentStatus === 'PAID' || demoPaymentSuccess) ? 'PAID & VERIFIED ✓' : 'UNPAID (Pending Dakshina)'}
                </span>
              </div>

              {(successBooking.payments?.[0]?.paymentReference || demoPaymentSuccess?.paymentReference) && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)' }}>
                  <span className="review-label">Payment Ref:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-primary)' }}>
                    {demoPaymentSuccess?.paymentReference || successBooking.payments?.[0]?.paymentReference}
                  </span>
                </div>
              )}
            </div>

            {/* DEMO PAYMENT SANDBOX BOX (FOR CLIENT DEMONSTRATION) */}
            {successBooking.paymentStatus !== 'PAID' && !demoPaymentSuccess ? (
              <div style={{
                background: 'linear-gradient(135deg, rgba(196, 154, 69, 0.08) 0%, rgba(138, 30, 43, 0.04) 100%)',
                border: '1.5px solid var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                marginBottom: 'var(--space-6)',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                  <CreditCard size={20} color="var(--color-primary)" />
                  <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                    Demonstration Payment Gateway
                  </strong>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                  Demonstrate the full payment collection flow to your client without real money. Selecting an option and clicking pay will record this transaction live into the Temple's Admin Dakshina Ledger.
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('UPI')}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${selectedPaymentMethod === 'UPI' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      background: selectedPaymentMethod === 'UPI' ? 'rgba(196, 154, 69, 0.15)' : 'var(--color-surface)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <QrCode size={16} />
                    <span>UPI (Instant / QR)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('CARD')}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${selectedPaymentMethod === 'CARD' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      background: selectedPaymentMethod === 'CARD' ? 'rgba(196, 154, 69, 0.15)' : 'var(--color-surface)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <CreditCard size={16} />
                    <span>Card / Netbanking</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleProcessDemoPayment}
                  disabled={paymentLoading}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '0.98rem' }}
                >
                  {paymentLoading ? (
                    <span>Processing Demo Payment...</span>
                  ) : (
                    <span>Simulate & Confirm Payment of ₹{parseFloat(successBooking.totalAmount || selectedService?.price || 2500).toLocaleString('en-IN')}</span>
                  )}
                </button>
              </div>
            ) : (
              <div style={{
                background: 'rgba(46, 125, 50, 0.08)',
                border: '1.5px solid #2e7d32',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4) var(--space-5)',
                marginBottom: 'var(--space-6)',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <CheckCircle size={28} color="#2e7d32" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#2e7d32', display: 'block', fontSize: '0.95rem' }}>
                    Dakshina Payment Completed & Ledger Synced!
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Payment reference <strong>{demoPaymentSuccess?.paymentReference || successBooking.payments?.[0]?.paymentReference}</strong> has been saved and is viewable in real-time in the Admin Dashboard.
                  </span>
                </div>
              </div>
            )}

            {/* Next Step Guidance */}
            <div style={{ background: 'rgba(196, 154, 69, 0.1)', padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: 'var(--space-8)', fontSize: '0.88rem', border: '1px solid rgba(196, 154, 69, 0.3)' }}>
              <strong style={{ display: 'block', color: 'var(--color-primary)', marginBottom: 'var(--space-1)' }}>
                Important Step for Seeker:
              </strong>
              <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
                Please prepare a clear ink impression of your thumb on white paper (<strong>Right thumb for Men</strong>, <strong>Left thumb for Women</strong>).
                You may send the image via WhatsApp with your Booking Reference to expedite the leaf bundle search in Vaitheeswaran Koil archives.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/919876543210?text=Namaste%20Swami%20Ji%2C%20my%20booking%20reference%20is%20${successBooking.bookingNumber}.%20Sharing%20my%20thumbprint%20for%20leaf%20search.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <MessageCircle size={16} />
                <span>Submit Thumbprint on WhatsApp</span>
              </a>
              <Link to="/" className="btn btn-outline">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section booking-page-container">
      <div className="container">
        {/* Header */}
        <div className="booking-header-centered">
          <h1 className="booking-headline">
            Schedule Your <span className="saffron-gradient">Nadi Consultation</span>
          </h1>
          <p className="booking-supporting-text">
            Follow our 5-step guided reservation process to request your personal reading with Swami Ji.
          </p>
        </div>

        <div className="booking-wizard-card">
          {/* Animated 5-Step Stepper Header with Continuous Track */}
          <div className="booking-progress-bar">
            <div className="stepper-track-bg"></div>
            <div
              className="stepper-track-fill"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            ></div>
            {STEPS.map((step) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  className={`step-indicator-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => {
                    if (isCompleted) setCurrentStep(step.id);
                  }}
                  aria-label={`Step ${step.id}: ${step.title}`}
                >
                  <div className="step-circle">
                    {isCompleted ? <Check size={18} /> : step.id}
                  </div>
                  <span className="step-label">{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Active Step Status Bar */}
          <div className="mobile-step-status-bar">
            <div className="mobile-step-badge">
              <span>Step {currentStep} of 5</span>
            </div>
            <div className="mobile-step-title">
              {STEPS[currentStep - 1].title}
            </div>
          </div>

          {errorMessage && (
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', color: 'var(--color-danger)', marginBottom: 'var(--space-6)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: CONSULTATION FORMAT */}
          {currentStep === 1 && (
            <div className="wizard-step-panel">
              <h2 className="step-panel-title">
                Step 1: Choose Your Consultation Format
              </h2>
              <p className="step-panel-desc">
                Select whether you wish to connect with Swami Ji via private live video consultation, or meet in person during his scheduled city visits.
              </p>

              <div className="booking-format-selector">
                <div
                  className={`format-option-card ${format === 'ONLINE' ? 'selected' : ''}`}
                  onClick={() => setFormat('ONLINE')}
                >
                  <div className="format-card-header">
                    <div className="format-icon-wrap">
                      <Video size={22} />
                    </div>
                    <span className="format-category-tag">Worldwide Seekers</span>
                    {format === 'ONLINE' && <span className="format-selected-pill">✓ Selected</span>}
                  </div>
                  <h3 className="format-title">Online Video Consultation</h3>
                  <p className="format-desc">
                    Private live HD video session connecting seekers from any country. Direct line-by-line reading of your authenticated palm leaf with translation.
                  </p>
                  <div className="format-highlights">
                    <span className="format-pill">1-on-1 Video Darshan</span>
                    <span className="format-pill">Direct Palm Leaf Reading</span>
                    <span className="format-pill">Audio Recording Included</span>
                  </div>
                </div>

                <div
                  className={`format-option-card ${format === 'IN_PERSON' ? 'selected' : ''}`}
                  onClick={() => setFormat('IN_PERSON')}
                >
                  <div className="format-card-header">
                    <div className="format-icon-wrap">
                      <MapPin size={22} />
                    </div>
                    <span className="format-category-tag">City Darshan Tours</span>
                    {format === 'IN_PERSON' && <span className="format-selected-pill">✓ Selected</span>}
                  </div>
                  <h3 className="format-title">In-Person City Visit</h3>
                  <p className="format-desc">
                    Meet Swami Ji in person at consecrated sanctuaries during his scheduled spiritual tours across India, Europe, USA, and Asia.
                  </p>
                  <div className="format-highlights">
                    <span className="format-pill">Personal Physical Presence</span>
                    <span className="format-pill">Blessed Holy Prasad</span>
                    <span className="format-pill">Sanctuary Atmosphere</span>
                  </div>
                </div>
              </div>

              {validationErrors.format && (
                <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem' }}>{validationErrors.format}</p>
              )}

              <div className="wizard-nav-actions">
                <div></div>
                <button type="button" onClick={handleNextStep} className="btn btn-primary btn-lg">
                  <span>Continue to Service Selection</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SERVICE SELECTION */}
          {currentStep === 2 && (
            <div className="wizard-step-panel">
              <h2 className="step-panel-title">
                Step 2: Select Consultation Offering
              </h2>
              <p className="step-panel-desc">
                Choose the specialized palm leaf chapter (Kandam) or comprehensive life reading you require.
              </p>

              <div className="services-selection-grid">
                {services.map((svc) => {
                  const isSelected = selectedServiceId === svc.id;
                  return (
                    <div
                      key={svc.id}
                      className={`service-select-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedServiceId(svc.id)}
                    >
                      <div className="service-select-header">
                        <h4 className="service-select-title">{svc.title}</h4>
                        {isSelected && <span className="service-selected-pill">✓ Selected</span>}
                      </div>
                      <p className="service-select-desc">{svc.shortDescription || svc.description}</p>
                      <div className="service-select-footer">
                        <span className="service-duration-badge">
                          <Clock size={13} />
                          <span>{svc.durationMinutes} Minutes</span>
                        </span>
                        <span className="service-price-badge">
                          ₹{parseFloat(svc.price || 2500).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {validationErrors.service && (
                <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem' }}>{validationErrors.service}</p>
              )}

              <div className="wizard-nav-actions">
                <button type="button" onClick={handlePrevStep} className="btn btn-outline">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button type="button" onClick={handleNextStep} className="btn btn-primary btn-lg">
                  <span>Continue to Scheduling</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CITY VISIT OR ONLINE APPOINTMENT SCHEDULING */}
          {currentStep === 3 && (
            <div className="wizard-step-panel">
              <h2 className="step-panel-title">
                Step 3: {format === 'IN_PERSON' ? 'Select City Tour & Appointment Slot' : 'Select Online Appointment Slot'}
              </h2>
              <p className="step-panel-desc">
                {format === 'IN_PERSON'
                  ? 'Choose the city tour where you wish to meet Swami Ji in person.'
                  : 'Choose an instant slot in Swami Ji’s schedule, or submit preferred dates for request review.'}
              </p>

              {/* Mode Toggle: Instant vs Request */}
              <div className="booking-mode-toggle-pill">
                <button
                  type="button"
                  className={`mode-toggle-btn ${bookingMode === 'INSTANT' ? 'active' : ''}`}
                  onClick={() => setBookingMode('INSTANT')}
                >
                  ⚡ Instant Slot Reservation
                </button>
                <button
                  type="button"
                  className={`mode-toggle-btn ${bookingMode === 'REQUEST_BASED' ? 'active' : ''}`}
                  onClick={() => setBookingMode('REQUEST_BASED')}
                >
                  🗓️ Preferred Date Request
                </button>
              </div>

              {/* If In-Person, show City Visit Selector */}
              {format === 'IN_PERSON' && (
                <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                  <label className="form-label">Select Scheduled City Visit *</label>
                  <select
                    className="form-select"
                    value={selectedVisitId}
                    onChange={(e) => setSelectedVisitId(e.target.value)}
                  >
                    <option value="">-- Choose City Visit --</option>
                    {visits.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.city}, {v.country} ({new Date(v.startDate).toLocaleDateString()} - {new Date(v.endDate).toLocaleDateString()}) {v.venueName ? `• ${v.venueName}` : ''}
                      </option>
                    ))}
                  </select>
                  {validationErrors.visit && (
                    <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginTop: 4 }}>
                      {validationErrors.visit}
                    </p>
                  )}
                </div>
              )}

              {/* Instant Slots List if Instant Mode */}
              {bookingMode === 'INSTANT' ? (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
                    Available Open Slots ({availableSlots.length})
                  </h4>

                  {availableSlots.length > 0 ? (
                    <div className="slots-selection-grid">
                      {availableSlots.map((slot) => {
                        const isSlotSelected = selectedSlotId === slot.id;
                        return (
                          <div
                            key={slot.id}
                            className={`slot-pill ${isSlotSelected ? 'active' : ''}`}
                            onClick={() => setSelectedSlotId(slot.id)}
                          >
                            <span style={{ fontWeight: 600 }}>{formatSlotTime(slot)}</span>
                            <span style={{ fontSize: '0.72rem', opacity: 0.8 }}>Timezone: {slot.timezone}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ padding: 'var(--space-6)', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                        No instant pre-defined slots are open for this selection.
                      </p>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setBookingMode('REQUEST_BASED')}
                      >
                        Switch to Custom Date Request Mode
                      </button>
                    </div>
                  )}

                  {validationErrors.slot && (
                    <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem' }}>{validationErrors.slot}</p>
                  )}
                </div>
              ) : (
                /* Request-based Preferred Dates */
                <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
                  <label className="form-label">Your Preferred Dates & Convenient Time Windows *</label>
                  <textarea
                    name="preferredDates"
                    rows={3}
                    className="form-textarea"
                    placeholder="e.g. Next week Tuesday or Thursday between 3 PM - 7 PM IST / EST."
                    value={formData.preferredDates}
                    onChange={handleInputChange}
                  />
                  <small style={{ color: 'var(--color-text-muted)' }}>
                    Swami Ji’s secretariat will match your time window and confirm an appointment via email/WhatsApp.
                  </small>
                </div>
              )}

              <div className="wizard-nav-actions">
                <button type="button" onClick={handlePrevStep} className="btn btn-outline">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button type="button" onClick={handleNextStep} className="btn btn-primary btn-lg">
                  <span>Continue to Personal Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PERSONAL INFORMATION & THUMBPRINT GUIDANCE */}
          {currentStep === 4 && (
            <div className="wizard-step-panel">
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                Step 4: Seeker Information & Thumbprint
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
                Please provide your contact details and birth facts to aid in the thumbprint archive search.
              </p>

              {/* Thumbprint Instruction Banner */}
              <div className="thumbprint-guide-banner">
                <div className="thumbprint-guide-header">
                  <span className="thumbprint-guide-title">
                    <Fingerprint size={22} color="var(--color-primary)" />
                    <span>Sacred Thumbprint Requirement</span>
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                    {formData.gender === 'Female' ? 'Left Thumb for Females' : 'Right Thumb for Males'}
                  </span>
                </div>
                <div className="thumbprint-guide-steps">
                  <div className="thumb-step-item">
                    <span className="thumb-step-badge">1. Ink Pad</span>
                    <span className="thumb-step-text">Use any blue or black stamp pad. Press thumb gently without smudging.</span>
                  </div>
                  <div className="thumb-step-item">
                    <span className="thumb-step-badge">2. Clean Paper</span>
                    <span className="thumb-step-text">Print 2 or 3 impressions on blank white paper until whorls are crisp.</span>
                  </div>
                  <div className="thumb-step-item">
                    <span className="thumb-step-badge">3. Digital Photo</span>
                    <span className="thumb-step-text">Take a sharp, focused photo under natural light. You will submit after confirmation.</span>
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="responsive-two-col" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="Seeker's legal name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  {validationErrors.fullName && (
                    <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem' }}>{validationErrors.fullName}</span>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {validationErrors.email && (
                    <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem' }}>{validationErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="responsive-three-col" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Country Code</label>
                  <input
                    type="text"
                    name="countryCode"
                    className="form-input"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {validationErrors.phone && (
                    <span style={{ color: 'var(--color-danger)', fontSize: '0.8rem' }}>{validationErrors.phone}</span>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Gender (For Thumbprint Rule) *</label>
                  <select
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male (Right Thumb)</option>
                    <option value="Female">Female (Left Thumb)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row-3" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Date of Birth (Optional)</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-input"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Time of Birth (Optional)</label>
                  <input
                    type="text"
                    name="timeOfBirth"
                    className="form-input"
                    placeholder="e.g. 06:45 AM"
                    value={formData.timeOfBirth}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Place of Birth (Optional)</label>
                  <input
                    type="text"
                    name="placeOfBirth"
                    className="form-input"
                    placeholder="City, Country"
                    value={formData.placeOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Preferred Translation Language</label>
                  <select
                    name="preferredLanguage"
                    className="form-select"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Tamil">Tamil (தமிழ்)</option>
                    <option value="Telugu">Telugu (తెలుగు)</option>
                    <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                    <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Any Questions or Specific Matters of Inquest</label>
                  <textarea
                    name="clientNotes"
                    rows={2}
                    className="form-textarea"
                    placeholder="Optional notes regarding career, family, health or marriage considerations..."
                    value={formData.clientNotes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="wizard-nav-actions">
                <button type="button" onClick={handlePrevStep} className="btn btn-outline">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button type="button" onClick={handleNextStep} className="btn btn-primary btn-lg">
                  <span>Continue to Review & Submit</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW AND SUBMIT */}
          {currentStep === 5 && (
            <div className="wizard-step-panel">
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                Step 5: Review & Confirm Your Reservation
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
                Please review your consultation specifications before placing your booking.
              </p>

              {/* Status Notice distinguishing confirmed vs pending request */}
              {bookingMode === 'INSTANT' && selectedSlot ? (
                <div className="booking-status-notice confirmed-notice">
                  <CheckCircle size={20} color="var(--color-success)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong>Confirmed Instant Reservation:</strong> This slot will be reserved immediately upon submission.
                  </div>
                </div>
              ) : (
                <div className="booking-status-notice request-notice">
                  <Clock size={20} color="var(--color-secondary-dark)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong>Request-Based Consultation:</strong> Your appointment request will be reviewed by Swami Ji’s secretariat to finalize the exact hour and send you confirmation.
                  </div>
                </div>
              )}

              {/* Summary Card */}
              <div className="review-summary-card">
                <h4 className="review-section-title">Consultation Summary</h4>
                <div className="review-details-grid">
                  <div className="review-row">
                    <span className="review-label">Selected Offering</span>
                    <span className="review-value">{selectedService?.title}</span>
                  </div>

                  <div className="review-row">
                    <span className="review-label">Format</span>
                    <span className="review-value">
                      {format === 'ONLINE' ? 'Online Video Darshan' : `In-Person Tour: ${selectedVisit?.city || 'Selected City'}`}
                    </span>
                  </div>

                  <div className="review-row">
                    <span className="review-label">Schedule</span>
                    <span className="review-value">
                      {bookingMode === 'INSTANT' && selectedSlot
                        ? formatSlotTime(selectedSlot)
                        : (formData.preferredDates || 'Preferred Dates Submitted')}
                    </span>
                  </div>

                  <div className="review-row">
                    <span className="review-label">Language</span>
                    <span className="review-value">{formData.preferredLanguage}</span>
                  </div>

                  <div className="review-row">
                    <span className="review-label">Seeker Name</span>
                    <span className="review-value">{formData.fullName}</span>
                  </div>

                  <div className="review-row">
                    <span className="review-label">Contact</span>
                    <span className="review-value">{formData.countryCode} {formData.phone}</span>
                  </div>

                  <div className="review-row">
                    <span className="review-label">Email</span>
                    <span className="review-value">{formData.email}</span>
                  </div>

                  <div className="review-row">
                    <span className="review-label">Thumbprint Classification</span>
                    <span className="review-value">
                      {formData.gender === 'Female' ? 'Left Thumb (Female)' : 'Right Thumb (Male)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sacred Terms Checkbox */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    style={{ marginTop: 3 }}
                  />
                  <span>
                    I understand that Nadi Shastra is a sacred spiritual science rooted in Maharishi Agasthiyar’s palm leaf inscriptions. I agree to approach the reading with reverent intent, and accept the <Link to="/cancellation" target="_blank" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>cancellation and rescheduling guidelines</Link>.
                  </span>
                </label>
                {validationErrors.terms && (
                  <p style={{ color: 'var(--color-danger)', fontSize: '0.82rem', marginTop: 4 }}>
                    {validationErrors.terms}
                  </p>
                )}
              </div>

              <div className="wizard-nav-actions">
                <button type="button" onClick={handlePrevStep} className="btn btn-outline" disabled={loading}>
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-luxury btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <span>Submitting Sacred Reservation...</span>
                  ) : (
                    <>
                      <Calendar size={18} />
                      <span>{bookingMode === 'INSTANT' ? 'Confirm Appointment Slot' : 'Submit Consultation Request'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
