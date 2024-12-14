'use client'

import React from 'react'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/theme/ThemeToggle'

const Header = () => {
  const router = useRouter();

  return (
    <header className='p-2 h-[60px] border-b-2 border-slate-200 w-full'>
        <div className='max-w-screen-lg flex items-center justify-between mx-auto'>
          <div
            className='flex gap-1 items-center cursor-pointer'
            onClick={() => router.push('/')}
          >
            <Image 
              src='/icons/app_icon.svg'
              alt='Lingo'
              width={40}
              height={40}
            />
            <h1 className='text-xl font-bold text-green-600'>Lingo</h1>
          </div>

          <div
            className='flex items-center gap-4'
          >
            <SignedOut>
              <Button
                variant='secondaryOutline'
              >
                <SignInButton
                  mode='modal'
                  fallbackRedirectUrl='/learn'
                  signUpFallbackRedirectUrl='/learn'
                />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            <ThemeToggle />
          </div>
        </div>
    </header>
  )
}

export default Header