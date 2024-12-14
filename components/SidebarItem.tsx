'use client'

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

type SidebarItemProps = {
    label: string,
    iconSrc: string,
    href: string,
};

const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
    const pathname = usePathname();
    const isActiveButton = pathname === href;

  return (
    <Link
        href={href}
        className='flex items-center w-full'
    >
        <Button
            size='lg'
            className='w-full flex justify-start'
            variant={isActiveButton ? 'sidebarOutline' : 'sidebar'}
        >
            <Image
                src={iconSrc}
                alt={label}
                width={32}
                height={32}
                className='mr-3'
            />
            {label}
        </Button>
    </Link>
  )
}

export default SidebarItem