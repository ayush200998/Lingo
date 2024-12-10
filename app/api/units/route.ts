import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { checkIsAdmin } from "@/lib/admin";
import { units } from "@/db/schema";

export async function GET(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const unitList = await db.query.units.findMany();
    
        return NextResponse.json(unitList);
    } catch (error) {
        console.error('Error fetching units:', error);
        return new NextResponse('[Courses]: Error while fetching courses', { status: 500 });
    }
};

export async function POST(req: Request) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        const unitList = await db.query.units.findMany();
        const totalUnits = unitList.length;
    
        const body = await req.json();
    
        const createdCourse = await db.insert(units).values({
            id: totalUnits + 1,
            ...body,
        }).returning();
    
        return NextResponse.json(createdCourse[0]);
    } catch (error) {
        console.error('Error updating course:', error);
        return new NextResponse('[Courses]: Error while creating a course', { status: 500 });
    }
};