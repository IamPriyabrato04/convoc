import { auth } from "@/auth";
import { db } from "@/lib/db";
import { generateRoomCode } from "@/lib/roomGenerate";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("Creating a scheduled meeting for user:", session.user.id);
    if (!req.body) {
        return Response.json({ error: "No request body" }, { status: 400 });
    }
    

    const body = await req.json();
    const { name, scheduledAt, description } = body;

    if (!name || !scheduledAt) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const scheduledDate = new Date(scheduledAt);
    if (isNaN(scheduledDate.getTime())) {
        return Response.json({ error: "Invalid date format" }, { status: 400 });
    }

    if (name.length > 100) {
        return Response.json({ error: "Meeting name too long" }, { status: 400 });
    }

    if (description && description.length > 1000) {
        return Response.json({ error: "Description too long" }, { status: 400 });
    }

    try {
        let code = generateRoomCode();
        while (await db.room.findUnique({ where: { code } })) {
            code = generateRoomCode();
        }

        const room = await db.room.create({
            data: {
                name,
                ownerId: session.user.id,
                code,
                scheduledAt: scheduledDate,
                description,
            },
        });

        return Response.json({ success: true, room });
    } catch (error) {
        console.log("Error creating room:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
