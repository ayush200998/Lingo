import MobileHeader from '@/components/MobileHeader';
import Sidebar from '@/components/Sidebar';
import React from 'react'

type MainLayOutProps = {
    children: React.ReactNode,
};

const MainLayOut = ({ children } : MainLayOutProps) => {
  return (
    <div className='w-full h-screen flex'>
        <Sidebar className='hidden lg:flex' />
        <main className='h-full w-full lg:w-[calc(100%-256px)] lg:ml-auto'>
            <MobileHeader />
            <div className='max-w-[1056px] mx-auto  pt-6 h-[calc(100%-46px)] lg:h-full'>
                {children}
            </div>
        </main>
    </div>
  )
}

export default MainLayOut;