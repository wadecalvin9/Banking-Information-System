"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authFetch } from "@/utils/api";

export default function PortalTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ credits: 0, debits: 0, net: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Fetch user's accounts to identify which IDs belong to them
        const accRes = await authFetch("http://localhost:8080/api/accounts");
        const accounts = await accRes.json();
        setUserAccounts(accounts);
        const myAccountIds = accounts.map(a => a.id);

        // 2. Fetch transactions
        const txRes = await authFetch("http://localhost:8080/api/transactions");
        const txData = await txRes.json();
        setTransactions(txData);

        // 3. Calculate Stats with smart logic
        let credits = 0;
        let debits = 0;

        txData.forEach(tx => {
          const isDeposit = tx.type === "Deposit";
          const isWithdraw = tx.type === "Withdraw";
          const isTransfer = tx.type === "Transfer";

          // If I am the receiver of a transfer or I made a deposit
          const isIncoming = isDeposit || (isTransfer && tx.to_account && myAccountIds.includes(tx.to_account.id));
          // If I am the sender of a transfer or I made a withdrawal
          const isOutgoing = isWithdraw || (isTransfer && tx.from_account && myAccountIds.includes(tx.from_account.id));

          if (isIncoming) credits += tx.amount;
          if (isOutgoing) debits += tx.amount;
        });
        
        setStats({
          credits,
          debits,
          net: credits - debits
        });

      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const isIncomingTx = (tx) => {
    const myAccountIds = userAccounts.map(a => a.id);
    return tx.type === "Deposit" || (tx.type === "Transfer" && tx.to_account && myAccountIds.includes(tx.to_account.id));
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Analyzing your financial history...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
          <p className="text-slate-500 text-sm mt-1">Your personal transaction history</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-200">
          Download Statement
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Total Credits</p>
          <p className="text-2xl font-bold text-green-600 mt-1">+KES {stats.credits.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-0.5">Lifetime earnings</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Total Debits</p>
          <p className="text-2xl font-bold text-red-500 mt-1">-KES {stats.debits.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-0.5">Total spending</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Net Balance Flow</p>
          <p className={`text-2xl font-bold mt-1 ${stats.net >= 0 ? "text-blue-600" : "text-red-600"}`}>
            {stats.net >= 0 ? "+" : "-"}KES {Math.abs(stats.net).toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Overall impact</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-3 bg-slate-50/30">
          <input type="text" placeholder="Search by description or ID..."
            className="flex-1 min-w-48 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
          <select className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
            <option>All Transactions</option>
            <option>Credits</option>
            <option>Debits</option>
          </select>
        </div>

        <div className="divide-y divide-slate-50">
          {transactions.length === 0 ? (
            <div className="p-16 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <p className="text-slate-400 font-medium italic">No transactions found for this account.</p>
            </div>
          ) : (
            transactions.map((tx) => {
              const incoming = isIncomingTx(tx);
              return (
                <div key={tx.id} className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold ${incoming ? "bg-green-100 text-green-600" : "bg-red-50 text-red-500"}`}>
                      {incoming ? "↓" : "↑"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{tx.type} {incoming ? "Received" : "Sent"}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {tx.date || 'Processing'} · <span className="font-mono text-blue-500 font-medium">TXN-{tx.id}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${incoming ? "text-green-600" : "text-red-500"}`}>
                      {incoming ? "+" : "-"}KES {tx.amount?.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1.5 tracking-tight uppercase bg-slate-100 px-2 py-0.5 rounded inline-block">
                      {incoming 
                        ? (tx.from_account ? `From AC-00${tx.from_account.id}` : "System Deposit")
                        : (tx.to_account ? `To AC-00${tx.to_account.id}` : "Withdrawal")
                      }
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {transactions.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 bg-slate-50/30 font-bold uppercase tracking-widest">
            <span>Data synchronized with NexaBank Core</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-all">Previous</button>
              <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-all">Next Page</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
