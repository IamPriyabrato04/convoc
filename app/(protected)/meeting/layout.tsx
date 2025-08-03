// app/meeting-room/[roomId]/layout.tsx
"use client"

export default function RoomLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-neutral-950 text-white">
            {children}
        </main>
    );
}