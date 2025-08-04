"use server"

import { z } from "zod";
import { registerSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";



export const register = async (values: z.infer<typeof registerSchema>) => {
    const valuidatedFields = registerSchema.safeParse(values);

    if (!valuidatedFields.success) {
        return { error: "Invalid credentials" };
    }

    const { name, email, password } = valuidatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existigUser = await db.user.findUnique({
        where: { email, }
    });

    if (existigUser) {
        return { error: "User already exists" };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    return { success: "Registration Successful" };
}