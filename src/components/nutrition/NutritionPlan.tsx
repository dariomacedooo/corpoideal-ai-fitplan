
import { useState, useEffect } from 'react';
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
  budget?: string;  // Mudamos para opcional para resolver o erro
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
  const [selectedDiet, setSelectedDiet] = useState<string>('');
  const [filteredDiets, setFilteredDiets] = useState<Diet[]>([]);
  const [userBudget, setUserBudget] = useState<string>('');
  
  // Carregar o orçamento do usuário do localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserBudget(profile.budget || '');
    }
  }, []);
  
  // Filtrar dietas com base no orçamento
  useEffect(() => {
    if (!userBudget) {
      setFilteredDiets(diets);
    } else {
      // Filtra as dietas que são compatíveis com o orçamento do usuário
      const compatible = diets.filter(diet => {
        if (!diet.budget) return true; // Se a dieta não tem informação de orçamento, mostra para todos
        
        // Lógica para compatibilidade de orçamento
        if (userBudget === '100-300' && diet.budget === '100-300') return true;
        if (userBudget === '301-500' && (diet.budget === '100-300' || diet.budget === '301-500')) return true;
        if (userBudget === '501-800' && diet.budget !== '801+') return true;
        if (userBudget === '801+') return true; // Usuários com alto orçamento podem ver todas as dietas
        
        return false;
      });
      
      setFilteredDiets(compatible.length > 0 ? compatible : diets);
    }
    
    // Seleciona a primeira dieta filtrada como padrão
    if (filteredDiets.length > 0 && !selectedDiet) {
      setSelectedDiet(filteredDiets[0].type);
    }
  }, [diets, userBudget]);
  
  // Atualiza a dieta selecionada quando as dietas filtradas mudam
  useEffect(() => {
    if (filteredDiets.length > 0 && (!selectedDiet || !filteredDiets.find(d => d.type === selectedDiet))) {
      setSelectedDiet(filteredDiets[0].type);
    }
  }, [filteredDiets]);
  
  const currentDiet = filteredDiets.find(diet => diet.type === selectedDiet) || (filteredDiets[0] || diets[0]);
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple">Plano Alimentar</CardTitle>
          <div className="flex flex-col gap-2 items-end">
            {userBudget && (
              <Badge variant="outline" className="mb-1">
                Orçamento: {
                  userBudget === '100-300' ? 'R$100-R$300' :
                  userBudget === '301-500' ? 'R$301-R$500' :
                  userBudget === '501-800' ? 'R$501-R$800' :
                  'Acima de R$800'
                }
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
