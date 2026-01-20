import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { planSchema } from "@/schemas/plan.schema";
import { z } from "zod";
import { isAuthenticated } from "@/lib/auth";
import { apiError, zodError } from "@/utils/api-error";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return apiError("Unauthorized", 401, "unauthorized");
  }

  try {
    const { id } = await params;
    const body = await request.json();
    
    const data = planSchema.partial().parse(body);

    if (Object.keys(data).length === 0) {
      return apiError("At least one field is required for update", 400, "missing_fields");
    }

    const index = db.plans.findIndex((p) => p.id === id);

    if (index === -1) {
      return apiError("Plan not found", 404, "not_found");
    }

    const updatedPlan = {
      ...db.plans[index],
      ...data,
    };

    db.plans[index] = updatedPlan;

    return NextResponse.json(updatedPlan);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodError(error);
    }
    return apiError("Internal Server Error", 500, "internal_server_error");
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(request)) {
    return apiError("Unauthorized", 401, "unauthorized");
  }

  const { id } = await params;
  const index = db.plans.findIndex((p) => p.id === id);

  if (index === -1) {
    return apiError("Plan not found", 404, "not_found");
  }

  db.plans.splice(index, 1);

  return NextResponse.json({ success: true });
}
