
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface CreateWorkoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  onSuccess: () => void;
}

export function CreateWorkoutDialog({ 
  open, 
  onOpenChange, 
  studentId, 
  studentName, 
  onSuccess 
}: CreateWorkoutDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;

    setIsLoading(true);

    try {
      // Parse exercises as JSON array
      let exerciseData = [];
      if (exercises.trim()) {
        try {
          exerciseData = JSON.parse(exercises);
        } catch {
          // If not valid JSON, create a simple array from text
          exerciseData = exercises.split('\n').filter(ex => ex.trim()).map(ex => ({ name: ex.trim() }));
        }
      }

      const { error } = await supabase
        .from('workout_plans')
        .insert({
          title,
          description,
          exercises: exerciseData,
          client_id: studentId,
          author_id: profile.id
        });

      if (error) throw error;

      toast({
        title: "Plano de treino criado!",
        description: `Plano criado com sucesso para ${studentName}.`,
      });

      setTitle("");
      setDescription("");
      setExercises("");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Erro ao criar plano",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Plano de Treino</DialogTitle>
          <DialogDescription>
            Criando plano de treino para {studentName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Plano</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Treino de Força - Semana 1"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva os objetivos e características do treino..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exercises">Exercícios</Label>
            <Textarea
              id="exercises"
              value={exercises}
              onChange={(e) => setExercises(e.target.value)}
              placeholder="Supino 3x12&#10;Agachamento 4x10&#10;Rosca direta 3x15&#10;&#10;Ou use formato JSON:&#10;[{&quot;name&quot;: &quot;Supino&quot;, &quot;sets&quot;: 3, &quot;reps&quot;: 12}]"
              rows={6}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
            >
              {isLoading ? "Criando..." : "Criar Plano"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
