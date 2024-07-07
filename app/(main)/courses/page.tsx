import React from 'react'
import { getAllCourses, getUserProgress } from '@/db/queries';
import CourseList from './CourseList';

const CoursesPage = async () => {
    const coursesData = getAllCourses();
    const userProgressData = getUserProgress();

    const [
        courses,
        userProgress,
    ] = await Promise.all([
        coursesData,
        userProgressData,
    ]);

  return (
    <div
        id='course-page'
        className='h-full max-w-[912px] px-3 mx-auto'
    >
        <h1
            className='text-2xl font-bold text-neutral-700'
        >
            Learning Courses
        </h1>

        <CourseList 
            courses={courses}
            activeCourseId={userProgress?.activeCourseId}
        />
    </div>
  )
}

export default CoursesPage;