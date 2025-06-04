
interface Meal {
  name: string;
  foods: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

interface DayPlan {
  day: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface WeeklyDietData {
  id: string;
  name: string;
  goal: string;
  budget: string;
  weekPlan: DayPlan[];
  tips: string[];
  supplements?: string[];
}
