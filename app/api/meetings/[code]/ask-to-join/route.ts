import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { code: string } }) {
    const session = await auth();
    if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });
    const userId = session.user.id;

    try {
        const room = await db.room.findUnique({ where: { code: params.code } });
        if (!room) return new Response("Room not found", { status: 404 });

        const isOwner = room.ownerId === userId;

        if (isOwner) {
            return Response.json({
                success: true,
                message: "You are the owner of this room",
                code: room.code,
                isOwner: true
            });
        }

        const existing = await db.roomParticipant.findFirst({
            where: { roomId: room.id, userId },
        });

        if (existing) {
            await db.roomParticipant.update({
                where: { id: existing.id },
                data: {
                    status: "PENDING",
                    joinedAt: new Date(),
                    leftAt: null,
                    micOn: true,
                    cameraOn: true,
                },
            });

            return Response.json({
                success: true,
                message: "Request sent again, waiting for approval",
                code: room.code,
                isOwner: false
            });
        } else {
            await db.roomParticipant.create({
                data: {
                    roomId: room.id,
                    userId,
                    status: "PENDING",
                },
            });

            return Response.json({
                success: true,
                message: "Request sent",
                code: room.code,
                isOwner: false
            });
        }
    } catch (error) {
        console.error(error);
        return new Response("Invalid request", { status: 400 });
    }
}
