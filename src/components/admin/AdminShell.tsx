"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Stethoscope } from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Patients", href: "/admin/patients", icon: Users },
  { label: "Appointments", href: "/admin/appointments", icon: Calendar },
  { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
];

export default function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setName(d.user?.name ?? ""))
      .catch(() => {});
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-plum-50">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-plum-100 bg-white md:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-plum-900 text-sm font-bold text-coral-300">
            श्री
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-extrabold text-plum-900">Shri Sai Ayurveda</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-coral-600">
              Admin Panel
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(n.href)
                  ? "bg-coral-500 text-white"
                  : "text-plum-900/75 hover:bg-coral-50"
              }`}
            >
              <n.icon className="h-4 w-4 shrink-0" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-plum-100 p-3">
          <Link href="/" className="block rounded-lg px-3 py-2 text-xs font-medium text-plum-900/60 hover:bg-plum-50">
            ← Back to website
          </Link>
          <button
            onClick={logout}
            className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-coral-600 hover:bg-coral-50"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-plum-100 bg-white px-4 py-3 md:px-8">
          <h1 className="font-display text-lg font-bold text-plum-900">{title}</h1>
          <div className="flex items-center gap-3">
            {name && <span className="hidden text-sm text-plum-900/60 sm:block">Hi, {name}</span>}
            <button
              onClick={logout}
              className="rounded-full border border-plum-200 px-3 py-1.5 text-xs font-semibold text-plum-800 hover:border-coral-300 md:hidden"
            >
              Log out
            </button>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-plum-100 bg-white px-3 py-2 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                isActive(n.href) ? "bg-coral-500 text-white" : "text-plum-900/70"
              }`}
            >
              <n.icon className="h-3.5 w-3.5" />
              {n.label}
            </Link>
          ))}
        </div>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
