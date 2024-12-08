'use client'

import React, { useTransition } from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
import { refillHearts } from '@/actions/user_progress';
import { createStripeUrl } from '@/actions/user_subscription';
import { POINTS_TO_REFILL_HEARTS } from '@/constants/constants';

type ShopItemsTypes = {
    hearts: number,
    points: number,
    hasActiveSubscription: boolean,
};

const ShopItems = ({
    hearts,
    points,
    hasActiveSubscription,
} : ShopItemsTypes) => {

    const [pending, startTransition] = useTransition();

    // API's -------------------------------------------
    const onUpgrade = () => {
        startTransition(() => {
            createStripeUrl()
                .then((response) => {
                    if (response.data) {
                        window.location.href = response.data;
                    }
                })
                .catch((error) => {
                    console.error(`onUpgrade: Something went wrong message: ${error.message}, stack: ${error?.stack}`);
                    toast.error('Something went wrong');
                })
        })
    };

    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL_HEARTS) {
            return;
        }

        startTransition(() => {
            refillHearts()
                .then(() => {
                    toast('Refilled hearts successfully');
                })
                .catch((error) => {
                    toast.error('Something went wrong');
                })
        })
    };
  return (
    <ul
        className='w-full'
    >
        <div
            className='flex w-full p-4 items-center gap-4 border-t-2'
        >
            <Image
                src='/assets/heart.svg'
                alt='Heart'
                width={60}
                height={60}
            />

            <div
                className='flex-1'
            >
                <p
                    className='text-neutral-700 text-base lg:text-xl font-bold'
                >
                    Refill hearts
                </p>
            </div>
            <Button
                onClick={onRefillHearts}
                disabled={
                    pending
                    || hearts === 5
                    || points < POINTS_TO_REFILL_HEARTS
                }
            >
                {hearts === 5 
                    ? 'full'
                    : (
                        <div
                            className='flex items-center'
                        >
                            <Image
                                src='/assets/points.svg'
                                alt='Points'
                                width={20}
                                height={20}
                            />
                            <p>
                                {POINTS_TO_REFILL_HEARTS}
                            </p>
                        </div>
                    )
                }
            </Button>
        </div>

        <div
            className='flex w-full p-4 items-center gap-4 border-t-2'
        >
            <Image
                src='/assets/unlimited.svg'
                alt='Unlimited hearts'
                width={60}
                height={60}
            />

            <div
                className='flex-1'
            >
                <p
                    className='text-neutral-700 text-base lg:text-xl font-bold'
                >
                    Unlimited hearts
                </p>
            </div>
            <Button
                onClick={onUpgrade}
                disabled={(
                    pending
                )}
            >
                {hasActiveSubscription ? 'settings' : 'upgrade'}
            </Button>
        </div>
    </ul>
  )
}

export default ShopItems