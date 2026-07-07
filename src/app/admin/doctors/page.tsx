"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { apiGet, apiSend } from "@/lib/adminApi";

type Doctor = {
  id: string;
  name: string;
  qualification: string | null;
  specialization: string | null;
  phone: string | null;
  active: boolean;
};

type Slot = { weekday: number; start_time: string; end_time: string; slot_minutes: number; active: boolean };

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: "", qualification: "", specialization: "", phone: "" });
  const [availFor, setAvailFor] = useState<Doctor | null>(null);

  const load = useCallback(async () => {
    try {
      const d = await apiGet<{ doctors: Doctor[] }>("/api/admin/doctors");
      setDoctors(d.doctors);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addDoctor = async () => {
    if (!newDoc.name.trim()) return;
    await apiSend("/api/admin/doctors", "POST", newDoc);
    setNewDoc({ name: "", qualification: "", specialization: "", phone: "" });
    setAdding(false);
    load();
  };

  return (
    <AdminShell title="Doctors">
      <div className="mb-5 flex justify-end">
        <button
          onClick={() => setAdding(true)}
          className="rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-5 py-2.5 text-sm font-bold text-white shadow-md"
        >
          ＋ Add Doctor
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{error}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {doctors.map((d) => (
          <div key={d.id} className="rounded-2xl border border-plum-100 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-plum-900">{d.name}</h3>
                <p className="text-sm font-medium text-coral-600">{d.qualification}</p>
                <p className="text-sm text-plum-900/60">{d.specialization}</p>
                {d.phone && <p className="mt-1 text-sm text-plum-900/60">📞 {d.phone}</p>}
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  d.active ? "bg-emerald-100 text-emerald-700" : "bg-plum-100 text-plum-600"
                }`}
              >
                {d.active ? "Active" : "Inactive"}
              </span>
            </div>
            <button
              onClick={() => setAvailFor(d)}
              className="mt-4 w-full rounded-full border border-plum-200 py-2 text-sm font-semibold text-plum-800 hover:border-coral-300"
            >
              🗓 Manage Availability
            </button>
          </div>
        ))}
      </div>

      {adding && (
        <Modal title="Add Doctor" onClose={() => setAdding(false)} onSave={addDoctor}>
          <DF label="Name *" value={newDoc.name} onChange={(v) => setNewDoc({ ...newDoc, name: v })} />
          <DF label="Qualification" value={newDoc.qualification} onChange={(v) => setNewDoc({ ...newDoc, qualification: v })} />
          <DF label="Specialization" value={newDoc.specialization} onChange={(v) => setNewDoc({ ...newDoc, specialization: v })} />
          <DF label="Phone" value={newDoc.phone} onChange={(v) => setNewDoc({ ...newDoc, phone: v })} />
        </Modal>
      )}

      {availFor && (
        <AvailabilityModal doctor={availFor} onClose={() => setAvailFor(null)} />
      )}
    </AdminShell>
  );
}

function AvailabilityModal({ doctor, onClose }: { doctor: Doctor; onClose: () => void }) {
  const [slots, setSlots] = useState<Slot[]>(
    DAYS.map((_, i) => ({ weekday: i, start_time: "10:00", end_time: "20:00", slot_minutes: 30, active: false })),
  );
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    apiGet<{ availability: Slot[] }>(`/api/admin/doctors/${doctor.id}/availability`)
      .then((d) => {
        setSlots((prev) =>
          prev.map((s) => {
            const found = d.availability.find((a) => a.weekday === s.weekday);
            return found
              ? {
                  weekday: s.weekday,
                  start_time: found.start_time.slice(0, 5),
                  end_time: found.end_time.slice(0, 5),
                  slot_minutes: found.slot_minutes,
                  active: found.active,
                }
              : s;
          }),
        );
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [doctor.id]);

  const update = (i: number, patch: Partial<Slot>) =>
    setSlots((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  const save = async () => {
    setSaving(true);
    try {
      await apiSend(`/api/admin/doctors/${doctor.id}/availability`, "PUT", {
        slots: slots.filter((s) => s.active),
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-plum-900/50 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-plum-900">Weekly Availability</h3>
            <p className="text-sm text-plum-900/60">{doctor.name}</p>
          </div>
          <button onClick={onClose} className="text-plum-900/50">✕</button>
        </div>

        <div className="mt-4 space-y-2">
          {!loaded && <p className="text-sm text-plum-900/50">Loading…</p>}
          {loaded &&
            slots.map((s, i) => (
              <div
                key={s.weekday}
                className={`flex flex-wrap items-center gap-2 rounded-xl border p-2.5 ${
                  s.active ? "border-coral-200 bg-coral-50" : "border-plum-100"
                }`}
              >
                <label className="flex w-28 items-center gap-2 text-sm font-semibold text-plum-900">
                  <input type="checkbox" checked={s.active} onChange={(e) => update(i, { active: e.target.checked })} />
                  {DAYS[s.weekday]}
                </label>
                <input
                  type="time"
                  value={s.start_time}
                  disabled={!s.active}
                  onChange={(e) => update(i, { start_time: e.target.value })}
                  className="rounded-lg border border-plum-100 px-2 py-1.5 text-sm disabled:opacity-40"
                />
                <span className="text-plum-900/50">–</span>
                <input
                  type="time"
                  value={s.end_time}
                  disabled={!s.active}
                  onChange={(e) => update(i, { end_time: e.target.value })}
                  className="rounded-lg border border-plum-100 px-2 py-1.5 text-sm disabled:opacity-40"
                />
                <span className="ml-auto flex items-center gap-1 text-xs text-plum-900/60">
                  slot
                  <input
                    type="number"
                    min={10}
                    step={5}
                    value={s.slot_minutes}
                    disabled={!s.active}
                    onChange={(e) => update(i, { slot_minutes: Number(e.target.value) })}
                    className="w-14 rounded-lg border border-plum-100 px-1.5 py-1 text-sm disabled:opacity-40"
                  />
                  min
                </span>
              </div>
            ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="rounded-full border border-plum-200 px-5 py-2.5 text-sm font-semibold text-plum-800">
            Cancel
          </button>
          <button onClick={save} disabled={saving} className="flex-1 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-2.5 text-sm font-bold text-white disabled:opacity-60">
            {saving ? "Saving…" : "Save Availability"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose, onSave }: { title: string; children: React.ReactNode; onClose: () => void; onSave: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-plum-900/50 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-plum-900">{title}</h3>
          <button onClick={onClose} className="text-plum-900/50">✕</button>
        </div>
        <div className="mt-4 space-y-3">{children}</div>
        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="rounded-full border border-plum-200 px-5 py-2.5 text-sm font-semibold text-plum-800">
            Cancel
          </button>
          <button onClick={onSave} className="flex-1 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-2.5 text-sm font-bold text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function DF({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold text-plum-900">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-plum-100 px-3 py-2.5 text-sm outline-none focus:border-coral-400" />
    </div>
  );
}
