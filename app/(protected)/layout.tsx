
import { auth } from "@/auth";
import ConditionalLayoutClient from "./ConditionalLayoutClient";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <main className="relative">
            <ConditionalLayoutClient user={session?.user}>
                {children}
            </ConditionalLayoutClient>
        </main>
    );
}
