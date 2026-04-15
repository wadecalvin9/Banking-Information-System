import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🏛</div>
        <h1 className="text-4xl font-bold text-white mb-2">NexaBank</h1>
        <p className="text-slate-400 mb-10 text-lg">Banking Information System</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/portal/login"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl transition-colors text-sm shadow-lg">
            🧑 Customer Portal
          </Link>
          <Link href="/admin"
            className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-2xl transition-colors text-sm shadow-lg">
            ⚙️ Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
}
