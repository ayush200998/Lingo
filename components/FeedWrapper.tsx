import React from 'react'

type FeedWrapperProps = {
    children: React.ReactNode,
}

const FeedWrapper = ({ children }: FeedWrapperProps) => {
  return (
    <div className='lg:max-w-[calc(100%-368px)] w-full pb-6 h-full flex flex-col gap-y-2'>
        {children}
    </div>
  )
}

export default FeedWrapper;