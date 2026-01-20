import { Client } from "@/types/client";
import { NutritionPlan } from "@/types/plan";
import { User } from "@/types/auth";

const globalForDb = global as unknown as { mockDb: MockDatabase };

class MockDatabase {
  public clients: Client[] = [];
  public plans: NutritionPlan[] = [];
  public users: User[] = [];
  public refreshTokens: string[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    if (this.clients.length === 0) {
      this.clients = [
        {
          id: "1",
          userId: "nutri-1",
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "555-0101",
          status: "ACTIVE",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          userId: "nutri-2",
          name: "Bob Smith",
          email: "bob@example.com",
          phone: "555-0102",
          status: "INACTIVE",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    if (this.plans.length === 0) {
      this.plans = [
        {
          id: "1",
          userId: "nutri-1",
          clientId: "1",
          title: "Weight Loss Basic",
          description: "Standard plan for weight loss",
          calories: 1800,
          status: "ACTIVE",
        },
        {
          id: "2",
          userId: "nutri-1",
          clientId: "2",
          title: "Muscle Gain Pro",
          description: "High protein diet for athletes",
          calories: 3000,
          status: "DRAFT",
        },
        {
          id: "3",
          userId: "student-1",
          clientId: "2",
          title: "Weight Loss Basic",
          description: "Standard plan for weight loss",
          calories: 1800,
          status: "ACTIVE",
        },
      ];
    }

    if (this.users.length === 0) {
      this.users = [
        {
          id: "admin-1",
          name: "Admin User",
          email: "admin@ecowe.com.br",
          password_hash: "admin123",
          role: "ADMIN",
          created_at: new Date().toISOString(),
        },
        {
          id: "nutri-1",
          name: "Nutritionist User",
          email: "nutri@ecowe.com.br",
          password_hash: "nutri123",
          role: "NUTRITIONIST",
          created_at: new Date().toISOString(),
        },
        {
          id: "student-1",
          name: "Student User",
          email: "student@ecowe.com.br",
          password_hash: "student123",
          role: "STUDENT",
          created_at: new Date().toISOString(),
        },
      ];
    }
  }
}

export const db = globalForDb.mockDb || new MockDatabase();

if (process.env.NODE_ENV !== "production") globalForDb.mockDb = db;
