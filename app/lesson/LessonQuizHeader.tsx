import { Progress } from '@/components/ui/progress';
import { useExitModal } from '@/store/useExitModal';
import { InfinityIcon, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type LessonQuizHeaderProps = {
    hearts: number,
    percentage: number,
    isUserSubscribed: boolean,
};

const LessonQuizHeader = ({
    hearts,
    percentage,
    isUserSubscribed,
} : LessonQuizHeaderProps) => {
    const handleLessonExitModalOpen = useExitModal((state) => state.handleOpen);

  return (
    <header
        className='lg:pt-[50px] pt-20px px-10 flex items-center justify-between max-w-[1140px] gap-x-4 mx-auto w-full'
    >
        <X
            className='text-slate-500 hover:opacity-75 transition cursor-pointer'
            onClick={() => handleLessonExitModalOpen()}
        />
        <Progress value={percentage} />
        <div
            className='text-rose-500 flex items-center font-bold'
        >
            <Image
                src='/assets/heart.svg'
                alt='Hearts'
                className='mr-2'
                height={28}
                width={28}
            />
            {isUserSubscribed ? (
                <InfinityIcon
                    className='h-6 w-6 stroke-[3]'
                />
            ): hearts}
        </div>
    </header>
  )
}

export default LessonQuizHeader