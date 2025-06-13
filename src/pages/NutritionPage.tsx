import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { WeeklyDietPlan } from "@/components/nutrition/WeeklyDietPlan";
import { WaterIntakeCalculator } from "@/components/nutrition/WaterIntakeCalculator";
import { MacroCalculator } from "@/components/nutrition/MacroCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { weeklyDiets } from "@/data/weeklyDiets";
import { useNavigate } from "react-router-dom";
import { estimateNutritionValues } from "@/utils/nutritionCalculator";
import { Skeleton } from "@/components/ui/skeleton";

const NutritionPage = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const [userWeight, setUserWeight] = useState<number>(70);

  // Estados para controlar os dados e o carregamento
  const [processedDietData, setProcessedDietData] = useState<any | null>(null);
  const [isDietLoading, setIsDietLoading] = useState(true);

  // NOVO: console.log para verificar o profile
  console.log("Perfil do usuário:", profile);

  useEffect(() => {
    const analysisCompleted = localStorage.getItem('analysisCompleted') === 'true';
    if (!analysisCompleted) {
      navigate('/');
      return;
    }
    if (profile?.weight) {
      setUserWeight(parseInt(profile.weight));
    }
  }, [profile, navigate]);

  const filterDietForHealthIssues = (diet: any, healthIssues: string[]) => {
    const filteredDiet = { ...diet };
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
          return !healthIssues.some(issue => (avoidanceMap[issue] || []).some(avoid => foodName.includes(avoid.toLowerCase())));
        })
      }));
    });
    return filteredDiet;
  };

  // CORRIGIDO: useMemo agora inclui a lógica de orçamento
  const currentDiet = useMemo(() => {
    // NOVO: console.log para verificar se o useMemo é acionado
    console.log("Calculando currentDiet...");
    if (!profile?.goal) {
       console.log("Profile ou goal nulo, retornando null para currentDiet.");
       return null;
    }

    // 1. Filtra todas as dietas que correspondem ao OBJETIVO do usuário
    const goalMatchingDiets = weeklyDiets.filter(diet => diet.goal === profile.goal);
    console.log("Dietas que correspondem ao objetivo:", goalMatchingDiets);

    if (goalMatchingDiets.length === 0) {
      console.log("Nenhuma dieta encontrada para o objetivo, retornando weeklyDiets[0].");
      return weeklyDiets[0]; // Retorna uma dieta padrão se nenhuma corresponder ao objetivo
    }

    // 2. Agora, filtra por ORÇAMENTO
    const userBudget = profile.budget || '151-250'; // Orçamento padrão se não houver um
    console.log("Orçamento do usuário:", userBudget);

    const budgetRanges: Record<string, number> = {
      '80-150': 1,
      '151-250': 2,
      '251-400': 3,
      '400+': 4,
    };

    const userBudgetLevel = budgetRanges[userBudget] || 2;
    console.log("Nível de orçamento do usuário:", userBudgetLevel);


    // Filtra as dietas que o usuário "pode pagar"
    const compatibleDiets = goalMatchingDiets.filter(diet => {
      if (!diet.budget) return true; // Se a dieta não tem orçamento, é para todos
      const dietBudgetLevel = budgetRanges[diet.budget] || 2;
      return userBudgetLevel >= dietBudgetLevel;
    });
    console.log("Dietas compatíveis com o orçamento:", compatibleDiets);


    // 3. Seleciona a melhor dieta compatível (a mais cara que ele pode pagar)
    let bestMatch = compatibleDiets.sort((a, b) => {
        const levelA = budgetRanges[a.budget as keyof typeof budgetRanges] || 0;
        const levelB = budgetRanges[b.budget as keyof typeof budgetRanges] || 0;
        return levelB - levelA; // Ordena da mais "cara" para a mais "barata"
    })[0];

    // Se nenhuma dieta compatível foi encontrada, usa a primeira do objetivo
    let finalDiet = bestMatch || goalMatchingDiets[0];
    console.log("Melhor dieta selecionada (pré-filtro de saúde):", finalDiet);


    // 4. Aplica o filtro de problemas de saúde
    if (profile.healthIssues && profile.healthIssues.length > 0) {
      console.log("Aplicando filtro de saúde para:", profile.healthIssues);
      finalDiet = filterDietForHealthIssues(finalDiet, profile.healthIssues);
      console.log("Dieta após filtro de saúde:", finalDiet);
    }

    return finalDiet;
  }, [profile]); // Depende do profile

  // CORRIGIDO: Este useEffect agora executa a busca de dados real.
  useEffect(() => {
    // NOVO: console.log para verificar se o useEffect de processamento é acionado
    console.log("useEffect de processamento da dieta acionado. currentDiet:", currentDiet);

    const processAndSetDiet = async () => {
      if (!currentDiet) {
        console.log("currentDiet é nulo, pulando processamento.");
        setIsDietLoading(false); // Garante que o loading state seja falso se não houver dieta
        return;
      }

      console.log("Iniciando processamento assíncrono da dieta.");
      setIsDietLoading(true);

      // Copia profunda para não modificar o objeto original
      const dietToProcess = JSON.parse(JSON.stringify(currentDiet));
      console.log("Cópia da dieta para processar:", dietToProcess);


      try {
        for (const dayKey of Object.keys(dietToProcess.days)) {
          const day = dietToProcess.days[dayKey];
          console.log("Processando dia:", dayKey);
          for (const meal of day.meals) {
             console.log("  Processando refeição:", meal.name);
            meal.foods = await Promise.all(
              meal.foods.map(async (food: any) => {
                console.log("    Buscando nutrição para:", food.name, food.portion);
                const nutrition = await estimateNutritionValues(food.name, food.portion);
                console.log("    Resultado da API para", food.name, ":", nutrition);
                return { ...food, ...nutrition };
              })
            );
             console.log("  Refeição processada:", meal);
          }
           console.log("Dia processado:", day);
        }
        console.log("Processamento da dieta concluído. Dieta processada:", dietToProcess);
        setProcessedDietData(dietToProcess);
      } catch (error) {
        console.error("Falha ao processar os dados da dieta:", error);
        setProcessedDietData(null); // Define como nulo em caso de erro
      } finally {
        console.log("Processamento da dieta finalizado. isLoading = false");
        setIsDietLoading(false);
      }
    };

    processAndSetDiet();
  }, [currentDiet]); // Depende do currentDiet

  const usePersonalizedPlan = localStorage.getItem('usePersonalizedPlan') === 'true';

  if (!profile) {
    console.log("Profile nulo, exibindo mensagem para completar perfil.");
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

  // NOVO: Renderização condicional com loading
  console.log("Renderizando página de nutrição. isDietLoading:", isDietLoading, "processedDietData:", processedDietData);
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
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state-active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
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
            {isDietLoading ? (
               <div className="space-y-4">
                 <Skeleton className="h-32 w-full" />
                 <Skeleton className="h-32 w-full" />
                 <Skeleton className="h-32 w-full" />
               </div>
            ) : processedDietData ? (
              <WeeklyDietPlan
                dietData={processedDietData}
                userGoal={profile.goal || 'manter-peso'}
              />
            ) : (
              <p className="text-center text-red-500">Ocorreu um erro ao carregar a dieta. Tente novamente.</p>
            )}
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
