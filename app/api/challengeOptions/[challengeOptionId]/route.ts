import { db } from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { checkIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: { challengeOptionId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const challengeOptionId = params.challengeOptionId;

    if (!challengeOptionId) {
        return new NextResponse('Challenge Option ID is required', { status: 400 });
    }

    try {
        const existingChallengeOption = await db.query.challengeOptions.findFirst({
            where: eq(challengeOptions.id, challengeOptionId),
        });
    
        return NextResponse.json(existingChallengeOption);
    } catch (error) {
        console.error('Error fetching challengeOption details:', error, 'challengeOptionId:', challengeOptionId);
        return new NextResponse('[ChallengeOptions:]: Error while fetching challengeOption details', { status: 500 });
    }
};

export async function PUT(req: Request, { params } : { params: { challengeOptionId: number } }) {
    // Check if the user is an admin
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        // Parse the request body
        const body = await req.json();

        // Ensure the challengeOption ID is provided
        const challengeOptionId = params.challengeOptionId;
        const { ...updateData } = body;

        if (!challengeOptionId) {
            return new NextResponse('Challenge Option ID is required', { status: 400 });
        }

        // Find the challengeOption to ensure it exists
        const existingChallengeOption = await db.query.challengeOptions.findFirst({
            where: eq(challengeOptions.id, challengeOptionId),
        });

        if (!existingChallengeOption) {
            return new NextResponse('Challenge Option not found', { status: 404 });
        }

        // Update the challengeOption in the database
        const challengeOptionList = await db
            .update(challengeOptions)
            .set(updateData)
            .where(eq(challengeOptions.id, challengeOptionId))
            .returning();

        return NextResponse.json(challengeOptionList[0]);
    } catch (error) {
        console.error('Error updating challengeOption:', error);
        return new NextResponse('[ChallengeOptions:]: Error while updating challengeOption', { status: 500 });
    }
};

export async function DELETE(req: Request, { params } : { params: { challengeOptionId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const challengeOptionId = params.challengeOptionId;

    if (!challengeOptionId) {
        return new NextResponse('Challenge Option ID is required', { status: 400 });
    }

    try {
        const challengeOptionList = await db.delete(challengeOptions).where(eq(challengeOptions?.id, challengeOptionId)).returning();
    
        return NextResponse.json(challengeOptionList[0]);
    } catch (error) {
        console.error('Error while deleting challengeOption:', error, 'challengeOptionId:', challengeOptionId);
        return new NextResponse('[ChallengeOptions:]: Error while deleting a challengeOption', { status: 500 });
    }
};