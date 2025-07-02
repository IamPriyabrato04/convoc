"use client";

import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function ConditionalLayoutClient({
    children,
    user,
}: {
    children: React.ReactNode;
    user?: any;
}) {
    const pathname = usePathname();
    const isMeetingPage = pathname?.startsWith("/meeting/");

    return (
        <>
            {!isMeetingPage && <Navbar user={user} />}
            <div className="flex text-white">
                {!isMeetingPage && <Sidebar />}
                <section className="flex min-h-screen flex-1 flex-col pb-6 px-2 pt-2 max-md:pb-14 sm:px-14 ">
                    <div className="w-full">{children}</div>
                </section>
            </div>
        </>
    );
}
