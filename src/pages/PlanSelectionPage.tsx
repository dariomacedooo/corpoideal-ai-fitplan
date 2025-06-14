
import { useState } from 'react';
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Apple, Target, Clock } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

const PlanSelectionPage = () => {
  const [workoutPlan, setWorkoutPlan] = useState('');
  const [dietPlan, setDietPlan] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { profile } = useUserProfile();

  const handleSubmit = () => {
    if (!workoutPlan || !dietPlan) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, selecione um plano de treino e um plano de dieta.",
        variant: "destructive",
      });
      return;
    }

    // Save plan selection
    const planSelection = {
      workoutPlan,
      dietPlan,
      selectedAt: new Date().toISOString(),
    };

    localStorage.setItem('planSelection', JSON.stringify(planSelection));

    toast({
      title: "Planos selecionados!",
      description: "Seus planos foram configurados. Bem-vindo ao CorpoIdeal AI!",
    });

    navigate('/home');
  };

  const workoutPlans = [
    {
      id: 'beginner',
      title: 'Iniciante',
      description: 'Ideal para quem está começando',
      icon: Target,
      features: ['3x por semana', 'Exercícios básicos', 'Progressão gradual']
    },
    {
      id: 'intermediate',
      title: 'Intermediário',
      description: 'Para quem já tem experiência',
      icon: Dumbbell,
      features: ['4-5x por semana', 'Exercícios compostos', 'Variações avançadas']
    },
    {
      id: 'advanced',
      title: 'Avançado',
      description: 'Para atletas experientes',
      icon: Clock,
      features: ['5-6x por semana', 'Técnicas intensas', 'Periodização']
    }
  ];

  const dietPlans = [
    {
      id: 'weight-loss',
      title: 'Emagrecimento',
      description: 'Déficit calórico controlado',
      features: ['Baixo em calorias', 'Alto em proteínas', 'Receitas saborosas']
    },
    {
      id: 'muscle-gain',
      title: 'Ganho de Massa',
      description: 'Superávit calórico estratégico',
      features: ['Rico em proteínas', 'Carboidratos estratégicos', 'Refeições frequentes']
    },
    {
      id: 'maintenance',
      title: 'Manutenção',
      description: 'Equilibrio nutricional',
      features: ['Calorias balanceadas', 'Variedade alimentar', 'Flexibilidade']
    }
  ];

  return (
    <div className="pb-16 pt-14">
      <AppHeader />
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-corpoideal-purple mb-2">
            Escolha seus Planos
          </h1>
          <p className="text-gray-600">
            Olá {profile?.name}! Agora vamos configurar seus planos de treino e dieta personalizados.
          </p>
        </div>

        {/* Workout Plan Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              Plano de Treino
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={workoutPlan} onValueChange={setWorkoutPlan}>
              {workoutPlans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div key={plan.id}>
                    <RadioGroupItem value={plan.id} id={plan.id} className="peer sr-only" />
                    <Label
                      htmlFor={plan.id}
                      className="flex items-start space-x-4 rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
                    >
                      <div className="p-3 rounded-lg bg-corpoideal-purple/10">
                        <Icon className="h-6 w-6 text-corpoideal-purple" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{plan.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Diet Plan Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              Plano de Dieta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={dietPlan} onValueChange={setDietPlan}>
              {dietPlans.map((plan) => (
                <div key={plan.id}>
                  <RadioGroupItem value={plan.id} id={`diet-${plan.id}`} className="peer sr-only" />
                  <Label
                    htmlFor={`diet-${plan.id}`}
                    className="flex items-start space-x-4 rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-corpoideal-purple [&:has([data-state=checked])]:border-corpoideal-purple cursor-pointer"
                  >
                    <div className="p-3 rounded-lg bg-green-100">
                      <Apple className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{plan.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Button 
          onClick={handleSubmit}
          disabled={!workoutPlan || !dietPlan}
          className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple text-lg py-3"
        >
          Finalizar Configuração
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default PlanSelectionPage;
