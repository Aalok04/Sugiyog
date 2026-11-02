import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../pages/public/Home';
import AboutSwamiJi from '../pages/public/AboutSwamiJi';
import UnderstandingNadiShastra from '../pages/public/UnderstandingNadiShastra';
import Services from '../pages/public/Services';
import ServiceDetails from '../pages/public/ServiceDetails';
import ConsultationFees from '../pages/public/ConsultationFees';
import BookConsultation from '../pages/public/BookConsultation';
import UpcomingVisits from '../pages/public/UpcomingVisits';
import CityVisitDetails from '../pages/public/CityVisitDetails';
import Testimonials from '../pages/public/Testimonials';
import Events from '../pages/public/Events';
import Gallery from '../pages/public/Gallery';
import ContactUs from '../pages/public/ContactUs';
import FAQ from '../pages/public/FAQ';
import PrivacyPolicy from '../pages/public/PrivacyPolicy';
import TermsAndConditions from '../pages/public/TermsAndConditions';
import CancellationPolicy from '../pages/public/CancellationPolicy';

// Auth & Admin Pages
import AdminLogin from '../pages/auth/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageServices from '../pages/admin/ManageServices';
import ManageBookings from '../pages/admin/ManageBookings';
import ManageTravelSchedule from '../pages/admin/ManageTravelSchedule';
import ManageAvailability from '../pages/admin/ManageAvailability';
import ManagePayments from '../pages/admin/ManagePayments';
import ManageTestimonials from '../pages/admin/ManageTestimonials';
import ManageEvents from '../pages/admin/ManageEvents';
import ManageGallery from '../pages/admin/ManageGallery';
import ManageContent from '../pages/admin/ManageContent';
import ManageInquiries from '../pages/admin/ManageInquiries';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminSettings from '../pages/admin/AdminSettings';
import AdminAuditLogs from '../pages/admin/AdminAuditLogs';

// Errors
import NotFound from '../pages/errors/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutSwamiJi />} />
        <Route path="/nadi-shastra" element={<UnderstandingNadiShastra />} />
        <Route path="/understanding-nadi" element={<UnderstandingNadiShastra />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        <Route path="/fees" element={<Navigate to="/services" replace />} />
        <Route path="/book" element={<BookConsultation />} />
        <Route path="/upcoming-visits" element={<UpcomingVisits />} />
        <Route path="/upcoming-visits/:id" element={<CityVisitDetails />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/cancellation" element={<CancellationPolicy />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected Dashboard & Operations */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="travel-visits" element={<ManageTravelSchedule />} />
        <Route path="availability" element={<ManageAvailability />} />
        <Route path="payments" element={<ManagePayments />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="content" element={<ManageContent />} />
        <Route path="inquiries" element={<ManageInquiries />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="audit-logs" element={<AdminAuditLogs />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
