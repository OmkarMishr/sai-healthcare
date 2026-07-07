"use client";

import emailjs from "@emailjs/browser";

// Public (client-side) EmailJS credentials. These are meant to be public.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
// Optional: the clinic inbox that should receive booking notifications.
const CLINIC_EMAIL = process.env.NEXT_PUBLIC_CLINIC_EMAIL || "shivsai81@gmail.com";

export function isEmailConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

export type AppointmentEmail = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  meetLink?: string | null;
};

/**
 * Sends a booking-notification email to the clinic via EmailJS.
 * Best-effort: if EmailJS is not configured, it silently no-ops so the
 * booking flow is never blocked.
 */
export async function sendAppointmentEmail(a: AppointmentEmail): Promise<void> {
  if (!isEmailConfigured()) return;

  await emailjs.send(
    SERVICE_ID!,
    TEMPLATE_ID!,
    {
      to_email: CLINIC_EMAIL,
      clinic_email: CLINIC_EMAIL,
      patient_name: a.name,
      patient_phone: a.phone,
      patient_email: a.email || "—",
      service: a.service || "—",
      appointment_date: a.date,
      appointment_time: a.time,
      notes: a.notes || "—",
      // Real scheduled Meet link when generated, else a "start a meeting" fallback.
      meet_link: a.meetLink || "https://meet.google.com/new",
      subject: `New Appointment: ${a.name} — ${a.date} ${a.time}`,
    },
    { publicKey: PUBLIC_KEY! },
  );
}
