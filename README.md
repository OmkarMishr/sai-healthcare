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

## Booking notification email (EmailJS)

The booking form sends a notification email to the clinic via **EmailJS** (client-side).
Set `NEXT_PUBLIC_EMAILJS_*` in `.env.local` and paste
[`email-templates/clinic-notification.html`](email-templates/clinic-notification.html)
into your EmailJS template (HTML view). Template variables: `patient_name`,
`patient_phone`, `patient_email`, `service`, `appointment_date`, `appointment_time`,
`notes`, `meet_link`, `subject`. If unset, bookings still work — no email is sent.

## Google Meet setup (optional)

Each online booking can auto-create a **Google Meet** link (via Google Calendar API) that
is emailed to the clinic. One-time setup:

1. **console.cloud.google.com** → create a project → **Enable APIs** → enable *Google
   Calendar API*.
2. **OAuth consent screen** → External → add your Google account as a *Test user*.
3. **Credentials** → *Create OAuth client ID* → type **Web application** → add redirect URI
   `https://developers.google.com/oauthplayground` → copy the **Client ID + Secret**.
4. Go to **developers.google.com/oauthplayground** → gear icon → tick *Use your own OAuth
   credentials* → paste ID/secret → authorize scope
   `https://www.googleapis.com/auth/calendar` → **Exchange authorization code for tokens** →
   copy the **Refresh token**.
5. Put them in `.env.local`:
   ```
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   GOOGLE_REFRESH_TOKEN=...
   GOOGLE_CALENDAR_ID=primary
   ```

If these are blank, the email uses a `meet.google.com/new` fallback link instead of a
scheduled one.

## Images to add

- `public/dr-varsha.jpg` — Dr. Varsha Soni's photo (the two-doctor section expects it).
- `public/gallery/*` — gallery photos (already added). To add more, drop the file in and
  add one line to the `photos` array in `src/components/Gallery.tsx`.

## Notes

- **Without `DATABASE_URL`** the public site still works — appointment bookings fall back
  to `data/appointments.json`. Admin features require Postgres.
- Database schema lives in [`db/schema.sql`](db/schema.sql).
- Out of scope: SMS/payment integrations, real insurance APIs.
