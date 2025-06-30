import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { code: string } }
) {
    // Ensure user is authenticated
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    try {
        // Find room by code
        const room = await db.room.findUnique({ where: { code: params.code } });
        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        // Find participant record
        const participant = await db.roomParticipant.findFirst({
            where: { roomId: room.id, userId },
        });
        if (!participant) {
            return NextResponse.json(
                { error: "Not a participant" },
                { status: 400 }
            );
        }

        // Check if user is the room owner
        const isOwner = room.ownerId === userId;

        if (isOwner) {
            // If owner: mark room inactive and remove participants

            // Mark room as inactive
            await db.room.update({
                where: { id: room.id },
                data: {
                    isActive: false,
                },
            });

            // Mark all participants as left
            await db.roomParticipant.updateMany({
                where: { roomId: room.id, leftAt: null },
                data: { leftAt: new Date() },
            });

            return NextResponse.json({ success: true, message: "Owner left, room closed" });
        } else {
            // Else: just mark this participant as left
            await db.roomParticipant.update({
                where: { id: participant.id },
                data: { leftAt: new Date() },
            });

            return NextResponse.json({ success: true, message: "Participant left" });
        }
    } catch (err) {
        console.error("Leave API error:", err);
        return NextResponse.json(
            { error: "Could not leave room" },
            { status: 500 }
        );
    }
}
