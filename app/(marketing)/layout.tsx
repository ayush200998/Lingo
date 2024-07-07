import React, { ReactNode } from 'react'
import Header from './Header';
import Footer from './Footer';

interface MarketingLayoutProps {
    children: ReactNode,
};

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <div
        id='marketing-app-container'
        className='flex flex-col h-screen w-full'
    >
        <Header />
        <main
            className='flex flex-col h-full w-full items-center justify-center'
        >
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default MarketingLayout;