
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Apple } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Food {
  name: string;
  portion: string;
  calories?: number; // Added calories field
  protein?: number;  // Added protein field
  carbs?: number;    // Added carbs field
  fat?: number;      // Added fat field
}

interface Meal {
  name: string;
  time: string;
  foods: Food[];
  totalCalories?: number; // Added total calories for the meal
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface Diet {
  type: string;
  budget?: string;  // Opcional para compatibilidade
  meals: Meal[];
  recipe: {
    name: string;
    ingredients: string[];
    instructions: string;
  };
  dailyCalories?: number; // Added daily calorie total
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
  const [filteredDiets, setFilteredDiets] = useState<Diet[]>([]);
  const [userBudget, setUserBudget] = useState<string>('');
  const [showNutritionInfo, setShowNutritionInfo] = useState<boolean>(true);
  
  // Load user's budget from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserBudget(profile.budget || '');
    }
  }, []);
  
  // Filter diets based on budget
  useEffect(() => {
    // First, calculate calories and macros for all diets if they don't have them yet
    const dietsWithCalories = diets.map(diet => {
      if (diet.dailyCalories) return diet; // Skip if already calculated
      
      // Calculate totals for the diet
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFat = 0;
      
      // Updated meals with calorie information
      const updatedMeals = diet.meals.map(meal => {
        // Skip if meal already has calculated totals
        if (meal.totalCalories) return meal;
        
        let mealCalories = 0;
        let mealProtein = 0;
        let mealCarbs = 0;
        let mealFat = 0;
        
        // Add realistic calorie and macro values for foods
        const updatedFoods = meal.foods.map(food => {
          // Skip if food already has calories
          if (food.calories) return food;
          
          // Estimate calories and macros based on food name and portion
          const estimate = estimateNutritionValues(food.name, food.portion);
          
          // Add to meal totals
          mealCalories += estimate.calories;
          mealProtein += estimate.protein;
          mealCarbs += estimate.carbs;
          mealFat += estimate.fat;
          
          // Return food with nutrition data
          return {
            ...food,
            calories: estimate.calories,
            protein: estimate.protein,
            carbs: estimate.carbs,
            fat: estimate.fat
          };
        });
        
        // Add to diet totals
        totalCalories += mealCalories;
        totalProtein += mealProtein;
        totalCarbs += mealCarbs;
        totalFat += mealFat;
        
        // Return meal with updated foods and totals
        return {
          ...meal,
          foods: updatedFoods,
          totalCalories: mealCalories,
          macros: {
            protein: mealProtein,
            carbs: mealCarbs,
            fat: mealFat
          }
        };
      });
      
      // Return updated diet with totals
      return {
        ...diet,
        meals: updatedMeals,
        dailyCalories: totalCalories,
        dailyMacros: {
          protein: totalProtein,
          carbs: totalCarbs,
          fat: totalFat
        }
      };
    });
    
    // Apply budget filtering
    if (!userBudget) {
      setFilteredDiets(dietsWithCalories);
    } else {
      // Filter diets compatible with user's budget
      const compatible = dietsWithCalories.filter(diet => {
        if (!diet.budget) return true; // If diet doesn't specify budget, show to all
        
        // Budget compatibility logic
        if (userBudget === '100-300' && diet.budget === '100-300') return true;
        if (userBudget === '301-500' && (diet.budget === '100-300' || diet.budget === '301-500')) return true;
        if (userBudget === '501-800' && diet.budget !== '801+') return true;
        if (userBudget === '801+') return true; // Users with high budget can see all diets
        
        return false;
      });
      
      setFilteredDiets(compatible.length > 0 ? compatible : dietsWithCalories);
    }
  }, [diets, userBudget]);
  
  // Update selected diet when filtered diets change
  useEffect(() => {
    if (filteredDiets.length > 0 && (!selectedDiet || !filteredDiets.find(d => d.type === selectedDiet))) {
      setSelectedDiet(filteredDiets[0].type);
    }
  }, [filteredDiets, selectedDiet]);
  
  const currentDiet = filteredDiets.find(diet => diet.type === selectedDiet) || (filteredDiets[0] || diets[0]);
  
  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case '100-300': return 'R$100-R$300';
      case '301-500': return 'R$301-R$500';
      case '501-800': return 'R$501-R$800';
      case '801+': return 'Acima de R$800';
      default: return budget;
    }
  };
  
  // Helper function to estimate nutrition values
  const estimateNutritionValues = (foodName: string, portion: string): { calories: number, protein: number, carbs: number, fat: number } => {
    // Default values
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    
    // Very basic estimation based on food name and portion
    // In a real app, this would use a comprehensive food database
    
    // Extract quantity from portion when possible
    const quantityMatch = portion.match(/(\d+)/);
    const quantity = quantityMatch ? parseInt(quantityMatch[0]) : 1;
    
    // Proteins
    if (foodName.includes('frango') || foodName.includes('peito de frango')) {
      calories = 165 * quantity;
      protein = 31 * quantity;
      fat = 3.6 * quantity;
    } else if (foodName.includes('ovo')) {
      calories = 70 * quantity;
      protein = 6 * quantity;
      carbs = 0.6 * quantity;
      fat = 5 * quantity;
    } else if (foodName.includes('peixe') || foodName.includes('salmão')) {
      calories = 208 * quantity;
      protein = 20 * quantity;
      fat = 13 * quantity;
    } else if (foodName.includes('carne')) {
      calories = 250 * quantity;
      protein = 26 * quantity;
      fat = 17 * quantity;
    } else if (foodName.includes('tofu')) {
      calories = 144 * quantity;
      protein = 17 * quantity;
      carbs = 3 * quantity;
      fat = 9 * quantity;
    }
    
    // Carbs
    else if (foodName.includes('arroz')) {
      calories = 130 * quantity;
      protein = 2.7 * quantity;
      carbs = 28 * quantity;
      fat = 0.3 * quantity;
    } else if (foodName.includes('batata')) {
      calories = 160 * quantity;
      protein = 3 * quantity;
      carbs = 37 * quantity;
      fat = 0.2 * quantity;
    } else if (foodName.includes('pão')) {
      calories = 80 * quantity;
      protein = 3 * quantity;
      carbs = 15 * quantity;
      fat = 1 * quantity;
    } else if (foodName.includes('quinoa')) {
      calories = 120 * quantity;
      protein = 4 * quantity;
      carbs = 21 * quantity;
      fat = 1.9 * quantity;
    } else if (foodName.includes('feijão')) {
      calories = 100 * quantity;
      protein = 7 * quantity;
      carbs = 17 * quantity;
      fat = 0.5 * quantity;
    }
    
    // Fruits and veggies
    else if (foodName.includes('banana')) {
      calories = 105 * quantity;
      protein = 1.3 * quantity;
      carbs = 27 * quantity;
      fat = 0.4 * quantity;
    } else if (foodName.includes('maçã')) {
      calories = 95 * quantity;
      protein = 0.5 * quantity;
      carbs = 25 * quantity;
      fat = 0.3 * quantity;
    } else if (foodName.includes('salada')) {
      calories = 20 * quantity;
      protein = 1 * quantity;
      carbs = 4 * quantity;
      fat = 0.2 * quantity;
    } else if (foodName.includes('legumes')) {
      calories = 25 * quantity;
      protein = 1.5 * quantity;
      carbs = 5 * quantity;
      fat = 0.2 * quantity;
    }
    
    // Dairy and supplements
    else if (foodName.includes('iogurte')) {
      calories = 150 * quantity;
      protein = 8 * quantity;
      carbs = 12 * quantity;
      fat = 8 * quantity;
    } else if (foodName.includes('queijo')) {
      calories = 110 * quantity;
      protein = 7 * quantity;
      carbs = 1 * quantity;
      fat = 9 * quantity;
    } else if (foodName.includes('whey')) {
      calories = 120 * quantity;
      protein = 24 * quantity;
      carbs = 3 * quantity;
      fat = 2 * quantity;
    }
    
    // Default generic food values if not matched
    else {
      calories = 100 * quantity;
      protein = 5 * quantity;
      carbs = 10 * quantity;
      fat = 5 * quantity;
    }
    
    return { calories, protein, carbs, fat };
  };
  
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

        {currentDiet.dailyCalories && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-corpoideal-purple mb-2">Informações Nutricionais Diárias</h3>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <span className="text-sm font-bold block">{currentDiet.dailyCalories} kcal</span>
                <span className="text-xs text-gray-500">Total/dia</span>
              </div>

              {currentDiet.dailyMacros && (
                <>
                  <div className="text-center">
                    <span className="text-sm font-bold block">{currentDiet.dailyMacros.protein}g</span>
                    <span className="text-xs text-gray-500">Proteínas</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold block">{currentDiet.dailyMacros.carbs}g</span>
                    <span className="text-xs text-gray-500">Carboidratos</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold block">{currentDiet.dailyMacros.fat}g</span>
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
                      {meal.totalCalories && (
                        <Badge className="bg-corpoideal-purple/10 text-corpoideal-purple border-0">
                          {meal.totalCalories} kcal
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
                          {showNutritionInfo && food.calories && (
                            <span className="text-xs text-corpoideal-purple">{food.calories} kcal</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  {showNutritionInfo && meal.macros && (
                    <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <div>Proteínas: <span className="font-medium">{meal.macros.protein}g</span></div>
                      <div>Carbos: <span className="font-medium">{meal.macros.carbs}g</span></div>
                      <div>Gorduras: <span className="font-medium">{meal.macros.fat}g</span></div>
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
                  <span className="mr-1">👨‍🍳</span> Modo de Preparo:
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
