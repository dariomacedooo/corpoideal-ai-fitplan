
// Enhanced nutrition calculator with WHO/FAO/UNU and scientific formulas

// Mifflin-St Jeor equation (most accurate for healthy adults)
export const calculateBMR = (weight: number, height: number, age: number, sex: string): number => {
  if (sex === 'masculino') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
};

// Cunningham equation for advanced athletes (uses lean body mass)
export const calculateBMRCunningham = (leanBodyMass: number): number => {
  return 500 + (22 * leanBodyMass);
};

// Activity factors based on WHO/FAO/UNU recommendations
export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activityFactors: { [key: string]: number } = {
    'sedentario': 1.2,     // Little or no exercise
    'leve': 1.375,         // Light exercise 1-3 days/week
    'moderado': 1.55,      // Moderate exercise 3-5 days/week
    'ativo': 1.725,        // Heavy exercise 6-7 days/week
    'muito-ativo': 1.9     // Very heavy exercise, 2x/day
  };
  
  return bmr * (activityFactors[activityLevel] || 1.55);
};

// Goal-based calorie adjustment
export const adjustCaloriesForGoal = (tdee: number, goal: string): number => {
  switch (goal) {
    case 'perder-peso':
      return tdee * 0.8; // 20% deficit for fat loss
    case 'ganhar-massa':
    case 'ganhar-peso':
      return tdee * 1.15; // 15% surplus for muscle gain
    case 'manter-peso':
    default:
      return tdee;
  }
};

// Scientific macronutrient distribution based on goal and biotipo
export const calculateMacros = (
  totalCalories: number, 
  weight: number, 
  goal: string, 
  biotipo: string,
  trainingExperience: string
): { protein: number; carbs: number; fat: number; proteinG: number; carbsG: number; fatG: number } => {
  
  let proteinGPerKg: number;
  let carbsGPerKg: number;
  let fatGPerKg: number;

  // Goal-based macronutrient distribution
  if (goal === 'ganhar-massa' || goal === 'ganhar-peso') {
    // Volume phase - Brad Schoenfeld recommendations
    proteinGPerKg = trainingExperience === 'avancado' ? 2.2 : 2.0;
    carbsGPerKg = biotipo === 'Ectomorfo' ? 6 : biotipo === 'Mesomorfo' ? 5 : 4;
    fatGPerKg = 1.0;
  } else if (goal === 'perder-peso') {
    // Definition phase - Higher protein to preserve muscle
    proteinGPerKg = trainingExperience === 'avancado' ? 2.5 : 2.2;
    carbsGPerKg = biotipo === 'Endomorfo' ? 3 : 4;
    fatGPerKg = 0.8;
  } else {
    // Maintenance
    proteinGPerKg = 2.0;
    carbsGPerKg = 4.5;
    fatGPerKg = 1.0;
  }

  const proteinG = proteinGPerKg * weight;
  const carbsG = carbsGPerKg * weight;
  const fatG = fatGPerKg * weight;

  // Calculate calories from macros
  const proteinCal = proteinG * 4;
  const carbsCal = carbsG * 4;
  const fatCal = fatG * 9;
  const totalMacroCal = proteinCal + carbsCal + fatCal;

  // Adjust proportionally to match total calories
  const adjustment = totalCalories / totalMacroCal;

  return {
    protein: Math.round((proteinCal / totalCalories) * 100),
    carbs: Math.round((carbsCal / totalCalories) * 100),
    fat: Math.round((fatCal / totalCalories) * 100),
    proteinG: Math.round(proteinG * adjustment),
    carbsG: Math.round(carbsG * adjustment),
    fatG: Math.round(fatG * adjustment)
  };
};

// Meal distribution based on scientific recommendations
export const distributeMeals = (totalCalories: number, proteinG: number): any => {
  const mealsCount = totalCalories > 2500 ? 6 : totalCalories > 2000 ? 5 : 4;
  const caloriesPerMeal = Math.round(totalCalories / mealsCount);
  const proteinPerMeal = Math.max(30, Math.round(proteinG / mealsCount)); // Minimum 30g per meal for optimal protein synthesis

  return {
    mealsCount,
    caloriesPerMeal,
    proteinPerMeal: Math.min(proteinPerMeal, 50) // Maximum 50g per meal for optimal absorption
  };
};
