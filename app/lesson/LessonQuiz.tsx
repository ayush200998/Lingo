'use client'

import React, { useState } from 'react'
import LessonQuizHeader from './LessonQuizHeader';
import { challengeOptions, challenges } from '@/db/schema';
import ChallengeAssistBubble from './ChallengeAssistBubble';
import ChallengeOptionsContainer from './ChallengeOptionsContainer';

type LessonQuizType = {
    initialLessonId: number,
    initialPercentage: number,
    initialHearts: number,
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[],
    userSubscription: any,
};

const LessonQuiz = ({
    initialLessonId,
    initialPercentage,
    initialHearts,
    initialLessonChallenges,
    userSubscription,
} : LessonQuizType) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeChallengeIndex, setActiveChallengeIndex] = useState(() => {
        const activeIndex = challenges.findIndex((challenge) => !challenge.completed);

        return activeIndex  === -1 ? 0 : activeIndex
    });

    const currentActiveChallenge = challenges[activeChallengeIndex];
    const challengeOptions = currentActiveChallenge.challengeOptions;
    const title = currentActiveChallenge.type === 'ASSIST'
        ? 'Select an option to continue'
        : currentActiveChallenge.question

  return (
    <>
        <LessonQuizHeader
            hearts={hearts}
            percentage={percentage}
            isUserSubscribed={!!userSubscription?.isActive}
        />
        <div className='flex-1'>
            <div className='h-full flex justify-center items-center'>
                <div
                    className='lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12'
                >
                    <h1
                        className='text-lg lg:text-3xl text-center font-bold text-neutral-700'
                    >
                        {title}
                    </h1>

                    {currentActiveChallenge.type === 'ASSIST' && (
                        <div
                            id='challenge-assist-bubble-container'
                        >
                            <ChallengeAssistBubble
                                question={currentActiveChallenge.question}
                            />
                        </div>
                    )}

                    <ChallengeOptionsContainer
                        options={challengeOptions}
                        type={currentActiveChallenge.type}
                        onSelect={() => {}}
                        status='none'
                        selectedOption={undefined}
                        disabled={false}
                    /> 
                </div>
            </div>
        </div>
    </>
  )
}

export default LessonQuiz