
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplet, Plus } from "lucide-react";
import { useState, useEffect } from "react";

export function WaterIntakeWidget() {
  const [consumed, setConsumed] = useState(0);
  const [dailyGoal] = useState(2000); // 2L em ml
  
  const progress = (consumed / dailyGoal) * 100;

  // Carregar progresso salvo
  useEffect(() => {
    const savedAmount = localStorage.getItem('waterConsumed');
    const lastUpdate = localStorage.getItem('waterLastUpdate');
    
    if (savedAmount && lastUpdate) {
      const lastUpdateDate = new Date(lastUpdate);
      const today = new Date();
      
      if (lastUpdateDate.toDateString() === today.toDateString()) {
        setConsumed(parseInt(savedAmount));
      } else {
        // Reset se for um novo dia
        localStorage.removeItem('waterConsumed');
        localStorage.removeItem('waterLastUpdate');
        setConsumed(0);
      }
    }
  }, []);

  const addWater = (amount: number) => {
    const newAmount = Math.min(consumed + amount, dailyGoal);
    setConsumed(newAmount);
    
    localStorage.setItem('waterConsumed', newAmount.toString());
    localStorage.setItem('waterLastUpdate', new Date().toISOString());
  };

  const getMotivationalMessage = () => {
    if (progress >= 100) return "Parabéns! Meta atingida! 🎉";
    if (progress >= 75) return "Quase lá! Continue assim! 💪";
    if (progress >= 50) return "No meio do caminho! 🚀";
    if (progress >= 25) return "Bom começo! Continue! 👍";
    return "Vamos começar! 💧";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-corpoideal-purple text-lg">
          <Droplet className="h-5 w-5 mr-2" />
          Hidratação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {(consumed / 1000).toFixed(1)}L
            </div>
            <div className="text-sm text-gray-600">
              de {(dailyGoal / 1000).toFixed(1)}L diários
            </div>
          </div>
          
          <Progress value={progress} className="h-3" />
          
          <div className="text-center">
            <p className="text-sm text-gray-600">{getMotivationalMessage()}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => addWater(250)}
              className="text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              250ml
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => addWater(500)}
              className="text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              500ml
            </Button>
            <Button
              size="sm"
              onClick={() => addWater(1000)}
              className="text-xs bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="h-3 w-3 mr-1" />
              1L
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
