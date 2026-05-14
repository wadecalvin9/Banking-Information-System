"use client";
import PortalNav from "@/components/PortalNav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PortalLayout({ children }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!token) {
      router.push("/");
    } else if (user.role === "ADMIN") {
      // Admins should not be in the customer portal
      router.push("/management/admin");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <PortalNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8 md:py-8">{children}</main>
    </div>
  );
}
