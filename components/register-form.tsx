"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/schemas"
import { register } from "@/app/api/login"
import { useState, useTransition } from "react"


export function RegisterForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        setError("");
        setSuccess("");
        // Calling login API here...
        startTransition(() => {
            register(values)
                .then((data) => {
                    setSuccess(data.message || "Registration successful!");
                    setError(""); // Clear any previous error
                })
                .catch((error) => {
                    console.error("Login failed:", error);
                    setError("Invalid login credentials. Please try again.");
                });
        });
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field}
                                    type="text"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="abc@email.com" {...field}
                                    type="email"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="****" {...field}
                                    type="password"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter a strong password with at least 6 characters including letters, numbers, and symbols.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <Button type="submit" disabled={isPending} >Submit</Button>
            </form>
        </Form>
    )
}