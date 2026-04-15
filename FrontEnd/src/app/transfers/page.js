"use client";
import { useState } from "react";

const recentTransfers = [
  { id: "TRF-001", from: "ACC-1001", to: "ACC-1003", amount: "KES 8,000", date: "2025-07-09", status: "Completed" },
  { id: "TRF-002", from: "ACC-1001", to: "ACC-1006", amount: "KES 15,000", date: "2025-07-07", status: "Completed" },
  { id: "TRF-003", from: "ACC-1002", to: "ACC-1004", amount: "KES 50,000", date: "2025-07-06", status: "Pending" },
];

export default function TransfersPage() {
  const [form, setForm] = useState({ fromAccount: "", toAccount: "", amount: "", description: "", pin: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
              ✓ Transfer initiated successfully! Awaiting processing.
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
                <option value="ACC-1001">ACC-1001 — Alice Mwangi (KES 245,800)</option>
                <option value="ACC-1002">ACC-1002 — Brian Otieno (KES 1,200,000)</option>
                <option value="ACC-1006">ACC-1006 — Frank Maina (KES 87,300)</option>
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
            {recentTransfers.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-700">{t.from} → {t.to}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.id} · {t.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-700">{t.amount}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.status === "Completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
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
