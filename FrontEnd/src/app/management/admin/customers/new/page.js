'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authFetch } from '@/utils/api';

export default function NewCustomerPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", status: "Pending", pin: "" });
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const router = useRouter();

  async function createCustomer() {
    const res = await authFetch("http://localhost:8080/api/customers", {
      method: 'POST',
      body: JSON.stringify(
        {
          name: form.name,
          email: form.email,
          phone: parseInt(form.phone),
          status: form.status,
          pin: form.pin
        }
      )
    })
    if (res.ok) {
      alert('Customer registered successfully');
      router.push('/management/admin/customers');
    }
    else {
      setMessage("Error while creating customer account")
      setMsgColor("RED")
    }

  }


  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Add New Customer</h1>
          <p className="text-slate-500 text-sm mt-1">Register a new customer to the NexaBank system</p>
        </div>
        <Link
          href="/management/admin/customers"
          className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>Cancel</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={(e) => {
          e.preventDefault()
          createCustomer()

        }} className="p-8 space-y-8">

          {/* Personal Information Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">First Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alice"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                />
              </div>


            </div>
          </section>

          {/* Contact Details Section */}
          <section className="space-y-4 pt-4 border-t border-slate-50">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alice@example.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+254 700 000 000"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Account PIN</label>
                <input
                  required
                  type="password"
                  name="pin"
                  maxLength={6}
                  value={form.pin}
                  onChange={(e) => setForm({ ...form, pin: e.target.value })}
                  placeholder="••••••"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                />
              </div>
            </div>
          </section>

          {/* Location & Status Section */}
          <section className="space-y-4 pt-4 border-t border-slate-50">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">KYC & Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">KYC Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50 appearance-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-50 flex items-center justify-end gap-3">
            <Link
              href="/management/admin/customers"
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              Save Customer
            </button>
          </div>
          <div style={{ color: msgColor }}>{message}</div>
        </form>
      </div>
    </div>
  );
}
