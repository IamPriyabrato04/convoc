import { auth } from "@/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(req.url);
        const code = url.pathname.split("/")[3];

        const userId = session.user.id;
        
        const room = await db.room.findUnique({ where: { code } });

        if (!room) {
            return Response.json({ error: "Room not found" }, { status: 404 });
        }

        const participant = await db.roomParticipant.findFirst({
            where: { roomId: room.id, userId },
        });

        return Response.json({ status: participant?.status || "PENDING" });
    } catch (error) {
        console.error("Error in fetching meeting status:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
