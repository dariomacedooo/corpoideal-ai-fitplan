
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple } from "lucide-react";

interface NutritionItem {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Meal {
  time: string;
  title: string;
  items: NutritionItem[];
}

interface NutritionDay {
  day: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface NutritionPlanProps {
  goal: string;
  days: NutritionDay[];
  userName?: string;
  weight: number;
  height: number;
  sex: string;
  age: number;
  activityLevel: string;
  experience?: string;
}

export function NutritionPlan({
  goal,
  days,
  userName,
  weight,
  height,
  sex,
  age,
  activityLevel,
  experience = "intermediario"
}: NutritionPlanProps) {
  const [activeTab, setActiveTab] = useState(days[0]?.day.toLowerCase());

  const getGoalText = () => {
    switch (goal) {
      case 'perder-peso':
        return 'Perder Peso';
      case 'ganhar-massa':
      case 'ganhar-musculos':
        return 'Ganhar Massa Muscular';
      case 'ganhar-peso':
        return 'Ganhar Peso';
      default:
        return 'Manter Peso';
    }
  };

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    if (sex === 'masculino') {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers: {[key: string]: number} = {
      'sedentario': 1.2,
      'leve': 1.375,
      'moderado': 1.55,
      'ativo': 1.725,
      'muito-ativo': 1.9
    };
    
    const multiplier = activityMultipliers[activityLevel] || 1.55;
    return Math.round(bmr * multiplier);
  };

  // Calculate target calories based on goal
  const calculateTargetCalories = () => {
    const tdee = calculateTDEE();
    
    switch (goal) {
      case 'perder-peso':
        return Math.round(tdee * 0.85); // 15% deficit
      case 'ganhar-massa':
      case 'ganhar-musculos':
        // Ajuste adicional com base no nível de experiência
        const experienceMultiplier = {
          'iniciante': 1.1,      // +10%
          'intermediario': 1.15, // +15%
          'avancado': 1.2        // +20%
        };
        const multiplier = experienceMultiplier[experience as keyof typeof experienceMultiplier] || 1.15;
        return Math.round(tdee * multiplier);
      case 'ganhar-peso':
        return Math.round(tdee * 1.1); // 10% surplus
      default:
        return tdee;
    }
  };

  // Calculate macronutrient targets
  const calculateMacroTargets = () => {
    const targetCalories = calculateTargetCalories();
    let proteinPercentage, carbPercentage, fatPercentage;
    
    // Adjust macros based on goal and experience level
    if (goal === 'ganhar-massa' || goal === 'ganhar-musculos') {
      if (experience === 'avancado') {
        proteinPercentage = 0.35; // 35% from protein
        carbPercentage = 0.45;    // 45% from carbs
        fatPercentage = 0.2;      // 20% from fat
      } else {
        proteinPercentage = 0.3;  // 30% from protein
        carbPercentage = 0.45;    // 45% from carbs
        fatPercentage = 0.25;     // 25% from fat
      }
    } else if (goal === 'perder-peso') {
      proteinPercentage = 0.4;    // 40% from protein
      carbPercentage = 0.35;      // 35% from carbs
      fatPercentage = 0.25;       // 25% from fat
    } else {
      proteinPercentage = 0.3;    // 30% from protein
      carbPercentage = 0.4;       // 40% from carbs
      fatPercentage = 0.3;        // 30% from fat
    }
    
    // Calculate grams
    const proteinGrams = Math.round((targetCalories * proteinPercentage) / 4); // 4 calories per gram
    const carbGrams = Math.round((targetCalories * carbPercentage) / 4);       // 4 calories per gram
    const fatGrams = Math.round((targetCalories * fatPercentage) / 9);         // 9 calories per gram
    
    return {
      targetCalories,
      proteinGrams,
      carbGrams,
      fatGrams
    };
  };

  const macroTargets = calculateMacroTargets();
  
  // Adjust recommendations based on experience level
  const getExperienceRecommendation = () => {
    if (goal === 'ganhar-musculos' || goal === 'ganhar-massa') {
      switch (experience) {
        case 'iniciante':
          return "Para iniciantes, foque em consistência nas refeições e no consumo adequado de proteínas (1.6-1.8g por kg de peso corporal).";
        case 'intermediario':
          return "Para intermediários, distribua bem suas proteínas (2g por kg) ao longo do dia e dê atenção especial à alimentação pré e pós-treino.";
        case 'avancado':
          return "Para avançados, aumente a ingestão de proteína (2.2-2.5g por kg) e carboidratos pré e pós-treino para maximizar recuperação e síntese proteica.";
        default:
          return "";
      }
    }
    return "";
  };

  const experienceRecommendation = getExperienceRecommendation();

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <Apple className="h-5 w-5 mr-2" />
            Plano Alimentar
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge>{getGoalText()}</Badge>
            {experience && <Badge variant="outline">{experience === 'iniciante' ? 'Iniciante' : experience === 'intermediario' ? 'Intermediário' : 'Avançado'}</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">Suas necessidades diárias</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="text-sm text-gray-500">Calorias</div>
              <div className="text-lg font-medium">{macroTargets.targetCalories} kcal</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="text-sm text-gray-500">Proteínas</div>
              <div className="text-lg font-medium">{macroTargets.proteinGrams}g</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="text-sm text-gray-500">Carboidratos</div>
              <div className="text-lg font-medium">{macroTargets.carbGrams}g</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="text-sm text-gray-500">Gorduras</div>
              <div className="text-lg font-medium">{macroTargets.fatGrams}g</div>
            </div>
          </div>
          
          {experienceRecommendation && (
            <div className="mt-4 text-sm text-corpoideal-purple">
              <strong>Recomendação:</strong> {experienceRecommendation}
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 grid" style={{ gridTemplateColumns: `repeat(${Math.min(days.length, 7)}, 1fr)` }}>
            {days.map((day) => (
              <TabsTrigger key={day.day} value={day.day.toLowerCase()}>
                {day.day.substring(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {days.map((day) => (
            <TabsContent key={day.day} value={day.day.toLowerCase()}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{day.day}</h3>
                  <div className="text-sm">
                    <span className="font-medium">{day.totalCalories} kcal</span>
                    <span className="text-gray-500 ml-2">
                      ({day.totalProtein}g P / {day.totalCarbs}g C / {day.totalFat}g G)
                    </span>
                  </div>
                </div>
                
                {day.meals.map((meal, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{meal.title}</h4>
                      <span className="text-sm text-gray-500">{meal.time}</span>
                    </div>
                    
                    <div className="space-y-3">
                      {meal.items.map((item, j) => (
                        <div key={j} className="flex justify-between items-start pt-2">
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.portion}</div>
                          </div>
                          <div className="text-xs text-right">
                            <div>{item.calories} kcal</div>
                            <div className="text-gray-500">
                              {item.protein}g P / {item.carbs}g C / {item.fat}g G
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-corpoideal-purple mb-2">
            Dicas para {getGoalText()}:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1 pl-4 list-disc">
            {goal === 'ganhar-massa' || goal === 'ganhar-musculos' ? (
              <>
                <li>Consuma proteína em todas as refeições principais</li>
                <li>Priorize carboidratos complexos antes e depois do treino</li>
                <li>Consuma calorias suficientes para apoiar o ganho de massa</li>
                <li>Não negligencie gorduras boas para hormônios saudáveis</li>
                {experience === 'avancado' && (
                  <>
                    <li>Divida suas refeições em 5-6 ao longo do dia</li>
                    <li>Adicione 20-30g de proteína imediatamente pós-treino</li>
                    <li>Considere periodização nutricional alinhada com seus ciclos de treino</li>
                  </>
                )}
              </>
            ) : goal === 'perder-peso' ? (
              <>
                <li>Mantenha um déficit calórico moderado (15-20%)</li>
                <li>Aumente a ingestão de proteínas para preservar massa muscular</li>
                <li>Priorize alimentos com alta saciedade e baixa densidade calórica</li>
                <li>Beba água antes das refeições para aumentar a saciedade</li>
                <li>Evite alimentos ultraprocessados e ricos em açúcar</li>
              </>
            ) : (
              <>
                <li>Mantenha uma alimentação balanceada com todos os grupos alimentares</li>
                <li>Consuma proteínas suficientes para manutenção muscular</li>
                <li>Ajuste calorias conforme seu nível de atividade diária</li>
                <li>Priorize alimentos integrais e minimamente processados</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
