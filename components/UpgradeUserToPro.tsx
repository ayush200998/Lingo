import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link';

function UpgradeUserToPro() {
  return (
    <div
        id='upgrade-user-to-pro-container'
        className='flex flex-col gap-4 border-2 p-4 rounded-xl'
    >
        <div
            className='flex flex-col gap-2'
        >
            <div
                className='flex items-center gap-2'
            >
                <Image
                    src='/assets/unlimited.svg'
                    alt='Hearts'
                    width={24}
                    height={24}
                />

                <p className='font-bold text-neutral-800'>
                    Upgrade to Pro
                </p>
            </div>

            <p className='text-muted-foreground'>
                Get unlimited hearts and more
            </p>
        </div>

        <Button
            size='lg'
            variant='super'
            className='w-full'
        >
            <Link href='/shop'>
                Upgrade Today        
            </Link>
        </Button>
    </div>
  );
}

export default UpgradeUserToPro;