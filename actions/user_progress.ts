'use server';

import { db } from "@/db/drizzle";
import { getCourseDetails, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
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