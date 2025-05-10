
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
}

interface Meal {
  name: string;
  time: string;
  foods: Food[];
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
