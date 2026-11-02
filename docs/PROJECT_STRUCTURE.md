# Sugiyog — Project Structure & Architectural Design

## 1. Architectural Philosophy

Sugiyog is a full-stack, enterprise-grade consultation and appointment platform for Swami Ji's global Nadi Shastra practice. The platform is designed with clear separation of concerns, high modularity, strict security controls, and Indian heritage-inspired aesthetic.

Key architectural tenets:
1. **Separation of Concerns**: Strict decoupling of presentation (React), HTTP transportation (Express Controllers), domain business rules (Services), database interactions (Prisma ORM), and styles (modular CSS architecture).
2. **Database Integrity & Concurrency**: Single source of truth via MySQL 8.0+. Safe transactional concurrency control for slot capacity reservation to eliminate race conditions.
3. **Role-Based Access Control (RBAC)**: Distinct privilege scoping across Super Admin, Administrator, Assistant, Booking Manager, Finance Manager, and Content Manager.
4. **Style Decoupling**: Zero CSS-in-JS overhead; pure modular CSS with variables, resets, layout definitions, and isolated component styles.

---

## 2. Root Directory Tree

```
Sugiyog/
├── .gitignore                          # Global version control exclusions
├── README.md                           # Project summary and quickstart
├── package.json                        # Monorepo/workspaces orchestrator
│
├── docs/                               # Architectural documentation
│   ├── PROJECT_STRUCTURE.md            # Detailed structural and layout guide
│   ├── DATABASE_SCHEMA.md              # Prisma entity definitions and relations
│   ├── API_DOCUMENTATION.md            # Complete REST API specifications
│   └── DEVELOPMENT_GUIDE.md            # Setup, migration, and development instructions
│
├── backend/                            # Node.js + Express + Prisma REST API
│   ├── .env                            # Active environment configuration (git ignored)
│   ├── .env.example                    # Template environment variables
│   ├── package.json                    # Backend dependencies and scripts
│   │
│   ├── prisma/
│   │   ├── schema.prisma               # Declarative database models, enums & relations
│   │   ├── seed.js                     # Safe seed records (roles, admin, services, visit)
│   │   └── migrations/                 # Applied SQL migrations
│   │       └── 20261030072919_init/
│   │           └── migration.sql
│   │
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js             # Singleton PrismaClient instance
│   │   │   └── environment.js          # Validated runtime configuration
│   │   │
│   │   ├── constants/
│   │   │   ├── roles.js                # System role enums
│   │   │   └── status.js               # Status enums (booking, payment, visit, slot)
│   │   │
│   │   ├── utils/
│   │   │   └── apiResponse.js          # Standardized API response payloads
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js       # JWT extraction & admin identity verification
│   │   │   ├── roleMiddleware.js       # Role & granular permission enforcement
│   │   │   ├── rateLimiter.js          # Rate-limiting policies (auth, forms, global)
│   │   │   ├── validateRequest.js      # Express-validator error handler
│   │   │   └── errorHandler.js         # Centralized HTTP and Prisma error handling
│   │   │
│   │   ├── validators/
│   │   │   └── auth.validator.js       # Request payload schemas
│   │   │
│   │   ├── services/                   # Business logic layer
│   │   │   ├── auth.service.js
│   │   │   ├── services.service.js
│   │   │   ├── travelVisits.service.js
│   │   │   ├── availability.service.js
│   │   │   ├── bookings.service.js
│   │   │   ├── payments.service.js
│   │   │   ├── testimonials.service.js
│   │   │   ├── events.service.js
│   │   │   ├── gallery.service.js
│   │   │   ├── inquiries.service.js
│   │   │   ├── users.service.js
│   │   │   ├── admin.service.js
│   │   │   └── settings.service.js
│   │   │
│   │   ├── controllers/                # HTTP request / response handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── services.controller.js
│   │   │   ├── travelVisits.controller.js
│   │   │   ├── availability.controller.js
│   │   │   ├── bookings.controller.js
│   │   │   ├── payments.controller.js
│   │   │   ├── testimonials.controller.js
│   │   │   ├── events.controller.js
│   │   │   ├── gallery.controller.js
│   │   │   ├── inquiries.controller.js
│   │   │   ├── users.controller.js
│   │   │   ├── admin.controller.js
│   │   │   └── settings.controller.js
│   │   │
│   │   ├── routes/                     # REST endpoints (/api/v1/*)
│   │   │   ├── health.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── services.routes.js
│   │   │   ├── travelVisits.routes.js
│   │   │   ├── availability.routes.js
│   │   │   ├── bookings.routes.js
│   │   │   ├── payments.routes.js
│   │   │   ├── testimonials.routes.js
│   │   │   ├── events.routes.js
│   │   │   ├── gallery.routes.js
│   │   │   ├── inquiries.routes.js
│   │   │   ├── users.routes.js
│   │   │   ├── admin.routes.js
│   │   │   └── settings.routes.js
│   │   │
│   │   ├── app.js                      # Express application assembly & security
│   │   └── server.js                   # Server bootstrap & lifecycle listeners
│   │
│   └── tests/                          # Backend test suites
│
└── frontend/                           # React + Vite Client Application
    ├── .env                            # Active environment configuration
    ├── .env.example                    # Template environment variables
    ├── index.html                      # HTML entry with Playfair & Cormorant fonts
    ├── package.json                    # Frontend dependencies and scripts
    ├── vite.config.js                  # Vite configuration
    │
    └── src/
        ├── App.jsx                     # Top-level Router & Provider wrapper
        ├── main.jsx                    # React 18 DOM mount point
        │
        ├── services/
        │   └── api.js                  # Axios client with interceptors
        │
        ├── context/
        │   └── AuthContext.jsx         # Administrative authentication provider
        │
        ├── components/
        │   ├── common/
        │   │   ├── Button.jsx          # Reusable styled button component
        │   │   └── Badge.jsx           # Status badge component
        │   │
        │   ├── navigation/
        │   │   ├── Navbar.jsx          # Public sticky responsive navigation
        │   │   ├── Footer.jsx          # Public comprehensive footer
        │   │   ├── AdminSidebar.jsx    # Assistant/Admin sidebar navigation
        │   │   └── AdminHeader.jsx     # Admin topbar with user actions
        │   │
        │   └── cards/
        │       ├── ServiceCard.jsx     # Consultation offering presentation card
        │       └── VisitCard.jsx       # City visit / tour card
        │
        ├── layouts/
        │   ├── PublicLayout.jsx        # Wrapper for public-facing views
        │   └── AdminLayout.jsx         # Protected wrapper for admin dashboard
        │
        ├── routes/
        │   └── AppRoutes.jsx           # Declarative React Router definitions
        │
        ├── styles/                     # Dedicated CSS Architecture
        │   ├── themes/
        │   │   └── variables.css       # Brand tokens, colors & typography
        │   ├── base/
        │   │   ├── reset.css           # Modern box-sizing & element reset
        │   │   └── typography.css      # Headings, font hierarchy & lead text
        │   ├── components/
        │   │   ├── Button.css          # Variants (primary, secondary, outline, text)
        │   │   ├── Navbar.css          # Header & mobile drawer styling
        │   │   ├── Footer.css          # Footer grid & legal bar
        │   │   ├── ServiceCard.css     # Service card hover transitions
        │   │   ├── VisitCard.css       # Tour card styling
        │   │   └── Forms.css           # Grid layouts, inputs, selects, textareas
        │   ├── layouts/
        │   │   ├── PublicLayout.css    # Containers, sections & headers
        │   │   └── AdminLayout.css     # Sidebar & topbar desktop/mobile styles
        │   ├── pages/
        │   │   ├── Home.css            # Hero banner, features, responsive grid
        │   │   ├── Services.css        # Services list & filter bar
        │   │   ├── Visits.css          # Tour filter bar & cards grid
        │   │   └── Booking.css         # Booking wizard, format selection, slot pills
        │   ├── admin/
        │   │   ├── AdminDashboard.css  # Stats grid, cards & operational widgets
        │   │   └── AdminTable.css      # Clean data tables with status badges
        │   └── main.css                # Master CSS entry aggregating all sheets
        │
        └── pages/
            ├── public/                 # 17 Publicly accessible pages
            │   ├── Home.jsx
            │   ├── AboutSwamiJi.jsx
            │   ├── UnderstandingNadiShastra.jsx
            │   ├── Services.jsx
            │   ├── ServiceDetails.jsx
            │   ├── ConsultationFees.jsx
            │   ├── BookConsultation.jsx
            │   ├── UpcomingVisits.jsx
            │   ├── CityVisitDetails.jsx
            │   ├── Testimonials.jsx
            │   ├── Events.jsx
            │   ├── Gallery.jsx
            │   ├── ContactUs.jsx
            │   ├── FAQ.jsx
            │   ├── PrivacyPolicy.jsx
            │   ├── TermsAndConditions.jsx
            │   └── CancellationPolicy.jsx
            │
            ├── auth/                   # Authentication
            │   └── AdminLogin.jsx
            │
            ├── admin/                  # 14 Admin management pages
            │   ├── AdminDashboard.jsx
            │   ├── ManageServices.jsx
            │   ├── ManageBookings.jsx
            │   ├── ManageTravelSchedule.jsx
            │   ├── ManageAvailability.jsx
            │   ├── ManagePayments.jsx
            │   ├── ManageTestimonials.jsx
            │   ├── ManageEvents.jsx
            │   ├── ManageGallery.jsx
            │   ├── ManageContent.jsx
            │   ├── ManageInquiries.jsx
            │   ├── AdminUsers.jsx
            │   ├── AdminSettings.jsx
            │   └── AdminAuditLogs.jsx
            │
            └── errors/
                └── NotFound.jsx        # 404 Error page
```
