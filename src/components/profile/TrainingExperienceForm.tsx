import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dumbbell } from "lucide-react";
interface TrainingExperienceFormProps {
  trainingExperience: string;
  setTrainingExperience: (value: string) => void;
  trainingLocation: string;
  setTrainingLocation: (value: string) => void;
}
export function TrainingExperienceForm({
  trainingExperience,
  setTrainingExperience,
  trainingLocation,
  setTrainingLocation
}: TrainingExperienceFormProps) {
  return <>
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4" /> Experiência em Treinos
        </Label>
        <RadioGroup value={trainingExperience} onValueChange={setTrainingExperience} className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="iniciante" id="iniciante" />
            <Label htmlFor="iniciante">Iniciante (menos de 6 meses)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intermediario" id="intermediario" />
            <Label htmlFor="intermediario">Intermediário (6 meses a 2 anos)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="avancado" id="avancado" />
            <Label htmlFor="avancado">Avançado (mais de 2 anos)</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          Onde você costuma treinar?
        </Label>
        <RadioGroup value={trainingLocation} onValueChange={setTrainingLocation} className="flex flex-col space-y-2 bg-zinc-950">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="academia" id="academia" />
            <Label htmlFor="academia">Academia</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="casa" id="casa" />
            <Label htmlFor="casa">Em casa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="arlivre" id="arlivre" />
            <Label htmlFor="arlivre">Ao ar livre</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="misto" id="misto" />
            <Label htmlFor="misto">Misto (varia entre opções)</Label>
          </div>
        </RadioGroup>
      </div>
    </>;
}