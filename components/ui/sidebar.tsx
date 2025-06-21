'use client';
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathName = usePathname();
    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between p-6 text-white border-r border-gray-800 bg-gray-900 max-sm:hidden lg:w-[264px]'>
            <div className='flex flex-1 flex-col gap-6'>
                {sidebarLinks.map((link) => {
                    const isActive = pathName === link.route || pathName.startsWith(link.route);
                    return (
                        <Link href={link.route} key={link.label} className={cn('flex gap-4 items-center p-4 rouled-lg justify-start', { 'bg-blue-700': isActive, })}>
                            <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
                            <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar