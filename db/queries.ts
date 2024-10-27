import { cache } from "react";
import { db } from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { challengeProgress, courses, lessons, units, userProgress } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getAllCourses = cache(async() => {
    const courses = await db.query.courses.findMany();
    return courses;
});

export const getUserProgress = cache(async() => {
    const { userId } = await auth();
    
    if (!userId) {
        return null;
    }

    const response = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        }
    });

    return response;
});

export const getCourseDetails = async (courseId: number) => {
    const response = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            userProgress: true,
        },
        // TODO: Add logic to populate units and lessions later.
    });

    return response;
};

export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userProgress?.activeCourseId || !userId) {
        return [];
    }

    const response = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(
                                    challengeProgress.userId,
                                    userId
                                ),
                            },
                        },
                    },
                },
            },
        },
    });

    const normalizedData = response?.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            const isChallengesCompleted = lesson.challenges.length > 0
            && lesson.challenges.every((challenge) => {
                return challenge.challengeProgress
                    && challenge.challengeProgress.length > 0
                    && challenge.challengeProgress.every((challengeProgress) => challengeProgress.completed);
            })

            return {
                ...lesson,
                completed: isChallengesCompleted,
            }
        })

        return {
            ...unit,
            lessons: lessonsWithCompletedStatus,
        }
    });

    return normalizedData;
});

export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress || !userProgress?.activeCourseId) {
        return null;
    }

    // Get units, lessons, and challenges data for the active course
    const unitsInActiveCourse = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    });

    const firstUnCompletedLesson = unitsInActiveCourse
        .flatMap((unit) => unit.lessons)
        .find((lesson) => {
            return lesson.challenges.some((challenge) => {
                return !challenge.challengeProgress
                || challenge.challengeProgress.length === 0
                || challenge.challengeProgress.some((cp) => cp.completed === false);
            });
        });

    return {
        activeLesson: firstUnCompletedLesson,
        activeLessonId: firstUnCompletedLesson?.id,
    }
});

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const courseProgress = await getCourseProgress();
    const lessonId = id || courseProgress?.activeLessonId;

    if (!courseProgress || !lessonId) {
        return null;
    }

    const response = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });

    if (!response || !response?.challenges) {
        return null;
    }

    const normalizeChallenges = response.challenges.map((challenge) => {
        const isChallengeCompleted = (
            challenge.challengeProgress
            && challenge.challengeProgress.length > 0
            && challenge.challengeProgress.every((challengeProgress) => challengeProgress.completed)
        );

        return {
            ...challenge,
            completed: isChallengeCompleted,
        }
    });

    return {
        ...response,
        challenges: normalizeChallenges,
    }
});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();
    const lessonId = courseProgress?.activeLessonId;

    if (!lessonId) {
        return 0;
    }

    const lesson = await getLesson(lessonId);

    if (!lesson) {
        return 0;
    };

    const completedChallengesCount = lesson.challenges.filter((challenge) => challenge.completed);

    const lessonPercentage = (completedChallengesCount.length / lesson.challenges.length) * 100;

    return lessonPercentage;
});