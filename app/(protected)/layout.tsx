"use client";

import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import React from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();

    // Check if current path starts with /meeting
    const isMeetingPage = pathname?.startsWith("/meeting/");

    return (
        <main className="relative">
            {/* Only show sidebar if not in meeting page */}
            {!isMeetingPage && <Navbar />}
            <div className="flex text-white">
                {/* Only show sidebar if not in meeting page */}
                {!isMeetingPage && <Sidebar />}
                <section className="flex min-h-screen flex-1 flex-col pb-6 px-2 pt-2 max-md:pb-14 sm:px-14 ">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}
