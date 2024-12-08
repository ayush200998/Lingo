import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import UserProgress from '@/components/UserProgress';
import { getUserProgress, getUserSubscription } from '@/db/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'
import ShopItems from './ShopItems';
import Quests from '@/components/Quests';

const ShopPage = async () => {
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
                    src='/icons/shop.svg'
                    alt=''
                    width={80}
                    height={80}
                />

                <h1
                    className='text-neutral-800 text-2xl font-bold my-3'
                >
                    Shop
                </h1>

                <p
                    className='text-neutral-500 text-base font-semibold mb-3 lg:text-lg'
                >
                    Spend your points on cool stuff.
                </p>

                <ShopItems
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isActiveSubscriptionUser}
                />
            </div>
        </FeedWrapper>

        <StickyWrapper>
            <UserProgress 
              activeCourse={userProgress?.activeCourse}
              hearts={userProgress?.hearts}
              points={userProgress?.points}
              hasActiveSubscription={isActiveSubscriptionUser}
            />

            <Quests
                points={userProgress.points}
            />
        </StickyWrapper>
    </div>
  )
}

export default ShopPage;