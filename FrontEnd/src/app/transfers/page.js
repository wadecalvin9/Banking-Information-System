"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TransfersPage() {
  const [form, setForm] = useState({ fromAccount: "", toAccount: "", amount: "", description: "", pin: "" });
  const [submitted, setSubmitted] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [accRes, txRes] = await Promise.all([
          fetch("http://localhost:8080/api/accounts"),
          fetch("http://localhost:8080/api/transactions")
        ]);
        const accData = await accRes.json();
        const txData = await txRes.json();
        setAccounts(accData);
        setTransactions(txData.filter(tx => tx.type === 'Transfer'));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_account: Number(form.fromAccount),
          to_account: Number(form.toAccount),
          amount: Number(form.amount),
          type: "Transfer"
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        // Refresh transactions
        const txRes = await fetch("http://localhost:8080/api/transactions");
        const txData = await txRes.json();
        setTransactions(txData.filter(tx => tx.type === 'Transfer'));
      } else {
        alert("Transfer failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error initiating transfer");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Fund Transfers</h1>
        <p className="text-slate-500 text-sm mt-1">Initiate internal and external transfers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-semibold text-slate-800 mb-5">New Transfer</h2>

          {submitted && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
              <CheckSVG /> Transfer initiated successfully! Awaiting processing.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">From Account</label>
              <select
                required
                value={form.fromAccount}
                onChange={(e) => setForm({ ...form, fromAccount: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select source account</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    ACC-00{acc.id} — {acc.customer.name} (KES {acc.balance.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">To Account</label>
              <input
                type="text"
                required
                placeholder="Enter destination account number"
                value={form.toAccount}
                onChange={(e) => setForm({ ...form, toAccount: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Amount (KES)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">KES</span>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg pl-12 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Description / Narration</label>
              <input
                type="text"
                placeholder="e.g. Rent payment, School fees..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Authorization PIN</label>
              <input
                type="password"
                required
                maxLength={6}
                placeholder="••••••"
                value={form.pin}
                onChange={(e) => setForm({ ...form, pin: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm mt-2"
            >
              Initiate Transfer
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="font-semibold text-slate-800 mb-5">Recent Transfers</h2>
          <div className="space-y-3">
            {transactions.length > 0 ? transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    AC-00{t.from_account?.id} <ArrowRightSVG /> AC-00{t.to_account?.id}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">TX-00{t.id} · {t.date || 'Just now'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-700">KES {t.amount?.toLocaleString()}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700`}>
                    Completed
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-400 text-sm py-4">No recent transfers</p>
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Transfer Limits</p>
            <div className="space-y-1 text-xs text-blue-600">
              <div className="flex justify-between"><span>Daily limit</span><span className="font-medium">KES 500,000</span></div>
              <div className="flex justify-between"><span>Per transaction</span><span className="font-medium">KES 200,000</span></div>
              <div className="flex justify-between"><span>Used today</span><span className="font-medium">KES 23,000</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */
function CheckSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightSVG() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
