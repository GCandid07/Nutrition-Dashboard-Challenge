import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiError } from "@/utils/api-error";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const body = await request.json();
    const { refresh_token } = body;

    const tokenIndex = db.refreshTokens.indexOf(refresh_token);

    if (tokenIndex === -1) {
      return apiError("Invalid or expired refresh token", 401, "invalid_token");
    }

    db.refreshTokens.splice(tokenIndex, 1);

    const parts = refresh_token.split("_");
    const userId = parts[3];

    const new_access_token = `mock_access_token_${userId}_${Date.now()}`;
    const new_refresh_token = `mock_refresh_token_${userId}_${Date.now()}`;

    db.refreshTokens.push(new_refresh_token);

    return NextResponse.json({
      access_token: new_access_token,
      refresh_token: new_refresh_token,
    });
  } catch (error) {
    return apiError("Invalid request", 400, "invalid_request");
  }
}
