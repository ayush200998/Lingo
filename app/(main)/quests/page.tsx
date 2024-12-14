import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import { Progress } from '@/components/ui/progress';
import UpgradeUserToPro from '@/components/UpgradeUserToPro';
import UserProgress from '@/components/UserProgress';
import { QUESTS_LIST } from '@/constants/constants';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

const QuestsPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress,
        userSubscription,
      ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
      ]);
    
      if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses');
      };

    const isActiveSubscriptionUser = !!userSubscription?.isSubscriptionActive;

  return (
    <div
      id='shop-page-container'
      className='flex gap-12 px-4 relative top-0'
    >
        <FeedWrapper>
            <div
              className='flex flex-col items-center'
            >
                <Image 
                  src='/icons/quests.svg'
                  alt='Quests'
                  width={80}
                  height={80}
                />
                <h1
                  className='text-neutral-800 dark:text-neutral-300 text-2xl font-bold my-3'
                >
                  Quests
                </h1>

                <p
                  className='text-neutral-500 dark:text-neutral-400 text-base font-semibold mb-3 lg:text-lg'
                >
                  Complete quests by earning points.
                </p>
            </div>

            <ul
              className='w-full'
            >
              {QUESTS_LIST.map((quest) => {
                const progress = (userProgress.points / quest.value) * 100;

                return (
                  <div
                    key={quest.value}
                    className='flex items-center border-t-2 p-4 gap-4 w-full'
                  >
                    <Image 
                      src='/assets/points.svg'
                      alt='Points'
                      width={60}
                      height={60}
                    />
                    <div
                      className='flex flex-col gap-2 w-full'
                    >
                      <p
                        className='font-bold text-neutral-700 dark:text-neutral-300/90 text-xl'
                      >
                        {quest.title}
                      </p>
                      <Progress value={progress} className='h-3' />
                    </div>
                  </div>
                )
              })}
            </ul>
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
        </StickyWrapper>
    </div>
  )
}

export default QuestsPage;