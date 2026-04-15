"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/portal/dashboard", label: "Dashboard" },
  { href: "/portal/accounts", label: "My Accounts" },
  { href: "/portal/transactions", label: "Transactions" },
  { href: "/portal/transfer", label: "Transfer" },
  { href: "/portal/profile", label: "Profile" },
];

export default function PortalNav() {
  const pathname = usePathname();
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/portal/dashboard" className="flex items-center gap-2">
          <span className="text-xl">🏛</span>
          <span className="font-bold text-slate-800 text-lg">NexaBank</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">A</div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-700">Alice Mwangi</p>
            <p className="text-xs text-slate-400">ACC-1001</p>
          </div>
          <Link href="/" className="ml-2 text-xs text-slate-400 hover:text-red-500 transition-colors">Logout</Link>
        </div>
      </div>
    </header>
  );
}
