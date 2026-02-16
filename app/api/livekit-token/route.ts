// import { AccessToken } from "livekit-server-sdk";

// export const runtime = "nodejs";

// export async function GET(req: Request) {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");
//     const room = searchParams.get("room");

//     if (!userId || !room) {
//         return Response.json({ error: "userId and room required" }, { status: 400 });
//     }

//     // Example: get session (if using NextAuth)
//     const session = await auth();

//     if (!session) {
//         return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = session.user;
//     const userName = user?.name;
//     const userImage = user?.image;

//     const at = new AccessToken(
//         process.env.LIVEKIT_API_KEY!,
//         process.env.LIVEKIT_API_SECRET!,
//         { identity: userId }
//     );

//     at.addGrant({ roomJoin: true, room });

//     at.metadata = JSON.stringify({
//         name: userName,
//         image: userImage,
//     });

//     const jwt = await at.toJwt();

//     return Response.json({ token: jwt });
// }

import { auth } from "@/auth";
import jwt from "jsonwebtoken";

export async function POST(req: Request, { params }: { params: Promise<{ room: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userId = session.user?.id ?? session.user?.email;
    if (!userId) {
      return new Response(JSON.stringify({ error: "User id not found in session" }), { status: 400 });
    }

    const room = (await params)?.room;
    if (!room) {
      return new Response(JSON.stringify({ error: "room required" }), { status: 400 });
    }

    // Optional: create a joinRequest in your DB here (Prisma)
    // await prisma.joinRequest.create({ data: { userId, room, status: 'PENDING' } });

    // Build a very short-lived service JWT for server-to-server auth
    const svcToken = jwt.sign(
      {
        iss: "nextjs",
        sub: userId,
      },
      process.env.SERVER_JWT_SECRET!,
      { expiresIn: "600s" }
    );
    console.log("jwt: ", svcToken);
    

    // Call server (control plane) to mint the LiveKit token
    const resp = await fetch(`${process.env.SERVER_URL}/api/v1/tokens/mint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${svcToken}`,
      },
      body: JSON.stringify({
        userId,
        room,
        publish: true,
        metadata: { name: session.user?.name, image: session.user?.image },
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      // try to return JSON if the server returned JSON
      try {
        const parsed = JSON.parse(text);
        return new Response(JSON.stringify(parsed), { status: resp.status });
      } catch {
        return new Response(text, { status: resp.status });
      }
    }

    const data = await resp.json();
    // Optionally validate data.token exists
    if (!data?.token) {
      return new Response(JSON.stringify({ error: "Server did not return token" }), { status: 502 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("join route error:", err);
    return new Response(JSON.stringify({ error: "internal" }), { status: 500 });
  }
}
