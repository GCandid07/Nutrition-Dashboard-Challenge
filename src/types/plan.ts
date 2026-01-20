export type PlanStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED';

export interface NutritionPlan {
  id: string;
  userId: string;
  clientId: string;
  title: string;
  description: string;
  calories: number;
  status: PlanStatus;
}
