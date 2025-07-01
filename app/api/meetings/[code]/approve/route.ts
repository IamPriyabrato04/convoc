import { auth } from "@/auth";
import { db } from "@/lib/db";



export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { participantId } = await req.json();

        await db.roomParticipant.update({
            where: { id: participantId },
            data: { status: "ACCEPTED" },
        });

        return Response.json({ success: true });
    }
    catch (error) {
        console.error("Error in approving participant:", error);
    }
}
