import { db } from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { checkIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: { challengeId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const challengeId = params.challengeId;

    if (!challengeId) {
        return new NextResponse('Challenge ID is required', { status: 400 });
    }

    try {
        const existingChallenge = await db.query.challenges.findFirst({
            where: eq(challenges.id, challengeId),
        });
    
        return NextResponse.json(existingChallenge);
    } catch (error) {
        console.error('Error fetching challenge details:', error, 'challengeId:', challengeId);
        return new NextResponse('[Challenges]: Error while fetching challenge details', { status: 500 });
    }
};

export async function PUT(req: Request, { params } : { params: { challengeId: number } }) {
    // Check if the user is an admin
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        // Parse the request body
        const body = await req.json();

        // Ensure the challenge ID is provided
        const challengeId = params.challengeId;
        const { ...updateData } = body;

        if (!challengeId) {
            return new NextResponse('Challenge ID is required', { status: 400 });
        }

        // Find the challenge to ensure it exists
        const existingChallenge = await db.query.challenges.findFirst({
            where: eq(challenges.id, challengeId),
        });

        if (!existingChallenge) {
            return new NextResponse('Challenge not found', { status: 404 });
        }

        // Update the challenge in the database
        const challengeList = await db
            .update(challenges)
            .set(updateData)
            .where(eq(challenges.id, challengeId))
            .returning();

        return NextResponse.json(challengeList[0]);
    } catch (error) {
        console.error('Error updating challenge:', error);
        return new NextResponse('[Challenges]: Error while updating challenge', { status: 500 });
    }
};

export async function DELETE(req: Request, { params } : { params: { challengeId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const challengeId = params.challengeId;

    if (!challengeId) {
        return new NextResponse('Challenge ID is required', { status: 400 });
    }

    try {
        const challengeList = await db.delete(challenges).where(eq(challenges?.id, challengeId)).returning();
    
        return NextResponse.json(challengeList[0]);
    } catch (error) {
        console.error('Error while deleting challenge:', error, 'challengeId:', challengeId);
        return new NextResponse('[Challenges]: Error while deleting a challenge', { status: 500 });
    }
};