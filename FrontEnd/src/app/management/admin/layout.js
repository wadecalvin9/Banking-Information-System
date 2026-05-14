"use client";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    // Check for admin by role (new sessions) or email (fallback for old sessions)
    const isAdmin = user.role === "ADMIN" || user.email === "admin@nexabank.com";
    
    if (!token || !isAdmin) {
      router.push("/management/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6">{children}</main>
    </div>
  );
}
