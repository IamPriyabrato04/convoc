"use client"
import { RegisterForm } from "@/components/register-form"
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
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Link href="/login">
                            <Button variant="secondary" className="w-full bg-neutral-700">
                                Login
                            </Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter className="flex flex-row gap-1">
                    <Button variant="outline" className=" w-1/2">
                        continue with Google
                    </Button>
                    <Button variant="outline" className="w-1/2">
                        continue with Github
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
