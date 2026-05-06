"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authFetch } from "@/utils/api";

export default function PortalAccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await authFetch("http://localhost:8080/api/accounts");
        const data = await res.json();
        setAccounts(data);
      } catch (err) {
        console.error("Error fetching accounts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading your accounts...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Accounts</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of all your bank accounts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {accounts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
            No accounts found.
          </div>
        ) : (
          accounts.map((acc) => (
            <div key={acc.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className={`${acc.type === 'Savings' ? 'bg-blue-600' : 'bg-slate-700'} p-5 text-white relative`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                <p className="text-xs font-medium uppercase tracking-wide opacity-80">{acc.type} Account</p>
                <p className="text-3xl font-bold mt-1">KES {acc.balance?.toLocaleString()}</p>
                <p className="text-sm opacity-70 mt-1 font-mono tracking-widest">AC-00{acc.id}</p>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Date Opened</span>
                  <span className="font-medium text-slate-700">{acc.opened || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Interest Rate</span>
                  <span className="font-medium text-slate-700">{acc.type === 'Savings' ? '4.5% p.a.' : '0% p.a.'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${acc.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{acc.status}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Link href="/portal/transactions"
                    className="flex-1 text-center bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium py-2 rounded-lg transition-colors border border-slate-100">
                    View Transactions
                  </Link>
                  <Link href="/portal/transfer"
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                    Transfer Funds
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-800 mb-1">Want to open a new account?</p>
          <p className="text-xs text-blue-600">Apply online for a new savings or fixed deposit account.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95">
          Request New Account
        </button>
      </div>
    </div>
  );
}
