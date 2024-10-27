import { challengeProgress, challenges, lessons, units } from '@/db/schema';
import React from 'react';
import UnitBanner from './UnitBanner';
import LessonButton from './LessonButton';

type UnitProps = {
    id: number,
    title: string,
    description: string,
    order: number,
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean;
    })[],
    activeLesson: (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect | null;
    } | undefined),
    activeLessonPercentage: number,
};

const Unit = ({
    id,
    title,
    description,
    order,
    lessons,
    activeLesson,
    activeLessonPercentage,
}: UnitProps) => {

  return (
    <>
        <UnitBanner
            title={title}
            description={description}
        />
        <div
            className='flex flex-col items-center relative'
        >
            {lessons.map((lesson, index) => {
                const isCurrentLesson = lesson?.id === activeLesson?.id;
                const isLocked = !isCurrentLesson && !lesson?.completed;

                return (
                    <LessonButton
                        key={lesson.id}
                        id={lesson.id}
                        index={index}
                        totalCount={lessons.length - 1}
                        isLocked={isLocked}
                        isCurrent={isCurrentLesson}
                        percentage={activeLessonPercentage}
                    />
                )
            })}
        </div>
    </>
  )
}

export default Unit