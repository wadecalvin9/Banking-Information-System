"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/accounts", label: "Accounts", icon: "🏦" },
  { href: "/admin/customers", label: "Customers", icon: "👥" },
  { href: "/admin/transactions", label: "Transactions", icon: "↔" },
  { href: "/admin/transfers", label: "Transfers", icon: "➤" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 bg-slate-900 text-slate-300 flex flex-col shrink-0">
      <div className="px-6 py-5 border-b border-slate-700">
        <span className="text-white font-bold text-xl tracking-tight">🏛 NexaBank</span>
        <p className="text-xs text-slate-500 mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-blue-600 text-white" : "hover:bg-slate-800 hover:text-white"
              }`}>
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">A</div>
          <div>
            <p className="text-sm text-white font-medium">Admin</p>
            <p className="text-xs text-slate-500">admin@nexabank.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
