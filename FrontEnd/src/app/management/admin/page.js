import StatCard from "@/components/StatCard";
import Link from "next/link";

const recentTransactions = [
  { id: "TXN-001", customer: "Alice Mwangi", type: "Deposit", amount: "+KES 45,000", date: "2025-07-10", status: "Completed" },
  { id: "TXN-002", customer: "Brian Otieno", type: "Withdrawal", amount: "-KES 12,500", date: "2025-07-10", status: "Completed" },
  { id: "TXN-003", customer: "Carol Njeri", type: "Transfer", amount: "-KES 8,000", date: "2025-07-09", status: "Pending" },
  { id: "TXN-004", customer: "David Kamau", type: "Deposit", amount: "+KES 120,000", date: "2025-07-09", status: "Completed" },
  { id: "TXN-005", customer: "Eve Wanjiku", type: "Withdrawal", amount: "-KES 3,200", date: "2025-07-08", status: "Failed" },
];

const statusStyle = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Failed: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Customers" value="3,842" sub="+12 this week" icon={<UsersSVG />} color="blue" />
        <StatCard title="Active Accounts" value="5,210" sub="98.2% healthy" icon={<LandmarkSVG />} color="green" />
        <StatCard title="Today's Transactions" value="284" sub="KES 4.2M volume" icon={<ArrowsSVG />} color="amber" />
        <StatCard title="Pending Approvals" value="17" sub="Requires action" icon={<ClockSVG />} color="red" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Recent Transactions</h2>
          <Link href="/admin/transactions" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wide bg-slate-50">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-slate-500 whitespace-nowrap">{tx.id}</td>
                  <td className="px-6 py-3.5 font-medium text-slate-700 whitespace-nowrap">{tx.customer}</td>
                  <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap">{tx.type}</td>
                  <td className={`px-6 py-3.5 font-semibold whitespace-nowrap ${tx.amount.startsWith("+") ? "text-green-600" : "text-red-500"}`}>{tx.amount}</td>
                  <td className="px-6 py-3.5 text-slate-400 whitespace-nowrap">{tx.date}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[tx.status]}`}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */
function UsersSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function LandmarkSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
function ClockSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
