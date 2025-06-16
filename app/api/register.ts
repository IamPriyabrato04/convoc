"use server"

import * as z from "zod";
import { registerSchema } from "@/schemas";


export const login = async (values: z.infer<typeof registerSchema>) => {
    console.log("Login values:", values);
    const valuidatedFields = registerSchema.safeParse(values);

    if (!valuidatedFields.success) {
        return { error: "Invalid login credentials" };
    }

    return { message: "Email Sent" };
}