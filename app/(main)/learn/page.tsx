import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import React, { use } from 'react'
import FeedWrapperHeader from './FeedWrapperHeader';
import UserProgress from '@/components/UserProgress';
import { getCourseDetails, getUnits, getUserProgress } from '@/db/queries';
import { redirect } from 'next/navigation';

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [
    userProgress,
    units,
  ] = await Promise.all([
    userProgressData,
    unitsData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
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
              {JSON.stringify(unit)}
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