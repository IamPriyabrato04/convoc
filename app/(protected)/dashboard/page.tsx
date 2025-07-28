// import { auth, signOut } from '@/auth'
// import { Button } from '@/components/ui/button';

// const page = async () => {

//   const session = await auth();

//   return (
//     <div className='max-w-screen border border-amber-950 overflow-hidden'>
//       {JSON.stringify(session)}
//       <form action={
//         async () => {
//           'use server'
//           await signOut();
//         }
//       }>
//         <Button type="submit">Logout</Button>
//       </form>
//     </div>
//   )
// }

// export default page

import MeetingTypeList from '@/components/ui/MeetingTypeList';
import React from 'react'

const page = () => {
  const now = new Date()
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-IN', { dateStyle: 'full', })).format(now);
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] border border-amber-400'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphic max-w-[270px] rounded py-2 text-center text-base font-normal'>
            upcoming meeting at: 12:30 PM
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className=' text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-300 lg:text-xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default page