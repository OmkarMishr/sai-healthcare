"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { apiGet, apiSend } from "@/lib/adminApi";
import type { Patient } from "../page";

type Visit = {
  id: string;
  visit_date: string;
  diagnosis: string | null;
  treatment: string | null;
  prescription: string | null;
  notes: string | null;
  doctor_name: string | null;
};

type Doctor = { id: string; name: string };

export default function PatientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [history, setHistory] = useState<Visit[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState("");

  const [visit, setVisit] = useState({
    doctor_id: "",
    visit_date: new Date().toISOString().slice(0, 10),
    diagnosis: "",
    treatment: "",
    prescription: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const [p, h, d] = await Promise.all([
        apiGet<{ patient: Patient }>(`/api/admin/patients/${id}`),
        apiGet<{ history: Visit[] }>(`/api/admin/patients/${id}/history`),
        apiGet<{ doctors: Doctor[] }>(`/api/admin/doctors`),
      ]);
      setPatient(p.patient);
      setHistory(h.history);
      setDoctors(d.doctors);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const addVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiSend(`/api/admin/patients/${id}/history`, "POST", {
        ...visit,
        doctor_id: visit.doctor_id || null,
      });
      setVisit({
        doctor_id: "",
        visit_date: new Date().toISOString().slice(0, 10),
        diagnosis: "",
        treatment: "",
        prescription: "",
        notes: "",
      });
      load();
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell title="Patient Record">
      <Link href="/admin/patients" className="text-sm font-semibold text-coral-600 hover:underline">
        ← All patients
      </Link>

      {error && <p className="mt-4 text-sm text-rose-500">{error}</p>}

      {patient && (
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Patient info + add visit */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-plum-100 bg-white p-6">
              <h2 className="font-display text-xl font-bold text-plum-900">{patient.full_name}</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <Row k="Phone" v={patient.phone} />
                <Row k="Email" v={patient.email} />
                <Row k="Gender" v={patient.gender} />
                <Row k="Date of birth" v={patient.dob?.slice(0, 10)} />
                <Row k="Blood group" v={patient.blood_group} />
                <Row k="Marital status" v={patient.marital_status} />
                <Row k="Address" v={patient.address} />
                <Row k="Notes" v={patient.notes} />
              </dl>
            </div>

            <form onSubmit={addVisit} className="rounded-2xl border border-plum-100 bg-white p-6">
              <h3 className="font-display text-base font-bold text-plum-900">＋ Add Visit / History</h3>
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-plum-900">Date</label>
                    <input
                      type="date"
                      value={visit.visit_date}
                      onChange={(e) => setVisit({ ...visit, visit_date: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-plum-100 px-3 py-2.5 text-sm outline-none focus:border-coral-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-plum-900">Doctor</label>
                    <select
                      value={visit.doctor_id}
                      onChange={(e) => setVisit({ ...visit, doctor_id: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-plum-100 px-3 py-2.5 text-sm outline-none focus:border-coral-400"
                    >
                      <option value="">—</option>
                      {doctors.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <VText label="Diagnosis" value={visit.diagnosis} onChange={(v) => setVisit({ ...visit, diagnosis: v })} />
                <VText label="Treatment / Therapy" value={visit.treatment} onChange={(v) => setVisit({ ...visit, treatment: v })} />
                <VText label="Prescription" value={visit.prescription} onChange={(v) => setVisit({ ...visit, prescription: v })} />
                <VText label="Notes" value={visit.notes} onChange={(v) => setVisit({ ...visit, notes: v })} />
              </div>
              <button
                disabled={saving}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-2.5 text-sm font-bold text-white disabled:opacity-60"
              >
                {saving ? "Saving…" : "Add to History"}
              </button>
            </form>
          </div>

          {/* History timeline */}
          <div>
            <h3 className="font-display text-base font-bold text-plum-900">Visit History</h3>
            {history.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-plum-100 bg-white px-4 py-8 text-center text-sm text-plum-900/50">
                No visits recorded yet.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {history.map((v) => (
                  <div key={v.id} className="rounded-2xl border border-plum-100 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-plum-900">
                        {v.visit_date?.slice(0, 10)}
                      </span>
                      {v.doctor_name && (
                        <span className="rounded-full bg-coral-50 px-2.5 py-0.5 text-[11px] font-semibold text-coral-700">
                          {v.doctor_name}
                        </span>
                      )}
                    </div>
                    <dl className="mt-3 space-y-1.5 text-sm">
                      <Row k="Diagnosis" v={v.diagnosis} />
                      <Row k="Treatment" v={v.treatment} />
                      <Row k="Prescription" v={v.prescription} />
                      <Row k="Notes" v={v.notes} />
                    </dl>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Row({ k, v }: { k: string; v?: string | null }) {
  if (!v) return null;
  return (
    <div className="flex gap-2">
      <dt className="w-28 shrink-0 text-plum-900/50">{k}</dt>
      <dd className="text-plum-900/80">{v}</dd>
    </div>
  );
}

function VText({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold text-plum-900">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-plum-100 px-3 py-2.5 text-sm outline-none focus:border-coral-400"
      />
    </div>
  );
}
