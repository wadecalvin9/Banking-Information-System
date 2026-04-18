"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [form, setForm] = useState({ accountNumber: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    router.push("/portal/dashboard");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_480px] bg-white">
      {/* ─── Left panel — brand ─── */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden" style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "48px 56px",
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "-120px", right: "-120px",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          animation: "pulse-ring 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", left: "-80px",
          width: "300px", height: "300px",
          borderRadius: "50%",
          background: "rgba(20,71,230,0.2)",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative" }}>
          <div style={{
            width: 44, height: 44,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 4L21 9.5V10H3V9.5Z" fill="white" fillOpacity="0.9" />
              <rect x="5" y="10" width="2" height="8" rx="1" fill="white" fillOpacity="0.7" />
              <rect x="11" y="10" width="2" height="8" rx="1" fill="white" fillOpacity="0.7" />
              <rect x="17" y="10" width="2" height="8" rx="1" fill="white" fillOpacity="0.7" />
              <rect x="3" y="18" width="18" height="2" rx="1" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>NexaBank</span>
        </div>

        {/* Middle content */}
        <div style={{ position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 99,
            padding: "5px 14px",
            marginBottom: "28px",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
              Bank-grade encryption active
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginBottom: 20,
          }}>
            Your money,<br />
            <span style={{
              backgroundColor: "var(--primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              beautifully managed.
            </span>
          </h1>
          <p style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7,
            maxWidth: 460,
          }}>
            NexaBank gives you a seamless, secure way to manage your accounts, track transactions, and move money — anytime, anywhere.
          </p>

          {/* Feature chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 36 }}>
            {[
              { icon: <ShieldSVG />, label: "256-bit SSL" },
              { icon: <ZapSVG />,    label: "Instant transfers" },
              { icon: <ClockSVG />, label: "24/7 access" },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "8px 14px",
              }}>
                <span style={{ color: "#93c5fd" }}>{icon}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom footer */}
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", position: "relative" }}>
          © {new Date().getFullYear()} NexaBank Ltd · All rights reserved · CBK Licensed
        </p>
      </div>

      {/* ─── Right panel — login form ─── */}
      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-[56px_48px] bg-white lg:border-l border-[#e5e9f2]">
        <div style={{ maxWidth: 360, width: "100%", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#0f1729",
              letterSpacing: "-0.02em",
              marginBottom: 6,
            }}>
              Sign in to your account
            </h2>
            <p style={{ fontSize: 14, color: "#9aa3b5" }}>
              Welcome back. Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Account Number */}
            <div>
              <label style={{
                display: "block", fontSize: 12, fontWeight: 600,
                color: "#4b5675", marginBottom: 6, letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>
                Account Number
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                  color: "#9aa3b5", display: "flex",
                }}>
                  <UserSVG />
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. ACC-1001"
                  value={form.accountNumber}
                  onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                  style={{
                    width: "100%", padding: "11px 14px 11px 40px",
                    border: "1.5px solid #e5e9f2",
                    borderRadius: 10, fontSize: 14,
                    color: "#0f1729", background: "#f8fafc",
                    outline: "none", transition: "border-color 0.15s, background 0.15s",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#1447e6"; e.target.style.background = "#fff"; }}
                  onBlur={e => { e.target.style.borderColor = "#e5e9f2"; e.target.style.background = "#f8fafc"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{
                  fontSize: 12, fontWeight: 600,
                  color: "#4b5675", letterSpacing: "0.04em", textTransform: "uppercase",
                }}>
                  Password
                </label>
                <a href="#" style={{ fontSize: 12, color: "#1447e6", fontWeight: 500, textDecoration: "none" }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                  color: "#9aa3b5", display: "flex",
                }}>
                  <LockSVG />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  style={{
                    width: "100%", padding: "11px 14px 11px 40px",
                    border: "1.5px solid #e5e9f2",
                    borderRadius: 10, fontSize: 14,
                    color: "#0f1729", background: "#f8fafc",
                    outline: "none", transition: "border-color 0.15s, background 0.15s",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#1447e6"; e.target.style.background = "#fff"; }}
                  onBlur={e => { e.target.style.borderColor = "#e5e9f2"; e.target.style.background = "#f8fafc"; }}
                />
              </div>
            </div>

            {/* Remember me */}
            <label style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 13, color: "#4b5675", cursor: "pointer",
            }}>
              <input type="checkbox" style={{ accentColor: "#1447e6", width: 15, height: 15 }} />
              Keep me signed in for 30 days
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: loading ? "var(--primary-muted)" : "var(--primary)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                padding: "13px 20px",
                borderRadius: 10,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 16px rgba(20,71,230,0.3)",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 4,
              }}
            >
              {loading ? (
                <>
                  <SpinnerSVG />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowSVG />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#e5e9f2" }} />
            <span style={{ fontSize: 12, color: "#9aa3b5" }}>secure connection</span>
            <div style={{ flex: 1, height: 1, background: "#e5e9f2" }} />
          </div>

          {/* Help */}
          <div style={{
            background: "#f8fafc",
            border: "1px solid #e5e9f2",
            borderRadius: 12,
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#eff4ff",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <HeadsetSVG />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#0f1729" }}>Need help?</p>
              <p style={{ fontSize: 12, color: "#9aa3b5" }}>
                Call <span style={{ color: "#1447e6", fontWeight: 600 }}>0800 720 000</span> · Mon–Fri 8am–8pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */
function ShieldSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function ZapSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function ClockSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function UserSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function LockSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function ArrowSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function SpinnerSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        style={{ animation: "spin 0.8s linear infinite" }}
      />
      <style>{`@keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }`}</style>
    </svg>
  );
}
function HeadsetSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1447e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}
