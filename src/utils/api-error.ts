import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiError(message: string, status: number = 400, code: string = "custom_error") {
  return NextResponse.json(
    {
      errors: [
        {
          code,
          message,
          path: [],
          type: "manual",
        },
      ],
    },
    { status }
  );
}

export function zodError(error: ZodError) {
  return NextResponse.json({ errors: error.issues }, { status: 400 });
}
