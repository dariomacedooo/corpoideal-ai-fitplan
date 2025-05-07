
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Food {
  name: string;
  portion: string;
}

interface Meal {
  name: string;
  time: string;
  foods: Food[];
}

interface Diet {
  type: string;
  meals: Meal[];
  recipe: {
    name: string;
    ingredients: string[];
    instructions: string;
  };
}

interface NutritionPlanProps {
  diets: Diet[];
}

export function NutritionPlan({ diets }: NutritionPlanProps) {
  const [selectedDiet, setSelectedDiet] = useState<string>(diets[0].type);
  
  const currentDiet = diets.find(diet => diet.type === selectedDiet) || diets[0];
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple">Plano Alimentar</CardTitle>
          <Select value={selectedDiet} onValueChange={setSelectedDiet}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Estilo" />
            </SelectTrigger>
            <SelectContent>
              {diets.map(diet => (
                <SelectItem key={diet.type} value={diet.type}>
                  {diet.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
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
                    <Badge variant="outline" className="text-xs">{meal.time}</Badge>
                  </div>
                  
                  <ul className="text-sm space-y-1">
                    {meal.foods.map((food, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{food.name}</span>
                        <span className="text-gray-500">{food.portion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="receita">
            <div className="nutrition-card">
              <h3 className="font-medium text-lg mb-3">{currentDiet.recipe.name}</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Ingredientes:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {currentDiet.recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Modo de Preparo:</h4>
                <p className="text-sm">{currentDiet.recipe.instructions}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
