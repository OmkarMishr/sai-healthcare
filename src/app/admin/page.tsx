"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Calendar, Clock, CalendarClock, Stethoscope, Plus } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { apiGet } from "@/lib/adminApi";

type Stats = { patients: number; doctors: number; today: number; pending: number; upcoming: number };

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<{ stats: Stats }>("/api/admin/stats")
      .then((d) => setStats(d.stats))
      .catch((e) => setError(e.message));
  }, []);

  const cards = [
    { label: "Total Patients", value: stats?.patients, icon: Users, href: "/admin/patients" },
    { label: "Today's Appointments", value: stats?.today, icon: Calendar, href: "/admin/appointments" },
    { label: "Pending Requests", value: stats?.pending, icon: Clock, href: "/admin/appointments?status=pending" },
    { label: "Upcoming", value: stats?.upcoming, icon: CalendarClock, href: "/admin/appointments" },
    { label: "Active Doctors", value: stats?.doctors, icon: Stethoscope, href: "/admin/doctors" },
  ];

  return (
    <AdminShell title="Dashboard">
      {error && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}. Make sure Postgres is configured (see README) and the schema is loaded.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-plum-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex text-coral-600">
                <c.icon className="h-6 w-6" />
              </span>
              <span className="font-display text-3xl font-extrabold text-plum-900">
                {c.value ?? "—"}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-plum-900/60">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/patients"
          className="rounded-2xl bg-gradient-to-br from-coral-500 to-coral-600 p-6 text-white shadow-lg transition-transform hover:scale-[1.01]"
        >
          <p className="flex items-center gap-2 font-display text-lg font-bold"><Plus className="h-5 w-5" /> Add / Manage Patients</p>
          <p className="mt-1 text-sm text-coral-100">Register patients, edit records and view visit history.</p>
        </Link>
        <Link
          href="/admin/appointments"
          className="rounded-2xl bg-gradient-to-br from-plum-700 to-plum-900 p-6 text-white shadow-lg transition-transform hover:scale-[1.01]"
        >
          <p className="flex items-center gap-2 font-display text-lg font-bold"><Calendar className="h-5 w-5" /> Appointments by Date</p>
          <p className="mt-1 text-sm text-plum-200">Filter bookings by date, confirm or cancel, add walk-ins.</p>
        </Link>
      </div>
    </AdminShell>
  );
}
