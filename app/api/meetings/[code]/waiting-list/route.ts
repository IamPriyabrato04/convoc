import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {

    const url = new URL(req.url);
    const code = url.pathname.split("/")[3];

    const room = await db.room.findUnique({
        where: { code: code },
        include: {
            participants: {
                where: { status: "PENDING" },
                include: { user: true },
            },
        },
    });

    if (!room) return new Response("Room not found", { status: 404 });

    return Response.json(room.participants);
}
