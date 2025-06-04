
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { NutritionPlan } from "@/components/nutrition/NutritionPlan";
import { WeeklyDietPlan } from "@/components/nutrition/WeeklyDietPlan";
import { WaterIntakeCalculator } from "@/components/nutrition/WaterIntakeCalculator";
import { MacroCalculator } from "@/components/nutrition/MacroCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { weeklyDiets } from "@/data/weeklyDiets";
import { WeeklyDietData } from "@/types/WeeklyDiet";

const NutritionPage = () => {
  const { profile } = useUserProfile();
  const [userWeight, setUserWeight] = useState<number>(70);
  
  // Get user weight from profile
  useEffect(() => {
    if (profile?.weight) {
      setUserWeight(parseInt(profile.weight));
    }
  }, [profile]);

  // Get diet based on user goal
  const getUserDiet = (): WeeklyDietData => {
    if (!profile?.goal) {
      // Convert to WeeklyDietData format
      const defaultDiet = weeklyDiets[0];
      return {
        id: defaultDiet.id || '1',
        name: defaultDiet.name || 'Dieta Padrão',
        goal: defaultDiet.goal || 'manter-peso',
        budget: defaultDiet.budget || 'medio',
        weekPlan: defaultDiet.weekPlan || [],
        tips: defaultDiet.tips || [],
        supplements: defaultDiet.supplements
      };
    }
    
    const goalBasedDiet = weeklyDiets.find(diet => diet.goal === profile.goal) || weeklyDiets[0];
    
    return {
      id: goalBasedDiet.id || '1',
      name: goalBasedDiet.name || 'Dieta Personalizada',
      goal: goalBasedDiet.goal || profile.goal,
      budget: goalBasedDiet.budget || 'medio',
      weekPlan: goalBasedDiet.weekPlan || [],
      tips: goalBasedDiet.tips || [],
      supplements: goalBasedDiet.supplements
    };
  };

  const currentDiet = getUserDiet();

  if (!profile) {
    return (
      <div className="pb-16 pt-14">
        <AppHeader />
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">Seu Plano Nutricional</h1>
          <p className="text-gray-600 mb-6">
            Complete seu perfil primeiro para ver seu plano personalizado.
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-corpoideal-purple mb-4">
          Seu Plano Nutricional - {profile.name || 'Usuário'}
        </h1>
        <p className="text-gray-600 mb-6">
          Alimentação personalizada para {profile.goal === 'ganhar-massa' ? 'Ganho de Massa' : 
          profile.goal === 'perder-peso' ? 'Perda de Peso' : 
          profile.goal === 'ganhar-peso' ? 'Ganho de Peso' : 'Manutenção'} • Orçamento: {profile.budget}
        </p>
        
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="weekly">Dieta Semanal</TabsTrigger>
            <TabsTrigger value="calculator">Calculadora</TabsTrigger>
            <TabsTrigger value="water">Hidratação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="space-y-6">
            <WeeklyDietPlan 
              dietData={currentDiet}
              userGoal={profile.goal}
            />
          </TabsContent>
          
          <TabsContent value="calculator" className="space-y-6">
            <MacroCalculator />
          </TabsContent>
          
          <TabsContent value="water" className="space-y-6">
            <WaterIntakeCalculator 
              weight={userWeight}
              activityLevel="moderate"
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default NutritionPage;
