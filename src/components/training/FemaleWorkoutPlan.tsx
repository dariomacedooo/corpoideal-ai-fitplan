
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Heart, Dumbbell, Target, Clock, Users, Zap, Flower2, AlertTriangle } from "lucide-react";
import { femaleExercises, femaleWorkoutPlans, hormonalAdaptations, type FemaleWorkoutExercise } from "@/data/femaleWorkouts";

interface FemaleWorkoutPlanProps {
  age: number;
  experience: string;
  goal: string;
  hormonePhase?: string;
}

interface CustomExercise extends FemaleWorkoutExercise {
  customSets?: number;
  customReps?: string;
  customRest?: string;
}

export function FemaleWorkoutPlan({ age, experience, goal, hormonePhase = 'folicular' }: FemaleWorkoutPlanProps) {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [customMode, setCustomMode] = useState(false);
  const [customExercises, setCustomExercises] = useState<CustomExercise[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');
  const [currentHormonePhase, setCurrentHormonePhase] = useState(hormonePhase);

  // Determinar faixa etária
  const getAgeGroup = (age: number): string => {
    if (age >= 17 && age <= 25) return '17-25';
    if (age >= 26 && age <= 39) return '26-39';
    if (age >= 40 && age <= 59) return '40-59';
    if (age >= 60) return '60+';
    return '17-25';
  };

  useEffect(() => {
    const ageGroup = getAgeGroup(age);
    setSelectedAgeGroup(ageGroup);
    
    // Selecionar plano baseado no objetivo
    const plansForAge = femaleWorkoutPlans[ageGroup];
    if (plansForAge && plansForAge.length > 0) {
      const matchingPlan = plansForAge.find(plan => 
        plan.objective.includes(goal) || plan.level === experience
      ) || plansForAge[0];
      setSelectedPlan(matchingPlan);
    }
  }, [age, goal, experience]);

  const getAgeGroupText = () => {
    switch (selectedAgeGroup) {
      case '17-25': return 'Jovem (17-25 anos)';
      case '26-39': return 'Adulta (26-39 anos)';
      case '40-59': return 'Madura (40-59 anos)';
      case '60+': return 'Senior (60+ anos)';
      default: return 'Jovem';
    }
  };

  const getGoalText = () => {
    switch (goal) {
      case 'ganhar-massa': return 'Hipertrofia Glútea';
      case 'perder-peso': return 'Definição e Emagrecimento';
      case 'ganhar-peso': return 'Ganho de Peso Saudável';
      case 'manter-peso': return 'Manutenção e Saúde';
      default: return 'Condicionamento Geral';
    }
  };

  const addCustomExercise = (exercise: FemaleWorkoutExercise) => {
    const customExercise: CustomExercise = {
      ...exercise,
      customSets: exercise.sets,
      customReps: exercise.reps,
      customRest: exercise.restTime
    };
    setCustomExercises([...customExercises, customExercise]);
  };

  const updateCustomExercise = (index: number, field: string, value: any) => {
    const updated = [...customExercises];
    updated[index] = { ...updated[index], [field]: value };
    setCustomExercises(updated);
  };

  const removeCustomExercise = (index: number) => {
    setCustomExercises(customExercises.filter((_, i) => i !== index));
  };

  const getCurrentPhaseInfo = () => {
    return hormonalAdaptations[currentHormonePhase as keyof typeof hormonalAdaptations] || hormonalAdaptations.folicular;
  };

  const getFilteredExercises = () => {
    const allExercises = Object.values(femaleExercises).flat();
    return allExercises.filter(exercise => 
      exercise.ageGroups.includes(selectedAgeGroup) &&
      exercise.hormonePhase.includes(currentHormonePhase) &&
      (experience === 'iniciante' ? exercise.difficulty !== 'avancado' : true)
    );
  };

  if (!selectedPlan) {
    return (
      <div className="text-center p-6">
        <Heart className="h-12 w-12 mx-auto mb-4 text-fitness-coral" />
        <h3 className="text-lg font-bold text-white mb-2">
          Carregando Plano Personalizado
        </h3>
        <p className="text-fitness-text-secondary">
          Preparando seu treino feminino específico...
        </p>
      </div>
    );
  }

  const phaseInfo = getCurrentPhaseInfo();

  return (
    <Card className="w-full fitness-card border-fitness-coral/30">
      <CardHeader>
        <div className="flex justify-between items-start mb-4">
          <CardTitle className="text-xl text-fitness-coral flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Treino Feminino Personalizado
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="border-fitness-coral text-fitness-coral">
              {getAgeGroupText()}
            </Badge>
            <Badge variant="secondary" className="bg-fitness-lime/20 text-fitness-lime">
              {getGoalText()}
            </Badge>
            <Badge variant="secondary" className="bg-fitness-coral/20 text-fitness-coral">
              {experience}
            </Badge>
          </div>
        </div>

        {/* Seleção de Fase Hormonal */}
        <div className="bg-fitness-coral/10 border border-fitness-coral/30 p-4 rounded-lg mb-4">
          <div className="flex items-center mb-3">
            <Flower2 className="h-4 w-4 mr-2 text-fitness-coral" />
            <Label className="text-sm font-medium text-white">Fase do Ciclo/Hormonal</Label>
          </div>
          <Select value={currentHormonePhase} onValueChange={setCurrentHormonePhase}>
            <SelectTrigger className="fitness-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="menstrual">Menstrual (1-5 dias)</SelectItem>
              <SelectItem value="folicular">Folicular (6-14 dias)</SelectItem>
              <SelectItem value="ovulatoria">Ovulatória (12-16 dias)</SelectItem>
              <SelectItem value="lutea">Lútea (17-28 dias)</SelectItem>
              <SelectItem value="perimenopausa">Perimenopausa</SelectItem>
              <SelectItem value="menopausa">Menopausa/Pós-menopausa</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-2 p-2 bg-fitness-card-bg/50 rounded text-xs text-fitness-text-secondary">
            <strong>{phaseInfo.description}</strong>
            <p className="mt-1">{phaseInfo.recommendations[0]}</p>
          </div>
        </div>

        {/* Informações do Plano */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-fitness-coral/10 p-3 rounded-lg border border-fitness-coral/20">
            <div className="flex items-center mb-2">
              <Target className="h-4 w-4 mr-2 text-fitness-coral" />
              <span className="text-sm font-medium text-white">Objetivo</span>
            </div>
            <span className="text-sm font-bold text-fitness-coral">{selectedPlan.name}</span>
          </div>

          <div className="bg-fitness-lime/10 p-3 rounded-lg border border-fitness-lime/20">
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 mr-2 text-fitness-lime" />
              <span className="text-sm font-medium text-white">Frequência</span>
            </div>
            <span className="text-sm font-bold text-fitness-lime">{selectedPlan.frequency}</span>
          </div>

          <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
            <div className="flex items-center mb-2">
              <Users className="h-4 w-4 mr-2 text-purple-400" />
              <span className="text-sm font-medium text-white">Duração</span>
            </div>
            <span className="text-sm font-bold text-purple-400">{selectedPlan.duration}</span>
          </div>

          <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
            <div className="flex items-center mb-2">
              <Zap className="h-4 w-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium text-white">Intensidade</span>
            </div>
            <span className="text-sm font-bold text-yellow-400">{phaseInfo.exerciseModifications.intensity}</span>
          </div>
        </div>

        {/* Modo Customização */}
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant={!customMode ? "default" : "outline"}
            onClick={() => setCustomMode(false)}
            className={!customMode ? "fitness-button-primary" : "fitness-button-secondary"}
          >
            Plano Recomendado
          </Button>
          <Button
            variant={customMode ? "default" : "outline"}
            onClick={() => setCustomMode(true)}
            className={customMode ? "fitness-button-primary" : "fitness-button-secondary"}
          >
            Personalizar Treino
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue={customMode ? "custom" : "recommended"} value={customMode ? "custom" : "recommended"}>
          <TabsContent value="recommended" className="space-y-4">
            <div className="space-y-4">
              {selectedPlan.exercises.map((exercise: FemaleWorkoutExercise, index: number) => (
                <div key={index} className="fitness-card p-4 border border-fitness-coral/20 hover:border-fitness-coral/40 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="bg-fitness-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2">
                          {index + 1}
                        </span>
                        <h4 className="font-medium text-sm text-white">{exercise.name}</h4>
                        <div className="ml-2 flex gap-1">
                          {exercise.targetMuscles.slice(0, 2).map((muscle, i) => (
                            <Badge key={i} variant="outline" className="text-xs border-fitness-coral/30 text-fitness-coral">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-fitness-text-secondary block ml-7">
                        🎯 {exercise.targetMuscles.join(', ')}
                      </span>
                      <span className="text-xs text-fitness-text-secondary block ml-7">
                        📋 {exercise.equipment}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-fitness-coral font-bold bg-fitness-coral/10 px-2 py-1 rounded">
                        {exercise.sets} x {exercise.reps}
                      </span>
                      <p className="text-xs text-fitness-text-secondary mt-1">
                        Descanso: {exercise.restTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="ml-7">
                    <p className="text-xs text-fitness-text-secondary mb-2 leading-relaxed">
                      💡 <strong>Técnica:</strong> {exercise.technique}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {exercise.benefits.map((benefit, i) => (
                        <span key={i} className="text-xs bg-fitness-lime/20 text-fitness-lime px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs hover:bg-fitness-coral hover:text-white transition-colors mt-2"
                      onClick={() => window.open(exercise.videoUrl, '_blank')}
                    >
                      🎥 Ver demonstração
                    </Button>

                    {customMode && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs mt-2 border-fitness-lime text-fitness-lime hover:bg-fitness-lime hover:text-black"
                        onClick={() => addCustomExercise(exercise)}
                      >
                        ➕ Adicionar ao Treino Personalizado
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Orientações específicas */}
            <div className="mt-6 p-4 bg-gradient-to-r from-fitness-coral/5 to-fitness-lime/5 rounded-lg border border-fitness-coral/20">
              <h4 className="text-sm font-bold text-fitness-coral mb-3 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Orientações Específicas para {getAgeGroupText()}:
              </h4>
              <ul className="text-sm text-fitness-text-secondary space-y-2 pl-4 list-disc">
                {selectedPlan.tips.map((tip: string, index: number) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Base científica */}
            <div className="mt-4 p-4 bg-fitness-card-bg/30 border border-white/10 rounded-lg">
              <h4 className="text-sm font-bold text-white mb-2">📚 Base Científica:</h4>
              <p className="text-xs text-fitness-text-secondary">{selectedPlan.scientificBasis}</p>
            </div>

            {/* Adaptações hormonais */}
            <div className="mt-4 p-4 bg-fitness-coral/10 border border-fitness-coral/30 rounded-lg">
              <h4 className="text-sm font-bold text-fitness-coral mb-2 flex items-center">
                <Flower2 className="h-4 w-4 mr-2" />
                Adaptações para {phaseInfo.description}:
              </h4>
              <ul className="text-xs text-fitness-text-secondary space-y-1">
                {phaseInfo.recommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="bg-fitness-lime/10 border border-fitness-lime/30 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold text-fitness-lime mb-2">Criar Treino Personalizado</h3>
              <p className="text-sm text-fitness-text-secondary">
                Selecione exercícios e personalize séries, repetições e descanso conforme sua preferência.
              </p>
            </div>

            {/* Biblioteca de exercícios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(femaleExercises).map(([category, exercises]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                    {category === 'gluteos' ? '🍑 Glúteos' : 
                     category === 'abdomen' ? '💪 Abdômen' :
                     category === 'pernas' ? '🦵 Pernas' :
                     category === 'superiores' ? '💪 Superiores' : '❤️ Cardio'}
                  </h4>
                  <div className="space-y-2">
                    {exercises
                      .filter(ex => ex.ageGroups.includes(selectedAgeGroup) && 
                                    ex.hormonePhase.includes(currentHormonePhase))
                      .slice(0, 3)
                      .map((exercise, index) => (
                      <div key={index} className="p-3 bg-fitness-card-bg/50 rounded-lg border border-white/10">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium text-white">{exercise.name}</span>
                            <p className="text-xs text-fitness-text-secondary">{exercise.targetMuscles[0]}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-fitness-lime text-fitness-lime hover:bg-fitness-lime hover:text-black"
                            onClick={() => addCustomExercise(exercise)}
                          >
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Treino personalizado */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Seu Treino Personalizado</h3>
              
              {customExercises.length === 0 ? (
                <div className="text-center p-6 bg-fitness-card-bg/30 rounded-lg border border-white/10">
                  <p className="text-fitness-text-secondary">
                    Nenhum exercício adicionado ainda. Selecione exercícios acima para começar.
                  </p>
                </div>
              ) : (
                customExercises.map((exercise, index) => (
                  <div key={index} className="fitness-card p-4 border border-fitness-lime/20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-white">{exercise.name}</h4>
                        <p className="text-xs text-fitness-text-secondary">{exercise.targetMuscles.join(', ')}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => removeCustomExercise(index)}
                      >
                        Remover
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs text-fitness-text-secondary">Séries</Label>
                        <Input
                          type="number"
                          value={exercise.customSets}
                          onChange={(e) => updateCustomExercise(index, 'customSets', parseInt(e.target.value))}
                          className="fitness-input"
                          min="1"
                          max="6"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-fitness-text-secondary">Repetições</Label>
                        <Input
                          value={exercise.customReps}
                          onChange={(e) => updateCustomExercise(index, 'customReps', e.target.value)}
                          className="fitness-input"
                          placeholder="ex: 10-12"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-fitness-text-secondary">Descanso</Label>
                        <Input
                          value={exercise.customRest}
                          onChange={(e) => updateCustomExercise(index, 'customRest', e.target.value)}
                          className="fitness-input"
                          placeholder="ex: 60s"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {currentHormonePhase === 'menstrual' && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <h5 className="text-xs font-bold text-red-400 mb-1 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              ATENÇÃO - Fase Menstrual:
            </h5>
            <p className="text-xs text-red-300">
              Durante a menstruação, é normal sentir menos energia. Adapte a intensidade conforme 
              seu bem-estar e priorize exercícios de baixo impacto se houver desconforto.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
