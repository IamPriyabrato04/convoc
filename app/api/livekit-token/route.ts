import { auth } from "@/auth";
import { AccessToken } from "livekit-server-sdk";

export const runtime = "nodejs";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const room = searchParams.get("room");

    if (!userId || !room) {
        return Response.json({ error: "userId and room required" }, { status: 400 });
    }

    // Example: get session (if using NextAuth)
    const session = await auth();

    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user;
    const userName = user?.name;
    const userImage = user?.image;

    const at = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        { identity: userId }
    );

    at.addGrant({ roomJoin: true, room });

    at.metadata = JSON.stringify({
        name: userName,
        image: userImage,
    });

    const jwt = await at.toJwt();    

    return Response.json({ token: jwt });
}
