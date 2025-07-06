import { AccessToken } from "livekit-server-sdk";

export const runtime = "nodejs";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const room = searchParams.get("room");

    if (!userId || !room) {
        return Response.json({ error: "userId and room required" }, { status: 400 });
    }

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: userId as string,
        }
    );

    token.addGrant({ roomJoin: true, room: room as string });

    const jwt = await token.toJwt();
    console.log("Generated JWT:", jwt);

    return Response.json({ token: jwt });
}
