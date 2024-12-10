import { db } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { checkIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: { courseId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const courseId = params.courseId;

    if (!courseId) {
        return new NextResponse('Course ID is required', { status: 400 });
    }

    try {
        const existingCourse = await db.query.courses.findFirst({
            where: eq(courses.id, courseId),
        });
    
        return NextResponse.json(existingCourse);
    } catch (error) {
        console.error('Error fetching course details:', error, 'courseId:', courseId);
        return new NextResponse('[Courses]: Error while fetching course details', { status: 500 });
    }
};

export async function PUT(req: Request, { params } : { params: { courseId: number } }) {
    // Check if the user is an admin
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        // Parse the request body
        const body = await req.json();

        // Ensure the course ID is provided
        const courseId = params.courseId;
        const { ...updateData } = body;

        if (!courseId) {
            return new NextResponse('Course ID is required', { status: 400 });
        }

        // Find the course to ensure it exists
        const existingCourse = await db.query.courses.findFirst({
            where: eq(courses.id, courseId),
        });

        if (!existingCourse) {
            return new NextResponse('Course not found', { status: 404 });
        }

        // Update the course in the database
        const courseList = await db
            .update(courses)
            .set(updateData)
            .where(eq(courses.id, courseId))
            .returning();

        return NextResponse.json(courseList[0]);
    } catch (error) {
        console.error('Error updating course:', error);
        return new NextResponse('[Courses]: Error while updating course', { status: 500 });
    }
};

export async function DELETE(req: Request, { params } : { params: { courseId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const courseId = params.courseId;

    if (!courseId) {
        return new NextResponse('Course ID is required', { status: 400 });
    }

    try {
        const courseList = await db.delete(courses).where(eq(courses?.id, courseId)).returning();
    
        return NextResponse.json(courseList[0]);
    } catch (error) {
        console.error('Error fetching course details:', error, 'courseId:', courseId);
        return new NextResponse('[Courses]: Error while fetching course details', { status: 500 });
    }
};