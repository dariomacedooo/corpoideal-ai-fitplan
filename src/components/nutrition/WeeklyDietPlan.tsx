
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, DollarSign, Target, Utensils } from "lucide-react";
import { estimateNutritionValues } from "@/utils/nutritionCalculator";

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

interface WeeklyDietData {
  id: string;
  name: string;
  goal: string;
  budget: string;
  weekPlan: DayPlan[];
  tips: string[];
  supplements?: string[];
}

interface WeeklyDietPlanProps {
  dietData: WeeklyDietData;
  userGoal?: string;
}

export function WeeklyDietPlan({ dietData, userGoal }: WeeklyDietPlanProps) {
  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'ganhar-massa': return 'bg-green-500';
      case 'perder-peso': return 'bg-red-500';
      case 'ganhar-peso': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getGoalText = (goal: string) => {
    switch (goal) {
      case 'ganhar-massa': return 'Ganho de Massa';
      case 'perder-peso': return 'Perda de Peso';
      case 'ganhar-peso': return 'Ganho de Peso';
      default: return 'Manutenção';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-corpoideal-purple/20">
        <CardHeader className="bg-gradient-to-r from-corpoideal-purple/10 to-blue-50">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-xl text-corpoideal-purple flex items-center">
              <Utensils className="h-5 w-5 mr-2" />
              {dietData.name}
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={`${getGoalColor(dietData.goal)} text-white`}>
                <Target className="h-3 w-3 mr-1" />
                {getGoalText(dietData.goal)}
              </Badge>
              <Badge variant="outline">
                <DollarSign className="h-3 w-3 mr-1" />
                {dietData.budget}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Weekly Plan */}
      {dietData.weekPlan.map((day, index) => {
        // Use estimateNutritionValues with 4 parameters instead of nutritionValues calculation
        const nutritionValues = estimateNutritionValues(
          day.totalCalories,
          day.totalProtein,
          day.totalCarbs,
          day.totalFat
        );

        return (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-gray-50 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center text-corpoideal-purple">
                  <Calendar className="h-4 w-4 mr-2" />
                  {day.day}
                </h3>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{day.totalCalories} kcal</span> • 
                  <span className="ml-1">{day.totalProtein}g proteína</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {day.meals.map((meal, mealIndex) => {
                  // Use estimateNutritionValues with 4 parameters for each meal
                  const mealNutrition = estimateNutritionValues(
                    meal.calories,
                    meal.protein,
                    meal.carbs,
                    meal.fat
                  );

                  return (
                    <div key={mealIndex} className="border-l-4 border-corpoideal-purple/30 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-corpoideal-darkpurple flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {meal.name} - {meal.time}
                        </h4>
                        <div className="text-xs text-gray-500">
                          {meal.calories} kcal • {meal.protein}g prot
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        {meal.foods.join(" • ")}
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="bg-gray-50 p-1 rounded text-center">
                          <span className="font-medium">{mealNutrition.calories}</span>
                          <br />kcal
                        </div>
                        <div className="bg-blue-50 p-1 rounded text-center">
                          <span className="font-medium">{mealNutrition.protein}g</span>
                          <br />Prot
                        </div>
                        <div className="bg-green-50 p-1 rounded text-center">
                          <span className="font-medium">{mealNutrition.carbs}g</span>
                          <br />Carb
                        </div>
                        <div className="bg-yellow-50 p-1 rounded text-center">
                          <span className="font-medium">{mealNutrition.fat}g</span>
                          <br />Gord
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Separator className="my-4" />
              
              {/* Daily Summary */}
              <div className="bg-corpoideal-purple/5 p-3 rounded-lg">
                <h5 className="text-sm font-semibold text-corpoideal-purple mb-2">Resumo Nutricional do Dia</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="text-center">
                    <div className="font-bold text-lg">{nutritionValues.calories}</div>
                    <div className="text-gray-500">Calorias</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-blue-600">{nutritionValues.protein}g</div>
                    <div className="text-gray-500">Proteína</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-green-600">{nutritionValues.carbs}g</div>
                    <div className="text-gray-500">Carboidratos</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-yellow-600">{nutritionValues.fat}g</div>
                    <div className="text-gray-500">Gorduras</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Tips and Supplements */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-corpoideal-purple">💡 Dicas Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {dietData.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-corpoideal-purple mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {dietData.supplements && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-corpoideal-purple">💊 Suplementos Sugeridos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {dietData.supplements.map((supplement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-corpoideal-purple mr-2">•</span>
                    <span>{supplement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
