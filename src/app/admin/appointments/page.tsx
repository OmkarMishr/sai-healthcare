"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Video } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { apiGet, apiSend } from "@/lib/adminApi";

type Appt = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service_label: string | null;
  appointment_date: string;
  appointment_time: string;
  status: string;
  source: string;
  notes: string | null;
  doctor_name: string | null;
  meet_link: string | null;
};

type Doctor = { id: string; name: string };

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  completed: "bg-plum-100 text-plum-700",
  cancelled: "bg-rose-100 text-rose-600",
};

function AppointmentsInner() {
  const params = useSearchParams();
  const [rows, setRows] = useState<Appt[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const [filters, setFilters] = useState({
    date: "",
    from: "",
    to: "",
    status: params.get("status") || "all",
    q: "",
  });

  const load = useCallback(async () => {
    const qs = new URLSearchParams();
    if (filters.date) qs.set("date", filters.date);
    if (filters.from) qs.set("from", filters.from);
    if (filters.to) qs.set("to", filters.to);
    if (filters.status !== "all") qs.set("status", filters.status);
    if (filters.q) qs.set("q", filters.q);
    try {
      const d = await apiGet<{ appointments: Appt[] }>(`/api/admin/appointments?${qs}`);
      setRows(d.appointments);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, [filters]);

  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    apiGet<{ doctors: Doctor[] }>("/api/admin/doctors").then((d) => setDoctors(d.doctors)).catch(() => {});
  }, []);

  const setStatus = async (a: Appt, status: string) => {
    await apiSend(`/api/admin/appointments/${a.id}`, "PUT", { status });
    load();
  };
  const assignDoctor = async (a: Appt, doctor_id: string) => {
    await apiSend(`/api/admin/appointments/${a.id}`, "PUT", { doctor_id });
    load();
  };
  const remove = async (a: Appt) => {
    if (!confirm(`Delete appointment for ${a.name}?`)) return;
    await apiSend(`/api/admin/appointments/${a.id}`, "DELETE");
    load();
  };

  const set = (k: string, v: string) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <AdminShell title="Appointments">
      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-end gap-3 rounded-2xl border border-plum-100 bg-white p-4">
        <FField label="On date">
          <input type="date" value={filters.date} onChange={(e) => set("date", e.target.value)} className="filt" />
        </FField>
        <FField label="From">
          <input type="date" value={filters.from} onChange={(e) => set("from", e.target.value)} className="filt" />
        </FField>
        <FField label="To">
          <input type="date" value={filters.to} onChange={(e) => set("to", e.target.value)} className="filt" />
        </FField>
        <FField label="Status">
          <select value={filters.status} onChange={(e) => set("status", e.target.value)} className="filt">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </FField>
        <FField label="Search">
          <input value={filters.q} onChange={(e) => set("q", e.target.value)} placeholder="name / phone" className="filt" />
        </FField>
        <button
          onClick={() => setFilters({ date: "", from: "", to: "", status: "all", q: "" })}
          className="rounded-full border border-plum-200 px-4 py-2 text-sm font-semibold text-plum-700"
        >
          Reset
        </button>
        <button
          onClick={() => setShowAdd(true)}
          className="ml-auto rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-5 py-2 text-sm font-bold text-white shadow-md"
        >
          ＋ Walk-in
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-plum-100 bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-plum-100 bg-plum-50 text-left text-xs uppercase tracking-wide text-plum-600">
              <th className="px-4 py-3">Date / Time</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-plum-900/50">
                  No appointments match these filters.
                </td>
              </tr>
            )}
            {rows.map((a) => (
              <tr key={a.id} className="border-b border-plum-50 last:border-0 hover:bg-cream-50">
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="font-semibold text-plum-900">{a.appointment_date?.slice(0, 10)}</div>
                  <div className="text-xs text-plum-900/60">{a.appointment_time}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-plum-900">{a.name}</div>
                  <div className="text-xs text-plum-900/60">{a.phone}</div>
                </td>
                <td className="px-4 py-3 text-plum-900/70">
                  {a.service_label || "—"}
                  {a.meet_link && (
                    <a
                      href={a.meet_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
                    >
                      <Video className="h-3.5 w-3.5" /> Join Meet
                    </a>
                  )}
                </td>
                <td className="px-4 py-3">
                  <select
                    value=""
                    onChange={(e) => e.target.value && assignDoctor(a, e.target.value)}
                    className="rounded-lg border border-plum-100 px-2 py-1 text-xs outline-none"
                  >
                    <option value="">{a.doctor_name || "Assign…"}</option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_COLORS[a.status] || ""}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    {a.status !== "confirmed" && (
                      <button onClick={() => setStatus(a, "confirmed")} className="act text-emerald-600 border-emerald-200">
                        Confirm
                      </button>
                    )}
                    {a.status !== "completed" && (
                      <button onClick={() => setStatus(a, "completed")} className="act text-plum-700 border-plum-200">
                        Done
                      </button>
                    )}
                    {a.status !== "cancelled" && (
                      <button onClick={() => setStatus(a, "cancelled")} className="act text-rose-600 border-rose-200">
                        Cancel
                      </button>
                    )}
                    <button onClick={() => remove(a)} className="act text-rose-600 border-rose-200">✕</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <WalkInModal
          doctors={doctors}
          onClose={() => setShowAdd(false)}
          onSaved={() => {
            setShowAdd(false);
            load();
          }}
        />
      )}

      <style jsx global>{`
        .filt {
          border: 1px solid var(--color-plum-200);
          border-radius: 0.75rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .filt:focus {
          border-color: var(--color-coral-400);
        }
        .act {
          border-width: 1px;
          border-radius: 0.5rem;
          padding: 0.2rem 0.55rem;
          font-size: 0.72rem;
          font-weight: 600;
        }
      `}</style>
    </AdminShell>
  );
}

function FField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-plum-900/70">{label}</label>
      {children}
    </div>
  );
}

function WalkInModal({
  doctors,
  onClose,
  onSaved,
}: {
  doctors: Doctor[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    service_label: "",
    appointment_date: new Date().toISOString().slice(0, 10),
    appointment_time: "10:00 AM",
    doctor_id: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      await apiSend("/api/admin/appointments", "POST", { ...f, doctor_id: f.doctor_id || null });
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-plum-900/50 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-plum-900">Add Walk-in Appointment</h3>
          <button onClick={onClose} className="text-plum-900/50">✕</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <WF label="Name *" value={f.name} onChange={(v) => set("name", v)} span />
          <WF label="Phone *" value={f.phone} onChange={(v) => set("phone", v)} />
          <WF label="Email" value={f.email} onChange={(v) => set("email", v)} />
          <WF label="Date *" type="date" value={f.appointment_date} onChange={(v) => set("appointment_date", v)} />
          <WF label="Time *" value={f.appointment_time} onChange={(v) => set("appointment_time", v)} />
          <WF label="Service" value={f.service_label} onChange={(v) => set("service_label", v)} span />
          <div className="col-span-2">
            <label className="text-xs font-semibold text-plum-900">Doctor</label>
            <select
              value={f.doctor_id}
              onChange={(e) => set("doctor_id", e.target.value)}
              className="mt-1 w-full rounded-xl border border-plum-100 px-3 py-2.5 text-sm outline-none focus:border-coral-400"
            >
              <option value="">—</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}
        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="rounded-full border border-plum-200 px-5 py-2.5 text-sm font-semibold text-plum-800">
            Cancel
          </button>
          <button onClick={save} disabled={saving} className="flex-1 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-2.5 text-sm font-bold text-white disabled:opacity-60">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function WF({ label, value, onChange, type = "text", span = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; span?: boolean }) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <label className="text-xs font-semibold text-plum-900">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-plum-100 px-3 py-2.5 text-sm outline-none focus:border-coral-400" />
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <Suspense fallback={null}>
      <AppointmentsInner />
    </Suspense>
  );
}
