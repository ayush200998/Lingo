'use server';

import { db } from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// This method is only called when a user selects correct challenge option.
export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('UnAuthorized user');
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error('User progress not found')
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });

    if (!challenge) {
        throw new Error('Challenge not found');
    }

    const lessonId = challenge.lessonId;
    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.id, challengeId),
            eq(challengeProgress.userId, userId),
        ),
    });

    // isPractice = true, This means that the user has played this challenge earlier and is coming back to the challenge again
    const isPractice = !!existingChallengeProgress;

    if (currentUserProgress.hearts === 0 && !isPractice) {
        return {
            error: 'hearts',
        };
    }

    // Update challengeProgress and userProgress data
    if (isPractice) {
        await db.update(challengeProgress).set({
            completed: true,
        })
        .where(
            eq(challengeProgress.id, existingChallengeProgress.id),
        );

        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 5),
            points: currentUserProgress.points + 10,
        })
        .where(
            eq(userProgress.userId, userId),
        );

        revalidatePath('/learn');
        revalidatePath('/lesson');
        revalidatePath(`/lesson/${lessonId}`);
        revalidatePath('/quests');
        revalidatePath('/leaderboard');
        return;
    }

    // User is playing this challenge for the first time, Create an entry in challenge progress
    await db.insert(challengeProgress).values({
        challengeId,
        userId: userId,
        completed: true,
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10,
    })
    .where(
        eq(userProgress.userId, userId),
    );

    revalidatePath('/learn');
    revalidatePath('/lesson');
    revalidatePath(`/lesson/${lessonId}`);
    revalidatePath('/quests');
    revalidatePath('/leaderboard');
}

export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('UnAuthorized user');
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error('User progress not found')
    }

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });

    if (!challenge) {
        throw new Error('Challenge not found');
    }

    const lessonId = challenge.lessonId;
    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.id, challengeId),
            eq(challengeProgress.userId, userId),
        ),
    });

    // isPractice = true, This means that the user has played this challenge earlier and is coming back to the challenge again
    const isPractice = !!existingChallengeProgress;

    // Update challengeProgress and userProgress data
    if (isPractice) {
        return {
            error: 'practice'
        }
    }

    if (currentUserProgress.hearts === 0) {
        return {
            error: 'hearts',
        }
    }

    // User is playing this challenge for the first time, Create an entry in challenge progress
    await db.insert(challengeProgress).values({
        challengeId,
        userId: userId,
        completed: true,
    });

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(
        eq(userProgress.userId, userId),
    );

    revalidatePath('/learn');
    revalidatePath('/lesson');
    revalidatePath(`/lesson/${lessonId}`);
    revalidatePath('/quests');
    revalidatePath('/leaderboard');
}