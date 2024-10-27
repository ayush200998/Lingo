'use client'

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Crown, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

type LessonButtonProps = {
    id: number,
    index: number,
    isLocked: boolean,
    isCurrent? : boolean,
    totalCount: number,
    percentage?: number,
};

const LessonButton = (
    {
        id,
        index,
        isLocked,
        isCurrent,
        totalCount,
        percentage,
    } : LessonButtonProps
) => {
    const ELEMENT_SPACING = 40;
    // This will start from 0-8
    const cycleLength = 8;
    const elementIndexInCycle = index % cycleLength;
    
    let elementIndentation;

    // This means from current position which is at center it should go towards left.
    if (elementIndexInCycle <= 2) {
        elementIndentation = elementIndexInCycle;
    } else if (elementIndexInCycle <= 4) {
        // This will again come back towards center
        elementIndentation = 4 - elementIndexInCycle;
    } else if (elementIndexInCycle <= 6) {
        // This will go towards right from center
        elementIndentation = 4 - elementIndexInCycle;
    } else {
        // This will again come back to center
        elementIndentation = elementIndexInCycle - 8;
    }

    const rightPosition = elementIndentation * ELEMENT_SPACING;
    
    const isFirstLessonButton = index === 0;
    const isLastLessonButton = index === totalCount;
    const isCompleted = !isCurrent && !isLocked;

    const Icon = isCompleted ? Check : isLastLessonButton ? Crown : Star;
    const href = isCompleted ? `/lesson/${id}` : '/lesson';
  
    return (
    <Link
        href={href}
        aria-disabled={isLocked}
        style={{ 
            pointerEvents: isLocked ? 'none' : 'auto',
        }}
    >
        <div
            className='relative'
            style={{
                right: `${rightPosition}px`,
                marginTop: (isFirstLessonButton && !isCompleted) ? '60px' : '24px'
            }}
        >
            {isCurrent ? (
                <div
                    className=' w-[102px] h-[102px] relative'
                >
                    <div
                        className='absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10'
                    >
                        Start
                        <div className='absolute left-1/2 -bottom-2 border-t-8 border-x-transparent border-x-8 w-0 h-0' />
                    </div>
                    <CircularProgressbarWithChildren
                        value={!percentage ? 0 : percentage}
                        styles={{
                            path: {
                                stroke: '#4ade80',
                            },
                            trail: {
                                stroke: '#e5e7eb',
                            }
                        }}
                    >
                        <Button
                            size='rounded'
                            variant={isLocked ? 'locked' : 'secondary'}
                            className='h-[70px] w-[70px] border-b-8'
                        >
                            <Icon 
                                className={cn(
                                    'h-10 w-10',
                                    isLocked
                                    ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                                    : 'fill-primary-foreground text-primary-foreground',
                                    isCompleted && 'fill-none stroke-[4]'
                                )}
                            />
                        </Button>
                    </CircularProgressbarWithChildren>
                </div>
            ) : (
                <Button
                    size='rounded'
                    variant={isLocked ? 'locked' : 'secondary'}
                    className='h-[70px] w-[70px] border-b-8'
                >
                    <Icon 
                        className={cn(
                            'h-10 w-10',
                            isLocked
                            ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                            : 'fill-primary-foreground text-primary-foreground',
                            isCompleted && 'fill-none stroke-[4]'
                        )}
                    />
                </Button>
            )}
        </div>
    </Link>
  );
}

export default LessonButton;