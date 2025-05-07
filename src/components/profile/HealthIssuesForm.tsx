
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, CircleDashed, Thermometer } from "lucide-react";

interface HealthIssuesFormProps {
  healthIssues: string[];
  toggleHealthIssue: (value: string) => void;
}

export function HealthIssuesForm({ healthIssues, toggleHealthIssue }: HealthIssuesFormProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Heart className="h-4 w-4" /> Problemas de Saúde
      </Label>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="diabetes" 
            checked={healthIssues.includes('diabetes')}
            onCheckedChange={() => toggleHealthIssue('diabetes')}
          />
          <Label htmlFor="diabetes" className="flex items-center gap-1">
            <CircleDashed className="h-4 w-4" /> Diabetes
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="hipertensao" 
            checked={healthIssues.includes('hipertensao')}
            onCheckedChange={() => toggleHealthIssue('hipertensao')}
          />
          <Label htmlFor="hipertensao" className="flex items-center gap-1">
            <Thermometer className="h-4 w-4" /> Hipertensão
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="escoliose" 
            checked={healthIssues.includes('escoliose')}
            onCheckedChange={() => toggleHealthIssue('escoliose')}
          />
          <Label htmlFor="escoliose">Escoliose</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="artrite" 
            checked={healthIssues.includes('artrite')}
            onCheckedChange={() => toggleHealthIssue('artrite')}
          />
          <Label htmlFor="artrite">Artrite/Artrose</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="cardiaco" 
            checked={healthIssues.includes('cardiaco')}
            onCheckedChange={() => toggleHealthIssue('cardiaco')}
          />
          <Label htmlFor="cardiaco">Problemas Cardíacos</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="respiratorio" 
            checked={healthIssues.includes('respiratorio')}
            onCheckedChange={() => toggleHealthIssue('respiratorio')}
          />
          <Label htmlFor="respiratorio">Problemas Respiratórios</Label>
        </div>
      </div>
    </div>
  );
}
