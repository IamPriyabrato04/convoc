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

        const room = await db.room.findUnique({ where: { code: code } });
        if (!room) {
            return Response.json({ error: "Room not found" }, { status: 404 });
        }

        // Fetch accepted participants
        const participants = await db.roomParticipant.findMany({
            where: {
                roomId: room.id,
                status: "ACCEPTED",
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

        return Response.json({
            participants: participants.map((p) => ({
                id: p.userId,
                name: p.user.name,
            })),
        });
    } catch (error) {
        console.error("Error fetching participants:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
