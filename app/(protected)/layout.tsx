
import { auth } from "@/auth";
import ConditionalLayoutClient from "./ConditionalLayoutClient";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        // redirect("/auth/login"); or return <p>Unauthorized</p>
    }

    const user = {
        id: session?.user?.id,
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
    };

    return (
        <main className="relative">
            <ConditionalLayoutClient user={user}>
                {children}
            </ConditionalLayoutClient>
        </main>
    );
}
