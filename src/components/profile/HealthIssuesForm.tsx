
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, CircleDashed, Thermometer, EggOff, MilkOff, WheatOff, FishOff, NutOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HealthIssuesFormProps {
  healthIssues: string[];
  toggleHealthIssue: (value: string) => void;
}

export function HealthIssuesForm({ healthIssues, toggleHealthIssue }: HealthIssuesFormProps) {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="health">Problemas de Saúde</TabsTrigger>
          <TabsTrigger value="allergies">Alergias Alimentares</TabsTrigger>
        </TabsList>
        
        <TabsContent value="health" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="allergies" className="space-y-4">
          <Label className="flex items-center gap-2">
            <EggOff className="h-4 w-4" /> Alergias Alimentares
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lactose" 
                checked={healthIssues.includes('alergia_lactose')}
                onCheckedChange={() => toggleHealthIssue('alergia_lactose')}
              />
              <Label htmlFor="lactose" className="flex items-center gap-1">
                <MilkOff className="h-4 w-4" /> Lactose
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gluten" 
                checked={healthIssues.includes('alergia_gluten')}
                onCheckedChange={() => toggleHealthIssue('alergia_gluten')}
              />
              <Label htmlFor="gluten" className="flex items-center gap-1">
                <WheatOff className="h-4 w-4" /> Glúten
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="frutos_mar" 
                checked={healthIssues.includes('alergia_frutos_mar')}
                onCheckedChange={() => toggleHealthIssue('alergia_frutos_mar')}
              />
              <Label htmlFor="frutos_mar" className="flex items-center gap-1">
                <FishOff className="h-4 w-4" /> Frutos do Mar
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="nozes" 
                checked={healthIssues.includes('alergia_nozes')}
                onCheckedChange={() => toggleHealthIssue('alergia_nozes')}
              />
              <Label htmlFor="nozes" className="flex items-center gap-1">
                <NutOff className="h-4 w-4" /> Nozes e Castanhas
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ovo" 
                checked={healthIssues.includes('alergia_ovo')}
                onCheckedChange={() => toggleHealthIssue('alergia_ovo')}
              />
              <Label htmlFor="ovo" className="flex items-center gap-1">
                <EggOff className="h-4 w-4" /> Ovos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="soja" 
                checked={healthIssues.includes('alergia_soja')}
                onCheckedChange={() => toggleHealthIssue('alergia_soja')}
              />
              <Label htmlFor="soja">Soja</Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
