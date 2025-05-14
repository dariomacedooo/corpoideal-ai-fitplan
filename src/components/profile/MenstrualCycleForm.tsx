
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenstrualCycleFormProps {
  cycleLength: string;
  setCycleLength: (value: string) => void;
  lastPeriod: string;
  setLastPeriod: (value: string) => void;
  periodTracking: boolean;
  setPeriodTracking: (value: boolean) => void;
}

export function MenstrualCycleForm({
  cycleLength,
  setCycleLength,
  lastPeriod,
  setLastPeriod,
  periodTracking,
  setPeriodTracking
}: MenstrualCycleFormProps) {
  // Generate days for the last 31 days
  const generateLastDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 31; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
      });
      
      days.push({
        value: date.toISOString().split('T')[0],
        label: formattedDate
      });
    }
    
    return days;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label className="flex items-center gap-2 text-corpoideal-purple font-medium">
          <Calendar className="h-4 w-4" /> Ciclo Menstrual
        </Label>
      </div>
      
      <RadioGroup 
        value={periodTracking ? "sim" : "nao"} 
        onValueChange={(value) => setPeriodTracking(value === "sim")}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sim" id="tracking-sim" />
          <Label htmlFor="tracking-sim">Sim, quero otimizar meus treinos com base no meu ciclo</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="nao" id="tracking-nao" />
          <Label htmlFor="tracking-nao">Não, prefiro não informar</Label>
        </div>
      </RadioGroup>
      
      {periodTracking && (
        <div className="grid grid-cols-2 gap-4 pt-2 animate-in fade-in duration-300">
          <div className="space-y-2">
            <Label htmlFor="last-period">Último dia do período</Label>
            <Select value={lastPeriod} onValueChange={setLastPeriod}>
              <SelectTrigger id="last-period">
                <SelectValue placeholder="Selecione a data" />
              </SelectTrigger>
              <SelectContent>
                {generateLastDays().map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cycle-length">Duração média do ciclo</Label>
            <Select value={cycleLength} onValueChange={setCycleLength}>
              <SelectTrigger id="cycle-length">
                <SelectValue placeholder="Selecione a duração" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(15)].map((_, i) => (
                  <SelectItem key={i + 21} value={(i + 21).toString()}>
                    {i + 21} dias
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-2 text-xs text-gray-500 pt-1">
            <p>
              Estas informações serão usadas para adaptar suas recomendações de treino 
              e otimizar seus resultados com base nas fases do seu ciclo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
