
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { WorkoutPlan } from "@/components/training/WorkoutPlan";
import { LoadProgress } from "@/components/training/LoadProgress";
import { WorkoutCustomizer } from "@/components/training/WorkoutCustomizer";
import { ScientificWorkoutPlan } from "@/components/training/ScientificWorkoutPlan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { generateWorkoutPlan } from "@/utils/workoutGenerator";
import { useNavigate } from "react-router-dom";

const TrainingPage = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const [workoutDays, setWorkoutDays] = useState([]);
  const [customWorkout, setCustomWorkout] = useState([]);

  useEffect(() => {
    // Check if analysis is completed to allow access
    const analysisCompleted = localStorage.getItem('analysisCompleted') === 'true';
    
    if (!analysisCompleted) {
      navigate('/');
      return;
    }

    // Load generated workout plan if available
    const savedGeneratedWorkout = localStorage.getItem('generatedWorkoutPlan');
    if (savedGeneratedWorkout) {
      setWorkoutDays(JSON.parse(savedGeneratedWorkout));
    } else if (profile?.goal && profile?.trainingExperience && profile?.trainingLocation && profile?.trainingDays) {
      // Generate workout if not already generated
      const userPhotos = {
        front: localStorage.getItem('frontPhotoUrl'),
        back: localStorage.getItem('backPhotoUrl'),
        leftSide: localStorage.getItem('leftSidePhotoUrl'),
        rightSide: localStorage.getItem('rightSidePhotoUrl')
      };
      
      const generatedWorkout = generateWorkoutPlan(
        profile.goal,
        profile.trainingExperience,
        profile.trainingLocation,
        profile.sex,
        profile.age ? Number(profile.age) : 25,
        profile.trainingDays || ['segunda', 'quarta', 'sexta']
      );
      setWorkoutDays(generatedWorkout);
      
      // Save generated workout for future use
      localStorage.setItem('generatedWorkoutPlan', JSON.stringify(generatedWorkout));
    }
  }, [profile, navigate]);

  const handleSaveCustomWorkout = (workout: any[]) => {
    setCustomWorkout(workout);
    localStorage.setItem('customWorkout', JSON.stringify(workout));
  };

  const usePersonalizedPlan = localStorage.getItem('usePersonalizedPlan') === 'true';

  if (!profile) {
    return (
      <div className="pb-16 pt-14">
        <AppHeader />
        <div className="px-3 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Seu Plano de Treino</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
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
      
      <div className="px-3 py-4">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Treino - {profile.name || 'Usuário'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {usePersonalizedPlan ? 'Treino IA Personalizado' : 'Treino Científico Personalizado'} para {profile.goal === 'ganhar-massa' ? 'Ganho de Massa' : 
          profile.goal === 'perder-peso' ? 'Perda de Peso' : 
          profile.goal === 'ganhar-peso' ? 'Ganho de Peso' : 'Manutenção'} • Nível {profile.trainingExperience}
          {profile.sex === 'feminino' && ` • Foco Feminino`} • Dias: {profile.trainingDays?.join(', ') || 'Seg/Qua/Sex'}
        </p>
        
        <Tabs defaultValue="generated" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card-soft rounded-2xl p-1 shadow-subtle">
            <TabsTrigger 
              value="generated"
              className="rounded-xl font-medium text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              {usePersonalizedPlan ? 'Treino IA' : 'Treino Base'}
            </TabsTrigger>
            <TabsTrigger 
              value="scientific" 
              className="rounded-xl font-medium text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Plano Científico
            </TabsTrigger>
             <TabsTrigger 
              value="customizer" 
              className="rounded-xl font-medium text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Científico
            </TabsTrigger>
            <TabsTrigger 
              value="progress"
              className="rounded-xl font-medium text-xs lg:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Progresso
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generated" className="mt-4">
            <WorkoutPlan 
              goal={profile.goal || 'manter-peso'}
              workoutDays={workoutDays}
              trainingLocation={profile.trainingLocation || 'academia'}
              experience={profile.trainingExperience || 'iniciante'}
            />
          </TabsContent>
          
          <TabsContent value="customizer" className="mt-4">
            <WorkoutCustomizer
 initialWorkout={customWorkout}
 onSaveWorkout={handleSaveCustomWorkout}
 isVisible={true}
            />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-4">
            <LoadProgress />
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default TrainingPage;
