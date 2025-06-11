
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { WeeklyDietPlan } from "@/components/nutrition/WeeklyDietPlan";
import { WaterIntakeCalculator } from "@/components/nutrition/WaterIntakeCalculator";
import { MacroCalculator } from "@/components/nutrition/MacroCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { weeklyDiets } from "@/data/weeklyDiets";
import { useNavigate } from "react-router-dom";

const NutritionPage = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const [userWeight, setUserWeight] = useState<number>(70);
  
  useEffect(() => {
    // Check if analysis is completed to allow access
    const analysisCompleted = localStorage.getItem('analysisCompleted') === 'true';
    
    if (!analysisCompleted) {
      navigate('/');
      return;
    }

    if (profile?.weight) {
      setUserWeight(parseInt(profile.weight));
    }
  }, [profile, navigate]);

  // Get diet based on user goal and consider allergies/health issues
  const getUserDiet = () => {
    if (!profile?.goal) return weeklyDiets[0];
    
    let goalBasedDiet = weeklyDiets.find(diet => diet.goal === profile.goal) || weeklyDiets[0];
    
    // Filter foods based on allergies and health issues
    if (profile.healthIssues && profile.healthIssues.length > 0) {
      goalBasedDiet = filterDietForHealthIssues(goalBasedDiet, profile.healthIssues);
    }
    
    return goalBasedDiet;
  };

  const filterDietForHealthIssues = (diet: any, healthIssues: string[]) => {
    const filteredDiet = { ...diet };
    
    // Foods to avoid based on health issues
    const avoidanceMap: Record<string, string[]> = {
      'diabetes': ['açúcar', 'doce', 'refrigerante', 'mel', 'bolo'],
      'hipertensao': ['sal', 'sódio', 'embutidos', 'bacon', 'linguiça'],
      'colesterol-alto': ['ovo (gema)', 'bacon', 'linguiça', 'queijo gordo', 'manteiga'],
      'lactose': ['leite', 'queijo', 'iogurte', 'manteiga', 'creme de leite'],
      'gluten': ['pão', 'macarrão', 'trigo', 'aveia', 'centeio'],
      'problemas-cardiacos': ['sal', 'sódio', 'gordura trans', 'fritura']
    };

    Object.keys(filteredDiet.days).forEach(day => {
      filteredDiet.days[day].meals = filteredDiet.days[day].meals.map((meal: any) => ({
        ...meal,
        foods: meal.foods.filter((food: any) => {
          const foodName = food.name.toLowerCase();
          return !healthIssues.some(issue => {
            const avoidList = avoidanceMap[issue] || [];
            return avoidList.some(avoid => foodName.includes(avoid.toLowerCase()));
          });
        })
      }));
    });

    return filteredDiet;
  };

  const currentDiet = getUserDiet();
  const usePersonalizedPlan = localStorage.getItem('usePersonalizedPlan') === 'true';

  if (!profile) {
    return (
      <div className="pb-16 pt-14">
        <AppHeader />
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Seu Plano Nutricional</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Complete seu perfil primeiro para ver seu plano personalizado.
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="pb-16 pt-14 bg-background">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Plano Nutricional - {profile.name || 'Usuário'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {usePersonalizedPlan ? 'Dieta IA Personalizada' : 'Dieta Científica Personalizada'} para {profile.goal === 'ganhar-massa' ? 'Ganho de Massa' : 
          profile.goal === 'perder-peso' ? 'Perda de Peso' : 
          profile.goal === 'ganhar-peso' ? 'Ganho de Peso' : 'Manutenção'} • Orçamento: {profile.budget}
        </p>
        
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full bg-card-soft rounded-2xl p-1 shadow-subtle">
            <TabsTrigger 
              value="weekly"
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              {usePersonalizedPlan ? 'Dieta IA' : 'Dieta Base'}
            </TabsTrigger>
            <TabsTrigger 
              value="calculator"
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Calculadora
            </TabsTrigger>
            <TabsTrigger 
              value="water"
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Hidratação
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="space-y-6">
            <WeeklyDietPlan 
              dietData={currentDiet}
              userGoal={profile.goal}
            />
          </TabsContent>
          
          <TabsContent value="calculator" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-modern p-6">
              <MacroCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="water" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-modern p-6">
              <WaterIntakeCalculator 
                weight={userWeight}
                activityLevel="moderate"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default NutritionPage;
