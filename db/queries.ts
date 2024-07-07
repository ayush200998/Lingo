import { cache } from "react";
import { db } from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { challengeProgress, courses, units, userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

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