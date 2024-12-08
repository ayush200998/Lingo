'use server';

import { POINTS_TO_REFILL_HEARTS } from "@/constants/constants";
import { db } from "@/db/drizzle";
import { getCourseDetails, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// To update or create user progress when a user selects a course. 
export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    // If userId or user is not available then throw unauthorized error.
    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    // Get the course details
    const courseDetails = await getCourseDetails(courseId);

    if (!courseDetails) {
        throw new Error("Course not found");
    }

    // Check if user already has existing progress in any other course
    const exisitingUserProgress = await getUserProgress();

    // Update active course id here 
    if (exisitingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user?.firstName || 'User',
            userImgSrc: user?.imageUrl || '/assets/mascot.svg'
        })
        revalidatePath('/courses');
        revalidatePath('/userProgress');
        redirect('/learn');
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user?.firstName || 'User',
        userImgSrc: user?.imageUrl || '/assets/mascot.svg'
    });
    revalidatePath('/courses');
    revalidatePath('/userProgress');
    redirect('/learn');
};

export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error('User progress not found');
    }

    if (currentUserProgress.hearts === 5) {
        throw new Error('Points are full');
    }

    if (currentUserProgress.points < POINTS_TO_REFILL_HEARTS) {
        throw new Error('Not enough points')
    }

    await db.update(userProgress).set({
        hearts: 5,
        points: currentUserProgress.points - POINTS_TO_REFILL_HEARTS,
    }).where(eq(userProgress.userId, currentUserProgress.userId));

    revalidatePath('/lesson');
    revalidatePath('/quests');
    revalidatePath('/leaderboard');
    revalidatePath('/shop');
}