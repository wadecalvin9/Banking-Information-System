"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ accountNumber: "", pin: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
        router.push("/portal/dashboard");
      } else {
        setError("Invalid Account Number or PIN");
      }
    } catch (err) {
      setError("Server connection failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center text-blue-500 mb-4">
            <LandmarkSVG />
          </div>
          <h1 className="text-3xl font-bold text-white">NexaBank</h1>
          <p className="text-slate-400 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-2 rounded-lg text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Account Number</label>
              <input
                type="text"
                required
                placeholder="e.g. ACC-1001"
                value={form.accountNumber}
                onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Account PIN</label>
              <input
                type="password"
                required
                maxLength={6}
                placeholder="••••••"
                value={form.pin}
                onChange={(e) => setForm({ ...form, pin: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
              Sign In
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-6">
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:underline">Contact support</a>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-slate-400 text-sm flex items-center justify-center gap-2 hover:text-white transition-colors">
            <ArrowLeftSVG /> Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */
function LandmarkSVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}

function ArrowLeftSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
