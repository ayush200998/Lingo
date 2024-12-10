import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { checkIsAdmin } from "@/lib/admin";
import { challenges } from "@/db/schema";

export async function GET(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const challenges = await db.query.challenges.findMany();
    
        return NextResponse.json(challenges);
    } catch (error) {
        console.error('Error fetching challenge:', error);
        return new NextResponse('[Challenges]: Error while fetching challenges', { status: 500 });
    }
};

export async function POST(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const challengeList = await db.query.challenges.findMany();
        const totalChallenges = challengeList.length;
    
        const body = await req.json();
    
        const challengesList = await db.insert(challenges).values({
            id: totalChallenges + 1,
            ...body,
        }).returning();
    
        return NextResponse.json(challengesList[0]);
    } catch (error) {
        console.error('Error while creating challenge:', error);
        return new NextResponse('[Challenges]: Error while creating a challenge', { status: 500 });
    }
};