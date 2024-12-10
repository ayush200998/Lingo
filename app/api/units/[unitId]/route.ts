import { db } from "@/db/drizzle";
import { units } from "@/db/schema";
import { checkIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params } : { params: { unitId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const unitId = params.unitId;

    if (!unitId) {
        return new NextResponse('Unit ID is required', { status: 400 });
    }

    try {
        const existingUnit = await db.query.units.findFirst({
            where: eq(units.id, unitId),
        });
    
        return NextResponse.json(existingUnit);
    } catch (error) {
        console.error('Error fetching unit details:', error, 'unit:', unitId);
        return new NextResponse('[Units]: Error while fetching unit details', { status: 500 });
    }
};

export async function PUT(req: Request, { params } : { params: { unitId: number } }) {
    // Check if the user is an admin
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    try {
        // Parse the request body
        const body = await req.json();

        // Ensure the unit ID is provided
        const unitId = params.unitId;
        const { ...updateData } = body;

        if (!unitId) {
            return new NextResponse('Unit ID is required', { status: 400 });
        }

        // Find the unit to ensure it exists
        const existingUnit = await db.query.units.findFirst({
            where: eq(units.id, unitId),
        });

        if (!existingUnit) {
            return new NextResponse('Unit not found', { status: 404 });
        }

        // Update the unit in the database
        const unitList = await db
            .update(units)
            .set(updateData)
            .where(eq(units.id, unitId))
            .returning();

        return NextResponse.json(unitList[0]);
    } catch (error) {
        console.error('Error updating unit:', error);
        return new NextResponse('[Units]: Error while updating unit', { status: 500 });
    }
};

export async function DELETE(req: Request, { params } : { params: { unitId: number }}) {
    const isAdmin = checkIsAdmin();

    if (!isAdmin) {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    const unitId = params.unitId;

    if (!unitId) {
        return new NextResponse('Unit ID is required', { status: 400 });
    }

    try {
        const unitList = await db.delete(units).where(eq(units?.id, unitId)).returning();
    
        return NextResponse.json(unitList[0]);
    } catch (error) {
        console.error('Error fetching unit details:', error, 'unitId:', unitId);
        return new NextResponse('[Units]: Error while fetching unit details', { status: 500 });
    }
};