import React from 'react'
import { redirect } from 'next/navigation';

// Custom Components
import LessonQuiz from './LessonQuiz';

// Db Queries
import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries';

const LessonsPage = async () => {
    const lessonData = getLesson();
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

export default LessonsPage;