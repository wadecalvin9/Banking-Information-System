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
        <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Customers" value="3,842" sub="+12 this week" icon="👥" color="blue" />
        <StatCard title="Active Accounts" value="5,210" sub="98.2% healthy" icon="🏦" color="green" />
        <StatCard title="Today's Transactions" value="284" sub="KES 4.2M volume" icon="↔" color="amber" />
        <StatCard title="Pending Approvals" value="17" sub="Requires action" icon="⏳" color="red" />
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
                  <td className="px-6 py-3.5 font-mono text-slate-500">{tx.id}</td>
                  <td className="px-6 py-3.5 font-medium text-slate-700">{tx.customer}</td>
                  <td className="px-6 py-3.5 text-slate-500">{tx.type}</td>
                  <td className={`px-6 py-3.5 font-semibold ${tx.amount.startsWith("+") ? "text-green-600" : "text-red-500"}`}>{tx.amount}</td>
                  <td className="px-6 py-3.5 text-slate-400">{tx.date}</td>
                  <td className="px-6 py-3.5">
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
