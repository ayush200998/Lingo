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
    <Button
        size='lg'
        className='w-full flex justify-start'
        variant={isActiveButton ? 'sidebarOutline' : 'sidebar'}
    >
        <Link
            href={href}
            className='flex items-center'
        >
            <Image
                src={iconSrc}
                alt={label}
                width={32}
                height={32}
                className='mr-3'
            />
            {label}
        </Link>
    </Button>
  )
}

export default SidebarItem