
import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }).max(50),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "password must be at least 6 characters.",
    }).max(100),
})

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "password must be at least 6 characters.",
    }).max(100),
})