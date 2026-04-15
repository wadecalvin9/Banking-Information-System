import Sidebar from "@/components/Sidebar";

export const metadata = { title: "NexaBank Admin" };

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50 p-6">{children}</main>
    </div>
  );
}
