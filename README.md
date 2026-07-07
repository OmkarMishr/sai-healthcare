# Shri Sai Ayurveda — Panchkarma & Infertility Clinic, Raipur

A bilingual (English/हिंदी) marketing site **and** a clinic admin panel for **Shri Sai
Ayurveda**, Dr. S.S. Soni's Ayurvedic Panchkarma & infertility clinic in Avanti Vihar,
Raipur. Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + PostgreSQL**.

## Public site

- Bilingual EN/हिं toggle across every section.
- Sections: hero (clinic photo), stats, Panchkarma path, **Panchkarma therapies**
  (photo cards), Dr. S.S. Soni, why-us, care-vs-quick-fix comparison, **health
  insurance**, testimonies, FAQ, closing CTA, footer.
- Interactive multi-step **Book Appointment** modal + floating WhatsApp/Book buttons on mobile.

## Admin panel (`/admin`)

Login/Sign-up from the top-right of the navbar. Features:

- **Auth** — email + password (bcrypt), JWT session in an httpOnly cookie, route protection
  via middleware.
- **Patients** — add / edit / delete / search, with per-patient **visit history**.
- **Appointments** — list with **date filters** (single date, range, status, search),
  confirm/complete/cancel, assign a doctor, add walk-ins. Online bookings from the public
  site land here automatically.
- **Doctors** — add doctors and manage each one's **weekly availability**.
- **Dashboard** — patient, appointment and doctor counts.

## Setup

### 1. Install

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Set `DATABASE_URL` (PostgreSQL) and a long random `AUTH_SECRET`.

### 3. Create the database schema

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

This creates the tables (`admin_users`, `patients`, `doctors`, `doctor_availability`,
`appointments`, `patient_history`) and seeds Dr. S.S. Soni and Dr. Varsha Soni.

### 4. Run

```bash
npm run dev      # http://localhost:3000
```

Visit `/admin/login`, click **Sign up** to create the first admin account, and you're in.

## Notes

- **Without `DATABASE_URL`** the public site still works — appointment bookings fall back
  to `data/appointments.json`. Admin features require Postgres.
- Database schema lives in [`db/schema.sql`](db/schema.sql).
- Out of scope: SMS/email/payment integrations, real insurance APIs.
