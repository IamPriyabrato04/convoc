import React from 'react'
import { Button } from './ui/button';
import { signOut } from '@/auth'

const LogoutButton = async () => {
    return (
        <div>
            <form action={
                async () => {
                    'use server'
                    await signOut();
                }
            }>
                <Button type="submit">Logout</Button>
            </form>
        </div>
    )
}

export default LogoutButton