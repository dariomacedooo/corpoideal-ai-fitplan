
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

const TrainingPage = () => {
  const { profile } = useUserProfile();
  const [workoutDays, setWorkoutDays] = useState([]);
  const [customWorkout, setCustomWorkout] = useState([]);

  useEffect(() => {
    if (profile?.goal && profile?.trainingExperience && profile?.trainingLocation) {
      const generatedWorkout = generateWorkoutPlan(
        profile.goal,
        profile.trainingExperience,
        profile.trainingLocation,
        profile.sex,
        profile.healthIssues || []
      );
      setWorkoutDays(generatedWorkout);
    }
  }, [profile]);

  const handleSaveCustomWorkout = (workout: any[]) => {
    setCustomWorkout(workout);
    localStorage.setItem('customWorkout', JSON.stringify(workout));
  };

  const generateWorkoutPlan = (goal: string, experience: string, location: string, sex: string, healthIssues: string[]) => {
    // Considerar problemas de saúde
    const hasKneeProblems = healthIssues.includes('problemas-joelho');
    const hasBackProblems = healthIssues.includes('problemas-coluna');
    const hasHeartProblems = healthIssues.includes('problemas-cardiacos');

    if (sex === 'feminino') {
      return generateFemaleWorkout(goal, experience, location, healthIssues);
    } else {
      return generateMaleWorkout(goal, experience, location, healthIssues);
    }
  };

  const generateFemaleWorkout = (goal: string, experience: string, location: string, healthIssues: string[]) => {
    const hasKneeProblems = healthIssues.includes('problemas-joelho');
    const hasBackProblems = healthIssues.includes('problemas-coluna');

    return [
      {
        day: 'Segunda',
        focus: 'Glúteos e Quadríceps',
        exercises: [
          { 
            name: hasKneeProblems ? 'Agachamento com Cadeira' : 'Agachamento Livre', 
            sets: experience === 'iniciante' ? 3 : 4, 
            reps: '12-15', 
            videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', 
            tip: hasKneeProblems ? 'Use cadeira para apoio' : 'Desça até 90 graus',
            equipment: 'Peso corporal'
          },
          { 
            name: 'Agachamento Búlgaro', 
            sets: 3, 
            reps: '10-12 cada perna', 
            videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE', 
            tip: 'Foque no glúteo da perna da frente',
            equipment: 'Peso corporal'
          },
          { 
            name: 'Ponte de Glúteo', 
            sets: 4, 
            reps: '15-20', 
            videoUrl: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E', 
            tip: 'Aperte o glúteo no topo',
            equipment: 'Peso corporal'
          },
          { 
            name: 'Afundo Lateral', 
            sets: 3, 
            reps: '10-12 cada lado', 
            videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U', 
            tip: 'Mantenha o peso no calcanhar',
            equipment: 'Peso corporal'
          }
        ]
      },
      {
        day: 'Terça',
        focus: 'Superiores e Core',
        exercises: [
          { 
            name: hasBackProblems ? 'Flexão na Parede' : 'Flexão (joelhos)', 
            sets: 3, 
            reps: '8-12', 
            videoUrl: 'https://www.youtube.com/watch?v=jWxvty2KROs', 
            tip: hasBackProblems ? 'Versão mais suave' : 'Comece com joelhos apoiados',
            equipment: 'Peso corporal'
          },
          { 
            name: 'Prancha', 
            sets: 3, 
            reps: '30-45s', 
            videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c', 
            tip: 'Mantenha o corpo reto',
            equipment: 'Peso corporal'
          },
          { 
            name: 'Abdominal Bicicleta', 
            sets: 3, 
            reps: '15 cada lado', 
            videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8', 
            tip: 'Movimento controlado',
            equipment: 'Peso corporal'
          },
          { 
            name: 'Desenvolvimento com Garrafa', 
            sets: 3, 
            reps: '12-15', 
            videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog', 
            tip: 'Use garrafas de água como peso',
            equipment: 'Garrafas de água'
          }
        ]
      },
      {
        day: 'Quinta',
        focus: 'Posteriores e Panturrilhas',
        exercises: [
          { 
            name: hasBackProblems ? 'Stiff com Joelhos Flexionados' : 'Stiff', 
            sets: 3, 
            reps: '12-15', 
            videoUrl: 'https://www.youtube.com/watch?v=1uDiW5-_Jps', 
            tip: hasBackProblems ? 'Joelhos mais flexionados' : 'Sinta o alongamento posterior',
            equipment: 'Peso corporal'
          },
          { 
            name: 'Elevação de Panturrilha', 
            sets: 4, 
            reps: '15-20', 
            videoUrl: 'https://www.youtube.com/watch?v=JJ1TcgVeOyI', 
            tip: 'Use degrau para amplitude',
            equipment: 'Degrau'
          },
          { 
            name: 'Prancha Lateral', 
            sets: 2, 
            reps: '20-30s cada lado', 
            videoUrl: 'https://www.youtube.com/watch?v=K2VljzCC16g', 
            tip: 'Corpo alinhado',
            equipment: 'Peso corporal'
          }
        ]
      }
    ];
  };

  const generateMaleWorkout = (goal: string, experience: string, location: string, healthIssues: string[]) => {
    const hasKneeProblems = healthIssues.includes('problemas-joelho');
    const hasBackProblems = healthIssues.includes('problemas-coluna');
    const hasHeartProblems = healthIssues.includes('problemas-cardiacos');

    if (goal === 'ganhar-massa' || goal === 'ganhar-musculos') {
      return [
        {
          day: 'Segunda',
          focus: 'Peito e Tríceps',
          exercises: [
            { 
              name: 'Flexão', 
              sets: experience === 'avancado' ? 4 : 3, 
              reps: experience === 'avancado' ? '8-12' : '10-15', 
              videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', 
              tip: 'Corpo reto, movimento controlado',
              equipment: 'Peso corporal'
            },
            { 
              name: location === 'academia' ? 'Supino Reto' : 'Flexão Diamante', 
              sets: experience === 'avancado' ? 4 : 3, 
              reps: '8-12', 
              videoUrl: location === 'academia' ? 'https://www.youtube.com/watch?v=gRVjAtPip0Y' : 'https://www.youtube.com/watch?v=J0DnG1_S92I', 
              tip: location === 'academia' ? 'Mantenha ombros retraídos' : 'Foque no tríceps',
              equipment: location === 'academia' ? 'Barra e banco' : 'Peso corporal'
            },
            { 
              name: hasHeartProblems ? 'Tríceps na Cadeira (leve)' : 'Tríceps na Cadeira', 
              sets: 3, 
              reps: hasHeartProblems ? '15-20' : '10-15', 
              videoUrl: 'https://www.youtube.com/watch?v=0326dy_-CzM', 
              tip: hasHeartProblems ? 'Movimento mais lento' : 'Desça controladamente',
              equipment: 'Cadeira'
            }
          ]
        },
        {
          day: 'Terça',
          focus: 'Costas e Bíceps',
          exercises: [
            { 
              name: hasBackProblems ? 'Remada com Elástico (sentado)' : 'Remada Curvada', 
              sets: 3, 
              reps: '10-12', 
              videoUrl: hasBackProblems ? 'https://www.youtube.com/watch?v=IOUx0EQUAO0' : 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ', 
              tip: hasBackProblems ? 'Mantenha coluna reta' : 'Aperte as escápulas',
              equipment: hasBackProblems ? 'Elástico' : location === 'academia' ? 'Barra' : 'Halteres'
            },
            { 
              name: location === 'academia' ? 'Pulldown' : 'Remada com Elástico', 
              sets: 3, 
              reps: '10-12', 
              videoUrl: location === 'academia' ? 'https://www.youtube.com/watch?v=CAwf7n6Luuc' : 'https://www.youtube.com/watch?v=IOUx0EQUAO0', 
              tip: 'Leve até o peito',
              equipment: location === 'academia' ? 'Puxador' : 'Elástico'
            }
          ]
        },
        {
          day: 'Quinta',
          focus: 'Pernas',
          exercises: [
            { 
              name: hasKneeProblems ? 'Agachamento com Cadeira' : 'Agachamento', 
              sets: experience === 'avancado' ? 4 : 3, 
              reps: '10-12', 
              videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM', 
              tip: hasKneeProblems ? 'Use cadeira para apoio' : 'Desça até 90 graus',
              equipment: location === 'academia' ? 'Barra' : 'Peso corporal'
            },
            { 
              name: 'Afundo', 
              sets: 3, 
              reps: '10-12 cada perna', 
              videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U', 
              tip: 'Joelho não passa da ponta do pé',
              equipment: 'Peso corporal'
            }
          ]
        }
      ];
    }
    
    // Para outros objetivos, retornar treino adaptado
    return generateMaintenanceWorkout(experience, location, healthIssues);
  };

  const generateMaintenanceWorkout = (experience: string, location: string, healthIssues: string[]) => {
    const hasHeartProblems = healthIssues.includes('problemas-cardiacos');
    
    return [
      {
        day: 'Segunda',
        focus: 'Upper Body',
        exercises: [
          { 
            name: 'Flexão', 
            sets: hasHeartProblems ? 2 : 3, 
            reps: hasHeartProblems ? '10-12' : '10-15', 
            videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4', 
            tip: hasHeartProblems ? 'Ritmo mais lento' : 'Forma perfeita',
            equipment: 'Peso corporal'
          }
        ]
      }
    ];
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
          {isFemale && ` • Foco Feminino`}
        </p>
        
        <Tabs defaultValue="scientific" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card-soft rounded-2xl p-1 shadow-subtle">
            <TabsTrigger 
              value="scientific"
              className="rounded-xl font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-vibrant data-[state=active]:to-purple-deep data-[state=active]:text-white data-[state=active]:shadow-modern transition-all duration-200"
            >
              Treino Científico
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
          
          <TabsContent value="scientific" className="mt-6">
            {isFemale ? (
              <FemaleWorkoutPlan 
                age={userAge}
                experience={profile.trainingExperience}
                goal={profile.goal}
                hormonePhase="folicular"
              />
            ) : (
              <ScientificWorkoutPlan 
                goal={profile.goal}
                trainingLocation={profile.trainingLocation}
                experience={profile.trainingExperience}
                daysPerWeek={3}
              />
            )}
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
