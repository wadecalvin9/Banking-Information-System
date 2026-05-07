"use client";
import { useState, useEffect } from "react";
import { authFetch } from "@/utils/api";

const statusStyle = { Completed: "bg-green-100 text-green-700", Pending: "bg-amber-100 text-amber-700", Failed: "bg-red-100 text-red-600" };
const typeStyle = { Deposit: "bg-green-50 text-green-600", Withdrawal: "bg-red-50 text-red-500", Withdraw: "bg-red-50 text-red-500", Transfer: "bg-blue-50 text-blue-600" };

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await authFetch("http://localhost:8080/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading transactions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
          <p className="text-slate-500 text-sm mt-1">Full transaction history and audit trail</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Export CSV</button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-3">
          <input type="text" placeholder="Search by ID, customer, ref..." className="flex-1 min-w-48 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Types</option><option>Deposit</option><option>Withdrawal</option><option>Transfer</option>
          </select>

          <input type="date" className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wide bg-slate-50">
                <th className="px-6 py-3">TXN ID</th>
                <th className="px-6 py-3">From Account</th>
                <th className="px-6 py-3">To Account</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-slate-500 whitespace-nowrap">TX-00{tx.id}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="font-mono text-slate-400 text-xs">AC-00{tx.from_account?.id || "N/A"}</div>
                    <div className="text-slate-700 font-medium">{tx.from_account?.customer?.name || "-"}</div>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="font-mono text-slate-400 text-xs">AC-00{tx.to_account?.id || "N/A"}</div>
                    <div className="text-slate-700 font-medium">{tx.to_account?.customer?.name || "-"}</div>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeStyle[tx.type]}`}>{tx.type}</span></td>
                  <td className={`px-6 py-3.5 font-semibold whitespace-nowrap ${tx.type === 'Deposit' ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.type === 'Deposit' ? '+' : '-'} KES {tx.amount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-3.5 text-slate-400 text-xs whitespace-nowrap">{tx.date || "Just now"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-400">
          <span>Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 flex items-center gap-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600"><ArrowLeftSVG /> Prev</button>
            <button className="px-3 py-1.5 flex items-center gap-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600">Next <ArrowRightSVG /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */
function ArrowLeftSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRightSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
