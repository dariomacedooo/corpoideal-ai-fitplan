import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Clock, Target, TrendingUp, Thermometer, Droplets } from "lucide-react";
import { advancedWorkouts } from "@/data/advancedWorkouts";
import { LoadManager } from "./LoadManager";

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

  // Get advanced workouts if user is intermediate or advanced
  const getAdvancedWorkouts = () => {
    if ((experience === 'intermediario' || experience === 'avancado') && 
        advancedWorkouts[experience] && 
        advancedWorkouts[experience][goal] && 
        advancedWorkouts[experience][goal][trainingLocation]) {
      return advancedWorkouts[experience][goal][trainingLocation];
    }
    return workoutDays;
  };

  const finalWorkoutDays = getAdvancedWorkouts();

  const getDifficultyScore = () => {
    switch (experience) {
      case 'iniciante': return 30;
      case 'intermediario': return 70;
      case 'avancado': return 95;
      default: return 50;
    }
  };

  const getIntensityColor = () => {
    const score = getDifficultyScore();
    if (score >= 90) return 'bg-red-500';
    if (score >= 70) return 'bg-orange-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getScientificMethodology = () => {
    if (experience === 'avancado') {
      return {
        title: "Metodologia Científica Avançada",
        description: "Baseada em evidências de Brad Schoenfeld, Eric Helms e ACSM Position Stand 2021",
        principles: [
          "Volume: 10-20 séries efetivas semanais por grupo muscular",
          "Intensidade: 65-85% 1RM (6-15 repetições)",
          "Frequência: 2-3x por semana por grupo muscular",
          "Progressão: Overload progressivo com técnicas avançadas",
          "RIR: 0-3 repetições em reserva (proximidade da falha)"
        ],
        techniques: [
          "Rest-Pause: Para maximizar volume de treino",
          "Cluster Sets: Manutenção de intensidade alta",
          "Tempo sob Tensão: 30-60 segundos por série",
          "Pré-exaustão: Isolamento antes de compostos"
        ]
      };
    } else if (experience === 'intermediario') {
      return {
        title: "Metodologia Intermediária",
        description: "Progressão sistemática com técnicas validadas cientificamente",
        principles: [
          "Volume: 8-16 séries por grupo muscular",
          "Intensidade: 70-85% 1RM",
          "Frequência: 2x por semana por grupo",
          "Progressão: Sobrecarga progressiva linear"
        ]
      };
    }
    
    return {
      title: "Base Científica Iniciante",
      description: "Fundamentos sólidos baseados em movimento funcional",
      principles: [
        "Volume: 6-12 séries por grupo muscular",
        "Foco em técnica e adaptação neural",
        "Progressão gradual de cargas"
      ]
    };
  };

  const getCearaAdaptations = () => {
    return {
      climate: [
        "🌡️ Clima quente: Treinos preferencialmente 5h-7h ou 17h-19h",
        "💧 Hidratação: 300-500ml a cada 15-20 min durante o treino",
        "🏖️ Utilize praias para cardio matinal (corrida na areia)",
        "🥥 Água de coco como isotônico natural regional"
      ],
      nutrition: [
        "🐟 Priorize peixes frescos (abundantes e ricos em ômega-3)",
        "🥥 Castanha de caju como fonte de proteína vegetal",
        "🥭 Frutas regionais: caju, manga, açaí para energia natural",
        "🍤 Camarão como proteína magra de baixo custo"
      ]
    };
  };

  const methodology = getScientificMethodology();
  const cearaAdaptations = getCearaAdaptations();
  const finalWorkoutDays = getAdvancedWorkouts();

  const getIntensityColor = () => {
    const score = getDifficultyScore();
    if (score >= 90) return 'bg-red-500';
    if (score >= 70) return 'bg-orange-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getMethodologyDescription = () => {
    if (experience === 'avancado') {
      return "Treino científico com técnicas avançadas: cluster sets, rest-pause, tempo sob tensão, pré-exaustão e volume alemão.";
    } else if (experience === 'intermediario') {
      return "Progressão sistemática com técnicas intermediárias, foco em sobrecarga progressiva e variações de exercícios.";
    }
    return "Base sólida de movimentos fundamentais com progressão gradual.";
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
            {experience === 'avancado' && (
              <>
                <li>Implemente técnicas de intensidade: rest-pause, cluster sets, tempo sob tensão</li>
                <li>Use acessórios como correntes e elásticos para resistência acomodante</li>
                <li>Monitore RPE (taxa de esforço percebido) em cada série</li>
              </>
            )}
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

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <Dumbbell className="h-5 w-5 mr-2" />
            {methodology.title}
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{getGoalText()}</Badge>
            <Badge variant="secondary">{getLocationText()}</Badge>
            <Badge variant="secondary">{getExperienceText()}</Badge>
          </div>
        </div>

        {/* Scientific Methodology Overview */}
        <div className="bg-gradient-to-r from-corpoideal-purple/10 to-blue-50 p-4 rounded-lg border border-corpoideal-purple/20 mb-4">
          <h4 className="text-sm font-bold text-corpoideal-purple mb-2">🧬 {methodology.description}</h4>
          <ul className="text-xs text-gray-700 space-y-1">
            {methodology.principles.map((principle, index) => (
              <li key={index}>• {principle}</li>
            ))}
          </ul>
          
          {methodology.techniques && (
            <div className="mt-3 p-2 bg-white rounded border">
              <p className="text-xs font-medium text-corpoideal-purple mb-1">Técnicas Avançadas Aplicadas:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {methodology.techniques.map((technique, index) => (
                  <li key={index}>• {technique}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Ceará-specific adaptations */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <h4 className="text-sm font-bold text-orange-700 mb-2 flex items-center">
              <Thermometer className="h-4 w-4 mr-1" />
              Adaptações para o Ceará
            </h4>
            <ul className="text-xs text-orange-600 space-y-1">
              {cearaAdaptations.climate.map((adaptation, index) => (
                <li key={index}>{adaptation}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <h4 className="text-sm font-bold text-green-700 mb-2 flex items-center">
              <Droplets className="h-4 w-4 mr-1" />
              Nutrição Regional
            </h4>
            <ul className="text-xs text-green-600 space-y-1">
              {cearaAdaptations.nutrition.map((nutrition, index) => (
                <li key={index}>{nutrition}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Intensity and Methodology Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Target className="h-4 w-4 mr-2 text-corpoideal-purple" />
              <span className="text-sm font-medium">Intensidade</span>
            </div>
            <Progress value={getDifficultyScore()} className="h-2 mb-1" />
            <span className="text-xs text-gray-600">{getDifficultyScore()}% - {experience}</span>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 mr-2 text-corpoideal-purple" />
              <span className="text-sm font-medium">Duração Estimada</span>
            </div>
            <span className="text-sm font-bold">
              {experience === 'avancado' ? '90-120 min' : experience === 'intermediario' ? '60-90 min' : '45-60 min'}
            </span>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-4 w-4 mr-2 text-corpoideal-purple" />
              <span className="text-sm font-medium">Frequência</span>
            </div>
            <span className="text-sm font-bold">
              {finalWorkoutDays.length} dias/semana
            </span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-corpoideal-purple mb-1">Metodologia Aplicada:</h4>
          <p className="text-xs text-gray-700">{getMethodologyDescription()}</p>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue={finalWorkoutDays[0]?.day.toLowerCase()}>
          <TabsList className="grid grid-cols-7 mb-4">
            {finalWorkoutDays.map((day) => (
              <TabsTrigger key={day.day} value={day.day.toLowerCase()}>
                {day.day.charAt(0)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {finalWorkoutDays.map((day) => (
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
                        💡 <strong>Técnica:</strong> {exercise.tip}
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
                  Orientações Científicas - {day.focus}:
                </h4>
                <ul className="text-sm text-gray-700 space-y-2 pl-4 list-disc">
                  {experience === 'avancado' ? (
                    <>
                      <li><strong>Volume:</strong> 10-20 séries efetivas semanais (Schoenfeld et al., 2017)</li>
                      <li><strong>Intensidade:</strong> 65-85% 1RM, 0-3 RIR (Helms et al., 2018)</li>
                      <li><strong>Frequência:</strong> 2-3x/semana por grupo muscular (optimal para hipertrofia)</li>
                      <li><strong>Descanso:</strong> 2-4 min compostos, 60-90s isolados (ACSM, 2021)</li>
                      <li><strong>Progressão:</strong> +2.5-5% carga quando RIR ≤ 1</li>
                      {getTrainingLocationInstructions()}
                    </>
                  ) : experience === 'intermediario' ? (
                    <>
                      <li><strong>Volume:</strong> 8-16 séries semanais por grupo muscular</li>
                      <li><strong>Sobrecarga:</strong> Aumente peso/reps quando conseguir fazer todas as séries no limite superior</li>
                      <li><strong>Técnica:</strong> Priorize forma perfeita sobre carga máxima</li>
                      <li><strong>Descanso:</strong> 90-120s entre séries</li>
                      {getTrainingLocationInstructions()}
                    </>
                  ) : (
                    <>
                      <li><strong>Foco:</strong> Aprendizagem motora e adaptação neural</li>
                      <li><strong>Progressão:</strong> Gradual, priorizando técnica</li>
                      <li><strong>Descanso:</strong> 60-90s entre séries</li>
                      {getTrainingLocationInstructions()}
                    </>
                  )}
                </ul>

                {/* Climate considerations for Ceará */}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h5 className="text-xs font-bold text-yellow-700 mb-1 flex items-center">
                    <Thermometer className="h-3 w-3 mr-1" />
                    ☀️ Adaptações Climáticas (Ceará):
                  </h5>
                  <p className="text-xs text-yellow-600">
                    Temperaturas altas reduzem performance em ~10-15%. Hidrate-se constantemente e evite horários de pico solar (11h-15h).
                  </p>
                </div>

                {experience === 'avancado' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <h5 className="text-xs font-bold text-red-700 mb-1">⚠️ PROTOCOLO AVANÇADO:</h5>
                    <p className="text-xs text-red-600">
                      Baseado em evidências científicas recentes. Monitore sinais de overtraining: 
                      fadiga persistente, queda de performance, alterações do humor.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Enhanced Scientific References */}
        {experience === 'avancado' && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="text-sm font-bold text-gray-800 mb-3">📚 Referências Científicas Aplicadas:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <p className="font-medium mb-1">Hipertrofia e Volume:</p>
                <ul className="space-y-1">
                  <li>• Schoenfeld et al. (2017) - Sports Medicine</li>
                  <li>• Helms et al. (2018) - Muscle & Strength Pyramids</li>
                  <li>• ACSM (2021) - Position Stand Resistance Training</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Técnicas Avançadas:</p>
                <ul className="space-y-1">
                  <li>• Rest-Pause: Haff & Triplett (2015)</li>
                  <li>• Cluster Sets: Tufano et al. (2017)</li>
                  <li>• RIR: Zourdos et al. (2016)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
