
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  videoUrl: string;
  tip: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

interface WorkoutPlanProps {
  goal: string;
  workoutDays: WorkoutDay[];
}

export function WorkoutPlan({ goal, workoutDays }: WorkoutPlanProps) {
  const getGoalText = () => {
    switch (goal) {
      case 'perder-peso':
        return 'Perder Peso';
      case 'ganhar-massa':
        return 'Ganhar Massa Muscular';
      case 'corrigir-postura':
        return 'Corrigir Postura';
      default:
        return 'Personalizado';
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple">Plano de Treino</CardTitle>
          <Badge variant="outline">{getGoalText()}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={workoutDays[0].day.toLowerCase()}>
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
                  <div key={index} className="workout-card">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{exercise.name}</h4>
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
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
