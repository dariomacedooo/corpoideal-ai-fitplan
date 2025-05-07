
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity } from "lucide-react";

interface LifestyleFormProps {
  lifestyle: string;
  setLifestyle: (value: string) => void;
}

export function LifestyleForm({ lifestyle, setLifestyle }: LifestyleFormProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="lifestyle" className="flex items-center gap-2">
        <Activity className="h-4 w-4" /> Estilo de Vida
      </Label>
      <Select value={lifestyle} onValueChange={setLifestyle}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione seu nível de atividade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sedentario">Sedentário (pouca ou nenhuma atividade)</SelectItem>
          <SelectItem value="leve">Levemente ativo (exercícios leves 1-3 dias/semana)</SelectItem>
          <SelectItem value="moderado">Moderadamente ativo (exercícios moderados 3-5 dias/semana)</SelectItem>
          <SelectItem value="ativo">Muito ativo (exercícios intensos 6-7 dias/semana)</SelectItem>
          <SelectItem value="extremo">Extremamente ativo (exercícios intensos diários ou trabalho físico)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
