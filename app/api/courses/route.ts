import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { checkIsAdmin } from "@/lib/admin";
import { courses } from "@/db/schema";

export async function GET(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const courseList = await db.query.courses.findMany();
    
        return NextResponse.json(courseList);
    } catch (error) {
        console.error('Error fetching courses:', error);
        return new NextResponse('[Courses]: Error while fetching courses', { status: 500 });
    }
};

export async function POST(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const courseList = await db.query.courses.findMany();
        const totalCourses = courseList.length;
    
        const body = await req.json();
    
        const createdCourse = await db.insert(courses).values({
            id: totalCourses + 1,
            ...body,
        }).returning();
    
        return NextResponse.json(createdCourse[0]);
    } catch (error) {
        console.error('Error while creating course:', error);
        return new NextResponse('[Courses]: Error while creating a course', { status: 500 });
    }
};