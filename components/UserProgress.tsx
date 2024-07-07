import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { InfinityIcon } from 'lucide-react'
import { courses } from '@/db/schema'

type UserProgressProps = {
    activeCourse: typeof courses.$inferSelect,
    hearts: number,
    points: number,
    hasActiveSubscription: boolean,
}

const UserProgress = ({
    activeCourse,
    hearts,
    points,
    hasActiveSubscription,
}: UserProgressProps) => {
  return (
    <div
        className='flex justify-between items-center gap-x-2 w-full'
    >
        <Link
            href='/courses'
        > 
            <Button
                variant='defaultOutline'
            >
                <Image
                    src={activeCourse.imageSrc}
                    alt={activeCourse.title}
                    width={32}
                    height={32}
                    className='rounded-md border'
                />
            </Button>
        </Link>

        <Link
            href='/shop'
        >
            <Button
                variant='defaultOutline'
                className='text-orange-500'
            >
                <Image 
                    src='/assets/points.svg'
                    alt='Points'
                    width={28}
                    height={28}
                />
                {points}
            </Button>
        </Link>

        <Link
            href='/shop'
        >
            <Button
                variant='defaultOutline'
                className='text-rose-500'
            >
                <Image 
                    src='/assets/heart.svg'
                    alt='Points'
                    width={22}
                    height={22}
                />
                {hasActiveSubscription ? <InfinityIcon className='h-4 w-4 stroke-3' /> : hearts}
            </Button>
        </Link>
    </div>
  )
}

export default UserProgress