// app/api/auth/jwt/route.ts 👈 note the file path and filename

import { auth } from "@/auth";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function GET() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = jwt.sign(
        { userId: session.user.id, name: session.user.name },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    return NextResponse.json({ token });
}
