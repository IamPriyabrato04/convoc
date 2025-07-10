"use server"

import { z } from "zod";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";



export const login = async (values: z.infer<typeof loginSchema>) => {
    console.log("Login values:", values);
    const valuidatedFields = loginSchema.safeParse(values);


    if (!valuidatedFields.success) {
        return { error: "Invalid credentials" };
    }

    const { email, password } = valuidatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        return { success: "Login successfull" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": return { error: "Invalid credentials" };
                    break;
                default:
                    return { error: "An unexpected error occurred" };
                    break;
            }
        }
        throw error;
    }
}