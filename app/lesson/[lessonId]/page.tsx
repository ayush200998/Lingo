import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react'
import LessonQuiz from '../LessonQuiz';

const LessonsIdPage = async ({
    params,
} : {
    params: Promise<{ lessonId: string }>
}) => {
    const lessonId = parseInt((await params).lessonId);

    const lessonData = getLesson(lessonId);
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [
        lesson,
        userProgress,
        userSubscription,
    ] = await Promise.all([
        lessonData,
        userProgressData,
        userSubscriptionData,
    ]);

    if (!lesson || !userProgress) {
        redirect('/learn');
    }

    const completedChallengesCount = lesson.challenges.filter((challenge) => challenge.completed).length;
    const totalChallengesCount = lesson.challenges.length;

    const initialPercentage = (completedChallengesCount / totalChallengesCount) * 100;

  return (
    <LessonQuiz
        initialLessonId={lesson.id}
        initialPercentage={initialPercentage}
        initialHearts={userProgress.hearts}
        initialLessonChallenges={lesson.challenges}
        userSubscription={userSubscription}
    />
  )
}

export default LessonsIdPage;