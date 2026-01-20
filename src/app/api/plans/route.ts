import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { planSchema } from "@/schemas/plan.schema";
import { z } from "zod";
import { normalizeString } from "@/utils/string";
import { getAuthenticatedUserId } from "@/lib/auth";
import { apiError, zodError } from "@/utils/api-error";

export async function GET(request: Request) {
  const userId = getAuthenticatedUserId(request);

  if (!userId) {
    return apiError("Unauthorized", 401, "unauthorized");
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search");
  const status = searchParams.get("status");

  let filteredPlans = db.plans.filter(plan => plan.userId === userId);

  if (search) {
    const normalizedSearch = normalizeString(search);
    filteredPlans = filteredPlans.filter(p =>
      normalizeString(p.title).includes(normalizedSearch) ||
      normalizeString(p.description).includes(normalizedSearch)
    );
  }
  if (status) {
    filteredPlans = filteredPlans.filter(p => p.status === status);
  }

  let startIndex = 0;
  if (cursor) {
    const cursorIndex = filteredPlans.findIndex(p => p.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const paginatedPlans = filteredPlans.slice(startIndex, startIndex + limit + 1);
  const hasNextPage = paginatedPlans.length > limit;

  if (hasNextPage) {
    paginatedPlans.pop();
  }

  const nextCursor = hasNextPage
    ? paginatedPlans[paginatedPlans.length - 1].id
    : null;

  return NextResponse.json({
    data: paginatedPlans,
    next_cursor: nextCursor,
  });
}

export async function POST(request: Request) {
  const userId = getAuthenticatedUserId(request);

  if (!userId) {
    return apiError("Unauthorized", 401, "unauthorized");
  }

  try {
    const body = await request.json();
    const data = planSchema.parse(body);

    const client = db.clients.find(c => c.id === data.clientId && c.userId === userId);

    if (!client) {
      return apiError("Client not found or does not belong to you", 400, "invalid_client");
    }

    const newPlan = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      ...data,
    };

    db.plans.push(newPlan);

    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodError(error);
    }
    return apiError("Internal Server Error", 500, "internal_server_error");
  }
}
