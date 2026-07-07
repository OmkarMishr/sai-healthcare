"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-coral-50 via-cream-100 to-plum-50 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-plum-100 bg-white p-8 shadow-xl">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-plum-900 font-display text-lg font-bold text-coral-300">
            श्री
          </span>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-plum-900">
            {mode === "login" ? "Admin Login" : "Create Admin Account"}
          </h1>
          <p className="mt-1 text-sm text-plum-900/60">Shri Sai Ayurveda · Clinic Panel</p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} />
          )}
          <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} />
          <Field label="Password" type="password" value={form.password} onChange={(v) => set("password", v)} />

          {error && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-coral-500 to-coral-600 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-60"
          >
            {loading ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-plum-900/60">
          {mode === "login" ? "No account yet?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
            className="font-semibold text-coral-600 hover:underline"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>

        <Link href="/" className="mt-4 block text-center text-xs text-plum-900/45 hover:text-coral-600">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-plum-900">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="mt-1.5 w-full rounded-xl border border-plum-100 px-4 py-2.5 text-sm text-plum-900 outline-none focus:border-coral-400 focus:ring-1 focus:ring-coral-400"
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
