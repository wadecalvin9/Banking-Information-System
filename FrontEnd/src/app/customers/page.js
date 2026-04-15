const customers = [
  { id: "CUS-001", name: "Alice Mwangi", email: "alice@email.com", phone: "+254 712 345 678", accounts: 2, joined: "2021-03-15", kyc: "Verified" },
  { id: "CUS-002", name: "Brian Otieno", email: "brian@email.com", phone: "+254 723 456 789", accounts: 1, joined: "2019-07-22", kyc: "Verified" },
  { id: "CUS-003", name: "Carol Njeri", email: "carol@email.com", phone: "+254 734 567 890", accounts: 1, joined: "2023-01-10", kyc: "Pending" },
  { id: "CUS-004", name: "David Kamau", email: "david@email.com", phone: "+254 745 678 901", accounts: 3, joined: "2020-11-05", kyc: "Verified" },
  { id: "CUS-005", name: "Eve Wanjiku", email: "eve@email.com", phone: "+254 756 789 012", accounts: 1, joined: "2022-06-18", kyc: "Rejected" },
  { id: "CUS-006", name: "Frank Maina", email: "frank@email.com", phone: "+254 767 890 123", accounts: 2, joined: "2018-09-30", kyc: "Verified" },
];

const kycStyle = {
  Verified: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-red-100 text-red-600",
};

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
          <p className="text-slate-500 text-sm mt-1">Manage customer profiles and KYC</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Add Customer
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex gap-3">
          <input
            type="text"
            placeholder="Search customers..."
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All KYC Status</option>
            <option>Verified</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wide bg-slate-50">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Accounts</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">KYC</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-slate-500">{c.id}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {c.name[0]}
                      </div>
                      <span className="font-medium text-slate-700">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500">{c.email}</td>
                  <td className="px-6 py-3.5 text-slate-500">{c.phone}</td>
                  <td className="px-6 py-3.5 text-center text-slate-600 font-medium">{c.accounts}</td>
                  <td className="px-6 py-3.5 text-slate-400">{c.joined}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${kycStyle[c.kyc]}`}>{c.kyc}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <button className="text-blue-600 hover:underline text-xs mr-3">View</button>
                    <button className="text-slate-400 hover:text-slate-600 text-xs">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
