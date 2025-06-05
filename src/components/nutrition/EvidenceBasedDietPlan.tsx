
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, DollarSign, Target } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  calculateBMR, 
  calculateTotalDailyEnergyExpenditure, 
  calculateEvidenceBasedNutrition,
  calculateMealNutrition,
  MEAL_DISTRIBUTION,
  EVIDENCE_BASED_MACROS
} from "@/utils/nutritionCalculator";

interface EvidenceBasedDietPlanProps {
  userProfile: {
    weight?: string;
    height?: string;
    age?: string;
    sex?: string;
    goal?: string;
    budget?: string;
    lifestyle?: string;
  };
}

interface MealPlan {
  name: string;
  foods: Array<{
    name: string;
    portion: string;
    protein: number;
    calories: number;
  }>;
  totalCalories: number;
  totalProtein: number;
  time: string;
}

export function EvidenceBasedDietPlan({ userProfile }: EvidenceBasedDietPlanProps) {
  const [dailyPlan, setDailyPlan] = useState<MealPlan[]>([]);
  const [totalNutrition, setTotalNutrition] = useState<any>(null);
  const [budgetTier, setBudgetTier] = useState<string>('medium');

  useEffect(() => {
    if (userProfile.weight && userProfile.height && userProfile.age) {
      generateEvidenceBasedDiet();
    }
  }, [userProfile]);

  const generateEvidenceBasedDiet = () => {
    const weight = parseFloat(userProfile.weight || "70");
    const height = parseFloat(userProfile.height || "170");
    const age = parseFloat(userProfile.age || "30");
    const gender = userProfile.sex || "masculino";
    const goal = userProfile.goal || "manter-peso";
    const activityLevel = userProfile.lifestyle || "moderado";
    const budget = userProfile.budget || "301-500";

    // Determine budget tier
    let tier = 'medium';
    if (budget === '100-300') tier = 'low';
    else if (budget === '801+') tier = 'high';
    setBudgetTier(tier);

    // Calculate nutrition requirements
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTotalDailyEnergyExpenditure(bmr, activityLevel);
    const nutrition = calculateEvidenceBasedNutrition(weight, tdee, goal);

    setTotalNutrition({
      ...nutrition,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goal,
      prescription: EVIDENCE_BASED_MACROS[goal]
    });

    // Generate meal plans based on evidence-based distribution
    const meals: MealPlan[] = [];

    Object.entries(MEAL_DISTRIBUTION).forEach(([mealType, distribution]) => {
      const mealNutrition = calculateMealNutrition(nutrition.calories, nutrition.protein, mealType as keyof typeof MEAL_DISTRIBUTION);
      const meal = generateMealPlan(mealType, mealNutrition, tier, goal);
      meals.push(meal);
    });

    setDailyPlan(meals);
  };

  const generateMealPlan = (
    mealType: string, 
    mealNutrition: { calories: number; protein: number },
    budgetTier: string,
    goal: string
  ): MealPlan => {
    const mealTimes: Record<string, string> = {
      'cafe': '7:00 - 8:30',
      'lanche-manha': '10:00 - 10:30',
      'almoco': '12:00 - 13:30',
      'lanche-tarde': '15:30 - 16:30',
      'jantar': '19:00 - 20:00'
    };

    const mealNames: Record<string, string> = {
      'cafe': 'Café da Manhã',
      'lanche-manha': 'Lanche da Manhã',
      'almoco': 'Almoço',
      'lanche-tarde': 'Lanche da Tarde',
      'jantar': 'Jantar'
    };

    // Food suggestions based on budget and goal
    const foodOptions = getFoodOptionsByBudgetAndGoal(mealType, budgetTier, goal);
    
    // Select foods to meet nutrition targets
    const selectedFoods = selectFoodsForMeal(foodOptions, mealNutrition);

    return {
      name: mealNames[mealType] || mealType,
      foods: selectedFoods,
      totalCalories: mealNutrition.calories,
      totalProtein: mealNutrition.protein,
      time: mealTimes[mealType] || ''
    };
  };

  const getFoodOptionsByBudgetAndGoal = (mealType: string, budgetTier: string, goal: string) => {
    const baseFoods: Record<string, any> = {
      'cafe': {
        low: [
          { name: 'Ovos mexidos', protein: 12, calories: 140, cost: 'baixo' },
          { name: 'Pão integral', protein: 3, calories: 80, cost: 'baixo' },
          { name: 'Banana', protein: 1, calories: 105, cost: 'baixo' },
          { name: 'Café preto', protein: 0, calories: 5, cost: 'baixo' }
        ],
        medium: [
          { name: 'Ovos mexidos', protein: 12, calories: 140, cost: 'baixo' },
          { name: 'Aveia', protein: 5, calories: 150, cost: 'médio' },
          { name: 'Whey protein', protein: 24, calories: 120, cost: 'médio' },
          { name: 'Frutas vermelhas', protein: 1, calories: 60, cost: 'médio' }
        ],
        high: [
          { name: 'Claras de ovo', protein: 18, calories: 100, cost: 'alto' },
          { name: 'Quinoa', protein: 6, calories: 180, cost: 'alto' },
          { name: 'Whey isolado', protein: 25, calories: 110, cost: 'alto' },
          { name: 'Açaí orgânico', protein: 2, calories: 120, cost: 'alto' }
        ]
      },
      'almoco': {
        low: [
          { name: 'Peito de frango', protein: 25, calories: 165, cost: 'baixo' },
          { name: 'Arroz integral', protein: 3, calories: 130, cost: 'baixo' },
          { name: 'Feijão', protein: 8, calories: 120, cost: 'baixo' },
          { name: 'Salada verde', protein: 2, calories: 20, cost: 'baixo' }
        ],
        medium: [
          { name: 'Peito de frango', protein: 25, calories: 165, cost: 'baixo' },
          { name: 'Batata doce', protein: 2, calories: 100, cost: 'médio' },
          { name: 'Brócolis', protein: 3, calories: 25, cost: 'médio' },
          { name: 'Azeite de oliva', protein: 0, calories: 40, cost: 'médio' }
        ],
        high: [
          { name: 'Salmão', protein: 25, calories: 200, cost: 'alto' },
          { name: 'Quinoa', protein: 6, calories: 180, cost: 'alto' },
          { name: 'Aspargos', protein: 3, calories: 20, cost: 'alto' },
          { name: 'Azeite extra virgem', protein: 0, calories: 40, cost: 'alto' }
        ]
      }
    };

    // Add goal-specific modifications
    if (goal === 'ganhar-massa') {
      // Add more calorie-dense foods for bulking
      baseFoods[mealType]?.[budgetTier]?.push(
        { name: 'Castanhas', protein: 4, calories: 160, cost: budgetTier === 'low' ? 'médio' : 'baixo' }
      );
    } else if (goal === 'perder-peso') {
      // Focus on high-protein, low-calorie foods for cutting
      baseFoods[mealType]?.[budgetTier] = baseFoods[mealType]?.[budgetTier]?.filter(food => 
        food.protein > 0 && food.calories < 200
      );
    }

    return baseFoods[mealType]?.[budgetTier] || [];
  };

  const selectFoodsForMeal = (foodOptions: any[], target: { calories: number; protein: number }) => {
    const selected = [];
    let remainingCalories = target.calories;
    let remainingProtein = target.protein;

    // Prioritize protein-rich foods first
    const proteinFoods = foodOptions.filter(food => food.protein > 5).sort((a, b) => b.protein - a.protein);
    const otherFoods = foodOptions.filter(food => food.protein <= 5);

    // Add protein sources
    for (const food of proteinFoods) {
      if (remainingProtein > 10 && remainingCalories > food.calories) {
        const portion = Math.min(2, Math.ceil(remainingProtein / food.protein));
        selected.push({
          name: food.name,
          portion: `${portion > 1 ? portion + ' ' : ''}${portion > 1 ? 'unidades' : 'unidade'}`,
          protein: food.protein * portion,
          calories: food.calories * portion
        });
        remainingCalories -= food.calories * portion;
        remainingProtein -= food.protein * portion;
      }
    }

    // Add complementary foods
    for (const food of otherFoods) {
      if (remainingCalories > 50) {
        const portion = Math.min(2, Math.ceil(remainingCalories / food.calories));
        selected.push({
          name: food.name,
          portion: `${portion > 1 ? portion + ' ' : ''}${portion > 1 ? 'unidades' : 'unidade'}`,
          protein: food.protein * portion,
          calories: food.calories * portion
        });
        remainingCalories -= food.calories * portion;
      }
    }

    return selected;
  };

  const getBudgetLabel = (budget: string) => {
    const labels: Record<string, string> = {
      '100-300': 'R$100-R$300',
      '301-500': 'R$301-R$500',
      '501-800': 'R$501-R$800',
      '801+': 'Acima de R$800'
    };
    return labels[budget] || budget;
  };

  const getGoalLabel = (goal: string) => {
    const labels: Record<string, string> = {
      'ganhar-massa': 'Ganho de Massa (Bulking)',
      'perder-peso': 'Perda de Peso (Cutting)',
      'manter-peso': 'Manutenção',
      'ganhar-peso': 'Ganho de Peso'
    };
    return labels[goal] || goal;
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Utensils className="h-5 w-5 mr-2" />
          Plano Alimentar Baseado em Evidências
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-corpoideal-purple/10 text-corpoideal-purple border-0">
            <Target className="h-3 w-3 mr-1" />
            {getGoalLabel(userProfile.goal || '')}
          </Badge>
          <Badge variant="outline">
            <DollarSign className="h-3 w-3 mr-1" />
            {getBudgetLabel(userProfile.budget || '')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {totalNutrition && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertTitle>Prescrição Científica</AlertTitle>
            <AlertDescription>
              {totalNutrition.prescription?.proteinPerKg}g/kg proteína • {totalNutrition.prescription?.carbsPerKg}g/kg carboidratos • {totalNutrition.prescription?.fatPerKg}g/kg gordura
              <br />
              Total: {totalNutrition.calories} kcal | {totalNutrition.protein}g proteína | {totalNutrition.carbs}g carbos | {totalNutrition.fat}g gordura
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {dailyPlan.map((meal, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-lg">{meal.name}</h4>
                <div className="flex items-center gap-2">
                  <Badge className="bg-corpoideal-purple/10 text-corpoideal-purple border-0">
                    {meal.totalCalories} kcal
                  </Badge>
                  <Badge variant="outline" className="text-xs">{meal.time}</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                {meal.foods.map((food, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border">
                    <span className="font-medium">{food.name}</span>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{food.portion}</div>
                      <div className="text-xs text-corpoideal-purple">
                        {food.calories} kcal • {food.protein}g proteína
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total da refeição:</span>
                  <span className="font-medium">{meal.totalCalories} kcal • {meal.totalProtein}g proteína</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalNutrition && (
          <div className="mt-6 p-4 bg-corpoideal-purple/5 rounded-lg border border-corpoideal-purple/20">
            <h4 className="font-medium text-corpoideal-purple mb-2">Resumo Nutricional Diário</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-corpoideal-purple">{totalNutrition.calories}</div>
                <div className="text-xs text-gray-500">Calorias</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-corpoideal-purple">{totalNutrition.protein}g</div>
                <div className="text-xs text-gray-500">Proteínas</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-corpoideal-purple">{totalNutrition.carbs}g</div>
                <div className="text-xs text-gray-500">Carboidratos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-corpoideal-purple">{totalNutrition.fat}g</div>
                <div className="text-xs text-gray-500">Gorduras</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
