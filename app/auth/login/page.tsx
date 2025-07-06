"use client"
import { LoginForm } from "@/components/login-form"
import OauthButton from "@/components/OauthButton"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function page() {
    return (
        <div className="max-w-sm flex justify-center items-center mx-auto h-screen">
            
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Link href="/auth/register">
                            <Button variant="secondary" className="w-full bg-neutral-700">
                                Create an account
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className="flex flex-row gap-1">
                    <OauthButton />
                </CardFooter>
            </Card>
        </div>
    )
}
