
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Apple, AlertTriangle } from "lucide-react";
import { estimateNutritionValues } from "@/utils/nutritionCalculator";

interface WeeklyDietPlanProps {
  dietData: any;
  userGoal: string;
}

export function WeeklyDietPlan({ dietData, userGoal }: WeeklyDietPlanProps) {
  const [selectedDay, setSelectedDay] = useState('segunda');
  
  const daysOfWeek = [
    { key: 'segunda', label: 'Seg', fullName: 'Segunda-feira' },
    { key: 'terca', label: 'Ter', fullName: 'Terça-feira' },
    { key: 'quarta', label: 'Qua', fullName: 'Quarta-feira' },
    { key: 'quinta', label: 'Qui', fullName: 'Quinta-feira' },
    { key: 'sexta', label: 'Sex', fullName: 'Sexta-feira' },
    { key: 'sabado', label: 'Sáb', fullName: 'Sábado' },
    { key: 'domingo', label: 'Dom', fullName: 'Domingo' }
  ];

  const calculateDayTotals = (meals: any[]) => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    meals.forEach(meal => {
      meal.foods.forEach((food: any) => {
        const nutrition = estimateNutritionValues(food.name, food.portion);
        totalCalories += nutrition.calories;
        totalProtein += nutrition.protein;
        totalCarbs += nutrition.carbs;
        totalFat += nutrition.fat;
      });
    });

    return {
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein * 10) / 10,
      carbs: Math.round(totalCarbs * 10) / 10,
      fat: Math.round(totalFat * 10) / 10
    };
  };

  const currentDayData = dietData.days[selectedDay];
  const dayTotals = currentDayData ? calculateDayTotals(currentDayData.meals) : null;

  return (
    <Card className="w-full animate-fade-in bg-white dark:bg-gray-800 shadow-modern rounded-2xl border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Plano Semanal - {dietData.type}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={selectedDay} onValueChange={setSelectedDay}>
          <TabsList className="grid grid-cols-7 mb-6 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
            {daysOfWeek.map((day) => (
              <TabsTrigger 
                key={day.key} 
                value={day.key} 
                className="text-xs sm:text-sm font-medium rounded-lg data-[state=active]:bg-corpoideal-purple data-[state=active]:text-white transition-all duration-200"
              >
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {daysOfWeek.map((day) => (
            <TabsContent key={day.key} value={day.key} className="space-y-6 mt-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{day.fullName}</h3>
                {dayTotals && (
                  <Badge className="bg-corpoideal-purple/10 text-corpoideal-purple border-0 px-4 py-2 text-sm font-medium self-start sm:self-center">
                    {dayTotals.calories} kcal
                  </Badge>
                )}
              </div>

              {dayTotals && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-purple-100 dark:border-gray-600">
                  <h4 className="text-sm font-bold text-corpoideal-purple mb-3 flex items-center">
                    <Apple className="h-4 w-4 mr-2" />
                    Resumo Nutricional do Dia
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <span className="text-lg font-bold block text-gray-900 dark:text-white">{dayTotals.calories}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">kcal</span>
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold block text-gray-900 dark:text-white">{dayTotals.protein}g</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Proteínas</span>
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold block text-gray-900 dark:text-white">{dayTotals.carbs}g</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Carbos</span>
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold block text-gray-900 dark:text-white">{dayTotals.fat}g</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Gorduras</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {currentDayData?.meals.length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Algumas refeições foram filtradas devido às suas restrições alimentares.
                    </p>
                  </div>
                )}
                
                {currentDayData?.meals.map((meal: any, index: number) => {
                  if (meal.foods.length === 0) return null;
                  
                  const mealCalories = meal.foods.reduce((total: number, food: any) => {
                    return total + estimateNutritionValues(food.name, food.portion).calories;
                  }, 0);

                  return (
                    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 shadow-subtle">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                        <h4 className="font-bold text-gray-900 dark:text-white">{meal.name}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className="bg-corpoideal-purple/10 text-corpoideal-purple border-0 text-xs">
                            {Math.round(mealCalories)} kcal
                          </Badge>
                          <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600">
                            {meal.time}
                          </Badge>
                        </div>
                      </div>
                      
                      <ul className="text-sm space-y-2">
                        {meal.foods.map((food: any, idx: number) => {
                          const nutrition = estimateNutritionValues(food.name, food.portion);
                          return (
                            <li key={idx} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                              <span className="text-gray-900 dark:text-white font-medium">{food.name}</span>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500 dark:text-gray-400">{food.portion}</span>
                                <span className="text-xs text-corpoideal-purple font-medium">{nutrition.calories} kcal</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
