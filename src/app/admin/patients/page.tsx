"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { apiGet, apiSend } from "@/lib/adminApi";

export type Patient = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  gender: string | null;
  dob: string | null;
  address: string | null;
  blood_group: string | null;
  marital_status: string | null;
  notes: string | null;
  created_at: string;
};

const empty = {
  full_name: "",
  phone: "",
  email: "",
  gender: "",
  dob: "",
  address: "",
  blood_group: "",
  marital_status: "",
  notes: "",
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState<null | { mode: "add" | "edit"; data: typeof empty; id?: string }>(null);

  const load = useCallback(async (search = "") => {
    try {
      const d = await apiGet<{ patients: Patient[] }>(
        `/api/admin/patients${search ? `?q=${encodeURIComponent(search)}` : ""}`,
      );
      setPatients(d.patients);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => setModal({ mode: "add", data: { ...empty } });
  const openEdit = (p: Patient) =>
    setModal({
      mode: "edit",
      id: p.id,
      data: {
        full_name: p.full_name,
        phone: p.phone,
        email: p.email ?? "",
        gender: p.gender ?? "",
        dob: p.dob ? p.dob.slice(0, 10) : "",
        address: p.address ?? "",
        blood_group: p.blood_group ?? "",
        marital_status: p.marital_status ?? "",
        notes: p.notes ?? "",
      },
    });

  const remove = async (p: Patient) => {
    if (!confirm(`Delete patient "${p.full_name}"? This cannot be undone.`)) return;
    await apiSend(`/api/admin/patients/${p.id}`, "DELETE");
    load(q);
  };

  return (
    <AdminShell title="Patients">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(q);
          }}
          className="flex gap-2"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, phone or email…"
            className="w-64 rounded-full border border-plum-200 px-4 py-2 text-sm outline-none focus:border-coral-400"
          />
          <button className="rounded-full bg-plum-800 px-4 py-2 text-sm font-semibold text-white">
            Search
          </button>
        </form>
        <button
          onClick={openAdd}
          className="rounded-full bg-gradient-to-r from-coral-500 to-coral-600 px-5 py-2.5 text-sm font-bold text-white shadow-md"
        >
          ＋ Add Patient
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
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-plum-900/50">
                  No patients yet. Click “Add Patient” to register one.
                </td>
              </tr>
            )}
            {patients.map((p) => (
              <tr key={p.id} className="border-b border-plum-50 last:border-0 hover:bg-cream-50">
                <td className="px-4 py-3 font-semibold text-plum-900">
                  <Link href={`/admin/patients/${p.id}`} className="hover:text-coral-600">
                    {p.full_name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-plum-900/70">{p.phone}</td>
                <td className="px-4 py-3 capitalize text-plum-900/70">{p.gender || "—"}</td>
                <td className="px-4 py-3 text-plum-900/70">{p.email || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/patients/${p.id}`}
                      className="rounded-lg border border-plum-200 px-2.5 py-1 text-xs font-semibold text-plum-700 hover:border-coral-300"
                    >
                      History
                    </Link>
                    <button
                      onClick={() => openEdit(p)}
                      className="rounded-lg border border-plum-200 px-2.5 py-1 text-xs font-semibold text-plum-700 hover:border-coral-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(p)}
                      className="rounded-lg border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <PatientModal
          mode={modal.mode}
          initial={modal.data}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            load(q);
          }}
          id={modal.id}
        />
      )}
    </AdminShell>
  );
}

function PatientModal({
  mode,
  initial,
  id,
  onClose,
  onSaved,
}: {
  mode: "add" | "edit";
  initial: typeof empty;
  id?: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      if (mode === "add") await apiSend("/api/admin/patients", "POST", form);
      else await apiSend(`/api/admin/patients/${id}`, "PUT", form);
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-plum-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-plum-900">
            {mode === "add" ? "Add Patient" : "Edit Patient"}
          </h3>
          <button onClick={onClose} className="text-plum-900/50 hover:text-plum-900">✕</button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <F label="Full name *" value={form.full_name} onChange={(v) => set("full_name", v)} span />
          <F label="Phone *" value={form.phone} onChange={(v) => set("phone", v)} />
          <F label="Email" value={form.email} onChange={(v) => set("email", v)} type="email" />
          <div>
            <label className="text-xs font-semibold text-plum-900">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => set("gender", e.target.value)}
              className="mt-1 w-full rounded-xl border border-plum-100 px-3 py-2.5 text-sm outline-none focus:border-coral-400"
            >
              <option value="">—</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <F label="Date of birth" value={form.dob} onChange={(v) => set("dob", v)} type="date" />
          <F label="Blood group" value={form.blood_group} onChange={(v) => set("blood_group", v)} />
          <F label="Marital status" value={form.marital_status} onChange={(v) => set("marital_status", v)} />
          <F label="Address" value={form.address} onChange={(v) => set("address", v)} span />
          <div className="col-span-2">
            <label className="text-xs font-semibold text-plum-900">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={2}
              className="mt-1 w-full resize-none rounded-xl border border-plum-100 px-3 py-2.5 text-sm outline-none focus:border-coral-400"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm font-medium text-rose-500">{error}</p>}

        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="rounded-full border border-plum-200 px-5 py-2.5 text-sm font-semibold text-plum-800">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex-1 rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-2.5 text-sm font-bold text-white disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Patient"}
          </button>
        </div>
      </div>
    </div>
  );
}

function F({
  label,
  value,
  onChange,
  type = "text",
  span = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  span?: boolean;
}) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <label className="text-xs font-semibold text-plum-900">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-plum-100 px-3 py-2.5 text-sm outline-none focus:border-coral-400"
      />
    </div>
  );
}
