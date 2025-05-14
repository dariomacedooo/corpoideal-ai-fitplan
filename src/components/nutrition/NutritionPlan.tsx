
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { WaterIntakeReminder } from './WaterIntakeReminder';
import { useToast } from "@/components/ui/use-toast";

interface MealItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
}

interface Meal {
  time: string;
  title: string;
  items: MealItem[];
  notes?: string;
}

interface NutritionDay {
  day: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface NutritionPlanProps {
  goal: string;
  days: NutritionDay[];
  userName?: string;
  weight?: number;
  height?: number;
  sex?: string;
  age?: number;
  activityLevel?: string;
}

export function NutritionPlan({ 
  goal, 
  days, 
  userName,
  weight = 70,
  height = 170,
  sex = 'masculino',
  age = 30,
  activityLevel = 'moderado'
}: NutritionPlanProps) {
  const { toast } = useToast();
  const [customMeal, setCustomMeal] = useState<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);
  
  // Show motivational message with user name when component mounts
  useEffect(() => {
    if (userName) {
      setTimeout(() => {
        toast({
          title: `Plano Nutricional Personalizado`,
          description: `${userName}, seu plano foi criado de acordo com suas metas e características pessoais.`
        });
      }, 1000);
    }
  }, [userName, toast]);

  const getGoalText = () => {
    switch (goal) {
      case 'perder-peso':
        return 'Déficit Calórico';
      case 'ganhar-massa':
      case 'ganhar-musculos':
        return 'Superávit Calórico';
      case 'ganhar-peso':
        return 'Superávit Calórico';
      case 'manter-peso':
        return 'Manutenção';
      default:
        return 'Balanceado';
    }
  };

  const calculateMacroPercentage = (macroValue: number, calories: number, macroCaloriesPerGram: number) => {
    return Math.round((macroValue * macroCaloriesPerGram * 100) / calories);
  };
  
  const addCustomMeal = (day: NutritionDay, mealTime: string) => {
    // This would be implemented to allow users to log additional food
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Em breve você poderá adicionar refeições personalizadas ao seu plano."
    });
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Plano Nutricional</span>
            <Badge>{getGoalText()}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={days[0]?.day.toLowerCase()}>
            <TabsList className="grid grid-cols-7 mb-4">
              {days.map((day) => (
                <TabsTrigger key={day.day} value={day.day.toLowerCase()}>
                  {day.day.substring(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {days.map((day) => (
              <TabsContent key={day.day} value={day.day.toLowerCase()} className="space-y-4">
                {/* Macronutrient summary for the day */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Resumo Nutricional do Dia</h3>
                    <span className="text-sm font-bold">{day.totalCalories} kcal</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="font-medium text-blue-700">Proteínas</div>
                      <div className="font-bold">{day.totalProtein}g</div>
                      <div>{calculateMacroPercentage(day.totalProtein, day.totalCalories, 4)}%</div>
                    </div>
                    <div className="bg-amber-50 p-2 rounded">
                      <div className="font-medium text-amber-700">Carboidratos</div>
                      <div className="font-bold">{day.totalCarbs}g</div>
                      <div>{calculateMacroPercentage(day.totalCarbs, day.totalCalories, 4)}%</div>
                    </div>
                    <div className="bg-red-50 p-2 rounded">
                      <div className="font-medium text-red-700">Gorduras</div>
                      <div className="font-bold">{day.totalFat}g</div>
                      <div>{calculateMacroPercentage(day.totalFat, day.totalCalories, 9)}%</div>
                    </div>
                  </div>
                </div>
                
                {/* Each meal */}
                {day.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{meal.title}</h3>
                        <p className="text-sm text-gray-500">{meal.time}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {meal.items.reduce((acc, item) => acc + item.calories, 0)} kcal
                        </div>
                        <div className="text-xs text-gray-500">
                          P: {meal.items.reduce((acc, item) => acc + item.protein, 0)}g | 
                          C: {meal.items.reduce((acc, item) => acc + item.carbs, 0)}g | 
                          G: {meal.items.reduce((acc, item) => acc + item.fat, 0)}g
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 space-y-3">
                      {meal.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-3">
                          {item.imageUrl && (
                            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                              <AspectRatio ratio={1/1}>
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </AspectRatio>
                            </div>
                          )}
                          
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <span className="text-sm font-medium">{item.calories} kcal</span>
                            </div>
                            <p className="text-xs text-gray-500">{item.portion}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              Proteínas: {item.protein}g | Carboidratos: {item.carbs}g | Gorduras: {item.fat}g
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {meal.notes && (
                        <div className="text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                          <span className="font-medium">Observações:</span> {meal.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Add custom meal button */}
                <button
                  onClick={() => addCustomMeal(day, 'lanche')}
                  className="w-full p-2 border border-dashed rounded-lg text-gray-500 text-sm hover:bg-gray-50 transition-colors"
                >
                  + Adicionar alimento ou refeição
                </button>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Water intake reminder component */}
      {weight && (
        <WaterIntakeReminder 
          weight={weight} 
          goal={goal} 
          activity={activityLevel || 'moderado'} 
          userName={userName}
        />
      )}
    </div>
  );
}
