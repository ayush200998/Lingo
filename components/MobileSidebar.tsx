import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import Sidebar from './Sidebar'
  

const MobileSidebar = () => {
  return (
    <Sheet>
    <SheetTrigger>
        <MenuIcon color='white' />
    </SheetTrigger>

    <SheetContent side='left' className='p-0'>
        <Sidebar />
    </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar