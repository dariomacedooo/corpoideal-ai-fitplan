
// Utility functions for accurate nutrition calculations
import { 
  calculateMifflinStJeor, 
  calculateCunningham, 
  calculateTDEE as calculateTDEEFromAnthropometric,
  performAnthropometricAnalysis,
  formatAnthropometricResults,
  type AnthropometricData 
} from './anthropometricCalculations';

export interface NutritionValues {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Macronutrient ratios based on scientific evidence
export interface MacronutrientPrescription {
  proteinPerKg: number;
  carbsPerKg: number;
  fatPerKg: number;
  calorieAdjustment: number; // kcal to add/subtract from TDEE
}

export const EVIDENCE_BASED_MACROS: Record<string, MacronutrientPrescription> = {
  'ganhar-massa': {
    proteinPerKg: 2.0,
    carbsPerKg: 5.5,
    fatPerKg: 1.0,
    calorieAdjustment: 300
  },
  'perder-peso': {
    proteinPerKg: 2.4,
    carbsPerKg: 3.5,
    fatPerKg: 0.8,
    calorieAdjustment: -400
  },
  'manter-peso': {
    proteinPerKg: 2.2,
    carbsPerKg: 4.5,
    fatPerKg: 0.9,
    calorieAdjustment: 0
  },
  'ganhar-peso': {
    proteinPerKg: 2.0,
    carbsPerKg: 5.5,
    fatPerKg: 1.0,
    calorieAdjustment: 300
  }
};

// Meal distribution based on scientific evidence
export const MEAL_DISTRIBUTION = {
  'cafe': { caloriePercent: 0.25, proteinPercent: 0.20 },
  'lanche-manha': { caloriePercent: 0.10, proteinPercent: 0.15 },
  'almoco': { caloriePercent: 0.30, proteinPercent: 0.25 },
  'lanche-tarde': { caloriePercent: 0.15, proteinPercent: 0.20 },
  'jantar': { caloriePercent: 0.20, proteinPercent: 0.20 }
};

// Food database with accurate nutrition per 100g
const FOOD_DATABASE: Record<string, NutritionValues> = {
  // Proteins
  'frango': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'peito de frango': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'ovo': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  'peixe': { calories: 206, protein: 22, carbs: 0, fat: 12 },
  'salmão': { calories: 208, protein: 20, carbs: 0, fat: 13 },
  'carne': { calories: 250, protein: 26, carbs: 0, fat: 17 },
  'tofu': { calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },
  
  // Carbs
  'arroz': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  'batata': { calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  'batata doce': { calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  'pão': { calories: 265, protein: 9, carbs: 49, fat: 3.2 },
  'quinoa': { calories: 120, protein: 4.4, carbs: 22, fat: 1.9 },
  'feijão': { calories: 127, protein: 9, carbs: 23, fat: 0.5 },
  
  // Fruits
  'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  'maçã': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  'laranja': { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  
  // Vegetables
  'salada': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
  'legumes': { calories: 35, protein: 2, carbs: 7, fat: 0.2 },
  'brócolis': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  
  // Dairy
  'iogurte': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  'queijo': { calories: 113, protein: 25, carbs: 4.1, fat: 0.2 },
  'leite': { calories: 42, protein: 3.4, carbs: 5, fat: 1 },
  
  // Others
  'whey': { calories: 400, protein: 80, carbs: 6, fat: 4 },
  'aveia': { calories: 389, protein: 17, carbs: 66, fat: 7 },
  'castanhas': { calories: 654, protein: 15, carbs: 12, fat: 66 },
};

// Calculate evidence-based nutrition prescription
export const calculateEvidenceBasedNutrition = (
  weight: number,
  tdee: number,
  goal: string
): { calories: number; protein: number; carbs: number; fat: number } => {
  const prescription = EVIDENCE_BASED_MACROS[goal] || EVIDENCE_BASED_MACROS['manter-peso'];
  
  // Calculate total calories
  const totalCalories = tdee + prescription.calorieAdjustment;
  
  // Calculate macros based on body weight (scientific approach)
  const proteinGrams = Math.round(weight * prescription.proteinPerKg);
  const carbsGrams = Math.round(weight * prescription.carbsPerKg);
  const fatGrams = Math.round(weight * prescription.fatPerKg);
  
  return {
    calories: Math.round(totalCalories),
    protein: proteinGrams,
    carbs: carbsGrams,
    fat: fatGrams
  };
};

// Calculate meal-specific nutrition
export const calculateMealNutrition = (
  totalCalories: number,
  totalProtein: number,
  mealType: keyof typeof MEAL_DISTRIBUTION
) => {
  const distribution = MEAL_DISTRIBUTION[mealType];
  
  return {
    calories: Math.round(totalCalories * distribution.caloriePercent),
    protein: Math.round(totalProtein * distribution.proteinPercent)
  };
};

export const estimateNutritionValues = (foodName: string, portion: string): NutritionValues => {
  // Normalize food name for lookup
  const normalizedName = foodName.toLowerCase();
  
  // Extract quantity from portion
  let quantity = 1;
  let unit = 'unidade';
  
  // Parse portion string
  const portionMatch = portion.match(/(\d+(?:\.\d+)?)\s*(\w+)/);
  if (portionMatch) {
    quantity = parseFloat(portionMatch[1]);
    unit = portionMatch[2].toLowerCase();
  }
  
  // Find matching food in database
  let baseNutrition: NutritionValues = { calories: 100, protein: 5, carbs: 10, fat: 5 };
  
  for (const [key, nutrition] of Object.entries(FOOD_DATABASE)) {
    if (normalizedName.includes(key)) {
      baseNutrition = nutrition;
      break;
    }
  }
  
  // Convert portion to grams
  let gramsMultiplier = 1;
  
  switch (unit) {
    case 'g':
    case 'gramas':
      gramsMultiplier = quantity / 100; // Database is per 100g
      break;
    case 'unidade':
    case 'unidades':
      // Estimate weight based on food type
      if (normalizedName.includes('ovo')) gramsMultiplier = (quantity * 50) / 100;
      else if (normalizedName.includes('banana')) gramsMultiplier = (quantity * 120) / 100;
      else if (normalizedName.includes('maçã')) gramsMultiplier = (quantity * 150) / 100;
      else if (normalizedName.includes('pão')) gramsMultiplier = (quantity * 50) / 100;
      else gramsMultiplier = (quantity * 100) / 100;
      break;
    case 'colher':
    case 'colheres':
      gramsMultiplier = (quantity * 15) / 100; // 15g per tablespoon
      break;
    case 'xícara':
    case 'xícaras':
      gramsMultiplier = (quantity * 200) / 100; // 200g per cup
      break;
    case 'copo':
    case 'copos':
      gramsMultiplier = (quantity * 240) / 100; // 240ml per glass
      break;
    case 'scoop':
      gramsMultiplier = (quantity * 30) / 100; // 30g per scoop
      break;
    case 'punhado':
      gramsMultiplier = (quantity * 30) / 100; // 30g per handful
      break;
    default:
      gramsMultiplier = quantity / 100;
  }
  
  // Calculate final nutrition values
  return {
    calories: Math.round(baseNutrition.calories * gramsMultiplier),
    protein: Math.round(baseNutrition.protein * gramsMultiplier * 10) / 10,
    carbs: Math.round(baseNutrition.carbs * gramsMultiplier * 10) / 10,
    fat: Math.round(baseNutrition.fat * gramsMultiplier * 10) / 10,
  };
};

// Calculate BMR using Mifflin-St Jeor Equation (mais precisa)
export const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  return calculateMifflinStJeor(weight, height, age, gender);
};

// Calculate TDEE with improved accuracy (renamed to avoid conflict)
export const calculateTotalDailyEnergyExpenditure = (bmr: number, activityLevel: string): number => {
  return calculateTDEEFromAnthropometric(bmr, activityLevel);
};

// Adjust calories based on goal with scientific approach
export const adjustCaloriesForGoal = (tdee: number, goal: string): number => {
  const prescription = EVIDENCE_BASED_MACROS[goal] || EVIDENCE_BASED_MACROS['manter-peso'];
  return tdee + prescription.calorieAdjustment;
};

// Calculate macros based on goal and body composition
export const calculateMacros = (calories: number, goal: string, weight: number) => {
  const prescription = EVIDENCE_BASED_MACROS[goal] || EVIDENCE_BASED_MACROS['manter-peso'];
  
  return {
    protein: Math.round(weight * prescription.proteinPerKg),
    carbs: Math.round(weight * prescription.carbsPerKg),
    fat: Math.round(weight * prescription.fatPerKg)
  };
};

// Comprehensive anthropometric analysis
export const getComprehensiveAnalysis = (userData: {
  height: string;
  weight: string;
  age: string;
  sex: string;
  bodyFat?: string;
  lifestyle: string;
  chest?: string;
  waist?: string;
  hips?: string;
  leftArm?: string;
  rightArm?: string;
  leftThigh?: string;
  rightThigh?: string;
  leftCalf?: string;
  rightCalf?: string;
}) => {
  const anthropometricData: AnthropometricData = {
    height: parseInt(userData.height),
    weight: parseInt(userData.weight),
    age: parseInt(userData.age),
    sex: userData.sex as 'masculino' | 'feminino',
    bodyFat: userData.bodyFat ? parseFloat(userData.bodyFat) : undefined,
    activityLevel: userData.lifestyle as any,
    chest: userData.chest ? parseFloat(userData.chest) : undefined,
    waist: userData.waist ? parseFloat(userData.waist) : undefined,
    hips: userData.hips ? parseFloat(userData.hips) : undefined,
    leftArm: userData.leftArm ? parseFloat(userData.leftArm) : undefined,
    rightArm: userData.rightArm ? parseFloat(userData.rightArm) : undefined,
    leftThigh: userData.leftThigh ? parseFloat(userData.leftThigh) : undefined,
    rightThigh: userData.rightThigh ? parseFloat(userData.rightThigh) : undefined,
    leftCalf: userData.leftCalf ? parseFloat(userData.leftCalf) : undefined,
    rightCalf: userData.rightCalf ? parseFloat(userData.rightCalf) : undefined,
  };
  
  return performAnthropometricAnalysis(anthropometricData);
};

// Re-export formatAnthropometricResults from anthropometricCalculations
export { formatAnthropometricResults };
