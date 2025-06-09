
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  RotateCcw
} from 'lucide-react';
import { 
  exerciseDatabase, 
  getMuscleGroups, 
  getExercisesByMuscleGroup, 
  searchExercises,
  type ExerciseDetail 
} from '@/data/exerciseDatabase';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddExerciseDialogOpen, setIsAddExerciseDialogOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<CustomExercise | null>(null);

  const muscleGroups = getMuscleGroups();
  const muscleGroupLabels: Record<string, string> = {
    peito: 'Peito',
    costas: 'Costas', 
    ombros: 'Ombros',
    pernas: 'Pernas',
    bracos: 'Braços',
    abdomen: 'Abdômen'
  };

  useEffect(() => {
    if (initialWorkout.length > 0) {
      setCustomWorkout(initialWorkout);
    }
  }, [initialWorkout]);

  const handleAddExercise = (exercise: ExerciseDetail) => {
    const newExercise: CustomExercise = {
      id: `${exercise.id}-${Date.now()}`,
      name: exercise.name,
      muscleGroup: exercise.muscleGroup,
      sets: exercise.defaultSets,
      reps: exercise.defaultReps,
      restTime: exercise.restTime,
      weight: '',
      notes: '',
      completed: false
    };
    
    setCustomWorkout(prev => [...prev, newExercise]);
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

  const handleSaveWorkout = () => {
    onSaveWorkout(customWorkout);
  };

  const handleResetWorkout = () => {
    setCustomWorkout(initialWorkout);
  };

  const getFilteredExercises = () => {
    if (searchQuery) {
      return searchExercises(searchQuery);
    }
    return getExercisesByMuscleGroup(selectedMuscleGroup);
  };

  const getWorkoutSummary = () => {
    const totalExercises = customWorkout.length;
    const completedExercises = customWorkout.filter(ex => ex.completed).length;
    const estimatedTime = customWorkout.reduce((total, ex) => {
      const sets = ex.sets;
      const restMinutes = parseInt(ex.restTime.split('-')[0]) || 60;
      return total + (sets * 2) + ((sets - 1) * (restMinutes / 60)); // 2min per set + rest
    }, 0);

    return {
      totalExercises,
      completedExercises,
      estimatedTime: Math.round(estimatedTime)
    };
  };

  const summary = getWorkoutSummary();

  if (!isVisible) return null;

  return (
    <div className="space-y-6">
      {/* Workout Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-corpoideal-purple">
            <Target className="h-5 w-5 mr-2" />
            Resumo do Treino Personalizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-corpoideal-purple">
                {summary.completedExercises}/{summary.totalExercises}
              </div>
              <div className="text-sm text-gray-600">Exercícios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-corpoideal-purple">
                {summary.estimatedTime}min
              </div>
              <div className="text-sm text-gray-600">Tempo estimado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-corpoideal-purple">
                {muscleGroups.length}
              </div>
              <div className="text-sm text-gray-600">Grupos disponíveis</div>
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
                  Adicionar Exercício
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adicionar Exercício</DialogTitle>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                          {getFilteredExercises().map(exercise => (
                            <Card key={exercise.id} className="hover:border-corpoideal-purple/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-sm">{exercise.name}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {exercise.difficulty}
                                  </Badge>
                                </div>
                                
                                <div className="text-xs text-gray-600 mb-2">
                                  <div><strong>Músculos:</strong> {exercise.targetMuscles.join(', ')}</div>
                                  <div><strong>Equipamento:</strong> {exercise.equipment.join(', ')}</div>
                                  <div><strong>Séries/Reps:</strong> {exercise.defaultSets} x {exercise.defaultReps}</div>
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
              <p className="text-sm">Clique em "Adicionar Exercício" para começar!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {customWorkout.map((exercise, index) => (
                <Card 
                  key={exercise.id} 
                  className={`${exercise.completed ? 'bg-green-50 border-green-200' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="bg-corpoideal-purple text-white text-xs rounded-full w-6 h-6 flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-medium">{exercise.name}</h4>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {muscleGroupLabels[exercise.muscleGroup]}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
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
                      <div>
                        <strong>Séries:</strong> {exercise.sets}
                      </div>
                      <div>
                        <strong>Reps:</strong> {exercise.reps}
                      </div>
                      <div>
                        <strong>Descanso:</strong> {exercise.restTime}
                      </div>
                    </div>

                    {exercise.weight && (
                      <div className="text-sm mb-3">
                        <strong>Carga:</strong> {exercise.weight}
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
            <DialogTitle>Editar Exercício</DialogTitle>
          </DialogHeader>
          
          {editingExercise && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="exercise-name">Nome do Exercício</Label>
                <Input
                  id="exercise-name"
                  value={editingExercise.name}
                  onChange={(e) => setEditingExercise({
                    ...editingExercise,
                    name: e.target.value
                  })}
                />
              </div>

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
