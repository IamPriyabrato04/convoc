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

        console.log("Fetching pending participants for room code:", code);
        

        const room = await db.room.findUnique({ where: { code } });
        if (!room) {
            return Response.json({ error: "Room not found" }, { status: 404 });
        }

        // Check if requester is owner
        if (room.ownerId !== session.user.id) {
            return Response.json({ error: "Forbidden" }, { status: 403 });
        }

        const participants = await db.roomParticipant.findMany({
            where: {
                roomId: room.id,
                status: "PENDING",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });


        return Response.json({ participants });
    }
    catch (error) {
        console.error("Error in fetching pending participants:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
