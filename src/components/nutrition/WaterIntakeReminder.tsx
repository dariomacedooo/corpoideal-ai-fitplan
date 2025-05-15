
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Droplet } from "lucide-react"; 
import { useToast } from "@/components/ui/use-toast";

interface WaterIntakeReminderProps {
  weight: number;
  goal: string;
  activity: string;
  userName?: string;
}

export function WaterIntakeReminder({ weight, goal, activity, userName }: WaterIntakeReminderProps) {
  const [dailyTarget, setDailyTarget] = useState(0);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [reminderInterval, setReminderInterval] = useState(30); // minutes
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [nextReminder, setNextReminder] = useState<Date | null>(null);
  
  const { toast } = useToast();
  const userNameDisplay = userName || "Fitness";

  // Calculate recommended water intake based on weight, goal, and activity level
  useEffect(() => {
    // Base calculation: 35ml per kg of body weight
    let baseIntake = weight * 35;
    
    // Adjust based on goal
    if (goal === 'perder-peso') {
      baseIntake *= 1.1; // 10% more for weight loss
    } else if (goal === 'ganhar-massa' || goal === 'ganhar-musculos') {
      baseIntake *= 1.2; // 20% more for muscle gain
    }
    
    // Adjust based on activity level
    if (activity === 'moderado' || activity === 'ativo') {
      baseIntake *= 1.15; // 15% more for moderate/active
    } else if (activity === 'muito-ativo' || activity === 'extremamente-ativo') {
      baseIntake *= 1.3; // 30% more for very active
    }
    
    // Convert to liters and round to 1 decimal place
    const liters = Math.round(baseIntake / 100) / 10;
    setDailyTarget(liters);
    
    // Retrieve current intake from localStorage
    const savedIntake = localStorage.getItem('waterIntake');
    if (savedIntake) {
      setCurrentIntake(parseFloat(savedIntake));
    }
  }, [weight, goal, activity]);
  
  // Save current intake to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('waterIntake', currentIntake.toString());
  }, [currentIntake]);
  
  // Setup water reminders
  useEffect(() => {
    if (!reminderEnabled) return;
    
    const calculateNextReminder = () => {
      const next = new Date();
      next.setMinutes(next.getMinutes() + reminderInterval);
      return next;
    };
    
    setNextReminder(calculateNextReminder());
    
    const intervalId = setInterval(() => {
      const now = new Date();
      if (nextReminder && now >= nextReminder) {
        // Display reminder toast
        toast({
          title: `Hora de se hidratar, ${userNameDisplay}!`,
          description: `Beba aproximadamente 250ml de água agora para manter-se hidratado.`,
        });
        
        // Set next reminder time
        setNextReminder(calculateNextReminder());
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [reminderEnabled, reminderInterval, nextReminder, toast, userNameDisplay]);
  
  const addWater = (amount: number) => {
    const newIntake = Math.min(currentIntake + amount, dailyTarget * 1.5);
    setCurrentIntake(newIntake);
    
    // Show motivational message if they're keeping up with hydration
    if (newIntake >= dailyTarget * 0.5 && newIntake < dailyTarget * 0.7) {
      toast({
        title: `Bom trabalho, ${userNameDisplay}!`,
        description: "Você já está na metade do caminho para sua meta diária de água!",
      });
    } else if (newIntake >= dailyTarget) {
      toast({
        title: `Parabéns, ${userNameDisplay}!`,
        description: "Você atingiu sua meta diária de água! Continue assim para uma hidratação ótima.",
      });
    }
  };
  
  const resetIntake = () => {
    setCurrentIntake(0);
  };
  
  const toggleReminders = () => {
    setReminderEnabled(!reminderEnabled);
    
    if (!reminderEnabled) {
      toast({
        title: "Lembretes de água ativados",
        description: `Você receberá lembretes a cada ${reminderInterval} minutos.`,
      });
    } else {
      toast({
        title: "Lembretes de água desativados",
      });
    }
  };
  
  // Format time remaining for next reminder
  const formatTimeRemaining = () => {
    if (!nextReminder) return "";
    
    const now = new Date();
    const diff = nextReminder.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    
    return `${minutes} min`;
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Droplet className="h-5 w-5 text-blue-500" />
          Consumo de Água
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress display */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{currentIntake.toFixed(1)}L de {dailyTarget.toFixed(1)}L</span>
              <span className="text-sm text-gray-500">
                {Math.round((currentIntake / dailyTarget) * 100)}%
              </span>
            </div>
            <Progress value={(currentIntake / dailyTarget) * 100} className="h-2" />
          </div>
          
          {/* Quick add buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addWater(0.1)}
              className="text-xs"
            >
              +100ml
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addWater(0.2)}
              className="text-xs"
            >
              +200ml
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addWater(0.3)}
              className="text-xs"
            >
              +300ml
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => addWater(0.5)}
              className="text-xs"
            >
              +500ml
            </Button>
          </div>
          
          {/* Reset button */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={resetIntake}
            className="w-full text-gray-500"
          >
            Resetar consumo
          </Button>
          
          {/* Reminder setup */}
          <div className="space-y-3 pt-3 border-t">
            <h4 className="text-sm font-medium">Configurar Lembretes</h4>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">Intervalo:</span>
                <span className="text-sm font-medium">{reminderInterval} minutos</span>
              </div>
              <Slider 
                min={15}
                max={120}
                step={15}
                value={[reminderInterval]}
                onValueChange={(value) => setReminderInterval(value[0])}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                variant={reminderEnabled ? "default" : "outline"}
                size="sm"
                onClick={toggleReminders}
                className="w-full"
              >
                {reminderEnabled ? "Lembretes Ativados" : "Ativar Lembretes"}
              </Button>
              
              {reminderEnabled && nextReminder && (
                <span className="text-xs ml-2">
                  Próximo: {formatTimeRemaining()}
                </span>
              )}
            </div>
          </div>
          
          {/* Daily recommendation */}
          <div className="pt-3 border-t text-xs text-gray-500">
            <p className="font-medium">Recomendação diária: {dailyTarget.toFixed(1)}L</p>
            <p>A recomendação é calculada com base no seu peso corporal, nível de atividade física e objetivo.</p>
            <p className="mt-1">Dica: Distribua o consumo ao longo do dia para melhor absorção.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
