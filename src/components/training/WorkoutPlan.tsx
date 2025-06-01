
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell } from "lucide-react";
import { calculateMenstrualPhase } from "@/utils/workoutGenerator";
import { useToast } from "@/components/ui/use-toast";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  videoUrl: string;
  tip: string;
  equipment?: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

interface WorkoutPlanProps {
  goal: string;
  workoutDays: WorkoutDay[];
  trainingLocation: string;
  experience: string;
  userName?: string;
  menstrualData?: {
    tracking: boolean;
    cycleLength: string;
    lastPeriod: string;
  }
}

export function WorkoutPlan({ 
  goal, 
  workoutDays, 
  trainingLocation, 
  experience,
  userName,
  menstrualData 
}: WorkoutPlanProps) {
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const { toast } = useToast();
  
  // Calculate menstrual phase if data is available
  useEffect(() => {
    if (menstrualData?.tracking && menstrualData.lastPeriod && menstrualData.cycleLength) {
      const phase = calculateMenstrualPhase(
        menstrualData.lastPeriod, 
        parseInt(menstrualData.cycleLength)
      );
      setCurrentPhase(phase);
    }
  }, [menstrualData]);

  // Show motivational message with user name when component mounts
  useEffect(() => {
    if (userName) {
      const messages = [
        `Vamos lá, ${userName}! Hoje é dia de superar seus limites.`,
        `${userName}, cada treino te aproxima mais dos seus objetivos!`,
        `Lembre-se ${userName}, consistência é a chave do sucesso.`,
        `${userName}, seu corpo agradece por cada esforço que você faz.`
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      setTimeout(() => {
        toast({
          title: "Mensagem motivacional",
          description: randomMessage
        });
      }, 1500);
    }
  }, [userName, toast]);

  const getGoalText = () => {
    switch (goal) {
      case 'perder-peso':
        return 'Perder Peso';
      case 'ganhar-massa':
      case 'ganhar-musculos':
        return 'Ganhar Massa Muscular';
      case 'corrigir-postura':
        return 'Corrigir Postura';
      case 'ganhar-peso':
        return 'Ganhar Peso';
      case 'manter-peso':
        return 'Manter Peso';
      default:
        return 'Personalizado';
    }
  };

  const getLocationText = () => {
    switch (trainingLocation) {
      case 'academia':
        return 'Academia';
      case 'casa':
        return 'Em Casa';
      case 'ar-livre':
      case 'arlivre':
        return 'Ao Ar Livre';
      case 'misto':
        return 'Locais Variados';
      default:
        return trainingLocation;
    }
  };

  const getExperienceText = () => {
    switch (experience) {
      case 'iniciante':
        return 'Iniciante';
      case 'intermediario':
        return 'Intermediário';
      case 'avancado':
        return 'Avançado';
      default:
        return experience;
    }
  };

  // Get location-specific instructions
  const getTrainingLocationInstructions = () => {
    switch (trainingLocation) {
      case 'academia':
        return (
          <>
            <li>Utilize máquinas e equipamentos específicos para melhorar o isolamento muscular</li>
            <li>Execute com amplitude completa dos movimentos para maior ativação muscular</li>
            <li>Utilize técnicas avançadas como drop-sets e super-sets quando indicado</li>
            <li>Ajuste corretamente as máquinas para sua altura e proporções corporais</li>
          </>
        );
      case 'casa':
        return (
          <>
            <li>Utilize móveis estáveis como cadeiras e mesas para apoio quando necessário</li>
            <li>Improvise pesos com garrafas d'água, mochilas ou outros objetos</li>
            <li>Foque na correta execução e controle dos movimentos</li>
            <li>Utilize variações mais desafiadoras dos exercícios para aumentar a intensidade</li>
          </>
        );
      case 'arlivre':
      case 'ar-livre':
        return (
          <>
            <li>Utilize o ambiente e mobiliário público como apoio (bancos, barras, etc)</li>
            <li>Realize atividades cardiovasculares entre os exercícios para maior queima calórica</li>
            <li>Adapte os exercícios conforme as condições climáticas</li>
            <li>Traga elásticos ou outros equipamentos leves para aumentar a resistência</li>
          </>
        );
      default:
        return (
          <>
            <li>Adapte os exercícios ao ambiente disponível</li>
            <li>Foque na execução correta e controle da respiração</li>
            <li>Ajuste a intensidade conforme sua capacidade atual</li>
          </>
        );
    }
  };

  // Get menstrual cycle phase specific advice if applicable
  const getMenstrualPhaseAdvice = () => {
    if (!currentPhase) return null;
    
    switch (currentPhase) {
      case 'menstrual':
        return (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
            <h4 className="text-sm font-medium text-red-800 mb-1">
              Fase Menstrual (Dias 1-5)
            </h4>
            <p className="text-xs text-red-700 mb-2">
              Durante esta fase, seu corpo pode estar mais sensível e os níveis de energia mais baixos.
            </p>
            <ul className="text-xs text-red-700 space-y-1 pl-4 list-disc">
              <li>Reduza a intensidade dos treinos em 20-30%</li>
              <li>Foque em exercícios de mobilidade e recuperação ativa</li>
              <li>Evite treinos HIIT de alta intensidade</li>
              <li>Priorize o descanso adequado entre séries</li>
            </ul>
          </div>
        );
      case 'follicular':
        return (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
            <h4 className="text-sm font-medium text-green-800 mb-1">
              Fase Folicular (Dias 6-11)
            </h4>
            <p className="text-xs text-green-700 mb-2">
              Esta é uma ótima fase para treinos de força e alta intensidade.
            </p>
            <ul className="text-xs text-green-700 space-y-1 pl-4 list-disc">
              <li>Aproveite o aumento nos níveis de energia para treinos mais intensos</li>
              <li>Foco em treinos de força e hipertrofia</li>
              <li>Bom momento para tentar novos exercícios ou aumentar cargas</li>
              <li>Recuperação tende a ser mais eficiente nesta fase</li>
            </ul>
          </div>
        );
      case 'ovulation':
        return (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-1">
              Fase de Ovulação (Dias 12-16)
            </h4>
            <p className="text-xs text-blue-700 mb-2">
              Momento de pico de energia e força, aproveite para treinos desafiadores.
            </p>
            <ul className="text-xs text-blue-700 space-y-1 pl-4 list-disc">
              <li>Aproveite o pico de testosterona para treinos de força máxima</li>
              <li>Ideal para tentar superar recordes pessoais</li>
              <li>Boa fase para treinos de alta intensidade (HIIT)</li>
              <li>Mantenha boa hidratação pois a temperatura corporal está elevada</li>
            </ul>
          </div>
        );
      case 'luteal':
        return (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <h4 className="text-sm font-medium text-yellow-800 mb-1">
              Fase Lútea (Dias 17-28)
            </h4>
            <p className="text-xs text-yellow-700 mb-2">
              Nesta fase, seu corpo queima mais calorias e utiliza mais gordura como energia.
            </p>
            <ul className="text-xs text-yellow-700 space-y-1 pl-4 list-disc">
              <li>Foque em treinos de resistência e de intensidade moderada</li>
              <li>Ótima fase para treinos cardiovasculares de longa duração</li>
              <li>Reduza gradualmente a intensidade conforme se aproxima da próxima menstruação</li>
              <li>Dê atenção extra à recuperação e hidratação</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <Dumbbell className="h-5 w-5 mr-2" />
            Plano de Treino
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{getGoalText()}</Badge>
            <Badge variant="secondary">{getLocationText()}</Badge>
            <Badge variant="secondary">{getExperienceText()}</Badge>
            {currentPhase && (
              <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                Fase {
                  currentPhase === 'menstrual' ? 'Menstrual' :
                  currentPhase === 'follicular' ? 'Folicular' :
                  currentPhase === 'ovulation' ? 'Ovulatória' : 'Lútea'
                }
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={workoutDays[0]?.day.toLowerCase()}>
          <TabsList className="grid grid-cols-7 mb-4">
            {workoutDays.map((day) => (
              <TabsTrigger key={day.day} value={day.day.toLowerCase()}>
                {day.day.charAt(0)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {workoutDays.map((day) => (
            <TabsContent key={day.day} value={day.day.toLowerCase()} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{day.day}</h3>
                <span className="text-sm text-gray-500">Foco: {day.focus}</span>
              </div>
              
              <div className="space-y-4">
                {day.exercises.map((exercise, index) => (
                  <div key={index} className="workout-card p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{exercise.name}</h4>
                        {exercise.equipment && (
                          <span className="text-xs text-gray-500 block mt-1">
                            Equipamento: {exercise.equipment}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-corpoideal-purple font-medium">
                        {exercise.sets} x {exercise.reps}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-3">{exercise.tip}</p>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => window.open(exercise.videoUrl, '_blank')}
                    >
                      Ver demonstração
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-corpoideal-purple mb-2">
                  Orientações para {day.focus}:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1 pl-4 list-disc">
                  {goal === 'ganhar-massa' || goal === 'ganhar-musculos' ? (
                    <>
                      <li>Descanso de 60-90 segundos entre as séries</li>
                      <li>Execute os movimentos com controle e boa forma</li>
                      <li>Aumente a carga progressivamente conforme sentir facilidade</li>
                      <li>Consumo de proteína após o treino é recomendado</li>
                      {getTrainingLocationInstructions()}
                    </>
                  ) : (
                    <>
                      <li>Descanso de 30-45 segundos entre as séries</li>
                      <li>Mantenha o ritmo constante e a forma correta</li>
                      <li>Foque na intensidade e no controle da respiração</li>
                      {getTrainingLocationInstructions()}
                    </>
                  )}
                </ul>
              </div>
              
              {/* Show menstrual phase advice if applicable */}
              {getMenstrualPhaseAdvice()}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
