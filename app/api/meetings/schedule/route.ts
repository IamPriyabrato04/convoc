import { auth } from "@/auth";
import { db } from "@/lib/db";
import { generateRoomCode } from "@/lib/roomGenerate";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, scheduledAt, description } = body;

    if (!name || !scheduledAt) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    let code = generateRoomCode();

    // Ensure uniqueness
    while (await db.room.findUnique({ where: { code } })) {
        code = generateRoomCode();
    }

    const room = await db.room.create({
        data: {
            name,
            ownerId: session.user.id,
            code,
            scheduledAt: new Date(scheduledAt),
            description,
        },
    });

    return Response.json({ success: true, room });
}
