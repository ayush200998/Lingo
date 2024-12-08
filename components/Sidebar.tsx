import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SidebarItem from './SidebarItem'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import ThemeToggle from './theme/ThemeToggle'

type SidebarProps = {
    className?: string,
}

const sidebarItemsArray = [
    {
        label: 'Learn',
        iconSrc: '/icons/learn.svg',
        href: '/learn'
    },
    {
        label: 'Quests',
        iconSrc: '/icons/quests.svg',
        href: '/quests'
    },
    {
        label: 'Leaderboard',
        iconSrc: '/icons/leaderboard.svg',
        href: '/leaderboard'
    },
    {
        label: 'Shop',
        iconSrc: '/icons/shop.svg',
        href: '/shop'
    },
];

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
        className={cn(
            'h-screen flex flex-col justify-between lg:w-[256px] left-0 top-0 p-3 border-r-2 lg:fixed',
            className,
        )}
    >
        <div
            className='flex flex-col w-full h-[(calc(100%-2rem)] gap-6'
        >
            <Link
                href='/learn'
                className='pl-4'
            >
                <div
                    className='flex gap-1 items-center cursor-pointer'
                >
                    <Image
                        src='/icons/app_icon.svg'
                        alt='Lingo'
                        width={40}
                        height={40}
                    />
                    <h1 className='text-xl font-bold text-green-600'>Lingo</h1>
                </div>
            </Link>

            <div
                id='sidebar-items'
                className='flex flex-col items-start overflow-y-auto gap-2'
            >
                {sidebarItemsArray.map((item) => (
                    <SidebarItem
                        key={item.label}
                        label={item.label}
                        iconSrc={item.iconSrc}
                        href={item.href}
                    />
                ))}
            </div>
        </div>

        <div id='sidebar-footer' className='flex flex-col gap-6 w-full p-2'>
            <ThemeToggle />
            <ClerkLoading>
                <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
            </ClerkLoading>

            <ClerkLoaded>
                <UserButton />
            </ClerkLoaded>
        </div>
    </div>
  )
}

export default Sidebar