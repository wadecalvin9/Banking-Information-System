"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { authFetch } from "@/utils/api";
import CustomerModal from "@/components/CustomerModal";

const kycStyle = { Verified: "bg-green-100 text-green-700", Pending: "bg-amber-100 text-amber-700", Rejected: "bg-red-100 text-red-600" };

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await authFetch("http://localhost:8080/api/customers");
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async (updatedCustomer) => {
    try {
      const res = await authFetch(`http://localhost:8080/api/customers/${updatedCustomer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomer),
      });
      if (res.ok) {
        await fetchData();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to update customer", err);
    }
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                         c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading && customers.length === 0) return <div className="p-8 text-center text-slate-500">Loading customers...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
          <p className="text-slate-500 text-sm mt-1">Manage customer profiles and KYC</p>
        </div>
        <Link
          href="/management/admin/customers/new"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <span>+ Add Customer</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex gap-3">
          <input 
            type="text" 
            placeholder="Search customers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wide bg-slate-50">
                <th className="px-6 py-3">ID</th><th className="px-6 py-3">Name</th><th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th><th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Status</th><th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-slate-500 whitespace-nowrap">CUS-00{c.id}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{c.name ? c.name[0] : "?"}</div>
                      <span className="font-medium text-slate-700">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap">{c.email}</td>
                  <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap">{c.phone}</td>
                  <td className="px-6 py-3.5 text-slate-400 whitespace-nowrap">{c.joined || "N/A"}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${kycStyle[c.status] || "bg-slate-100 text-slate-600"}`}>
                      {c.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap text-right">
                    <button 
                      onClick={() => { setSelectedCustomer(c); setIsModalOpen(true); }}
                      className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors text-xs font-medium mr-1"
                    >
                      View/Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-400">No customers found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <CustomerModal 
          key={selectedCustomer.id}
          customer={selectedCustomer} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave}
        />
      )}
    </div>
  );
}
