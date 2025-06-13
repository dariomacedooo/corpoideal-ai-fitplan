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

import { getUsdaNutritionalInfo } from '../services/foodApi';
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

export const estimateNutritionValues = async (foodName: string, portion: string): Promise<NutritionValues | null> => {
  // Normalize food name for lookup
  const normalizedName = foodName.toLowerCase();

  // Attempt to fetch nutritional data from Open Food Facts API
  const apiNutrition = await getUsdaNutritionalInfo(foodName);

  let baseNutrition: NutritionValues | null = null;

  if (apiNutrition) {
    baseNutrition = apiNutrition;
  } else {
    // If API fails or no data, fall back to local FOOD_DATABASE
    for (const [key, nutrition] of Object.entries(FOOD_DATABASE)) {
      if (normalizedName.includes(key)) {
        baseNutrition = nutrition;
        break;
      }
    }
  }

  // If no nutritional data is found from either source, return null
  if (!baseNutrition) {
    return null;
  }

  // Extract quantity and unit from portion
  let quantity = 1;
  let unit = 'g'; // Assume grams by default if not specified

  const portionMatch = portion.match(/(\d+(?:\.\d+)?)\s*(\w+)?/);
  if (portionMatch) {
    quantity = parseFloat(portionMatch[1]);
    if (portionMatch[2]) {
      unit = portionMatch[2].toLowerCase();
    }
  }

  // Convert portion to grams multiplier based on 100g data
  let gramsMultiplier = 1;

  if (unit === 'g' || unit === 'gramas') {
    gramsMultiplier = quantity / 100;
  } else {
    // For other units, we still rely on estimation or average weights per unit.
    // This part could be further improved by using API data if available for units.
    switch (unit) {
      case 'unidade':
      case 'unidades':
        // Simple estimation for common items if no API data had unit info
        if (normalizedName.includes('ovo')) gramsMultiplier = (quantity * 50) / 100;
        else if (normalizedName.includes('banana')) gramsMultiplier = (quantity * 120) / 100;
        else if (normalizedName.includes('maçã')) gramsMultiplier = (quantity * 150) / 100;
        else if (normalizedName.includes('pão')) gramsMultiplier = (quantity * 50) / 100;
        else gramsMultiplier = (quantity * 100) / 100; // Default estimation if unit is 'unidade'
        break;
      case 'colher':
      case 'colheres':
        gramsMultiplier = (quantity * 15) / 100; // 15g per tablespoon estimation
        break;
      // Add more unit conversions as needed
      default:
        gramsMultiplier = quantity / 100; // Fallback to assuming quantity is in grams per 100g
    }
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

// Updated budget-based food suggestions for Brazilian reality
const getFoodOptionsByBudgetAndGoal = (mealType: string, budgetTier: string, goal: string) => {
  const baseFoods: Record<string, any> = {
    'cafe': {
      'low': [ // R$ 80-150: foco em alimentos básicos e baratos
        { name: 'Ovos mexidos (2 unidades)', protein: 12, calories: 140, cost: 'baixo' },
        { name: 'Pão francês (2 unidades)', protein: 4, calories: 140, cost: 'baixo' },
        { name: 'Banana (1 unidade)', protein: 1, calories: 105, cost: 'baixo' },
        { name: 'Café preto', protein: 0, calories: 5, cost: 'baixo' },
        { name: 'Leite (200ml)', protein: 6, calories: 120, cost: 'baixo' }
      ],
      'medium': [ // R$ 151-250: incluindo aveia e whey básico
        { name: 'Ovos mexidos (3 unidades)', protein: 18, calories: 210, cost: 'baixo' },
        { name: 'Aveia (40g)', protein: 5, calories: 150, cost: 'médio' },
        { name: 'Whey protein (30g)', protein: 24, calories: 120, cost: 'médio' },
        { name: 'Banana (1 unidade)', protein: 1, calories: 105, cost: 'baixo' },
        { name: 'Leite (200ml)', protein: 6, calories: 120, cost: 'baixo' }
      ],
      'high': [ // R$ 251-400: alimentos mais variados
        { name: 'Clara de ovo (4 unidades)', protein: 16, calories: 80, cost: 'médio' },
        { name: 'Aveia (50g)', protein: 6, calories: 190, cost: 'médio' },
        { name: 'Whey isolado (30g)', protein: 25, calories: 110, cost: 'alto' },
        { name: 'Frutas vermelhas (100g)', protein: 1, calories: 60, cost: 'alto' },
        { name: 'Castanha do Brasil (4 unidades)', protein: 3, calories: 80, cost: 'alto' }
      ],
      'premium': [ // R$ 400+: alimentos premium
        { name: 'Clara de ovo orgânica (5 unidades)', protein: 20, calories: 100, cost: 'alto' },
        { name: 'Quinoa (40g)', protein: 6, calories: 180, cost: 'alto' },
        { name: 'Whey hidrolisado (30g)', protein: 26, calories: 115, cost: 'alto' },
        { name: 'Açaí natural (100g)', protein: 2, calories: 120, cost: 'alto' },
        { name: 'Chia (15g)', protein: 2, calories: 75, cost: 'alto' }
      ]
    },
    'almoco': {
      'low': [ // R$ 80-150
        { name: 'Peito de frango (100g)', protein: 25, calories: 165, cost: 'baixo' },
        { name: 'Arroz branco (80g)', protein: 3, calories: 130, cost: 'baixo' },
        { name: 'Feijão carioca (60g)', protein: 8, calories: 120, cost: 'baixo' },
        { name: 'Salada verde simples', protein: 2, calories: 20, cost: 'baixo' },
        { name: 'Óleo de soja (5ml)', protein: 0, calories: 40, cost: 'baixo' }
      ],
      'medium': [ // R$ 151-250
        { name: 'Peito de frango (120g)', protein: 30, calories: 200, cost: 'baixo' },
        { name: 'Arroz integral (80g)', protein: 3, calories: 130, cost: 'médio' },
        { name: 'Feijão preto (60g)', protein: 8, calories: 120, cost: 'baixo' },
        { name: 'Brócolis refogado (100g)', protein: 3, calories: 25, cost: 'médio' },
        { name: 'Azeite de oliva (10ml)', protein: 0, calories: 80, cost: 'médio' }
      ],
      'high': [ // R$ 251-400
        { name: 'Filé de tilápia (150g)', protein: 30, calories: 180, cost: 'médio' },
        { name: 'Batata doce (120g)', protein: 2, calories: 100, cost: 'médio' },
        { name: 'Quinoa (50g)', protein: 6, calories: 180, cost: 'alto' },
        { name: 'Aspargos grelhados (100g)', protein: 3, calories: 20, cost: 'alto' },
        { name: 'Azeite extra virgem (10ml)', protein: 0, calories: 80, cost: 'alto' }
      ],
      'premium': [ // R$ 400+
        { name: 'Salmão (120g)', protein: 25, calories: 200, cost: 'alto' },
        { name: 'Arroz integral orgânico (80g)', protein: 3, calories: 130, cost: 'alto' },
        { name: 'Quinoa tricolor (60g)', protein: 7, calories: 220, cost: 'alto' },
        { name: 'Mix de vegetais orgânicos', protein: 4, calories: 30, cost: 'alto' },
        { name: 'Azeite extravirgem premium (10ml)', protein: 0, calories: 80, cost: 'alto' }
      ]
    },
    'lanche-tarde': {
      'low': [ // R$ 80-150
        { name: 'Iogurte natural (150g)', protein: 6, calories: 90, cost: 'baixo' },
        { name: 'Banana (1 unidade)', protein: 1, calories: 105, cost: 'baixo' },
        { name: 'Pão integral (2 fatias)', protein: 6, calories: 160, cost: 'médio' }
      ],
      'medium': [ // R$ 151-250
        { name: 'Iogurte grego (150g)', protein: 15, calories: 130, cost: 'médio' },
        { name: 'Granola caseira (30g)', protein: 3, calories: 140, cost: 'médio' },
        { name: 'Whey protein (20g)', protein: 16, calories: 80, cost: 'médio' }
      ],
      'high': [ // R$ 251-400
        { name: 'Iogurte grego zero (150g)', protein: 15, calories: 90, cost: 'médio' },
        { name: 'Mix de castanhas (20g)', protein: 4, calories: 140, cost: 'alto' },
        { name: 'Whey isolado (20g)', protein: 17, calories: 75, cost: 'alto' }
      ],
      'premium': [ // R$ 400+
        { name: 'Iogurte grego orgânico (150g)', protein: 15, calories: 90, cost: 'alto' },
        { name: 'Castanhas premium (25g)', protein: 5, calories: 160, cost: 'alto' },
        { name: 'Whey hidrolisado (20g)', protein: 18, calories: 75, cost: 'alto' }
      ]
    }
  };

  // Determine budget tier from the new values
  let tier = 'low';
  if (budgetTier === '151-250') tier = 'medium';
  else if (budgetTier === '251-400') tier = 'high';
  else if (budgetTier === '400+') tier = 'premium';

  // Add goal-specific modifications
  if (goal === 'ganhar-massa') {
    // Add more calorie-dense foods for bulking
    const mealFoods = baseFoods[mealType];
    if (mealFoods && mealFoods[tier]) {
      if (tier === 'low') {
        mealFoods[tier].push(
          { name: 'Amendoim (20g)', protein: 5, calories: 120, cost: 'baixo' }
        );
      } else {
        mealFoods[tier].push(
          { name: 'Mix de oleaginosas (25g)', protein: 6, calories: 160, cost: 'médio' }
        );
      }
    }
  } else if (goal === 'perder-peso') {
    // Focus on high-protein, low-calorie foods for cutting
    const mealFoods = baseFoods[mealType];
    if (mealFoods && mealFoods[tier]) {
      baseFoods[mealType][tier] = mealFoods[tier].filter(food => 
        food.protein > 0 && food.calories < 200
      );
    }
  }

  const mealFoods = baseFoods[mealType];
  return mealFoods && mealFoods[tier] ? mealFoods[tier] : [];
};
