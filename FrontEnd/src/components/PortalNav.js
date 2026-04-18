"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/portal/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/portal/accounts",
    label: "My Accounts",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    ),
  },
  {
    href: "/portal/transactions",
    label: "Transactions",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    href: "/portal/transfer",
    label: "Transfer",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6" />
      </svg>
    ),
  },
  {
    href: "/portal/profile",
    label: "Profile",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function PortalNav() {
  const pathname = usePathname();
  return (
    <>
      <header className="bg-white border-b border-[#e5e9f2] sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-[60px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/portal/dashboard" style={{
          display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9,
            background: "#1447e6",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 4L21 9.5V10H3V9.5Z" fill="white" />
              <rect x="5" y="10" width="2" height="7" rx="1" fill="rgba(255,255,255,0.75)" />
              <rect x="11" y="10" width="2" height="7" rx="1" fill="rgba(255,255,255,0.75)" />
              <rect x="17" y="10" width="2" height="7" rx="1" fill="rgba(255,255,255,0.75)" />
              <rect x="3" y="17" width="18" height="2" rx="1" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: 15.5, fontWeight: 700, color: "#0f1729", letterSpacing: "-0.02em" }}>NexaBank</span>
        </Link>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {links.map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                color: active ? "#1447e6" : "#6b7a99",
                background: active ? "#eff4ff" : "transparent",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}>
                <span style={{ opacity: active ? 1 : 0.6, color: active ? "#1447e6" : "currentColor" }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-[12.5px] font-bold text-white">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-[13px] font-semibold text-[#0f1729] leading-tight">Alice Mwangi</p>
            <p className="text-[11px] text-[#9aa3b5]">ACC-1001</p>
          </div>
          <Link href="/" className="ml-1 sm:ml-2 flex items-center p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-[#9aa3b5] border border-[#e5e9f2] gap-1.5 transition-all hover:bg-slate-50" title="Sign out">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="hidden sm:inline text-xs">Sign out</span>
          </Link>
        </div>
      </div>
    </header>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center z-50 px-2 pb-[env(safe-area-inset-bottom)]">
        {links.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`flex flex-col items-center justify-center py-3 px-1 gap-1 min-w-[60px] ${active ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
              <span className={`${active ? 'opacity-100' : 'opacity-70'} mb-0.5`}>{icon}</span>
              <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
