import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import React, { use } from 'react'
import FeedWrapperHeader from './FeedWrapperHeader';
import UserProgress from '@/components/UserProgress';
import {
  getUnits,
  getUserProgress,
  getCourseProgress,
  getLessonPercentage,
} from '@/db/queries';
import { redirect } from 'next/navigation';
import Unit from './Unit';

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
  ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect('/courses');
  };

  return (
    <div className='flex gap-12 px-4 relative top-0'>
        <FeedWrapper>
          <FeedWrapperHeader title={userProgress?.activeCourse?.title} />
          {units.map((unit) => (
            <div
              key={unit.id}
              className='flex flex-col space-y-4 w-full'
            >
              <Unit
                id={unit.id}
                title={unit.title}
                description={unit.description}
                order={unit.order}
                lessons={unit.lessons}
                activeLesson={courseProgress?.activeLesson}
                activeLessonPercentage={lessonPercentage}
              />
            </div>
          ))}
        </FeedWrapper>
        <StickyWrapper>
            <UserProgress 
              activeCourse={userProgress?.activeCourse}
              hearts={userProgress?.hearts}
              points={userProgress?.points}
              hasActiveSubscription={false}
            />
        </StickyWrapper>
    </div>
  )
}

export default LearnPage;