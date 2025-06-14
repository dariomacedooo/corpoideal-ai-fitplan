import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Apple } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading
import { estimateNutritionValues, NutritionValues } from "@/utils/nutritionCalculator"; // Import async function and types

interface Food {
  name: string;
  portion: string;
  // These fields will be populated after fetching from API
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface Meal {
  name: string;
  time: string;
  foods: Food[];
  // These fields will be populated after calculation
  totalCalories?: number;
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface Diet {
  type: string;
  budget?: string;
  meals: Meal[];
  recipe: {
    name: string;
    ingredients: string[];
    instructions: string;
  };
  // These fields will be populated after calculation
  dailyCalories?: number;
  dailyMacros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface NutritionPlanProps {
  diets: Diet[];
}

export function NutritionPlan({ diets }: NutritionPlanProps) {
  const [selectedDiet, setSelectedDiet] = useState<string>('');
  // State to hold diets with calculated nutrition values
  const [calculatedDiets, setCalculatedDiets] = useState<Diet[]>([]);
  const [userBudget, setUserBudget] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  // No longer need showNutritionInfo as info will be loaded async

  // Load user's budget from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserBudget(profile.budget || '');
    }
  }, []);

  // Effect to fetch nutrition data and calculate totals
  useEffect(() => {
    const processDiets = async () => {
      if (!diets || diets.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true); // Start loading

      try {
        const processedDiets: Diet[] = await Promise.all(diets.map(async (diet) => {
          let totalDailyCalories = 0;
          let totalDailyProtein = 0;
          let totalDailyCarbs = 0;
          let totalDailyFat = 0;

          const processedMeals: Meal[] = await Promise.all(diet.meals.map(async (meal) => {
            let totalMealCalories = 0;
            let totalMealProtein = 0;
            let totalMealCarbs = 0;
            let totalMealFat = 0;

            const processedFoods: Food[] = await Promise.all(meal.foods.map(async (food) => {
              const nutrition: NutritionValues | null = await estimateNutritionValues(food.name, food.portion);

              // Use fetched nutrition or default to 0 if not found/error
              const calories = nutrition?.calories || 0;
              const protein = nutrition?.protein || 0;
              const carbs = nutrition?.carbs || 0;
              const fat = nutrition?.fat || 0;

              // Accumulate meal totals
              totalMealCalories += calories;
              totalMealProtein += protein;
              totalMealCarbs += carbs;
              totalMealFat += fat;

              return {
                ...food,
                calories,
                protein,
                carbs,
                fat,
              };
            }));

            // Accumulate daily totals
            totalDailyCalories += totalMealCalories;
            totalDailyProtein += totalMealProtein;
            totalDailyCarbs += totalMealCarbs;
            totalDailyFat += totalMealFat;

            return {
              ...meal,
              foods: processedFoods,
              totalCalories: totalMealCalories,
              macros: {
                protein: totalMealProtein,
                carbs: totalMealCarbs,
                fat: totalMealFat,
              },
            };
          }));

          return {
            ...diet,
            meals: processedMeals,
            dailyCalories: totalDailyCalories,
            dailyMacros: {
              protein: totalDailyProtein,
              carbs: totalDailyCarbs,
              fat: totalDailyFat,
            },
          };
        }));

        setCalculatedDiets(processedDiets);

      } catch (error) {
        console.error("Error processing diets:", error);
        // Handle error state if necessary
      } finally {
        setIsLoading(false); // End loading
      }
    };

    processDiets();
  }, [diets]); // Rerun effect when diets prop changes

  // Update selected diet when calculated diets change or user budget changes
  useEffect(() => {
    if (calculatedDiets.length > 0) {
      let dietsToConsider = calculatedDiets;

      // Apply budget filtering to calculated diets
      if (userBudget) {
        const compatible = calculatedDiets.filter(diet => {
          if (!diet.budget) return true;
          if (userBudget === '100-300' && diet.budget === '100-300') return true;
          if (userBudget === '301-500' && (diet.budget === '100-300' || diet.budget === '301-500')) return true;
          if (userBudget === '501-800' && diet.budget !== '801+') return true;
          if (userBudget === '801+') return true;
          return false;
        });
        dietsToConsider = compatible.length > 0 ? compatible : calculatedDiets;
      }

      setFilteredDiets(dietsToConsider);

      // FIXED: removed extra closing parenthesis here
      if (!selectedDiet || !dietsToConsider.find(d => d.type === selectedDiet)) {
        setSelectedDiet(dietsToConsider[0]?.type || ''); // Select first available diet or empty
      }
    } else {
      setFilteredDiets([]);
      setSelectedDiet('');
    }
  }, [calculatedDiets, userBudget, selectedDiet]); // Depend on calculatedDiets and userBudget

  // Add state for filtered diets
  const [filteredDiets, setFilteredDiets] = useState<Diet[]>([]);

  const currentDiet = filteredDiets.find(diet => diet.type === selectedDiet) || filteredDiets[0];

  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case '100-300': return 'R$100-R$300';
      case '301-500': return 'R$301-R$500';
      case '501-800': return 'R$501-R$800';
      case '801+': return 'Acima de R$800';
      default: return budget;
    }
  };

  // Render loading state
  if (isLoading || !currentDiet) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Render actual content once loaded
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <Apple className="h-5 w-5 mr-2" />
            Plano Alimentar
          </CardTitle>
          <div className="flex flex-col gap-2 items-end">
            {userBudget && (
              <Badge variant="outline" className="mb-1">
                Orçamento: {getBudgetLabel(userBudget)}
              </Badge>
            )}
            <Select value={selectedDiet} onValueChange={setSelectedDiet}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Estilo" />
              </SelectTrigger>
              <SelectContent>
                {filteredDiets.map(diet => (
                  <SelectItem key={diet.type} value={diet.type}>
                    {diet.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {currentDiet.budget && (
          <Alert className="mb-4 bg-corpoideal-purple/5 border-corpoideal-purple/20">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Faixa de orçamento</AlertTitle>
            <AlertDescription>
              Este plano alimentar é adequado para orçamentos de {getBudgetLabel(currentDiet.budget)}.
            </AlertDescription>
          </Alert>
        )}

        {currentDiet.dailyCalories !== undefined && ( // Use !== undefined check
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-corpoideal-purple mb-2">Informações Nutricionais Diárias</h3>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <span className="text-sm font-bold block">{Math.round(currentDiet.dailyCalories)} kcal</span>
                <span className="text-xs text-gray-500">Total/dia</span>
              </div>

              {currentDiet.dailyMacros && (
                <>
                  <div className="text-center">
                    <span className="text-sm font-bold block">{Math.round(currentDiet.dailyMacros.protein)}g</span>
                    <span className="text-xs text-gray-500">Proteínas</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold block">{Math.round(currentDiet.dailyMacros.carbs)}g</span>
                    <span className="text-xs text-gray-500">Carboidratos</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold block">{Math.round(currentDiet.dailyMacros.fat)}g</span>
                    <span className="text-xs text-gray-500">Gorduras</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <Tabs defaultValue="refeicoes">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="refeicoes">Refeições</TabsTrigger>
            <TabsTrigger value="receita">Receita do Dia</TabsTrigger>
          </TabsList>

          <TabsContent value="refeicoes">
            <div className="space-y-4">
              {currentDiet.meals.map((meal, index) => (
                <div key={index} className="nutrition-card">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{meal.name}</h4>
                    <div className="flex items-center gap-2">
                      {meal.totalCalories !== undefined && ( // Use !== undefined check
                        <Badge className="bg-corpoideal-purple/10 text-corpoideal-purple border-0">
                          {Math.round(meal.totalCalories)} kcal
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">{meal.time}</Badge>
                    </div>
                  </div>

                  <ul className="text-sm space-y-1">
                    {meal.foods.map((food, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{food.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">{food.portion}</span>
                          {food.calories !== undefined && ( // Use !== undefined check
                            <span className="text-xs text-corpoideal-purple">{Math.round(food.calories)} kcal</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {meal.macros && (
                    <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <div>Proteínas: <span className="font-medium">{Math.round(meal.macros.protein)}g</span></div>
                      <div>Carbos: <span className="font-medium">{Math.round(meal.macros.carbs)}g</span></div>
                      <div>Gorduras: <span className="font-medium">{Math.round(meal.macros.fat)}g</span></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="receita">
            <div className="nutrition-card">
              <div className="bg-gradient-to-r from-corpoideal-purple/10 to-corpoideal-lightpurple/10 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-lg mb-1 text-corpoideal-purple">{currentDiet.recipe.name}</h3>
                <p className="text-xs text-gray-600">Receita especial para o seu plano alimentar</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <span className="mr-1">🥗</span> Ingredientes:
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {currentDiet.recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <span className="mr-1">👨‍🍳</span> Modo de Preparo:\n
                </h4>
                <p className="text-sm">{currentDiet.recipe.instructions}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
