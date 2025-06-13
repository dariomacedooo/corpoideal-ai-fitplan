
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface GoalSelectorProps {
  onSelect: (goal: string) => void;
}

export function GoalSelector({ onSelect }: GoalSelectorProps) {
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  
  const handleGoalChange = (value: string) => {
    setSelectedGoal(value);
  };
  
  const handleSubmit = () => {
    if (selectedGoal) {
      onSelect(selectedGoal);
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-corpoideal-purple">Selecione seu Objetivo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup onValueChange={handleGoalChange} value={selectedGoal}>
          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-corpoideal-lightpurple/20">
            <RadioGroupItem value="cutting" id="cutting" />
            <Label htmlFor="cutting" className="flex-1 cursor-pointer">
              <div className="font-medium">Cutting</div>
              <div className="text-sm text-gray-500">Reduzir gordura corporal e melhorar o condicionamento</div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-corpoideal-lightpurple/20">
            <RadioGroupItem value="bulking" id="bulking" />
            <Label htmlFor="bulking" className="flex-1 cursor-pointer">
              <div className="font-medium">Bulking</div>
              <div className="text-sm text-gray-500">Aumentar a massa muscular e força</div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-corpoideal-lightpurple/20">
            <RadioGroupItem value="corrigir-postura" id="corrigir-postura" />
            <Label htmlFor="corrigir-postura" className="flex-1 cursor-pointer">
              <div className="font-medium">Corrigir Postura</div>
              <div className="text-sm text-gray-500">Melhorar o alinhamento corporal e reduzir dores</div>
            </Label>
          </div>
        </RadioGroup>
        
        <Button 
          onClick={handleSubmit}
          disabled={!selectedGoal}
          className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
        >
          Continuar
        </Button>
      </CardContent>
    </Card>
  );
}
