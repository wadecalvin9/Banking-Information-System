"use client";
import { useState } from "react";

export default function PortalTransferPage() {
  const [form, setForm] = useState({ fromAccount: "", toAccount: "", amount: "", description: "", pin: "" });
  const [step, setStep] = useState(1); // 1=form, 2=confirm, 3=success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    if (step === 2) { setStep(3); }
  };

  if (step === 3) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
          <CheckCircleSVG />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Transfer Successful!</h2>
        <p className="text-slate-500 mt-2 text-sm">Your transfer of <span className="font-semibold text-slate-700">KES {form.amount}</span> has been initiated.</p>
        <p className="text-xs text-slate-400 mt-1">Reference: TRF{Date.now()}</p>
        <div className="flex gap-3 justify-center mt-8">
          <button onClick={() => { setStep(1); setForm({ fromAccount: "", toAccount: "", amount: "", description: "", pin: "" }); }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            New Transfer
          </button>
          <a href="/portal/transactions" className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
            View History
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Transfer Funds</h1>
        <p className="text-slate-500 text-sm mt-1">Send money to any NexaBank account</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {["Transfer Details", "Confirm"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-400"}`}>
              {step > i + 1 ? <CheckSVG /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${step === i + 1 ? "text-slate-800" : "text-slate-400"}`}>{label}</span>
            {i < 1 && <div className="w-12 h-px bg-slate-200 mx-1" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">From Account</label>
              <select required value={form.fromAccount} onChange={(e) => setForm({ ...form, fromAccount: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select account</option>
                <option value="ACC-1001">ACC-1001 — Savings (KES 245,800)</option>
                <option value="ACC-1007">ACC-1007 — Current (KES 82,400)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">To Account Number</label>
              <input type="text" required placeholder="Enter recipient account number" value={form.toAccount}
                onChange={(e) => setForm({ ...form, toAccount: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Amount (KES)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">KES</span>
                <input type="number" required min="1" placeholder="0.00" value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg pl-12 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Description (optional)</label>
              <input type="text" placeholder="e.g. Rent, School fees..." value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
              Continue <ArrowRightSVG />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="font-semibold text-slate-800">Confirm Transfer</h3>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">From</span><span className="font-medium text-slate-700">{form.fromAccount}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">To</span><span className="font-medium text-slate-700">{form.toAccount}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Amount</span><span className="font-bold text-slate-800">KES {form.amount}</span></div>
              {form.description && <div className="flex justify-between"><span className="text-slate-500">Description</span><span className="text-slate-700">{form.description}</span></div>}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Enter PIN to Confirm</label>
              <input type="password" required maxLength={6} placeholder="••••••" value={form.pin}
                onChange={(e) => setForm({ ...form, pin: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-lg transition-colors text-sm">
                <ArrowLeftSVG /> Back
              </button>
              <button type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
                Confirm Transfer
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-700">
        <span className="font-semibold">Daily limit:</span> KES 500,000 &nbsp;·&nbsp; <span className="font-semibold">Used today:</span> KES 15,000 &nbsp;·&nbsp; <span className="font-semibold">Remaining:</span> KES 485,000
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */
function CheckSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CheckCircleSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ArrowRightSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ArrowLeftSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
