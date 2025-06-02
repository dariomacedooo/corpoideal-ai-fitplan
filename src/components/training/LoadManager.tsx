
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, TrendingUp, Calendar } from "lucide-react";
import { useWorkoutLoads } from "@/hooks/useWorkoutLoads";

interface LoadManagerProps {
  exerciseName: string;
}

export function LoadManager({ exerciseName }: LoadManagerProps) {
  const { loads, updateExerciseLoad, getLoadRecommendation } = useWorkoutLoads();
  const [isOpen, setIsOpen] = useState(false);
  const [newLoad, setNewLoad] = useState('');

  const currentLoad = loads[exerciseName];
  const recommendation = getLoadRecommendation(exerciseName);

  const handleSaveLoad = () => {
    const load = parseFloat(newLoad);
    if (load && load > 0) {
      updateExerciseLoad(exerciseName, load);
      setNewLoad('');
      setIsOpen(false);
    }
  };

  return (
    <div className="mt-2">
      {currentLoad ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-corpoideal-purple">
              Carga atual: {currentLoad.currentLoad}kg
            </span>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Atualizar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{exerciseName}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="load">Nova carga (kg)</Label>
                    <Input
                      id="load"
                      type="number"
                      step="0.5"
                      value={newLoad}
                      onChange={(e) => setNewLoad(e.target.value)}
                      placeholder="Ex: 22.5"
                    />
                  </div>
                  <Button onClick={handleSaveLoad} className="w-full">
                    Salvar carga
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {recommendation && (
            <Card className="p-2">
              <CardContent className="p-0">
                {recommendation.shouldIncrease ? (
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>{recommendation.message}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Sugestão: {recommendation.suggestedLoad}kg
                    </Badge>
                  </div>
                ) : (
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{recommendation.message}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full text-xs mt-1">
              <Plus className="h-3 w-3 mr-1" />
              Adicionar carga
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{exerciseName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="load">Carga inicial (kg)</Label>
                <Input
                  id="load"
                  type="number"
                  step="0.5"
                  value={newLoad}
                  onChange={(e) => setNewLoad(e.target.value)}
                  placeholder="Ex: 20"
                />
              </div>
              <Button onClick={handleSaveLoad} className="w-full">
                Salvar carga
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
