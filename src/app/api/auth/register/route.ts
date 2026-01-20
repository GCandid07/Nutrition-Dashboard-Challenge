import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registerSchema } from "@/schemas/register.schema";
import { z } from "zod";
import { apiError, zodError } from "@/utils/api-error";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    const existingUser = db.users.find((u) => u.email === data.email);
    if (existingUser) {
      return apiError("User already exists", 409, "user_exists");
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      password_hash: data.password,
      role: data.role as "NUTRITIONIST" | "STUDENT",
      created_at: new Date().toISOString(),
    };

    db.users.push(newUser);

    return NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      message: "User created successfully. Please login.",
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodError(error);
    }
    return apiError("Invalid request", 400, "invalid_request");
  }
}
