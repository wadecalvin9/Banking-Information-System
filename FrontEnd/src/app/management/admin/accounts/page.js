"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authFetch } from "@/utils/api";

const statusStyle = { Active: "bg-green-100 text-green-700", Dormant: "bg-slate-100 text-slate-500", Suspended: "bg-red-100 text-red-600" };
const typeStyle = { Savings: "bg-blue-50 text-blue-600", Current: "bg-slate-100 text-slate-700", "Fixed Deposit": "bg-amber-50 text-amber-600" };

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await authFetch("http://localhost:8080/api/accounts");
        const data = await res.json();
        setAccounts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading accounts...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Accounts</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all bank accounts</p>
        </div>
        <Link
          href="/management/admin/accounts/new"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <span>+ New Account</span>
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex gap-3">
          <input type="text" placeholder="Search accounts..." className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Types</option><option>Savings</option><option>Current</option><option>Fixed Deposit</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wide bg-slate-50">
                <th className="px-6 py-3">Account ID</th><th className="px-6 py-3">Owner</th><th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Balance</th><th className="px-6 py-3">Opened</th><th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-slate-500 whitespace-nowrap">ACC-00{acc.id}</td>
                  <td className="px-6 py-3.5 font-medium text-slate-700 whitespace-nowrap">{acc.customer.name}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeStyle[acc.type]}`}>{acc.type}</span></td>
                  <td className="px-6 py-3.5 font-semibold text-slate-700 whitespace-nowrap">KSH {acc.balance}</td>
                  <td className="px-6 py-3.5 text-slate-400 whitespace-nowrap">{acc.opened}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[acc.status]}`}>{acc.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
