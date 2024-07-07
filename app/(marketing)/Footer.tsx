import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  const flags = [
    {
      name: 'Croatian',
      src: '/flags/hr.svg',
      alt: 'croatia',
    },
    {
      name: 'Italian',
      src: '/flags/it.svg',
      alt: 'italy',
    },
    {
      name: 'French',
      src: '/flags/fr.svg',
      alt: 'france',
    },
    {
      name: 'Japanese',
      src: '/flags/jp.svg',
      alt: 'japan',
    },
    {
      name: 'Spanish',
      src: '/flags/es.svg',
      alt: 'spain',
    },
  ];

  return (
    <footer
        className='hidden lg:block p-2 h-[100px] border-t-2 border-slate-200'
    >
      <div
        className='max-w-screen-lg w-full flex justify-evenly mx-auto items-center h-full gap-x-3'
      >
        {flags.map((flag) => (
          <Button
            key={flag.name}
            size='lg'
            variant='defaultOutline'
            className='w-full'
          >
            <Image 
              src={flag.src}
              alt={flag.alt}
              width={40}
              height={32}
              className='mr-4 rounded-md'
            />
            {flag.name}
          </Button>
        ))}
      </div>
    </footer>
  )
}

export default Footer