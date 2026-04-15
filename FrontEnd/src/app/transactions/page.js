const transactions = [
  { id: "TXN-001", account: "ACC-1001", customer: "Alice Mwangi", type: "Deposit", amount: "+KES 45,000", date: "2025-07-10 09:14", status: "Completed", ref: "DEP20250710001" },
  { id: "TXN-002", account: "ACC-1002", customer: "Brian Otieno", type: "Withdrawal", amount: "-KES 12,500", date: "2025-07-10 10:32", status: "Completed", ref: "WDR20250710002" },
  { id: "TXN-003", account: "ACC-1003", customer: "Carol Njeri", type: "Transfer", amount: "-KES 8,000", date: "2025-07-09 14:05", status: "Pending", ref: "TRF20250709003" },
  { id: "TXN-004", account: "ACC-1004", customer: "David Kamau", type: "Deposit", amount: "+KES 120,000", date: "2025-07-09 11:20", status: "Completed", ref: "DEP20250709004" },
  { id: "TXN-005", account: "ACC-1005", customer: "Eve Wanjiku", type: "Withdrawal", amount: "-KES 3,200", date: "2025-07-08 16:45", status: "Failed", ref: "WDR20250708005" },
  { id: "TXN-006", account: "ACC-1006", customer: "Frank Maina", type: "Deposit", amount: "+KES 60,000", date: "2025-07-08 08:00", status: "Completed", ref: "DEP20250708006" },
  { id: "TXN-007", account: "ACC-1001", customer: "Alice Mwangi", type: "Transfer", amount: "-KES 15,000", date: "2025-07-07 13:10", status: "Completed", ref: "TRF20250707007" },
];

const statusStyle = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Failed: "bg-red-100 text-red-600",
};

const typeStyle = {
  Deposit: "bg-green-50 text-green-600",
  Withdrawal: "bg-red-50 text-red-500",
  Transfer: "bg-blue-50 text-blue-600",
};

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
          <p className="text-slate-500 text-sm mt-1">Full transaction history and audit trail</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by ID, customer, ref..."
            className="flex-1 min-w-48 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Types</option>
            <option>Deposit</option>
            <option>Withdrawal</option>
            <option>Transfer</option>
          </select>
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <input type="date" className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wide bg-slate-50">
                <th className="px-6 py-3">TXN ID</th>
                <th className="px-6 py-3">Account</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date & Time</th>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-slate-500">{tx.id}</td>
                  <td className="px-6 py-3.5 font-mono text-slate-400 text-xs">{tx.account}</td>
                  <td className="px-6 py-3.5 font-medium text-slate-700">{tx.customer}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeStyle[tx.type]}`}>{tx.type}</span>
                  </td>
                  <td className={`px-6 py-3.5 font-semibold ${tx.amount.startsWith("+") ? "text-green-600" : "text-red-500"}`}>{tx.amount}</td>
                  <td className="px-6 py-3.5 text-slate-400 text-xs">{tx.date}</td>
                  <td className="px-6 py-3.5 font-mono text-slate-400 text-xs">{tx.ref}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[tx.status]}`}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-400">
          <span>Showing 7 of 284 transactions</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">← Prev</button>
            <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
