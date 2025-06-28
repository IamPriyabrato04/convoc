import { auth } from "@/auth";
import { db } from "@/lib/db";
import { generateRoomCode } from "@/lib/roomGenerate";
import { z } from "zod";


const CreateRoomSchema = z.object({
    name: z.string().optional(),
});


export async function POST(req: Request) {

    try {
        const session = await auth();
        console.log("Session:", session);


        if (!session?.user?.id) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        const { name } = CreateRoomSchema.parse(body);
        console.log("Parsed body:", body);

        let code = generateRoomCode();

        // Ensure uniqueness
        while (await db.room.findUnique({ where: { code } })) {
            code = generateRoomCode();
        }

        const room = await db.room.create({
            data: {
                name,
                ownerId: session.user.id, // Use user ID from token
                code,
            },
        });

        return Response.json(room);
    } catch (error) {
        console.error(error);
        return new Response("Invalid data", { status: 400 });
    }
}
