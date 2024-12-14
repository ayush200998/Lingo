import FeedWrapper from '@/components/FeedWrapper';
import Quests from '@/components/Quests';
import StickyWrapper from '@/components/StickyWrapper';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import UpgradeUserToPro from '@/components/UpgradeUserToPro';
import UserProgress from '@/components/UserProgress';
import { getTopTenUsersForLeaderboard, getUserProgress, getUserSubscription } from '@/db/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const leaderboardUsersData = getTopTenUsersForLeaderboard();

    const [
        userProgress,
        userSubscription,
        leaderboardUsers,
      ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
        leaderboardUsersData,
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
                    src='/icons/leaderboard.svg'
                    alt='Leaderboard'
                    width={80}
                    height={80}
                />

                <h1
                    className='text-neutral-800 dark:text-neutral-300 text-2xl font-bold my-3'
                >
                    Leaderboard
                </h1>

                <p
                    className='text-neutral-500 dark:text-neutral-400 text-base font-semibold mb-3 lg:text-lg'
                >
                    See where you stand among other learners in the community.
                </p>
            </div>

            <Separator className='mb-4 h-0.5 rounded-full' />

            {leaderboardUsers.map((leaderboardUser, index) => (
              <div
                key={leaderboardUser.userId}
                className='flex items-center w-full p-2 px-4 hover:bg-gray-200/50'
              >
                <p
                  className='font-bold text-lime-700 mr-4'
                >
                  {index + 1}
                </p>
                <Avatar
                  className='border bg-green-500 h-12 w-12 ml-3 mr-5'
                >
                  <AvatarImage
                    src={leaderboardUser.userImgSrc}
                    className='object-cover'
                  />
                </Avatar>
                <p
                  className='flex-1 font-bold text-neutral-800 dark:text-neutral-300'
                >
                  {leaderboardUser.userName}
                </p>
                <p
                  className='text-muted-foreground'
                >
                  {leaderboardUser.points} XP
                </p>
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

export default LeaderboardPage;