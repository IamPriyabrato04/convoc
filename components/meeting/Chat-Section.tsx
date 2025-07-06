import { MessageCircleMore } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'

const ChatSection = () => {
  return (
    <Sheet>
      <SheetTrigger><MessageCircleMore className="w-6 h-6" /></SheetTrigger>
      <SheetContent side="right" className="max-w-md">
        <SheetHeader>
          <SheetTitle>Chat Messages</SheetTitle>
          
        </SheetHeader>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ChatSection