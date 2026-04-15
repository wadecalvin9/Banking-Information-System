const transactions = [
  { id: "TXN-001", desc: "Salary Credit", account: "ACC-1001", amount: "+KES 85,000", date: "2025-07-10 08:00", type: "credit", status: "Completed", ref: "SAL20250710001" },
  { id: "TXN-002", desc: "Utility Bill Payment", account: "ACC-1001", amount: "-KES 4,200", date: "2025-07-09 14:22", type: "debit", status: "Completed", ref: "UTL20250709002" },
  { id: "TXN-003", desc: "Transfer to Brian Otieno", account: "ACC-1001", amount: "-KES 15,000", date: "2025-07-08 11:05", type: "debit", status: "Completed", ref: "TRF20250708003" },
  { id: "TXN-004", desc: "ATM Withdrawal", account: "ACC-1007", amount: "-KES 5,000", date: "2025-07-07 16:30", type: "debit", status: "Completed", ref: "ATM20250707004" },
  { id: "TXN-005", desc: "Interest Credit", account: "ACC-1001", amount: "+KES 1,240", date: "2025-07-06 00:01", type: "credit", status: "Completed", ref: "INT20250706005" },
  { id: "TXN-006", desc: "Online Purchase", account: "ACC-1007", amount: "-KES 3,800", date: "2025-07-05 19:14", type: "debit", status: "Completed", ref: "ONL20250705006" },
  { id: "TXN-007", desc: "Deposit — Cash", account: "ACC-1001", amount: "+KES 20,000", date: "2025-07-04 10:00", type: "credit", status: "Completed", ref: "DEP20250704007" },
];

export default function PortalTransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
          <p className="text-slate-500 text-sm mt-1">Your personal transaction history</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Download Statement
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Total Credits</p>
          <p className="text-xl font-bold text-green-600 mt-1">+KES 106,240</p>
          <p className="text-xs text-slate-400 mt-0.5">This month</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Total Debits</p>
          <p className="text-xl font-bold text-red-500 mt-1">-KES 28,000</p>
          <p className="text-xs text-slate-400 mt-0.5">This month</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Net Flow</p>
          <p className="text-xl font-bold text-blue-600 mt-1">+KES 78,240</p>
          <p className="text-xs text-slate-400 mt-0.5">This month</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-3">
          <input type="text" placeholder="Search transactions..."
            className="flex-1 min-w-48 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Accounts</option><option>ACC-1001</option><option>ACC-1007</option>
          </select>
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Types</option><option>Credits</option><option>Debits</option>
          </select>
          <input type="date" className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="divide-y divide-slate-50">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${tx.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-50 text-red-400"}`}>
                  {tx.type === "credit" ? "↓" : "↑"}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{tx.desc}</p>
                  <p className="text-xs text-slate-400">{tx.date} · <span className="font-mono">{tx.ref}</span></p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${tx.type === "credit" ? "text-green-600" : "text-red-500"}`}>{tx.amount}</p>
                <p className="text-xs text-slate-400 font-mono">{tx.account}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-400">
          <span>Showing 7 of 42 transactions</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">← Prev</button>
            <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
