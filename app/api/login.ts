"use server"

import * as z from "zod";
import { loginSchema } from "@/schemas";


export const register = async (values: z.infer<typeof loginSchema>) => {
    console.log("Registration values:", values);
    const valuidatedFields = loginSchema.safeParse(values);

    if (!valuidatedFields.success) {
        return { error: "Invalid credentials" };
    }

    return { message: "Email Sent" };
}