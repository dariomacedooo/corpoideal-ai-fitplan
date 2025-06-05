
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Target, TrendingUp, Clock, BookOpen, AlertTriangle } from "lucide-react";
import { trainingLevels, getTrainingSplit, calculateWeeklyVolume } from "@/utils/trainingCalculator";
import { generateScientificWorkout } from "@/data/scientificWorkouts";
import { LoadManager } from "./LoadManager";

interface ScientificWorkoutPlanProps {
  goal: string;
  trainingLocation: string;
  experience: string;
  daysPerWeek?: number;
}

export function ScientificWorkoutPlan({ 
  goal, 
  trainingLocation, 
  experience,
  daysPerWeek = 5 
}: ScientificWorkoutPlanProps) {
  const level = trainingLevels[experience] || trainingLevels.iniciante;
  const split = getTrainingSplit(daysPerWeek);
  const workoutDays = generateScientificWorkout(experience, trainingLocation, goal, daysPerWeek);
  
  const getGoalText = () => {
    switch (goal) {
      case 'perder-peso': return 'Perder Peso';
      case 'ganhar-massa':
      case 'ganhar-musculos': return 'Ganhar Massa Muscular';
      case 'corrigir-postura': return 'Corrigir Postura';
      case 'ganhar-peso': return 'Ganhar Peso';
      case 'manter-peso': return 'Manter Peso';
      default: return 'Personalizado';
    }
  };

  const getLocationText = () => {
    switch (trainingLocation) {
      case 'academia': return 'Academia';
      case 'casa': return 'Em Casa';
      case 'ar-livre': return 'Ao Ar Livre';
      default: return trainingLocation;
    }
  };

  // Calculate total weekly volume
  const totalWeeklyVolume = workoutDays.reduce((total, day) => ({
    chest: total.chest + day.totalVolume.chest,
    back: total.back + day.totalVolume.back,
    shoulders: total.shoulders + day.totalVolume.shoulders,
    arms: total.arms + day.totalVolume.arms,
    legs: total.legs + day.totalVolume.legs,
  }), { chest: 0, back: 0, shoulders: 0, arms: 0, legs: 0 });

  const getVolumeStatus = (current: number, target: [number, number]) => {
    if (current < target[0]) return { status: 'low', color: 'bg-yellow-500' };
    if (current > target[1]) return { status: 'high', color: 'bg-red-500' };
    return { status: 'optimal', color: 'bg-green-500' };
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Treino Científico - Brad Schoenfeld
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{getGoalText()}</Badge>
            <Badge variant="secondary">{getLocationText()}</Badge>
            <Badge variant="secondary">{level.name}</Badge>
          </div>
        </div>

        {/* Training Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <Target className="h-4 w-4 mr-2 text-corpoideal-purple" />
              <span className="text-sm font-medium">Divisão</span>
            </div>
            <span className="text-sm font-bold">{split.type}</span>
            <p className="text-xs text-gray-600">{split.description}</p>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-4 w-4 mr-2 text-corpoideal-purple" />
              <span className="text-sm font-medium">Frequência</span>
            </div>
            <span className="text-sm font-bold">{daysPerWeek}x/semana</span>
            <p className="text-xs text-gray-600">Cada músculo {split.muscleFrequency}x</p>
          </div>

          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 mr-2 text-corpoideal-purple" />
              <span className="text-sm font-medium">RIR/RPE</span>
            </div>
            <span className="text-sm font-bold">{level.rir}</span>
            <p className="text-xs text-gray-600">Reserva de reps</p>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="flex items-center mb-2">
              <Dumbbell className="h-4 w-4 mr-2 text-corpoideal-purple" />
              <span className="text-sm font-medium">Progressão</span>
            </div>
            <span className="text-xs text-gray-700">{level.progressionStrategy}</span>
          </div>
        </div>

        {/* Weekly Volume Analysis */}
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-4">
          <h4 className="text-sm font-bold text-corpoideal-purple mb-3">Volume Semanal por Grupo Muscular</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(level.volumeRanges).map(([muscle, range]) => {
              const current = totalWeeklyVolume[muscle as keyof typeof totalWeeklyVolume];
              const volumeStatus = getVolumeStatus(current, range);
              const percentage = (current / range[1]) * 100;
              
              return (
                <div key={muscle} className="text-center">
                  <div className="text-xs font-medium mb-1 capitalize">{muscle === 'chest' ? 'Peito' : muscle === 'back' ? 'Costas' : muscle === 'shoulders' ? 'Ombros' : muscle === 'arms' ? 'Braços' : 'Pernas'}</div>
                  <Progress value={Math.min(percentage, 100)} className="h-2 mb-1" />
                  <div className="text-xs">
                    <span className="font-bold">{current}</span>
                    <span className="text-gray-500">/{range[0]}-{range[1]}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${volumeStatus.color}`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scientific Methodology */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
          <h4 className="text-sm font-bold text-corpoideal-purple mb-1">Metodologia Científica:</h4>
          <p className="text-xs text-gray-700">
            Baseado nas pesquisas de Brad Schoenfeld sobre hipertrofia, volume de treino otimizado, 
            periodização e técnicas de intensidade para máxima resposta adaptativa.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue={workoutDays[0]?.day.toLowerCase()}>
          <TabsList className="grid grid-cols-6 mb-4">
            {workoutDays.slice(0, 6).map((day) => (
              <TabsTrigger key={day.day} value={day.day.toLowerCase()}>
                {day.day.charAt(0)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {workoutDays.map((day) => (
            <TabsContent key={day.day} value={day.day.toLowerCase()} className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">{day.day}</h3>
                <div className="text-right">
                  <span className="text-sm text-corpoideal-purple font-medium">Foco: {day.focus}</span>
                  <p className="text-xs text-gray-500">{day.exercises.length} exercícios</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {day.exercises.map((exercise, index) => (
                  <div key={index} className="workout-card p-4 border border-gray-200 rounded-lg hover:border-corpoideal-purple/30 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="bg-corpoideal-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2">
                            {index + 1}
                          </span>
                          <h4 className="font-medium text-sm">{exercise.name}</h4>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {exercise.type === 'compound' ? 'Composto' : 'Isolado'}
                          </Badge>
                        </div>
                        {exercise.equipment && (
                          <span className="text-xs text-gray-500 block ml-7">
                            📋 {exercise.equipment}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-corpoideal-purple font-bold bg-corpoideal-purple/10 px-2 py-1 rounded">
                          {exercise.sets} x {exercise.reps}
                        </span>
                      </div>
                    </div>
                    
                    <div className="ml-7">
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                        💡 <strong>Protocolo:</strong> {exercise.tip}
                      </p>
                      
                      <LoadManager exerciseName={exercise.name} />
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs hover:bg-corpoideal-purple hover:text-white transition-colors mt-2"
                        onClick={() => window.open(exercise.videoUrl, '_blank')}
                      >
                        🎥 Ver demonstração técnica
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-corpoideal-purple/5 to-blue-50 rounded-lg border border-corpoideal-purple/20">
                <h4 className="text-sm font-bold text-corpoideal-purple mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  Protocolos Específicos - {day.focus}:
                </h4>
                <ul className="text-sm text-gray-700 space-y-2 pl-4 list-disc">
                  <li><strong>Descanso:</strong> Compostos: {level.restPeriods.compound} | Isolados: {level.restPeriods.isolation}</li>
                  <li><strong>RIR Alvo:</strong> {level.rir}</li>
                  <li><strong>Técnicas:</strong> {level.techniques.join(', ')}</li>
                  <li><strong>Progressão:</strong> {level.progressionStrategy}</li>
                  {experience === 'avancado' && (
                    <>
                      <li><strong>Autoregulação:</strong> Ajustar volume conforme recuperação (RPE 6-8)</li>
                      <li><strong>Periodização:</strong> Alternar fases de acúmulo e intensificação</li>
                    </>
                  )}
                </ul>

                {experience === 'avancado' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <h5 className="text-xs font-bold text-red-700 mb-1 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      PROTOCOLO AVANÇADO:
                    </h5>
                    <p className="text-xs text-red-600">
                      Volume e intensidade baseados em pesquisas de Schoenfeld. 
                      Monitore fadiga acumulada e sinais de overreaching.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Scientific References */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-bold text-gray-800 mb-2">📚 Referências Científicas:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Schoenfeld et al. (2017) - Dose-response relationship between weekly resistance training volume and increases in muscle mass</li>
            <li>• Schoenfeld et al. (2019) - Resistance training volume enhances muscle hypertrophy</li>
            <li>• Helms et al. (2014) - Evidence-based recommendations for natural bodybuilding contest preparation</li>
            <li>• Zourdos et al. (2016) - Novel resistance training-specific RPE scale measuring repetitions in reserve</li>
            <li>• Krzysztofik et al. (2019) - Maximizing muscle hypertrophy: A systematic review</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
