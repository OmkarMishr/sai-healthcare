import { google } from "googleapis";

// Creates a Google Calendar event with a Google Meet link for an appointment.
// Requires OAuth2 credentials (one-time setup — see README):
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
//   GOOGLE_CALENDAR_ID (optional, defaults to "primary")
// If not configured, meeting creation is skipped gracefully.

const TZ = "Asia/Kolkata";

export function isMeetConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN,
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// "11:30 AM" -> { h: 11, m: 30 }  (24h)
function parseTime(t: string): { h: number; m: number } | null {
  const match = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return null;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const ap = match[3]?.toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return { h, m };
}

export type MeetResult = { meetLink: string; eventId: string; htmlLink: string } | null;

export async function createMeetForAppointment(input: {
  name: string;
  email?: string;
  phone: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // "11:30 AM"
  notes?: string;
  durationMinutes?: number;
}): Promise<MeetResult> {
  if (!isMeetConfigured()) return null;

  const t = parseTime(input.time);
  if (!t || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return null;

  const dur = input.durationMinutes ?? 30;
  const startTotal = t.h * 60 + t.m;
  const endTotal = startTotal + dur;
  const eh = Math.floor(endTotal / 60) % 24;
  const em = endTotal % 60;

  const startDateTime = `${input.date}T${pad(t.h)}:${pad(t.m)}:00`;
  const endDateTime = `${input.date}T${pad(eh)}:${pad(em)}:00`;

  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  oauth2.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

  const calendar = google.calendar({ version: "v3", auth: oauth2 });

  const res = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    conferenceDataVersion: 1,
    sendUpdates: input.email ? "all" : "none",
    requestBody: {
      summary: `Ayurveda Consultation — ${input.name}`,
      description:
        `Service: ${input.service}\nPhone: ${input.phone}` +
        (input.notes ? `\nNotes: ${input.notes}` : ""),
      start: { dateTime: startDateTime, timeZone: TZ },
      end: { dateTime: endDateTime, timeZone: TZ },
      attendees: input.email ? [{ email: input.email }] : undefined,
      conferenceData: {
        createRequest: {
          requestId: `ssa-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  const meetLink =
    res.data.hangoutLink ||
    res.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri ||
    "";

  if (!meetLink) return null;
  return { meetLink, eventId: res.data.id || "", htmlLink: res.data.htmlLink || "" };
}
