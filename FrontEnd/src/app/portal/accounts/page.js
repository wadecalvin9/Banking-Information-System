import Link from "next/link";

const accounts = [
  { id: "ACC-1001", type: "Savings", balance: "KES 245,800.00", opened: "2021-03-15", interest: "4.5% p.a.", status: "Active" },
  { id: "ACC-1007", type: "Current", balance: "KES 82,400.00", opened: "2022-08-01", interest: "0% p.a.", status: "Active" },
];

const typeColors = {
  Savings: "bg-blue-600",
  Current: "bg-slate-700",
  "Fixed Deposit": "bg-blue-800",
};

export default function PortalAccountsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Accounts</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of all your bank accounts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {accounts.map((acc) => (
          <div key={acc.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className={`${typeColors[acc.type]} p-5 text-white`}>
              <p className="text-xs font-medium uppercase tracking-wide opacity-80">{acc.type} Account</p>
              <p className="text-3xl font-bold mt-1">{acc.balance}</p>
              <p className="text-sm opacity-70 mt-1 font-mono">{acc.id}</p>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Date Opened</span>
                <span className="font-medium text-slate-700">{acc.opened}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Interest Rate</span>
                <span className="font-medium text-slate-700">{acc.interest}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">{acc.status}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Link href="/portal/transactions"
                  className="flex-1 text-center bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium py-2 rounded-lg transition-colors">
                  View Transactions
                </Link>
                <Link href="/portal/transfer"
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition-colors">
                  Transfer Funds
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <p className="text-sm font-semibold text-blue-800 mb-1">Want to open a new account?</p>
        <p className="text-xs text-blue-600 mb-3">Visit any NexaBank branch or contact your relationship manager.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
          Request New Account
        </button>
      </div>
    </div>
  );
}
