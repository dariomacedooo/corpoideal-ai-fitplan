
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Apple } from "lucide-react";
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
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Plano Semanal - {dietData.type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedDay} onValueChange={setSelectedDay}>
          <TabsList className="grid grid-cols-7 mb-4">
            {daysOfWeek.map((day) => (
              <TabsTrigger key={day.key} value={day.key} className="text-xs">
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {daysOfWeek.map((day) => (
            <TabsContent key={day.key} value={day.key} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{day.fullName}</h3>
                {dayTotals && (
                  <Badge className="bg-corpoideal-purple/10 text-corpoideal-purple border-0">
                    {dayTotals.calories} kcal
                  </Badge>
                )}
              </div>

              {dayTotals && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-corpoideal-purple mb-2">Resumo Nutricional do Dia</h4>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <span className="text-sm font-bold block">{dayTotals.calories}</span>
                      <span className="text-xs text-gray-500">kcal</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold block">{dayTotals.protein}g</span>
                      <span className="text-xs text-gray-500">Proteínas</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold block">{dayTotals.carbs}g</span>
                      <span className="text-xs text-gray-500">Carbos</span>
                    </div>
                    <div>
                      <span className="text-sm font-bold block">{dayTotals.fat}g</span>
                      <span className="text-xs text-gray-500">Gorduras</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {currentDayData?.meals.map((meal: any, index: number) => {
                  const mealCalories = meal.foods.reduce((total: number, food: any) => {
                    return total + estimateNutritionValues(food.name, food.portion).calories;
                  }, 0);

                  return (
                    <div key={index} className="nutrition-card p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{meal.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-corpoideal-purple/10 text-corpoideal-purple border-0">
                            {Math.round(mealCalories)} kcal
                          </Badge>
                          <Badge variant="outline" className="text-xs">{meal.time}</Badge>
                        </div>
                      </div>
                      
                      <ul className="text-sm space-y-1">
                        {meal.foods.map((food: any, idx: number) => {
                          const nutrition = estimateNutritionValues(food.name, food.portion);
                          return (
                            <li key={idx} className="flex justify-between">
                              <span>{food.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">{food.portion}</span>
                                <span className="text-xs text-corpoideal-purple">{nutrition.calories} kcal</span>
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
