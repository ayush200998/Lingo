import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link';
import { QUESTS_LIST } from '@/constants/constants';
import { Progress } from './ui/progress';

type QuestsProps = {
    points: number,
};

function Quests({ points } : QuestsProps) {
  return (
    <div
        id='quests-container'
        className='flex flex-col gap-2 border-2 p-3 rounded-xl'
    >
        <div
            className='flex items-center justify-between'
        >
            <p className='font-bold text-neutral-800 dark:text-neutral-300'>
                Quests
            </p>
            <Button
                size='sm'
                variant='defaultOutline'
            >
                <Link href='/quests'>
                    View all        
                </Link>
            </Button>
        </div>

        <ul
            className='w-full'
        >
            {QUESTS_LIST.map((quest) => {
            const progress = (points / quest.value) * 100;

            return (
                <div
                key={quest.value}
                className='flex items-center p-2 gap-2 w-full'
                >
                <Image 
                    src='/assets/points.svg'
                    alt='Points'
                    width={24}
                    height={24}
                />
                <div
                    className='flex flex-col gap-2 w-full'
                >
                    <p
                    className='font-bold text-neutral-700 dark:text-neutral-300/90'
                    >
                    {quest.title}
                    </p>
                    <Progress value={progress} className='h-1' />
                </div>
                </div>
            )
            })}
        </ul>
    </div>
  );
}

export default Quests;