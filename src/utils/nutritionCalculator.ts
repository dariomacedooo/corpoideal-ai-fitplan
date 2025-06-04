
import { Goal } from "@/types/Goal";

interface UserData {
  weight: number;
  height: number;
  age: number;
  gender: string;
  activityLevel: string;
  goal: Goal;
}

interface MacroTargets {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

interface MacroCalculationParams {
  calories: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatPercentage: number;
}

export function calculateBMR(weight: number, height: number, age: number, gender: string): number {
  // Mifflin-St Jeor formula (mais precisa para adultos saudáveis)
  if (gender === 'masculino') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  // Fatores de atividade baseados em evidências científicas
  const activityFactors = {
    'sedentario': 1.2,      // Pouco ou nenhum exercício
    'leve': 1.375,          // Exercício leve 1-3 dias/semana
    'moderado': 1.55,       // Exercício moderado 3-5 dias/semana
    'intenso': 1.725,       // Exercício intenso 6-7 dias/semana
    'muito-intenso': 1.9    // Exercício muito intenso, trabalho físico
  };
  
  return bmr * (activityFactors[activityLevel as keyof typeof activityFactors] || 1.55);
}

export function calculateCalorieGoal(tdee: number, goal: Goal): number {
  // Ajustes calóricos baseados no objetivo
  switch (goal) {
    case 'perder-peso':
      return tdee - 500; // Déficit de 500 kcal para perda de 0.5kg/semana
    case 'ganhar-massa':
      return tdee + 300; // Superávit moderado para ganho de massa magra
    case 'ganhar-peso':
      return tdee + 500; // Superávit maior para ganho de peso
    case 'manter-peso':
    default:
      return tdee; // Manutenção
  }
}

export function calculateMacroTargets(userData: UserData): MacroTargets {
  const bmr = calculateBMR(userData.weight, userData.height, userData.age, userData.gender);
  const tdee = calculateTDEE(bmr, userData.activityLevel);
  const calories = calculateCalorieGoal(tdee, userData.goal);
  
  // Macros baseados no objetivo e evidências científicas
  let proteinGrams: number;
  let carbsGrams: number;
  let fatGrams: number;
  
  if (userData.goal === 'ganhar-massa') {
    // Volume: proteína alta para síntese proteica
    proteinGrams = userData.weight * 2.2; // 2.2g/kg
    fatGrams = userData.weight * 1.0; // 1g/kg
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbsCalories = calories - proteinCalories - fatCalories;
    carbsGrams = carbsCalories / 4;
  } else if (userData.goal === 'perder-peso') {
    // Definição: proteína ainda mais alta para preservar massa magra
    proteinGrams = userData.weight * 2.5; // 2.5g/kg
    fatGrams = userData.weight * 0.8; // 0.8g/kg
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbsCalories = calories - proteinCalories - fatCalories;
    carbsGrams = Math.max(carbsCalories / 4, userData.weight * 2); // Mínimo 2g/kg
  } else {
    // Manutenção ou ganho de peso: distribuição equilibrada
    proteinGrams = userData.weight * 2.0; // 2g/kg
    fatGrams = userData.weight * 1.0; // 1g/kg
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const carbsCalories = calories - proteinCalories - fatCalories;
    carbsGrams = carbsCalories / 4;
  }
  
  return {
    protein: Math.round(proteinGrams),
    carbs: Math.round(carbsGrams),
    fat: Math.round(fatGrams),
    calories: Math.round(calories)
  };
}

export function calculateMacrosFromPercentages(params: MacroCalculationParams): MacroTargets {
  const { calories, proteinPercentage, carbsPercentage, fatPercentage } = params;
  
  // Converter percentuais em gramas
  const proteinCalories = (calories * proteinPercentage) / 100;
  const carbsCalories = (calories * carbsPercentage) / 100;
  const fatCalories = (calories * fatPercentage) / 100;
  
  const protein = Math.round(proteinCalories / 4); // 4 kcal/g
  const carbs = Math.round(carbsCalories / 4); // 4 kcal/g
  const fat = Math.round(fatCalories / 9); // 9 kcal/g
  
  return {
    protein,
    carbs,
    fat,
    calories: Math.round(calories)
  };
}

// Função auxiliar para estimar valores nutricionais (compatibilidade com código existente)
export function estimateNutritionValues(calories: number, protein: number, carbs: number, fat: number) {
  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat)
  };
}

// Função para calcular necessidade de água baseada no peso e atividade
export function calculateWaterIntake(weight: number, activityLevel: string = 'moderate'): number {
  // Base: 35ml/kg de peso corporal
  let baseWater = weight * 35;
  
  // Ajustes para atividade física
  const activityMultipliers = {
    'sedentary': 1.0,
    'light': 1.1,
    'moderate': 1.2,
    'intense': 1.4,
    'very-intense': 1.6
  };
  
  const multiplier = activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2;
  
  // Ajuste para clima quente do Ceará (+500ml)
  const cearaAdjustment = 500;
  
  return Math.round(baseWater * multiplier + cearaAdjustment);
}

// Função para distribuir refeições ao longo do dia
export function distributeMeals(totalCalories: number, totalProtein: number, mealsCount: number = 5) {
  const caloriesPerMeal = Math.round(totalCalories / mealsCount);
  const proteinPerMeal = Math.round(totalProtein / mealsCount);
  
  return {
    caloriesPerMeal,
    proteinPerMeal,
    mealsCount
  };
}
