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

        const room = await db.room.findUnique({
            where: { code: code },
        });

        if (!room) {
            return Response.json({ error: "Room not found" }, { status: 404 });
        }

        const isOwner = room.ownerId === session.user.id;

        return Response.json({ isOwner });
    } catch (error) {
        console.error("Error checking owner:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
