import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button';

const page = async () => {

  const session = await auth();

  return (
    <div className='max-w-screen border border-amber-950 overflow-hidden'>
      {/* {JSON.stringify(session)} */}
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

export default page