import React, { use } from 'react'
import { redirect } from 'next/navigation';

// Custom Components
import FeedWrapper from '@/components/FeedWrapper';
import FeedWrapperHeader from './FeedWrapperHeader';
import StickyWrapper from '@/components/StickyWrapper';
import Unit from './Unit';
import UserProgress from '@/components/UserProgress';

// Db Queries
import {
  getUnits,
  getUserProgress,
  getCourseProgress,
  getLessonPercentage,
  getUserSubscription,
} from '@/db/queries';
import UpgradeUserToPro from '@/components/UpgradeUserToPro';
import Quests from '@/components/Quests';

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    userSubscription,
    units,
    courseProgress,
    lessonPercentage,
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
  ]);

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect('/courses');
  };

  const isActiveSubscriptionUser = !!userSubscription?.isSubscriptionActive;

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
            hasActiveSubscription={isActiveSubscriptionUser}
          />

          {!isActiveSubscriptionUser && (
            <UpgradeUserToPro />
          )}

          <Quests 
            points={userProgress.points}
          />
        </StickyWrapper>
    </div>
  )
}

export default LearnPage;