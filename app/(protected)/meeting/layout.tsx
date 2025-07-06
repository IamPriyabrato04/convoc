// app/meeting-room/[roomId]/layout.tsx

export default function RoomLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col h-screen bg-neutral-950 text-white">
            <section className="bg-neutral-950 text-white overflow-hidden">
                {children}
            </section>
        </main>
    );
}