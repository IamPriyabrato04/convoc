import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { code: string } }
) {
    //Ensure user is authenticated
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    try {
        // search room by code
        const room = await db.room.findUnique({ where: { code: params.code } });
        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        // Find the participant record
        const participant = await db.roomParticipant.findFirst({
            where: { roomId: room.id, userId },
        });
        if (!participant) {
            return NextResponse.json(
                { error: "Not a participant" },
                { status: 400 }
            );
        }

        // Mark them as left
        await db.roomParticipant.update({
            where: { id: participant.id },
            data: { leftAt: new Date() },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Leave API error:", err);
        return NextResponse.json(
            { error: "Could not leave room" },
            { status: 500 }
        );
    }
}
