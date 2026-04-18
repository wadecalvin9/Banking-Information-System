import Link from "next/link";

const accounts = [
  { id: "ACC-1001", type: "Savings", balance: "KES 245,800.00", number: "**** 1001" },
  { id: "ACC-1007", type: "Current", balance: "KES 82,400.00", number: "**** 1007" },
];

const recentTx = [
  { id: "TXN-001", desc: "Salary Credit", amount: "+KES 85,000", date: "2025-07-10", type: "credit" },
  { id: "TXN-002", desc: "Utility Bill Payment", amount: "-KES 4,200", date: "2025-07-09", type: "debit" },
  { id: "TXN-003", desc: "Transfer to Brian Otieno", amount: "-KES 15,000", date: "2025-07-08", type: "debit" },
  { id: "TXN-004", desc: "ATM Withdrawal", amount: "-KES 5,000", date: "2025-07-07", type: "debit" },
  { id: "TXN-005", desc: "Interest Credit", amount: "+KES 1,240", date: "2025-07-06", type: "credit" },
];

export default function PortalDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Good morning, Alice</h1>
        <p className="text-slate-500 text-sm mt-1">Here&apos;s your financial overview for today.</p>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="relative bg-blue-700 rounded-2xl p-6 text-white overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
            <p className="text-blue-200 text-xs font-medium uppercase tracking-wide">{acc.type} Account</p>
            <p className="text-3xl font-bold mt-2">{acc.balance}</p>
            <p className="text-blue-300 text-sm mt-1">{acc.number}</p>
            <div className="flex gap-3 mt-5">
              <Link href="/portal/transfer"
                className="bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                Transfer
              </Link>
              <Link href="/portal/transactions"
                className="bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                History
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Send Money", icon: <SendSVG />, href: "/portal/transfer" },
          { label: "My Accounts", icon: <LandmarkSVG />, href: "/portal/accounts" },
          { label: "Transactions", icon: <ArrowsSVG />, href: "/portal/transactions" },
          { label: "Profile", icon: <UserSVG />, href: "/portal/profile" },
        ].map((a) => (
          <Link key={a.label} href={a.href}
            className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all">
            <span className="text-blue-600 flex items-center justify-center">{a.icon}</span>
            <span className="text-xs font-medium text-slate-600">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Recent Transactions</h2>
          <Link href="/portal/transactions" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        <div className="divide-y divide-slate-50">
          {recentTx.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${tx.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-50 text-red-400"}`}>
                  {tx.type === "credit" ? "↓" : "↑"}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{tx.desc}</p>
                  <p className="text-xs text-slate-400">{tx.date}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-green-600" : "text-red-500"}`}>{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */
function SendSVG() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function LandmarkSVG() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  );
}
function ArrowsSVG() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
function UserSVG() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
