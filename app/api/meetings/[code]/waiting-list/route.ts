import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { code: string } }) {
    const room = await db.room.findUnique({
        where: { code: params.code },
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
