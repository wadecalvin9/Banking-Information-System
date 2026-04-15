import PortalNav from "@/components/PortalNav";

export const metadata = { title: "NexaBank — My Portal" };

export default function PortalLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <PortalNav />
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
