import { auth } from "@/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id;

        const url = new URL(req.url);
        const code = url.pathname.split("/")[3];
        console.log("Request to join room with code:", code);
        

        const room = await db.room.findUnique({ where: { code: code } });
        if (!room) {
            return Response.json({ error: "Room not found" }, { status: 404 });
        }

        // Check if already exists
        let participant = await db.roomParticipant.findFirst({
            where: { roomId: room.id, userId },
        });

        if (participant) {
            return Response.json({
                success: true,
                isOwner: room.ownerId === userId,
                code: code,
            });
        }

        // If owner => directly ACCEPTED
        const status = room.ownerId === userId ? "ACCEPTED" : "PENDING";

        participant = await db.roomParticipant.create({
            data: {
                roomId: room.id,
                userId,
                status,
            },
        });

        return Response.json({
            success: true,
            isOwner: room.ownerId === userId,
            code: code,
        });
    }
    catch (error) {
        console.error("Error in request to join room:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
