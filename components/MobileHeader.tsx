import React from 'react'
import { MenuIcon } from 'lucide-react'
import MobileSidebar from './MobileSidebar'
import { UserButton } from '@clerk/nextjs'

const MobileHeader = () => {
  return (
    <div className='lg:hidden max-h-[46px] h-full flex items-center justify-between p-2 bg-green-500'>
      <div
        className='flex items-center gap-x-2'
      >
        <MobileSidebar />
        <p className='text-white text-lg'>
          Lingo
        </p>
      </div>

      <UserButton />
    </div>
  )
}

export default MobileHeader