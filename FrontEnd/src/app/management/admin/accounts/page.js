const accounts = [
  { id: "ACC-1001", owner: "Alice Mwangi", type: "Savings", balance: "KES 245,800", opened: "2021-03-15", status: "Active" },
  { id: "ACC-1002", owner: "Brian Otieno", type: "Current", balance: "KES 1,200,000", opened: "2019-07-22", status: "Active" },
  { id: "ACC-1003", owner: "Carol Njeri", type: "Savings", balance: "KES 34,500", opened: "2023-01-10", status: "Active" },
  { id: "ACC-1004", owner: "David Kamau", type: "Fixed Deposit", balance: "KES 500,000", opened: "2020-11-05", status: "Active" },
  { id: "ACC-1005", owner: "Eve Wanjiku", type: "Savings", balance: "KES 0", opened: "2022-06-18", status: "Dormant" },
  { id: "ACC-1006", owner: "Frank Maina", type: "Current", balance: "KES 87,300", opened: "2018-09-30", status: "Active" },
];

const statusStyle = { Active: "bg-green-100 text-green-700", Dormant: "bg-slate-100 text-slate-500", Suspended: "bg-red-100 text-red-600" };
const typeStyle = { Savings: "bg-blue-50 text-blue-600", Current: "bg-slate-100 text-slate-700", "Fixed Deposit": "bg-amber-50 text-amber-600" };

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Accounts</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all bank accounts</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">+ New Account</button>
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
                <th className="px-6 py-3">Balance</th><th className="px-6 py-3">Opened</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-slate-500 whitespace-nowrap">{acc.id}</td>
                  <td className="px-6 py-3.5 font-medium text-slate-700 whitespace-nowrap">{acc.owner}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeStyle[acc.type]}`}>{acc.type}</span></td>
                  <td className="px-6 py-3.5 font-semibold text-slate-700 whitespace-nowrap">{acc.balance}</td>
                  <td className="px-6 py-3.5 text-slate-400 whitespace-nowrap">{acc.opened}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[acc.status]}`}>{acc.status}</span></td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <button className="text-blue-600 hover:underline text-xs mr-3">View</button>
                    <button className="text-slate-400 hover:text-red-500 text-xs">Suspend</button>
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
