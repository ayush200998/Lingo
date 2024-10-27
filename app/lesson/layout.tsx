import React, { ReactNode } from 'react'

type LessonLayoutProps = {
    children: ReactNode,
};

const LessonLayout = ({ children }: LessonLayoutProps) => {
  return (
    <div
        id='lesson-layout'
        className='h-screen flex flex-col'
    >
        <div
            className='h-full w-full flex flex-col'
        >
            {children}
        </div>
    </div>
  )
}

export default LessonLayout;