import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { checkIsAdmin } from "@/lib/admin";
import { challengeOptions } from "@/db/schema";

export async function GET(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const challengeOptions = await db.query.challengeOptions.findMany();
    
        return NextResponse.json(challengeOptions);
    } catch (error) {
        console.error('Error fetching challengeOption:', error);
        return new NextResponse('[ChallengeOptions:]: Error while fetching challengeOptions', { status: 500 });
    }
};

export async function POST(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const challengeOptionList = await db.query.challengeOptions.findMany();
        const totalChallengeOptions = challengeOptionList.length;
    
        const body = await req.json();
    
        const challengeOptionsList = await db.insert(challengeOptions).values({
            id: totalChallengeOptions + 1,
            ...body,
        }).returning();
    
        return NextResponse.json(challengeOptionsList[0]);
    } catch (error) {
        console.error('Error while creating challengeOption:', error);
        return new NextResponse('[ChallengeOptions:]: Error while creating a challengeOption', { status: 500 });
    }
};