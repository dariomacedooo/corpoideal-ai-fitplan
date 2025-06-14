
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface CreateDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  onSuccess: () => void;
}

export function CreateDietDialog({ 
  open, 
  onOpenChange, 
  studentId, 
  studentName, 
  onSuccess 
}: CreateDietDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meals, setMeals] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;

    setIsLoading(true);

    try {
      // Parse meals as JSON array
      let mealData = [];
      if (meals.trim()) {
        try {
          mealData = JSON.parse(meals);
        } catch {
          // If not valid JSON, create a simple array from text
          mealData = meals.split('\n').filter(meal => meal.trim()).map(meal => ({ name: meal.trim() }));
        }
      }

      const { error } = await supabase
        .from('diet_plans')
        .insert({
          title,
          description,
          meals: mealData,
          client_id: studentId,
          author_id: profile.id
        });

      if (error) throw error;

      toast({
        title: "Plano de dieta criado!",
        description: `Plano criado com sucesso para ${studentName}.`,
      });

      setTitle("");
      setDescription("");
      setMeals("");
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
          <DialogTitle>Criar Plano de Dieta</DialogTitle>
          <DialogDescription>
            Criando plano de dieta para {studentName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Plano</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Dieta para Ganho de Massa"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva os objetivos e características da dieta..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meals">Refeições</Label>
            <Textarea
              id="meals"
              value={meals}
              onChange={(e) => setMeals(e.target.value)}
              placeholder="Café da manhã: Aveia com frutas&#10;Almoço: Frango com arroz&#10;Jantar: Peixe com legumes&#10;&#10;Ou use formato JSON:&#10;[{&quot;meal&quot;: &quot;Café da manhã&quot;, &quot;food&quot;: &quot;Aveia com frutas&quot;}]"
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
