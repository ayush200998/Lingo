import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { checkIsAdmin } from "@/lib/admin";
import { lessons } from "@/db/schema";

export async function GET(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const lessons = await db.query.lessons.findMany();
    
        return NextResponse.json(lessons);
    } catch (error) {
        console.error('Error fetching lesson:', error);
        return new NextResponse('[Lessons]: Error while fetching lessons', { status: 500 });
    }
};

export async function POST(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const lessonList = await db.query.lessons.findMany();
        const totalLessons = lessonList.length;
    
        const body = await req.json();
    
        const createdLesson = await db.insert(lessons).values({
            id: totalLessons + 1,
            ...body,
        }).returning();
    
        return NextResponse.json(createdLesson[0]);
    } catch (error) {
        console.error('Error while creating lesson:', error);
        return new NextResponse('[Lessons]: Error while creating a lesson', { status: 500 });
    }
};