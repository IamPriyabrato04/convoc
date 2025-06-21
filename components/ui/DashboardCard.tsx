import { cn } from '@/lib/utils';
import { LucideIcon, PlusIcon, UserRoundPlus } from 'lucide-react'
import React from 'react'

interface HomeCardProps{
    className:string,
    icon:LucideIcon,
    title:string,
    description:string,
    handleClick: ()=>void;
}


const DashboardCard = ({className, icon:Icon, title, description, handleClick}:HomeCardProps) => {
  return (
    <div className={cn('px-4 py-3 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-2xl cursor-pointer', className)}
        onClick={()=>handleClick()}>
            <div className='glassmorphism flex justify-center items-center size-12 rounded-xl'>
            <Icon className="h-9 w-9" />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-lg font-normal'>{description}</p>
            </div>
        </div>
  )
}

export default DashboardCard