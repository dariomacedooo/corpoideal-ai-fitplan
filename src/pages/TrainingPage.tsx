
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { WorkoutPlan } from "@/components/training/WorkoutPlan";
import { LoadProgress } from "@/components/training/LoadProgress";
import { WorkoutCustomizer } from "@/components/training/WorkoutCustomizer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScientificWorkoutPlan } from "@/components/training/ScientificWorkoutPlan";
import { FemaleWorkoutPlan } from "@/components/training/FemaleWorkoutPlan";
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { generateWorkoutPlan } from "@/utils/workoutGenerator";

const TrainingPage = () => {
  const { profile } = useUserProfile();
  const [workoutDays, setWorkoutDays] = useState([]);
  const [customWorkout, setCustomWorkout] = useState([]);

  useEffect(() => {
    if (profile?.goal && profile?.trainingExperience && profile?.trainingLocation && profile?.trainingDays) {
      const generatedWorkout = generateWorkoutPlan(
        profile.goal,
        profile.trainingExperience,
        profile.trainingLocation,
        profile.sex,
        profile.healthIssues || [],
        profile.trainingDays || ['segunda', 'quarta', 'sexta']
      );
      setWorkoutDays(generatedWorkout);
    }
  }, [profile]);

  const handleSaveCustomWorkout = (workout: any[]) => {
    setCustomWorkout(workout);
    localStorage.setItem('customWorkout', JSON.stringify(workout));
  };

  const isFemale = profile?.sex === 'feminino';
  const userAge = profile?.age ? parseInt(profile.age, 10) : 25;

  if (!profile) {
    return (
      <div className="pb-16 pt-14">
        <AppHeader />
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Seu Plano de Treino</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Complete seu perfil primeiro para ver seu plano personalizado.
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="pb-16 pt-14 bg-background min-h-screen">
      <AppHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Treino - {profile.name || 'Usuário'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Treino personalizado para {profile.goal === 'ganhar-massa' ? 'Ganho de Massa' : 
          profile.goal === 'perder-peso' ? 'Perda de Peso' : 
          profile.goal === 'ganhar-peso' ? 'Ganho de Peso' : 'Manutenção'} • Nível {profile.trainingExperience}
          {isFemale && ` • Foco Feminino`} • Dias: {profile.trainingDays?.join(', ') || 'Seg/Qua/Sex'}
        </p>
        
        <Tabs defaultValue="generated" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card-soft rounded-2xl p-1 shadow-subtle">
            <TabsTrigger 
              value="generated"
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Seu Treino
            </TabsTrigger>
            <TabsTrigger 
              value="customizer" 
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Personalizar
            </TabsTrigger>
            <TabsTrigger 
              value="progress"
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Progresso
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generated" className="mt-6">
            <WorkoutPlan workoutDays={workoutDays} />
          </TabsContent>
          
          <TabsContent value="customizer" className="mt-6">
            <WorkoutCustomizer 
              initialWorkout={customWorkout}
              onSaveWorkout={handleSaveCustomWorkout}
              isVisible={true}
            />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-6">
            <LoadProgress />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default TrainingPage;
