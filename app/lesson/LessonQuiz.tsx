'use client'

import React, { useState, useTransition } from 'react'
import ReactConfetti from 'react-confetti';
import { useAudio, useWindowSize } from 'react-use';
import LessonQuizHeader from './LessonQuizHeader';
import { challengeOptions, challenges } from '@/db/schema';
import ChallengeAssistBubble from './ChallengeAssistBubble';
import ChallengeOptionsContainer from './ChallengeOptionsContainer';
import LessonQuizFooter from './LessonQuizFooter';
import { reduceHearts, upsertChallengeProgress } from '@/actions/challenge_progress';
import { toast } from 'sonner';
import Image from 'next/image';
import LessonFinishCard from './LessonFinishCard';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();

    const {
        width,
        height,
    } = useWindowSize();
    const [
        correctAudio,
        _c,
        correctAudioControls,
    ] = useAudio({ src: '/audio/correct.wav' });

    const [
        incorrectAudio,
        _ic,
        incorrectAudioControls,
    ] = useAudio({ src: '/audio/correct.wav' });

    const [
        finishAudio,
    ] = useAudio({ src: '/audio/finish.mp3', autoPlay: true });

    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeChallengeIndex, setActiveChallengeIndex] = useState(() => {
        const activeIndex = challenges.findIndex((challenge) => !challenge.completed);

        return activeIndex  === -1 ? 0 : activeIndex
    });
    const [currentSelectedOption, setCurrentSelectedOption] = useState<number>();
    const [currentStatus, setCurrentStatus] = useState<'correct' | 'wrong' | 'none'>('none');

    const currentActiveChallenge = challenges[activeChallengeIndex];
    const challengeOptions = currentActiveChallenge?.challengeOptions;
    const title = currentActiveChallenge?.type === 'ASSIST'
        ? 'Select an option to continue'
        : currentActiveChallenge?.question

    // Handlers ----------------------------------------

    const handleOnNext = () => {
        setActiveChallengeIndex((prevValue) => prevValue + 1);
    };

    // This will be called for 'correct' | 'wrong' | 'completed' challenge options and also for checking if the option is correct or wrong
    const handleOnContinue = () => {
        if (!currentSelectedOption) return;

        if (currentStatus === 'wrong') {
            setCurrentStatus('none');
            setCurrentSelectedOption(undefined);
            return;
        }

        if (currentStatus === 'correct') {
            handleOnNext();
            setCurrentStatus('none');
            setCurrentSelectedOption(undefined);
            return;
        }

         const correctOption = challengeOptions.find((option) => option.correct);

         if (!correctOption) return;

         if (correctOption.id === currentSelectedOption) {
            startTransition(() => {
                upsertChallengeProgress(currentActiveChallenge.id)
                    .then((response) => {
                        if (response?.error === 'hearts') {
                            // TODO: Add a modal to show unsufficient hearts and upgrade.
                            console.log('Insufficient hearts');
                            return;
                        }

                        correctAudioControls.play();
                        setCurrentStatus('correct');
                        setPercentage((prevValue) => prevValue + 100 / challenges.length)

                        if (initialPercentage === 100) {
                            setHearts((prevValue) => Math.min(prevValue + 1, 5));
                        }
                    })
                    .catch((error) => {
                        // TODO: Add a dialog here to show the error
                        toast.error('Something went wrong');
                        console.error(error.message);
                    })
                    
            });
         } else {
            startTransition(() => {
                reduceHearts(currentActiveChallenge.id)
                    .then((response) => {
                        if (response?.error === 'hearts') {
                            // TODO: Add a modal to show unsufficient hearts and upgrade.
                            console.log('Insufficient hearts');
                            return;
                        }
                        incorrectAudioControls.play();
                        setCurrentStatus('wrong');

                        if (!response?.error) {
                            setHearts((prevValue) => Math.max(prevValue - 1, 0));
                        }
                    })
                    .catch((error) => {
                        // TODO: Add a dialog here to show the error
                        toast.error('Something went wrong');
                        console.error(error.message);
                    })
            })
         }
    };

    const handleChallengeSelect = (id: number) => {
        if (currentStatus !== 'none') return;
        
        setCurrentSelectedOption(id);
    }

    if (!currentActiveChallenge) {
        return (
            <>
                {finishAudio}
                <ReactConfetti 
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div
                    className='flex flex-col h-full justify-center items-center gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center'
                >
                    <Image
                        src='/assets/finish.svg'
                        alt='Finish'
                        width={100}
                        height={100}
                        className='hidden lg:block'
                    />
                    <Image
                        src='/assets/finish.svg'
                        alt='Finish'
                        width={50}
                        height={50}
                        className='lg:hidden block'
                    />
                    <h1
                        className='text-xl lg:text-3xl font-bold text-neutral-700'
                    >
                        Great job! <br /> You&apos;ve completed the lesson.
                    </h1>
                    <div
                        className='flex gap-x-4 items-center'
                    >
                        <LessonFinishCard
                            label='Total Xp'
                            value={challenges.length * 10}
                            iconSrc='/assets/points.svg'
                        />

                        <LessonFinishCard 
                            label='Hearts left'
                            value={hearts}
                            iconSrc='/assets/heart.svg'
                        />
                    </div>
                </div>
                <LessonQuizFooter
                    lessonId={lessonId}
                    status='completed'
                    onCheck={() => router.push('/learn')}
                />
            </>
        );
    }

  return (
    <>
        {correctAudio}
        {incorrectAudio}
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
                        onSelect={handleChallengeSelect}
                        status={currentStatus}
                        selectedOption={currentSelectedOption}
                        disabled={pending}
                    /> 
                </div>
            </div>
        </div>

        <LessonQuizFooter
            status={currentStatus}
            onCheck={handleOnContinue}
            disabled={pending || !currentSelectedOption}
        />
    </>
  )
}

export default LessonQuiz