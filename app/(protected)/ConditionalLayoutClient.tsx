"use client";

import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import { useUserStore } from "@/store/useUserStore";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function ConditionalLayoutClient({
    children,
    user,
}: {
    children: React.ReactNode;
    user: { id: string; name: string; email: string; image: string };
}) {
    const pathname = usePathname();
    const isMeetingPage = pathname?.startsWith("/meeting/");

    const setUser = useUserStore((s) => s.setUser);

    useEffect(() => {
        setUser(user);
    }, [user]);

    return (
        <>
            {!isMeetingPage && <Navbar user={user} />}
            <div className="flex text-white">
                {!isMeetingPage && <Sidebar />}
                <section className="flex min-h-screen flex-1 flex-col max-md:pb-14 sm:px-14 ">
                    <div>{children}</div>
                </section>
            </div>
        </>
    );
}
