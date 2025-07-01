// app/meeting-room/[roomId]/layout.tsx

export default function RoomLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-neutral-950 text-white overflow-hidden">
                {children}
            </body>
        </html>
    );
}