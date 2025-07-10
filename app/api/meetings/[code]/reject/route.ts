import { auth } from "@/auth";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const code = url.pathname.split("/")[3];

    const { participantId } = await req.json();

    const room = await db.room.findUnique({ where: { code } });
    if (!room) {
        return Response.json({ error: "Room not found" }, { status: 404 });
    }

    await db.roomParticipant.update({
        where: { id: participantId },
        data: { status: "REJECTED" },
    });

    return Response.json({ success: true });
}
