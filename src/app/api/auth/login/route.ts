import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loginSchema } from "@/schemas/login.schema";
import { z } from "zod";
import { apiError, zodError } from "@/utils/api-error";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = db.users.find((u) => u.email === email && u.password_hash === password);

    if (!user) {
      return apiError("Invalid credentials", 401, "invalid_credentials");
    }

    const access_token = `mock_access_token_${user.id}_${Date.now()}`;
    const refresh_token = `mock_refresh_token_${user.id}_${Date.now()}`;

    db.refreshTokens.push(refresh_token);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      access_token,
      refresh_token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return zodError(error);
    }
    return apiError("Invalid request", 400, "invalid_request");
  }
}
