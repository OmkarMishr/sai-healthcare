# Sai Healthcare — Fertility & IVF Centre, Raipur

A polished, mobile-responsive landing page for **Sai Healthcare**, a fertility/infertility
specialty clinic in Raipur, Chhattisgarh. Built with **Next.js (App Router) + TypeScript +
Tailwind CSS v4**.

## Features

- Warm coral + deep-plum medical brand aesthetic with custom design tokens.
- Sections: sticky nav + announcement bar, hero, trust-stats strip, treatment path,
  "why choose us", care-vs-tablets comparison table, patient success stories, FAQ
  accordion, closing CTA banner, and footer.
- **Interactive "Book Appointment" flow** — a multi-step modal (service/concern →
  date & time → contact details) with client-side validation and a success confirmation
  state. Triggerable from the nav, hero, and every CTA via a shared React context.
- **Appointment persistence** — submissions POST to `/api/appointments`, are validated
  server-side, and are stored in `data/appointments.json` so the clinic can review
  requests. `GET /api/appointments` returns all bookings.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Appointment records

Booking requests are stored in `data/appointments.json` (gitignored). View them with:

```bash
curl http://localhost:3000/api/appointments
```

## Notes / out of scope

- No real SMS/email/payment integrations — file-based persistence only.
- Single scrolling landing page (no multi-page routing or admin dashboard).
- All doctor/patient content is realistic placeholder copy for a fertility clinic.
