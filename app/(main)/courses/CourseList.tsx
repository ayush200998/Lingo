'use client'

import { courses, userProgress } from '@/db/schema';
import React, { useTransition } from 'react';
import CourseCard from './CourseCard';
import { useRouter } from 'next/navigation';
import { upsertUserProgress } from '@/actions/user_progress';
import { toast } from 'sonner';

type CourseListProps = {
    courses: typeof courses.$inferSelect[],
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId,
};

const CourseList = ( { courses, activeCourseId }: CourseListProps ) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const handleOnCourseClick = (courseId: number) => {
        if (pending) return;

        if (courseId === activeCourseId) {
            router.push('/learn')
        }

        startTransition(() => {
            upsertUserProgress(courseId)
                .catch((error) => {
                    toast.error('Error:', error.message);
                }) 
        });
    };

  return (
    <div
        className='pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'
    >
        {courses.map((course) => (
            <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                imageSrc={course.imageSrc}
                disabled={pending}
                onClick={handleOnCourseClick}
                isActive={course.id === activeCourseId}
            />
        ))}
    </div>
  )
}

export default CourseList;