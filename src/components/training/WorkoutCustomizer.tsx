
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RestTimer } from './RestTimer';
import { 
  Dumbbell, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Clock, 
  Target,
  Play,
  Save,
  RotateCcw,
  Timer,
  Zap,
  BookOpen,
  Activity as Stretch
} from 'lucide-react';
import { 
  scientificExerciseDatabase, 
  stretchDatabase,
  getScientificMuscleGroups, 
  getScientificExercisesByMuscleGroup, 
  searchScientificExercises,
  getStretchesByCategory,
  getStretchCategories,
  type ScientificExercise,
  type StretchExercise
} from '@/data/scientificExerciseDatabase';

interface CustomExercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  restTime: string;
  weight?: string;
  notes?: string;
  completed?: boolean;
  isStretch?: boolean;
  scientificSource?: string;
}

interface WorkoutCustomizerProps {
  initialWorkout?: CustomExercise[];
  onSaveWorkout: (workout: CustomExercise[]) => void;
  isVisible: boolean;
}

export function WorkoutCustomizer({ 
  initialWorkout = [], 
  onSaveWorkout, 
  isVisible 
}: WorkoutCustomizerProps) {
  const [customWorkout, setCustomWorkout] = useState<CustomExercise[]>(initialWorkout);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('peito');
  const [selectedStretchCategory, setSelectedStretchCategory] = useState<string>('inferior');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddExerciseDialogOpen, setIsAddExerciseDialogOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<CustomExercise | null>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<CustomExercise | null>(null);
  const [activeTab, setActiveTab] = useState<'exercises' | 'stretches'>('exercises');

  const muscleGroups = getScientificMuscleGroups();
  const stretchCategories = getStretchCategories();
  
  const muscleGroupLabels: Record<string, string> = {
    peito: 'Peito',
    costas: 'Costas', 
    ombros: 'Ombros',
    pernas: 'Pernas',
    bracos: 'Braços',
    abdomen: 'Abdômen'
  };

  const stretchCategoryLabels: Record<string, string> = {
    inferior: 'Membros Inferiores',
    superior: 'Membros Superiores',
    coluna: 'Coluna e Tronco'
  };

  useEffect(() => {
    if (initialWorkout.length > 0) {
      setCustomWorkout(initialWorkout);
    }
  }, [initialWorkout]);

  const handleAddExercise = (exercise: ScientificExercise) => {
    const newExercise: CustomExercise = {
      id: `${exercise.id}-${Date.now()}`,
      name: exercise.name,
      muscleGroup: exercise.muscleGroup,
      sets: exercise.defaultSets,
      reps: exercise.defaultReps,
      restTime: exercise.restTime,
      weight: '',
      notes: '',
      completed: false,
      scientificSource: exercise.scientificSource
    };
    
    setCustomWorkout(prev => [...prev, newExercise]);
    setIsAddExerciseDialogOpen(false);
  };

  const handleAddStretch = (stretch: StretchExercise) => {
    const newStretch: CustomExercise = {
      id: `${stretch.id}-${Date.now()}`,
      name: stretch.name,
      muscleGroup: stretch.category,
      sets: 1,
      reps: stretch.duration,
      restTime: '0s',
      weight: '',
      notes: '',
      completed: false,
      isStretch: true
    };
    
    setCustomWorkout(prev => [...prev, newStretch]);
    setIsAddExerciseDialogOpen(false);
  };

  const handleRemoveExercise = (id: string) => {
    setCustomWorkout(prev => prev.filter(ex => ex.id !== id));
  };

  const handleEditExercise = (exercise: CustomExercise) => {
    setEditingExercise({ ...exercise });
  };

  const handleSaveEdit = () => {
    if (editingExercise) {
      setCustomWorkout(prev => 
        prev.map(ex => ex.id === editingExercise.id ? editingExercise : ex)
      );
      setEditingExercise(null);
    }
  };

  const handleToggleComplete = (id: string) => {
    setCustomWorkout(prev =>
      prev.map(ex => ex.id === id ? { ...ex, completed: !ex.completed } : ex)
    );
  };

  const handleStartRest = (exercise: CustomExercise) => {
    setCurrentExercise(exercise);
    setShowTimer(true);
  };

  const handleSaveWorkout = () => {
    onSaveWorkout(customWorkout);
  };

  const handleResetWorkout = () => {
    setCustomWorkout(initialWorkout);
  };

  const getFilteredExercises = () => {
    if (searchQuery) {
      return searchScientificExercises(searchQuery);
    }
    return getScientificExercisesByMuscleGroup(selectedMuscleGroup);
  };

  const getFilteredStretches = () => {
    return getStretchesByCategory(selectedStretchCategory);
  };

  const getWorkoutSummary = () => {
    const totalExercises = customWorkout.length;
    const completedExercises = customWorkout.filter(ex => ex.completed).length;
    const exerciseCount = customWorkout.filter(ex => !ex.isStretch).length;
    const stretchCount = customWorkout.filter(ex => ex.isStretch).length;
    
    const estimatedTime = customWorkout.reduce((total, ex) => {
      if (ex.isStretch) {
        const duration = parseInt(ex.reps) || 30;
        return total + (duration / 60); // Convertemos segundos para minutos
      } else {
        const sets = ex.sets;
        const restMinutes = parseInt(ex.restTime.split('-')[0]) || 60;
        return total + (sets * 2) + ((sets - 1) * (restMinutes / 60)); // 2min per set + rest
      }
    }, 0);

    return {
      totalExercises,
      completedExercises,
      exerciseCount,
      stretchCount,
      estimatedTime: Math.round(estimatedTime)
    };
  };

  const summary = getWorkoutSummary();

  if (!isVisible) return null;

  return (
    <div className="space-y-6">
      {/* Timer Modal */}
      <Dialog open={showTimer} onOpenChange={setShowTimer}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Timer className="h-5 w-5 mr-2" />
              Descanso - {currentExercise?.name}
            </DialogTitle>
          </DialogHeader>
          <RestTimer
            defaultRestTime={currentExercise?.restTime || "60s"}
            exerciseName={currentExercise?.name}
            onTimerComplete={() => {
              // Auto-close após 3 segundos quando completar
              setTimeout(() => setShowTimer(false), 3000);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Workout Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-corpoideal-purple">
            <Target className="h-5 w-5 mr-2" />
            Treino Científico Personalizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-corpoideal-purple">
                {summary.completedExercises}/{summary.totalExercises}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {summary.exerciseCount}
              </div>
              <div className="text-sm text-gray-600">Exercícios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {summary.stretchCount}
              </div>
              <div className="text-sm text-gray-600">Alongamentos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {summary.estimatedTime}min
              </div>
              <div className="text-sm text-gray-600">Tempo est.</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSaveWorkout} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Salvar Treino
            </Button>
            <Button variant="outline" onClick={handleResetWorkout}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Workout */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Seu Treino Atual</CardTitle>
            <Dialog open={isAddExerciseDialogOpen} onOpenChange={setIsAddExerciseDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adicionar ao Treino</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Buscar exercícios..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery('')}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="exercises" className="flex items-center">
                        <Dumbbell className="h-4 w-4 mr-2" />
                        Exercícios
                      </TabsTrigger>
                      <TabsTrigger value="stretches" className="flex items-center">
                        <Stretch className="h-4 w-4 mr-2" />
                        Alongamentos
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="exercises">
                      <Tabs value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
                        <TabsList className="grid grid-cols-6 w-full">
                          {muscleGroups.map(group => (
                            <TabsTrigger key={group} value={group} className="text-xs">
                              {muscleGroupLabels[group]}
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        {muscleGroups.map(group => (
                          <TabsContent key={group} value={group}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                              {getFilteredExercises().map(exercise => (
                                <Card key={exercise.id} className="hover:border-corpoideal-purple/50 transition-colors">
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-medium text-sm">{exercise.name}</h4>
                                      <div className="flex gap-1">
                                        <Badge variant="outline" className="text-xs">
                                          {exercise.difficulty}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                          <Zap className="h-3 w-3 mr-1" />
                                          EMG
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="text-xs text-gray-600 mb-2">
                                      <div><strong>Músculos:</strong> {exercise.targetMuscles.join(', ')}</div>
                                      <div><strong>Equipamento:</strong> {exercise.equipment.join(', ')}</div>
                                      <div><strong>Séries/Reps:</strong> {exercise.defaultSets} x {exercise.defaultReps}</div>
                                      <div><strong>Descanso:</strong> {exercise.restTime}</div>
                                    </div>

                                    <div className="text-xs text-blue-600 mb-3">
                                      <BookOpen className="h-3 w-3 inline mr-1" />
                                      <strong>Fonte:</strong> {exercise.scientificSource}
                                    </div>

                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleAddExercise(exercise)}
                                        className="flex-1 text-xs"
                                      >
                                        <Plus className="h-3 w-3 mr-1" />
                                        Adicionar
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(exercise.videoUrl, '_blank')}
                                        className="text-xs"
                                      >
                                        <Play className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </TabsContent>

                    <TabsContent value="stretches">
                      <Tabs value={selectedStretchCategory} onValueChange={setSelectedStretchCategory}>
                        <TabsList className="grid grid-cols-3 w-full">
                          {stretchCategories.map(category => (
                            <TabsTrigger key={category} value={category} className="text-xs">
                              {stretchCategoryLabels[category]}
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        {stretchCategories.map(category => (
                          <TabsContent key={category} value={category}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                              {getFilteredStretches().map(stretch => (
                                <Card key={stretch.id} className="hover:border-green-500/50 transition-colors">
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-medium text-sm">{stretch.name}</h4>
                                      <Badge variant="outline" className="text-xs bg-green-50">
                                        {stretch.difficulty}
                                      </Badge>
                                    </div>
                                    
                                    <div className="text-xs text-gray-600 mb-2">
                                      <div><strong>Músculos:</strong> {stretch.targetMuscles.join(', ')}</div>
                                      <div><strong>Duração:</strong> {stretch.duration}</div>
                                    </div>

                                    <div className="text-xs text-gray-700 mb-3">
                                      {stretch.description}
                                    </div>

                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleAddStretch(stretch)}
                                        className="flex-1 text-xs bg-green-500 hover:bg-green-600"
                                      >
                                        <Plus className="h-3 w-3 mr-1" />
                                        Adicionar
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => window.open(stretch.videoUrl, '_blank')}
                                        className="text-xs"
                                      >
                                        <Play className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {customWorkout.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Dumbbell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum exercício adicionado ainda.</p>
              <p className="text-sm">Clique em "Adicionar Item" para começar!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {customWorkout.map((exercise, index) => (
                <Card 
                  key={exercise.id} 
                  className={`${exercise.completed ? 'bg-green-50 border-green-200' : ''} ${exercise.isStretch ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-corpoideal-purple'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className={`text-white text-xs rounded-full w-6 h-6 flex items-center justify-center mr-3 ${exercise.isStretch ? 'bg-green-500' : 'bg-corpoideal-purple'}`}>
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-medium flex items-center">
                            {exercise.name}
                            {exercise.isStretch && <Stretch className="h-4 w-4 ml-2 text-green-500" />}
                            {exercise.scientificSource && <Zap className="h-4 w-4 ml-2 text-blue-500" />}
                          </h4>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {exercise.isStretch ? stretchCategoryLabels[exercise.muscleGroup] : muscleGroupLabels[exercise.muscleGroup]}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {!exercise.isStretch && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartRest(exercise)}
                            className="bg-orange-50 border-orange-200 hover:bg-orange-100"
                          >
                            <Timer className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditExercise(exercise)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveExercise(exercise.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      {exercise.isStretch ? (
                        <>
                          <div>
                            <strong>Duração:</strong> {exercise.reps}
                          </div>
                          <div>
                            <strong>Repetições:</strong> {exercise.sets}x
                          </div>
                          <div>
                            <strong>Tipo:</strong> Alongamento
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <strong>Séries:</strong> {exercise.sets}
                          </div>
                          <div>
                            <strong>Reps:</strong> {exercise.reps}
                          </div>
                          <div>
                            <strong>Descanso:</strong> {exercise.restTime}
                          </div>
                        </>
                      )}
                    </div>

                    {exercise.weight && (
                      <div className="text-sm mb-3">
                        <strong>Carga:</strong> {exercise.weight}
                      </div>
                    )}

                    {exercise.scientificSource && (
                      <div className="text-sm text-blue-600 mb-3">
                        <BookOpen className="h-4 w-4 inline mr-1" />
                        <strong>Fonte Científica:</strong> {exercise.scientificSource}
                      </div>
                    )}

                    {exercise.notes && (
                      <div className="text-sm text-gray-600 mb-3">
                        <strong>Notas:</strong> {exercise.notes}
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant={exercise.completed ? "default" : "outline"}
                      onClick={() => handleToggleComplete(exercise.id)}
                      className="w-full"
                    >
                      {exercise.completed ? 'Concluído ✓' : 'Marcar como Concluído'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Exercise Dialog */}
      <Dialog open={!!editingExercise} onOpenChange={() => setEditingExercise(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Item</DialogTitle>
          </DialogHeader>
          
          {editingExercise && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="exercise-name">Nome</Label>
                <Input
                  id="exercise-name"
                  value={editingExercise.name}
                  onChange={(e) => setEditingExercise({
                    ...editingExercise,
                    name: e.target.value
                  })}
                />
              </div>

              {!editingExercise.isStretch ? (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="sets">Séries</Label>
                    <Input
                      id="sets"
                      type="number"
                      value={editingExercise.sets}
                      onChange={(e) => setEditingExercise({
                        ...editingExercise,
                        sets: parseInt(e.target.value) || 1
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reps">Repetições</Label>
                    <Input
                      id="reps"
                      value={editingExercise.reps}
                      onChange={(e) => setEditingExercise({
                        ...editingExercise,
                        reps: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rest">Descanso</Label>
                    <Input
                      id="rest"
                      value={editingExercise.restTime}
                      onChange={(e) => setEditingExercise({
                        ...editingExercise,
                        restTime: e.target.value
                      })}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duração</Label>
                    <Input
                      id="duration"
                      value={editingExercise.reps}
                      onChange={(e) => setEditingExercise({
                        ...editingExercise,
                        reps: e.target.value
                      })}
                      placeholder="30s, 45s, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="repetitions">Repetições</Label>
                    <Input
                      id="repetitions"
                      type="number"
                      value={editingExercise.sets}
                      onChange={(e) => setEditingExercise({
                        ...editingExercise,
                        sets: parseInt(e.target.value) || 1
                      })}
                    />
                  </div>
                </div>
              )}

              {!editingExercise.isStretch && (
                <div>
                  <Label htmlFor="weight">Carga (opcional)</Label>
                  <Input
                    id="weight"
                    value={editingExercise.weight || ''}
                    onChange={(e) => setEditingExercise({
                      ...editingExercise,
                      weight: e.target.value
                    })}
                    placeholder="Ex: 20kg, 2x15kg, etc."
                  />
                </div>
              )}

              <div>
                <Label htmlFor="notes">Notas (opcional)</Label>
                <Textarea
                  id="notes"
                  value={editingExercise.notes || ''}
                  onChange={(e) => setEditingExercise({
                    ...editingExercise,
                    notes: e.target.value
                  })}
                  placeholder="Anotações sobre execução, sensações, etc."
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveEdit} className="flex-1">
                  Salvar Alterações
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEditingExercise(null)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
