import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/schemas";
import { db } from "./lib/db";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);
                if (!validatedFields.success) return null;
                
                const { email, password } = validatedFields.data;

                const user = await db.user.findUnique({
                    where: { email },
                });
                if (!user || !user.password) return null;

                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) return null;
                else return user;

            }
        }),
    ]
} satisfies NextAuthConfig