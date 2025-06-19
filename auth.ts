import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
    events: {
        linkAccount: async ({ user }) => {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }, // Set email verified date on account link
            })
        }
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub; // Attach user ID to session
            }
            return session;
        },
        async jwt({ token }) {
            console.log("JWT Callback:", token);
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})