"use client"
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

const OauthButton = () => {
    const onClick = (provider: "github" | "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    }
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Button onClick={() => onClick("github")}>
                Continue with Github
                <Image
                    src="/github.svg"
                    alt="Github Logo"
                    width={22}
                    height={22}
                    className="inline-block mr-2"
                />
            </Button>
            <Button onClick={() => onClick("google")}>
                Continue with Google
                <Image
                    src="/google.svg"
                    alt="Google Logo"
                    width={22}
                    height={22}
                    className="inline-block mr-2"
                />
            </Button>
        </div>
    );
};

export default OauthButton;