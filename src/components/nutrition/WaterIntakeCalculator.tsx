
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Droplet } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface WaterIntakeProps {
  weight?: number;
  activityLevel?: 'low' | 'moderate' | 'high';
}

export function WaterIntakeCalculator({ weight = 70, activityLevel = 'moderate' }: WaterIntakeProps) {
  const [dailyGoal, setDailyGoal] = useState(0);
  const [consumed, setConsumed] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  // Calculate recommended daily water intake based on weight and activity level
  useEffect(() => {
    let baseAmount = weight * 30; // 30ml per kg of body weight (basic formula)
    
    // Adjust based on activity level
    if (activityLevel === 'low') {
      baseAmount *= 0.9;
    } else if (activityLevel === 'high') {
      baseAmount *= 1.2;
    }
    
    // Round to nearest 100ml
    const roundedAmount = Math.round(baseAmount / 100) * 100;
    setDailyGoal(roundedAmount);
    
    // Reset consumed amount when goal changes
    setConsumed(0);
    setProgress(0);
    
  }, [weight, activityLevel]);

  // Add water consumption
  const addWater = (amount: number) => {
    const newAmount = Math.min(consumed + amount, dailyGoal);
    setConsumed(newAmount);
    setProgress(Math.round((newAmount / dailyGoal) * 100));
    
    // Save to localStorage
    localStorage.setItem('waterConsumed', newAmount.toString());
    localStorage.setItem('waterLastUpdate', new Date().toISOString());
    
    toast({
      title: `${amount}ml registrados`,
      description: `Você consumiu ${newAmount}ml de água hoje (${progress}% da meta).`,
    });
  };

  // Load saved progress
  useEffect(() => {
    const savedAmount = localStorage.getItem('waterConsumed');
    const lastUpdate = localStorage.getItem('waterLastUpdate');
    
    if (savedAmount && lastUpdate) {
      // Check if the last update was today
      const lastUpdateDate = new Date(lastUpdate);
      const today = new Date();
      
      if (lastUpdateDate.toDateString() === today.toDateString()) {
        const parsedAmount = parseInt(savedAmount);
        setConsumed(parsedAmount);
        setProgress(Math.round((parsedAmount / dailyGoal) * 100));
      } else {
        // Reset if it's a new day
        localStorage.removeItem('waterConsumed');
        localStorage.removeItem('waterLastUpdate');
      }
    }
  }, [dailyGoal]);

  // Set up water intake reminders
  useEffect(() => {
    // Don't set up reminders if notifications aren't allowed
    if (!("Notification" in window)) {
      return;
    }
    
    // Request permission for notifications
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
    
    // Function to show notification
    const showWaterReminder = () => {
      if (Notification.permission === "granted") {
        // Check if we're at or above the daily goal
        if (consumed >= dailyGoal) {
          return; // Don't remind if goal is met
        }
        
        const notification = new Notification("Hora de beber água!", {
          body: `Lembre-se de beber 250ml de água agora! (${progress}% da meta diária)`,
          icon: "/placeholder.svg"
        });
        
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      }
    };
    
    // Set up timer for every 30 minutes
    const reminderId = setInterval(showWaterReminder, 30 * 60 * 1000);
    
    return () => {
      clearInterval(reminderId);
    };
  }, [consumed, dailyGoal, progress]);

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple flex items-center">
          <Droplet className="h-5 w-5 mr-2" />
          Consumo de Água
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-700">Hidratação adequada</AlertTitle>
            <AlertDescription className="text-blue-600">
              Com base no seu peso ({weight}kg) e nível de atividade, sua meta diária é:
            </AlertDescription>
          </Alert>
          
          <div className="flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg">
            <div className="text-center">
              <span className="text-4xl font-bold text-blue-600">{(dailyGoal / 1000).toFixed(1)}L</span>
              <p className="text-sm text-gray-600 mt-1">de água por dia</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Progresso diário</span>
              <Badge variant="outline" className="bg-blue-50">
                {consumed}ml / {dailyGoal}ml
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-right text-gray-500">{progress}% completo</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button 
              onClick={() => addWater(250)}
              variant="outline" 
              className="border-blue-200 hover:bg-blue-50"
            >
              +250ml
            </Button>
            <Button 
              onClick={() => addWater(500)}
              variant="outline"
              className="border-blue-200 hover:bg-blue-50"
            >
              +500ml
            </Button>
            <Button 
              onClick={() => addWater(1000)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              +1L
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-corpoideal-purple mb-2">Dicas para manter-se hidratado:</h4>
            <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
              <li>Tenha sempre uma garrafa de água com você</li>
              <li>Configure lembretes a cada 30 minutos (ativado!)</li>
              <li>Beba um copo de água ao acordar e antes de dormir</li>
              <li>Aumente a ingestão em dias quentes ou durante exercícios</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
