
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell } from "lucide-react";

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
}

export function WorkoutPlan({ goal, workoutDays, trainingLocation, experience }: WorkoutPlanProps) {
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
        return 'Ao Ar Livre';
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

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <Dumbbell className="h-5 w-5 mr-2" />
            Plano de Treino
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{getGoalText()}</Badge>
            <Badge variant="secondary">{getLocationText()}</Badge>
            <Badge variant="secondary">{getExperienceText()}</Badge>
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
                    </>
                  ) : (
                    <>
                      <li>Descanso de 30-45 segundos entre as séries</li>
                      <li>Mantenha o ritmo constante e a forma correta</li>
                      <li>Foque na intensidade e no controle da respiração</li>
                    </>
                  )}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
