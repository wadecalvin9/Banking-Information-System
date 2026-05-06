'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authFetch } from '@/utils/api';

export default function NewAccountPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState([]);
  const [customer_id, setCustomerID] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await authFetch("http://localhost:8080/api/customers");
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    }

    fetchCustomers();
  }, []);

  async function createAccount() {
    try {
      const res = await authFetch("http://localhost:8080/api/accounts", {
        method: "POST",
        body: JSON.stringify({
          type,
          balance: Number(balance),
          status,
          customer_id
        })
      });

      if (!res.ok) throw new Error("Failed to create account");

      alert("Account created successfully!");
      router.push('/management/admin/accounts');

    } catch (err) {
      console.error(err);
      alert("Error creating account");
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Open New Account</h1>
          <p className="text-slate-500 text-sm mt-1">
            Initialize a new bank account for an existing customer
          </p>
        </div>
        <Link
          href="/management/admin/accounts"
          className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>Cancel</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAccount();
          }}
          className="p-8 space-y-8"
        >

          {/* Customer Selection */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Customer Link
            </h2>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Select Customer
              </label>

              <div className="relative">
                <select
                  required
                  value={customer_id}
                  onChange={(e) => setCustomerID(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 appearance-none"
                >
                  <option value="">-- Choose a customer --</option>

                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>
          </section>

          {/* Account Config */}
          <section className="space-y-4 pt-4 border-t border-slate-50">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
              Account Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 appearance-none"
              >
                <option value="">-- Select Account Type --</option>
                <option value="Savings">Savings</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
              </select>

              <input
                required
                type="number"
                placeholder="Initial Deposit"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5"
              />

              <select
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 appearance-none"
              >
                <option value="">-- Select Status --</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>

            </div>
          </section>

          {/* Submit */}
          <div className="pt-6 border-t flex justify-end">
            <button className="px-8 py-2.5 rounded-xl bg-blue-600 text-white">
              Initialize Account
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}