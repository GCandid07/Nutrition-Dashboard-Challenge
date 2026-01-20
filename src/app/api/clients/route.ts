import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clientSchema } from "@/schemas/client.schema";
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

  let filteredClients = db.clients.filter(client => client.userId === userId);

  if (search) {
    const normalizedSearch = normalizeString(search);
    filteredClients = filteredClients.filter(c =>
      normalizeString(c.name).includes(normalizedSearch) ||
      normalizeString(c.email).includes(normalizedSearch)
    );
  }

  let startIndex = 0;
  if (cursor) {
    const cursorIndex = filteredClients.findIndex(c => c.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const paginatedClients = filteredClients.slice(startIndex, startIndex + limit + 1);
  const hasNextPage = paginatedClients.length > limit;

  if (hasNextPage) {
    paginatedClients.pop();
  }

  const nextCursor = hasNextPage
    ? paginatedClients[paginatedClients.length - 1].id
    : null;

  const snakeCaseClients = paginatedClients.map(client => ({
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    status: client.status,
    created_at: client.createdAt,
  }));

  return NextResponse.json({
    data: snakeCaseClients,
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
    const data = clientSchema.parse(body);

    const newClient = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      ...data,
      createdAt: new Date().toISOString(),
    };

    db.clients.push(newClient);
    const responseClient = {
      id: newClient.id,
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      status: newClient.status,
      created_at: newClient.createdAt,
    };

    return NextResponse.json(responseClient, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodError(error);
    }
    return apiError("Internal Server Error", 500, "internal_server_error");
  }
}
