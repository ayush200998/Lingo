import { db } from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { checkIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: { lessonId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const lessonId = params.lessonId;

    if (!lessonId) {
        return new NextResponse('Course ID is required', { status: 400 });
    }

    try {
        const existingLesson = await db.query.lessons.findFirst({
            where: eq(lessons.id, lessonId),
        });
    
        return NextResponse.json(existingLesson);
    } catch (error) {
        console.error('Error fetching lesson details:', error, 'lessonId:', lessonId);
        return new NextResponse('[Lessons]: Error while fetching lesson details', { status: 500 });
    }
};

export async function PUT(req: Request, { params } : { params: { lessonId: number } }) {
    // Check if the user is an admin
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        // Parse the request body
        const body = await req.json();

        // Ensure the lesson ID is provided
        const lessonId = params.lessonId;
        const { ...updateData } = body;

        if (!lessonId) {
            return new NextResponse('Course ID is required', { status: 400 });
        }

        // Find the lesson to ensure it exists
        const existingLesson = await db.query.lessons.findFirst({
            where: eq(lessons.id, lessonId),
        });

        if (!existingLesson) {
            return new NextResponse('Course not found', { status: 404 });
        }

        // Update the lesson in the database
        const lessonList = await db
            .update(lessons)
            .set(updateData)
            .where(eq(lessons.id, lessonId))
            .returning();

        return NextResponse.json(lessonList[0]);
    } catch (error) {
        console.error('Error updating lesson:', error);
        return new NextResponse('[Lessons]: Error while updating lesson', { status: 500 });
    }
};

export async function DELETE(req: Request, { params } : { params: { lessonId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const lessonId = params.lessonId;

    if (!lessonId) {
        return new NextResponse('Course ID is required', { status: 400 });
    }

    try {
        const lessonList = await db.delete(lessons).where(eq(lessons?.id, lessonId)).returning();
    
        return NextResponse.json(lessonList[0]);
    } catch (error) {
        console.error('Error while deleting lesson:', error, 'lessonId:', lessonId);
        return new NextResponse('[Lessons]: Error while deleting a lesson', { status: 500 });
    }
};