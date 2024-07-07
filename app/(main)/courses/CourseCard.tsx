'use client'

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type CourseCardProps = {
    id: number,
    title: string,
    imageSrc: string,
    disabled: boolean,
    onClick: (id: number) => void,
    isActive: boolean,
};

const CourseCard = ( {
    id,
    title,
    imageSrc,
    disabled,
    onClick,
    isActive,
}: CourseCardProps ) => {
  return (
    <div
        onClick={() => onClick(id)}
        className={cn('h-full border-2 border-b-4 active:border-b-2 rounded-xl hover:bg-black/5 cursor-pointer flex flex-col items-center justify-between p-3 pb-6 min-h-[214px] min-w-[200px]',
            disabled && 'pointer-events-none opacity-50'
        )}
    >
        <div
            className='flex min-w-[24px] w-full justify-end items-center'
        >
            {isActive && (
                <div
                    className='rounded-md flex items-center justify-center p-1.5 bg-green-600'
                >
                    <Check className='text-white stroke-[4] w-4 h-4' />
                </div>
            )}
        </div>
        <Image
            src={imageSrc}
            alt={title}
            width={80}
            height={90}
            className='rounded-lg drop-shadow-md border object-cover'
        />
        <p
            className='text-neutral-700 text-lg'
        >
            {title}
        </p>
    </div>
  )
}

export default CourseCard