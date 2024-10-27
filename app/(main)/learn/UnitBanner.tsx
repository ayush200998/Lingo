import { Button } from '@/components/ui/button'
import { Notebook } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type UnitBannerProps = {
    title: string,
    description: string,
}

const UnitBanner = ({
    title,
    description,
} : UnitBannerProps) => {
  return (
    <div
        className='flex w-full p-3 items-center justify-between bg-green-500 text-white rounded-xl'
    >
        <div
            className='space-y-2'
        >
            <h3 className='text-2xl font-bold'>
                {title}
            </h3>

            <p className='text-lg'>
                {description}
            </p>
        </div>

        <Link 
            href='/lesson'
        >
            <Button
                size='lg'
                variant='secondary'
                className='hidden xl:flex'
            >
                <Notebook className='text-white mr-2' />
                Continue
            </Button>
        </Link>
    </div>
  )
}

export default UnitBanner