import { getLesson, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';
import React from 'react'
import LessonQuiz from './LessonQuiz';

const LessonsPage = async () => {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [
        lesson,
        userProgress,
    ] = await Promise.all([
        lessonData,
        userProgressData,
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
        userSubscription={null}
    />
  )
}

export default LessonsPage;