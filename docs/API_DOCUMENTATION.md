# Sugiyog — REST API Documentation

Base URL: `http://localhost:5000/api/v1`

All responses follow the standardized payload structure:
```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... }
}
```

In the event of an error:
```json
{
  "success": false,
  "message": "Detailed error message",
  "errors": [ ... ]
}
```

---

## 1. System & Health

### `GET /health`
Returns system status and live MySQL latency.
- **Access**: Public
- **Response**:
```json
{
  "success": true,
  "message": "Sugiyog API Health Check",
  "data": {
    "platform": "Sugiyog API",
    "status": "HEALTHY",
    "timestamp": "2026-10-30T07:35:27.905Z",
    "uptimeSeconds": 120,
    "database": {
      "type": "MySQL",
      "status": "CONNECTED",
      "latencyMs": 14
    },
    "version": "1.0.0"
  }
}
```

---

## 2. Authentication (`/auth`)

### `POST /auth/login`
Authenticates administrative personnel and issues a JWT token.
- **Access**: Public (Rate-limited to 20 attempts / 15 min)
- **Body**:
```json
{
  "email": "superadmin@sugiyog.org",
  "password": "SugiyogAdmin@2026"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "user": {
      "id": "cuid...",
      "fullName": "Chief Administrator",
      "email": "superadmin@sugiyog.org",
      "role": "SUPER_ADMIN",
      "roleDisplayName": "Super Administrator",
      "permissions": ["travel:read", "travel:create", "..."]
    }
  }
}
```

### `GET /auth/profile`
Returns current authenticated administrator profile.
- **Access**: Protected (Bearer Token)

---

## 3. Services & Consultation Chapters (`/services`)

### `GET /services`
Lists active consultation offerings.
- **Access**: Public

### `GET /services/:slug`
Retrieves single service detail by URL slug.
- **Access**: Public

### `GET /services/admin/all`
Lists all services including deactivated or draft chapters.
- **Access**: Protected (`content:read`)

### `POST /services/admin`
Creates a new consultation chapter.
- **Access**: Protected (`content:write`)

### `PUT /services/admin/:id`
Updates consultation chapter details.
- **Access**: Protected (`content:write`)

### `DELETE /services/admin/:id`
Soft-deletes a consultation chapter.
- **Access**: Protected (`content:write`)

---

## 4. Travel Visits & City Tours (`/travel-visits`)

### `GET /travel-visits`
Retrieves published upcoming visits for public seekers.
- **Access**: Public
- **Query Parameters**:
  - `country` (string, optional)
  - `city` (string, optional)
  - `month` (1-12, optional)
  - `year` (optional)
- **Security Rule**: Private venue details are automatically masked for public seekers.

### `GET /travel-visits/:id`
Retrieves detailed information and open slots for a specific published city visit.
- **Access**: Public

### `GET /travel-visits/admin/all`
Lists all city visits (including Drafts, Published, and Cancelled).
- **Access**: Protected (`travel:read`)

### `POST /travel-visits/admin`
Creates a new city visit tour.
- **Access**: Protected (`travel:create`)

### `PUT /travel-visits/admin/:id`
Modifies a city visit (dates, status, venue, public visibility, booking open toggle).
- **Access**: Protected (`travel:update`)

### `DELETE /travel-visits/admin/:id`
Cancels/archives a city visit.
- **Access**: Protected (`travel:delete`)

---

## 5. Appointment Availability (`/availability`)

### `GET /availability`
Lists unblocked slots with remaining capacity.
- **Access**: Public
- **Query Parameters**:
  - `slotType`: `ONLINE` | `IN_PERSON`
  - `travelVisitId`: ID of city visit (if in-person)
  - `startDate`: ISO Date
  - `endDate`: ISO Date

### `GET /availability/admin/all`
Lists all availability slots with booking counts for administration.
- **Access**: Protected (`slot:read`)

### `POST /availability/admin`
Creates an availability slot.
- **Access**: Protected (`slot:create`)

### `PUT /availability/admin/:id`
Updates capacity or toggles blocked status.
- **Access**: Protected (`slot:update`)

### `DELETE /availability/admin/:id`
Removes an availability slot.
- **Access**: Protected (`slot:update`)

---

## 6. Bookings & Requests (`/bookings`)

### `POST /bookings/instant`
Submits an instant appointment booking with atomic slot reservation.
- **Access**: Public
- **Body**:
```json
{
  "serviceId": "cuid...",
  "availabilitySlotId": "cuid...",
  "consultationFormat": "ONLINE",
  "fullName": "Aalok Parihar",
  "email": "aalok@example.com",
  "phone": "+91 98765 43210",
  "countryCode": "+91",
  "dateOfBirth": "1995-05-15",
  "timeOfBirth": "14:30",
  "placeOfBirth": "Jaipur, India",
  "gender": "Male",
  "clientNotes": "Seeking career guidance."
}
```

### `POST /bookings/request`
Submits a request-based appointment booking stored as `PENDING`.
- **Access**: Public

### `GET /bookings/admin/all`
Lists bookings with pagination and filters.
- **Access**: Protected (`booking:read`)
- **Query Parameters**: `status`, `serviceId`, `consultationFormat`, `page`, `limit`

### `PATCH /bookings/admin/:id/status`
Updates booking status, issues online meeting link, or records internal notes.
- **Access**: Protected (`booking:update`)

---

## 7. Payments (`/payments`)

### `GET /payments/admin/all`
Lists all recorded consultation payments.
- **Access**: Protected (`finance:read`)

### `POST /payments/admin/record`
Records a manual offline payment (cash, bank transfer).
- **Access**: Protected (`finance:update`)

---

## 8. Inquiries (`/inquiries`)

### `POST /inquiries`
Submits a public contact form inquiry.
- **Access**: Public (Rate-limited to 15 / hour)

### `GET /inquiries/admin/all`
Lists inquiries for assistant follow-up.
- **Access**: Protected

### `PATCH /inquiries/admin/:id`
Marks inquiry in-progress, resolved, or closed.
- **Access**: Protected

---

## 9. Admin Dashboard & Audit Logs (`/admin`)

### `GET /admin/dashboard-stats`
Aggregates operational metrics, pending counts, and upcoming tour summaries.
- **Access**: Protected

### `GET /admin/users`
Lists administrative accounts and assigned roles.
- **Access**: Protected (`SUPER_ADMIN`, `ADMIN`)

### `GET /admin/roles`
Lists all system roles and their permissions.
- **Access**: Protected (`SUPER_ADMIN`, `ADMIN`)

### `GET /admin/audit-logs`
Provides an immutable audit log of administrative actions.
- **Access**: Protected (`SUPER_ADMIN`)
