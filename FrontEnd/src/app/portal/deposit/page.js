"use client";
import { useState, useEffect } from "react";
import { authFetch } from "@/utils/api";
import Link from "next/link";

export default function DepositPage() {
  const [form, setForm] = useState({ toAccount: "", amount: "", pin: "" });
  const [step, setStep] = useState(1); // 1=form, 2=confirm, 3=success
  const [accounts, setAccounts] = useState([]);
  const [txnId, setTxnId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const res = await authFetch("http://localhost:8080/api/accounts");
        const data = await res.json();
        setAccounts(data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    }
    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      setLoading(true);
      try {
        const res = await authFetch("http://localhost:8080/api/deposit", {
          method: "POST",
          body: JSON.stringify({
            to_account: Number(form.toAccount),
            amount: Number(form.amount),
            type: "Deposit",
            pin: form.pin // Included for future-proofing
          })
        });

        if (res.ok) {
          const data = await res.json();
          setTxnId(data.id);
          setStep(3);
        } else {
          const errorData = await res.text();
          alert(errorData || "Deposit failed");
        }
      } catch (err) {
        console.error(err);
        alert("Error initiating deposit");
      } finally {
        setLoading(false);
      }
    }
  };

  if (step === 3) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
          <CheckCircleSVG />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Deposit Successful!</h2>
        <p className="text-slate-500 mt-2 text-sm">Your deposit of <span className="font-semibold text-slate-700">KES {Number(form.amount).toLocaleString()}</span> has been processed.</p>
        <p className="text-xs text-slate-400 mt-1">Reference: DEP-00{txnId || 'PENDING'}</p>
        <div className="flex gap-3 justify-center mt-8">
          <button onClick={() => { setStep(1); setForm({ toAccount: "", amount: "", pin: "" }); }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            New Deposit
          </button>
          <Link href="/portal/transactions" className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
            View History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Deposit Funds</h1>
        <p className="text-slate-500 text-sm mt-1">Add money to your NexaBank account</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {["Deposit Details", "Confirm"].map((label, i) => (
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
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Target Account</label>
              <select required value={form.toAccount} onChange={(e) => setForm({ ...form, toAccount: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select account</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    ACC-00{acc.id} — {acc.type} (KES {acc.balance.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Amount to Deposit (KES)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">KES</span>
                <input type="number" required min="1" placeholder="0.00" value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg pl-12 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
              Continue <ArrowRightSVG />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="font-semibold text-slate-800">Confirm Deposit</h3>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">To Account</span><span className="font-medium text-slate-700">ACC-00{form.toAccount}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Amount</span><span className="font-bold text-slate-800">KES {Number(form.amount).toLocaleString()}</span></div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Enter PIN to Confirm</label>
              <input type="password" required maxLength={6} placeholder="••••••" value={form.pin}
                onChange={(e) => setForm({ ...form, pin: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 rounded-lg transition-colors text-sm">
                <ArrowLeftSVG /> Back
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm disabled:bg-blue-400">
                {loading ? "Processing..." : "Confirm Deposit"}
              </button>
            </div>
          </form>
        )}
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
