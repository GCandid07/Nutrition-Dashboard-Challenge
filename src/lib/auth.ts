import { db } from "@/lib/db";

export function getAuthenticatedUserId(request: Request): string | null {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  if (!token.startsWith("mock_access_token_")) {
    return null;
  }

  const parts = token.split("_");
  if (parts.length < 4) {
    return null;
  }

  const userId = parts[3];
  const userExists = db.users.some(u => u.id === userId);

  return userExists ? userId : null;
}

export function isAuthenticated(request: Request): boolean {
  return getAuthenticatedUserId(request) !== null;
}
