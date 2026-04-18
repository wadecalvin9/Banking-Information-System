"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const BASE = "/management/admin";

const links = [
  {
    href: BASE,
    label: "Dashboard",
    icon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: `${BASE}/accounts`,
    label: "Accounts",
    icon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    ),
  },
  {
    href: `${BASE}/customers`,
    label: "Customers",
    icon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: `${BASE}/transactions`,
    label: "Transactions",
    icon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.75} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    href: `${BASE}/transfers`,
    label: "Transfers",
    icon: (active) => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.75} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-[#0d1526] text-white rounded-lg shadow-lg"
        aria-label="Toggle Menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`} style={{
        width: 240,
        background: "#0d1526",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        borderRight: "1px solid #1a2640",
      }}>
      {/* Logo */}
      <div style={{
        padding: "22px 18px 18px",
        borderBottom: "1px solid #1a2640",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "#1447e6",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 12px rgba(20,71,230,0.4)",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 9.5L12 4L21 9.5V10H3V9.5Z" fill="white" />
            <rect x="5" y="10" width="2" height="7" rx="1" fill="rgba(255,255,255,0.75)" />
            <rect x="11" y="10" width="2" height="7" rx="1" fill="rgba(255,255,255,0.75)" />
            <rect x="17" y="10" width="2" height="7" rx="1" fill="rgba(255,255,255,0.75)" />
            <rect x="3" y="17" width="18" height="2" rx="1" fill="white" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>NexaBank</div>
          <div style={{ fontSize: 10.5, color: "#3d5a80", fontWeight: 500, marginTop: 1, letterSpacing: "0.03em" }}>ADMIN CONSOLE</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#2d4a6a", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px 8px" }}>
          Navigation
        </div>
        {links.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 9,
              textDecoration: "none",
              fontSize: 13.5,
              fontWeight: active ? 600 : 500,
              color: active ? "#fff" : "#6b84a4",
              background: active ? "#1447e6" : "transparent",
              transition: "all 0.15s",
              boxShadow: active ? "0 2px 10px rgba(20,71,230,0.35)" : "none",
              position: "relative",
            }}>
              <span style={{ color: active ? "#fff" : "#4a6080" }}>{icon(active)}</span>
              {label}
              {active && (
                <span style={{
                  position: "absolute", right: 10,
                  width: 6, height: 6, borderRadius: "50%",
                  background: "rgba(255,255,255,0.4)",
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User strip */}
      <div style={{
        padding: "12px 14px",
        borderTop: "1px solid #1a2640",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: "var(--primary)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
        }}>A</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#c8d8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>System Admin</div>
          <div style={{ fontSize: 11, color: "#3d5a80" }}>admin@nexabank.com</div>
        </div>
        <Link href="/" title="Sign out" style={{ color: "#2d4a6a", display: "flex", transition: "color 0.15s" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </Link>
      </div>
    </aside>
    </>
  );
}
