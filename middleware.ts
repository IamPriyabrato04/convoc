import { NextRequest, NextResponse } from "next/server";
import { authRoutes, publicRoute, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
        secureCookie: true, // important for production
        cookieName: process.env.NODE_ENV === "production"
            ? "__Secure-authjs.session-token"
            : "authjs.session-token"
    });
    console.log(token);


    const isAuthRoute = authRoutes.includes(pathname);
    const isPublicRoute = publicRoute.includes(pathname);
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);

    if (isApiAuthRoute) return NextResponse.next();

    // Already logged in —> block auth pages
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }

    // Not logged in —> block private routes
    if (!isPublicRoute && !token && !isAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|ttf|woff|woff2)).*)',
    ],
};