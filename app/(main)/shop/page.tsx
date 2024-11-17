import FeedWrapper from '@/components/FeedWrapper';
import StickyWrapper from '@/components/StickyWrapper';
import UserProgress from '@/components/UserProgress';
import { getUserProgress } from '@/db/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'
import ShopItems from './ShopItems';

const ShopPage = async () => {
    const userProgressData = getUserProgress();

    const [
        userProgress,
      ] = await Promise.all([
        userProgressData,
      ]);
    
      if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses');
      };

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
                    hasActiveSubscription={null}
                />
            </div>
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

export default ShopPage;